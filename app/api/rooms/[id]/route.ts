import { NextResponse } from "next/server"
import { rooms } from "@/lib/data"

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const room = rooms.find((r) => r.id === id)

  if (!room) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 })
  }

  return NextResponse.json(room)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const index = rooms.findIndex((r) => r.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 })
  }

  rooms[index] = { ...rooms[index], ...body }
  return NextResponse.json(rooms[index])
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const index = rooms.findIndex((r) => r.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 })
  }

  const deleted = rooms.splice(index, 1)
  return NextResponse.json(deleted[0])
}
