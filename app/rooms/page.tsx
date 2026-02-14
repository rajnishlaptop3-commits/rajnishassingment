"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
/* eslint-disable @next/next/no-img-element */
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Users, Search } from "lucide-react"
import type { Room } from "@/lib/data"

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState("all")
  const [maxPrice, setMaxPrice] = useState("")
  const [capacityFilter, setCapacityFilter] = useState("")

  useEffect(() => {
    fetchRooms()
  }, [typeFilter, maxPrice, capacityFilter])

  async function fetchRooms() {
    setLoading(true)
    const params = new URLSearchParams()
    if (typeFilter !== "all") params.set("type", typeFilter)
    if (maxPrice) params.set("maxPrice", maxPrice)
    if (capacityFilter) params.set("capacity", capacityFilter)

    const res = await fetch(`/api/rooms?${params.toString()}`)
    const data = await res.json()
    setRooms(data)
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-primary py-12 text-primary-foreground lg:py-16">
          <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
            <h1 className="font-serif text-3xl font-bold md:text-4xl">Our Rooms & Suites</h1>
            <p className="mt-3 text-lg opacity-80 leading-relaxed">
              Find the perfect room for your stay at Grand Vista Hotel
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border bg-card py-6">
          <div className="mx-auto flex max-w-7xl flex-wrap items-end gap-4 px-4 lg:px-8">
            <div className="flex-1 min-w-[160px]">
              <Label htmlFor="type-filter" className="text-sm font-medium text-foreground">
                Room Type
              </Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="type-filter" className="mt-1">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="deluxe">Deluxe</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="suite">Suite</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-[140px]">
              <Label htmlFor="price-filter" className="text-sm font-medium text-foreground">
                Max Price / Night
              </Label>
              <Input
                id="price-filter"
                type="number"
                placeholder="No limit"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="min-w-[140px]">
              <Label htmlFor="capacity-filter" className="text-sm font-medium text-foreground">
                Min Guests
              </Label>
              <Input
                id="capacity-filter"
                type="number"
                placeholder="Any"
                value={capacityFilter}
                onChange={(e) => setCapacityFilter(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setTypeFilter("all")
                setMaxPrice("")
                setCapacityFilter("")
              }}
              className="gap-2"
            >
              <Search className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </section>

        {/* Room Grid */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden border-border">
                    <div className="h-56 animate-pulse bg-muted" />
                    <CardContent className="p-5">
                      <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                      <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-muted" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : rooms.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-lg text-muted-foreground">
                  No rooms found matching your criteria. Try adjusting the filters.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rooms.map((room) => (
                  <Link key={room.id} href={`/rooms/${room.id}`} className="group">
                    <Card className="overflow-hidden border-border bg-card transition-shadow hover:shadow-lg">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute right-3 top-3 rounded-md bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
                          ${room.price}/night
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-serif text-lg font-semibold text-foreground">{room.name}</h3>
                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {room.description}
                        </p>
                        <div className="mt-3 flex items-center gap-4">
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            Up to {room.capacity} guests
                          </span>
                          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium capitalize text-secondary-foreground">
                            {room.type}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
