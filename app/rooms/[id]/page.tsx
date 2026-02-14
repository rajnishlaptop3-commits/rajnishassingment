"use client"

import { useState, useEffect, use } from "react"
/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import { ArrowLeft, Users, Check } from "lucide-react"
import type { Room } from "@/lib/data"

export default function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { user } = useAuth()
  const router = useRouter()
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState(false)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("1")
  const [specialRequests, setSpecialRequests] = useState("")

  useEffect(() => {
    fetch(`/api/rooms/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error("Room not found")
          router.push("/rooms")
        } else {
          setRoom(data)
        }
        setLoading(false)
      })
  }, [id, router])

  const nights =
    checkIn && checkOut
      ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
      : 0

  const totalPrice = room ? room.price * Math.max(nights, 0) : 0

  async function handleBooking() {
    if (!user) {
      toast.error("Please sign in to book a room")
      router.push("/login")
      return
    }
    if (!checkIn || !checkOut || nights <= 0) {
      toast.error("Please select valid check-in and check-out dates")
      return
    }

    setBooking(true)
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          roomId: id,
          checkIn,
          checkOut,
          guests: Number(guests),
          specialRequests,
        }),
      })
      const data = await res.json()
      if (data.error) {
        toast.error(data.error)
      } else {
        toast.success("Booking confirmed! Redirecting to your dashboard...")
        setTimeout(() => router.push("/dashboard"), 1500)
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    }
    setBooking(false)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </main>
      </div>
    )
  }

  if (!room) return null

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <Link href="/rooms" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Rooms
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Room Details */}
            <div className="lg:col-span-2">
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <img src={room.image} alt={room.name} className="absolute inset-0 h-full w-full object-cover" />
              </div>

              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-serif text-3xl font-bold text-foreground">{room.name}</h1>
                  <Badge variant="secondary" className="capitalize">
                    {room.type}
                  </Badge>
                </div>

                <div className="mt-2 flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Up to {room.capacity} guests
                  </span>
                  <span className="text-2xl font-bold text-foreground">${room.price}</span>
                  <span className="text-sm text-muted-foreground">per night</span>
                </div>

                <p className="mt-4 leading-relaxed text-muted-foreground">{room.description}</p>

                <div className="mt-6">
                  <h2 className="font-serif text-xl font-semibold text-foreground">Amenities</h2>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {room.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-accent" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div>
              <Card className="sticky top-20 border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-xl">Book This Room</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div>
                    <Label htmlFor="checkin">Check-in Date</Label>
                    <Input
                      id="checkin"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkout">Check-out Date</Label>
                    <Input
                      id="checkout"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split("T")[0]}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max={room.capacity}
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="requests">Special Requests (Optional)</Label>
                    <Textarea
                      id="requests"
                      placeholder="Any special requirements..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  {nights > 0 && (
                    <div className="rounded-lg bg-secondary p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          ${room.price} x {nights} {nights === 1 ? "night" : "nights"}
                        </span>
                        <span className="font-semibold text-foreground">${totalPrice}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="text-xl font-bold text-foreground">${totalPrice}</span>
                      </div>
                    </div>
                  )}

                  <Button onClick={handleBooking} disabled={booking} className="w-full" size="lg">
                    {booking ? "Booking..." : user ? "Confirm Booking" : "Sign In to Book"}
                  </Button>

                  {!user && (
                    <p className="text-center text-sm text-muted-foreground">
                      <Link href="/login" className="underline hover:text-foreground">
                        Sign in
                      </Link>{" "}
                      or{" "}
                      <Link href="/register" className="underline hover:text-foreground">
                        register
                      </Link>{" "}
                      to book this room
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
