"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ContactMessage } from "@/lib/data"

interface AdminMessagesProps {
  messages: ContactMessage[]
}

export function AdminMessages({ messages }: AdminMessagesProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-serif text-xl">Contact Messages</CardTitle>
      </CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">No messages yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <div key={msg.id} className="rounded-lg border border-border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{msg.subject}</h3>
                    <p className="text-sm text-muted-foreground">
                      From: {msg.name} ({msg.email})
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
