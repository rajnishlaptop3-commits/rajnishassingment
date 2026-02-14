import { NextResponse } from "next/server"
import { contactMessages, generateId } from "@/lib/data"

export async function GET() {
  return NextResponse.json(contactMessages)
}

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.name || !body.email || !body.subject || !body.message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 })
  }

  const newMessage = {
    id: generateId("msg"),
    name: body.name,
    email: body.email,
    subject: body.subject,
    message: body.message,
    createdAt: new Date().toISOString(),
    read: false,
  }

  contactMessages.push(newMessage)
  return NextResponse.json(newMessage, { status: 201 })
}
