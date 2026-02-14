import { NextResponse } from "next/server"
import { rooms, generateId } from "@/lib/data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const capacity = searchParams.get("capacity")

  let filteredRooms = [...rooms]

  if (type && type !== "all") {
    filteredRooms = filteredRooms.filter((r) => r.type === type)
  }
  if (minPrice) {
    filteredRooms = filteredRooms.filter((r) => r.price >= Number(minPrice))
  }
  if (maxPrice) {
    filteredRooms = filteredRooms.filter((r) => r.price <= Number(maxPrice))
  }
  if (capacity) {
    filteredRooms = filteredRooms.filter((r) => r.capacity >= Number(capacity))
  }

  return NextResponse.json(filteredRooms)
}

export async function POST(request: Request) {
  const body = await request.json()

  const newRoom = {
    id: generateId("room"),
    ...body,
    available: true,
  }

  rooms.push(newRoom)
  return NextResponse.json(newRoom, { status: 201 })
}
