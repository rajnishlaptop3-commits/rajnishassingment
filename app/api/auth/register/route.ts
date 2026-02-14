import { NextResponse } from "next/server"
import { users, generateId } from "@/lib/data"

export async function POST(request: Request) {
  const { name, email, password, phone } = await request.json()

  if (!name || !email || !password || !phone) {
    return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
  }

  const existingUser = users.find((u) => u.email === email)
  if (existingUser) {
    return NextResponse.json({ success: false, error: "Email already registered" }, { status: 400 })
  }

  const newUser = {
    id: generateId("user"),
    name,
    email,
    password,
    phone,
    role: "guest" as const,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)

  const { password: _, ...safeUser } = newUser
  return NextResponse.json({ success: true, user: safeUser })
}
