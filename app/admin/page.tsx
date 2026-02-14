"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useAuth } from "@/lib/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminRooms } from "@/components/admin/admin-rooms"
import { AdminBookings } from "@/components/admin/admin-bookings"
import { AdminUsers } from "@/components/admin/admin-users"
import { AdminMessages } from "@/components/admin/admin-messages"
import { Card, CardContent } from "@/components/ui/card"
import { BedDouble, CalendarDays, Users, Mail } from "lucide-react"
import type { Room, Booking, ContactMessage } from "@/lib/data"

type EnrichedBooking = Booking & { room?: Room }

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  phone: string
  createdAt: string
}

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [rooms, setRooms] = useState<Room[]>([])
  const [bookings, setBookings] = useState<EnrichedBooking[]>([])
  const [users, setUsers] = useState<AdminUser[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])

  const fetchAll = useCallback(async () => {
    const [roomsRes, bookingsRes, usersRes, messagesRes] = await Promise.all([
      fetch("/api/rooms"),
      fetch("/api/bookings"),
      fetch("/api/users"),
      fetch("/api/contact"),
    ])
    setRooms(await roomsRes.json())
    setBookings(await bookingsRes.json())
    setUsers(await usersRes.json())
    setMessages(await messagesRes.json())
  }, [])

  useEffect(() => {
    if (authLoading) return
    if (!user || user.role !== "admin") {
      router.push("/login")
      return
    }
    fetchAll()
  }, [user, authLoading, router, fetchAll])

  if (authLoading || !user || user.role !== "admin") {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="bg-primary py-10 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h1 className="font-serif text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-1 text-lg opacity-80">Manage rooms, bookings, users, and messages</p>
          </div>
        </section>

        <section className="py-8 lg:py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-4">
              {[
                { icon: BedDouble, label: "Total Rooms", value: rooms.length },
                { icon: CalendarDays, label: "Total Bookings", value: bookings.length },
                { icon: Users, label: "Registered Users", value: users.length },
                { icon: Mail, label: "Messages", value: messages.length },
              ].map((stat) => (
                <Card key={stat.label} className="border-border">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <stat.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="rooms">
              <TabsList className="mb-6 w-full justify-start">
                <TabsTrigger value="rooms" className="gap-2">
                  <BedDouble className="h-4 w-4" />
                  Rooms
                </TabsTrigger>
                <TabsTrigger value="bookings" className="gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Bookings
                </TabsTrigger>
                <TabsTrigger value="users" className="gap-2">
                  <Users className="h-4 w-4" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="messages" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Messages
                </TabsTrigger>
              </TabsList>

              <TabsContent value="rooms">
                <AdminRooms rooms={rooms} onRefresh={fetchAll} />
              </TabsContent>
              <TabsContent value="bookings">
                <AdminBookings bookings={bookings} onRefresh={fetchAll} />
              </TabsContent>
              <TabsContent value="users">
                <AdminUsers users={users} />
              </TabsContent>
              <TabsContent value="messages">
                <AdminMessages messages={messages} />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
