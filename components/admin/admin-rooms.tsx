"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { Plus, Pencil, Trash2 } from "lucide-react"
import type { Room } from "@/lib/data"

interface AdminRoomsProps {
  rooms: Room[]
  onRefresh: () => void
}

const roomImages: Record<string, string> = {
  standard: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
  deluxe: "https://images.unsplash.com/photo-1590490360182-c33d955e4c47?w=800&q=80",
  executive: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
  family: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
  suite: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
  penthouse: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80",
}

function RoomForm({
  room,
  onSubmit,
  onCancel,
}: {
  room?: Room
  onSubmit: (data: Partial<Room>) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(room?.name || "")
  const [type, setType] = useState(room?.type || "standard")
  const [price, setPrice] = useState(room?.price?.toString() || "")
  const [capacity, setCapacity] = useState(room?.capacity?.toString() || "")
  const [description, setDescription] = useState(room?.description || "")
  const [amenities, setAmenities] = useState(room?.amenities?.join(", ") || "")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({
      name,
      type: type as Room["type"],
      price: Number(price),
      capacity: Number(capacity),
      description,
      amenities: amenities.split(",").map((a) => a.trim()).filter(Boolean),
      image: roomImages[type] || "/images/room-standard.jpg",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="room-name">Room Name</Label>
        <Input id="room-name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="room-type">Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="room-type" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="deluxe">Deluxe</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="suite">Suite</SelectItem>
              <SelectItem value="penthouse">Penthouse</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="room-price">Price per Night ($)</Label>
          <Input
            id="room-price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mt-1"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="room-capacity">Guest Capacity</Label>
        <Input
          id="room-capacity"
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="room-description">Description</Label>
        <Textarea
          id="room-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="room-amenities">Amenities (comma-separated)</Label>
        <Input
          id="room-amenities"
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
          placeholder="Wi-Fi, TV, Air Conditioning"
          className="mt-1"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{room ? "Update Room" : "Add Room"}</Button>
      </div>
    </form>
  )
}

export function AdminRooms({ rooms, onRefresh }: AdminRoomsProps) {
  const [addOpen, setAddOpen] = useState(false)
  const [editRoom, setEditRoom] = useState<Room | null>(null)

  async function addRoom(data: Partial<Room>) {
    try {
      await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      toast.success("Room added successfully")
      setAddOpen(false)
      onRefresh()
    } catch {
      toast.error("Failed to add room")
    }
  }

  async function updateRoom(data: Partial<Room>) {
    if (!editRoom) return
    try {
      await fetch(`/api/rooms/${editRoom.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      toast.success("Room updated successfully")
      setEditRoom(null)
      onRefresh()
    } catch {
      toast.error("Failed to update room")
    }
  }

  async function deleteRoom(id: string) {
    try {
      await fetch(`/api/rooms/${id}`, { method: "DELETE" })
      toast.success("Room deleted")
      onRefresh()
    } catch {
      toast.error("Failed to delete room")
    }
  }

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-serif text-xl">Manage Rooms</CardTitle>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif">Add New Room</DialogTitle>
            </DialogHeader>
            <RoomForm onSubmit={addRoom} onCancel={() => setAddOpen(false)} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 font-medium text-muted-foreground">Name</th>
                <th className="pb-3 font-medium text-muted-foreground">Type</th>
                <th className="pb-3 font-medium text-muted-foreground">Price</th>
                <th className="pb-3 font-medium text-muted-foreground">Capacity</th>
                <th className="pb-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium text-foreground">{room.name}</td>
                  <td className="py-3 capitalize text-muted-foreground">{room.type}</td>
                  <td className="py-3 text-foreground">${room.price}</td>
                  <td className="py-3 text-muted-foreground">{room.capacity}</td>
                  <td className="py-3">
                    <div className="flex justify-end gap-2">
                      <Dialog open={editRoom?.id === room.id} onOpenChange={(open) => !open && setEditRoom(null)}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setEditRoom(room)}>
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                          <DialogHeader>
                            <DialogTitle className="font-serif">Edit Room</DialogTitle>
                          </DialogHeader>
                          {editRoom && <RoomForm room={editRoom} onSubmit={updateRoom} onCancel={() => setEditRoom(null)} />}
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Room?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete {room.name}. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteRoom(room.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
