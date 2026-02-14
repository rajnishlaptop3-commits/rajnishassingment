import { NextResponse } from "next/server"
import { users } from "@/lib/data"

export async function GET() {
  const safeUsers = users.map(({ password: _, ...u }) => u)
  return NextResponse.json(safeUsers)
}
