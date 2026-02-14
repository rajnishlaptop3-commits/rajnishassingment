import { NextResponse } from "next/server"
import { bookings, rooms, generateId } from "@/lib/data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  let result = [...bookings]
  if (userId) {
    result = result.filter((b) => b.userId === userId)
  }

  const enriched = result.map((b) => {
    const room = rooms.find((r) => r.id === b.roomId)
    return { ...b, room }
  })

  return NextResponse.json(enriched)
}

export async function POST(request: Request) {
  const body = await request.json()

  const room = rooms.find((r) => r.id === body.roomId)
  if (!room) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 })
  }

  const checkIn = new Date(body.checkIn)
  const checkOut = new Date(body.checkOut)
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))

  if (nights <= 0) {
    return NextResponse.json({ error: "Check-out must be after check-in" }, { status: 400 })
  }

  const newBooking = {
    id: generateId("booking"),
    userId: body.userId,
    roomId: body.roomId,
    checkIn: body.checkIn,
    checkOut: body.checkOut,
    guests: body.guests || 1,
    totalPrice: room.price * nights,
    status: "confirmed" as const,
    createdAt: new Date().toISOString(),
    specialRequests: body.specialRequests || "",
  }

  bookings.push(newBooking)
  return NextResponse.json({ ...newBooking, room }, { status: 201 })
}
