"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import { CalendarDays, Users, DollarSign, X } from "lucide-react"
import type { Booking, Room } from "@/lib/data"

type EnrichedBooking = Booking & { room?: Room }

const statusColors: Record<string, string> = {
  confirmed: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [bookings, setBookings] = useState<EnrichedBooking[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = useCallback(async () => {
    if (!user) return
    const res = await fetch(`/api/bookings?userId=${user.id}`)
    const data = await res.json()
    setBookings(data)
    setLoading(false)
  }, [user])

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.push("/login")
      return
    }
    fetchBookings()
  }, [user, authLoading, router, fetchBookings])

  async function cancelBooking(id: string) {
    try {
      await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      })
      toast.success("Booking cancelled")
      fetchBookings()
    } catch {
      toast.error("Failed to cancel booking")
    }
  }

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </main>
      </div>
    )
  }

  const activeBookings = bookings.filter((b) => b.status === "confirmed" || b.status === "pending")
  const pastBookings = bookings.filter((b) => b.status === "completed" || b.status === "cancelled")

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="bg-primary py-10 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h1 className="font-serif text-3xl font-bold">
              Welcome, {user.name}
            </h1>
            <p className="mt-1 text-lg opacity-80">Manage your bookings and account</p>
          </div>
        </section>

        <section className="py-8 lg:py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <Card className="border-border">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <CalendarDays className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
                    <p className="text-sm text-muted-foreground">Total Bookings</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <Users className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{activeBookings.length}</p>
                    <p className="text-sm text-muted-foreground">Active Bookings</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <DollarSign className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      ${bookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Bookings */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Active Bookings</CardTitle>
                <CardDescription>Your current and upcoming reservations</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="py-8 text-center text-muted-foreground">Loading...</div>
                ) : activeBookings.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No active bookings yet.</p>
                    <Button asChild className="mt-4">
                      <a href="/rooms">Browse Rooms</a>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {activeBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center"
                      >
                        {booking.room && (
                          <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={booking.room.image}
                              alt={booking.room.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-serif font-semibold text-foreground">
                              {booking.room?.name || "Room"}
                            </h3>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[booking.status]}`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {booking.checkIn} to {booking.checkOut} | {booking.guests}{" "}
                            {booking.guests === 1 ? "guest" : "guests"}
                          </p>
                          {booking.specialRequests && (
                            <p className="mt-1 text-xs text-muted-foreground italic">
                              {`"${booking.specialRequests}"`}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-lg font-bold text-foreground">${booking.totalPrice}</p>
                          {booking.status !== "cancelled" && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive">
                                  <X className="h-3 w-3" />
                                  Cancel
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to cancel this booking? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => cancelBooking(booking.id)}>
                                    Cancel Booking
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <Card className="mt-6 border-border">
                <CardHeader>
                  <CardTitle className="font-serif text-xl">Past Bookings</CardTitle>
                  <CardDescription>Your booking history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {pastBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center gap-4 rounded-lg border border-border p-4 opacity-70"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-serif font-semibold text-foreground">
                              {booking.room?.name || "Room"}
                            </h3>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[booking.status]}`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {booking.checkIn} to {booking.checkOut}
                          </p>
                        </div>
                        <p className="font-bold text-foreground">${booking.totalPrice}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Account Info */}
            <Card className="mt-6 border-border">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium text-foreground">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">{user.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
