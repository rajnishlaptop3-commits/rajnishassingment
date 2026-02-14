import { NextResponse } from "next/server"
import { users } from "@/lib/data"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 })
  }

  const { password: _, ...safeUser } = user

  return NextResponse.json({ success: true, user: safeUser })
}
