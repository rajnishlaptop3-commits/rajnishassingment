import { NextResponse } from "next/server"
import { bookings, rooms } from "@/lib/data"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const index = bookings.findIndex((b) => b.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 })
  }

  bookings[index] = { ...bookings[index], ...body }
  const room = rooms.find((r) => r.id === bookings[index].roomId)
  return NextResponse.json({ ...bookings[index], room })
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const index = bookings.findIndex((b) => b.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 })
  }

  const deleted = bookings.splice(index, 1)
  return NextResponse.json(deleted[0])
}
