"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

const contactInfo = [
  { icon: MapPin, label: "Address", value: "Boudha, Kathmandu, Nepal" },
  { icon: Phone, label: "Phone", value: "+977 1234567890" },
  { icon: Mail, label: "Email", value: "info@grandvista.com" },
  { icon: Clock, label: "Front Desk", value: "Open 24 hours, 7 days a week" },
]

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      })
      const data = await res.json()
      if (data.error) {
        toast.error(data.error)
      } else {
        toast.success("Message sent! We will get back to you shortly.")
        setName("")
        setEmail("")
        setSubject("")
        setMessage("")
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    }
    setSubmitting(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary py-12 text-primary-foreground lg:py-16">
          <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
            <h1 className="font-serif text-3xl font-bold md:text-4xl">Contact Us</h1>
            <p className="mt-3 text-lg opacity-80 leading-relaxed">
              {"We'd love to hear from you. Get in touch with our team."}
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-5">
              {/* Contact Info */}
              <div className="lg:col-span-2">
                <h2 className="font-serif text-2xl font-bold text-foreground">Get in Touch</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  Whether you have a question about our rooms, services, or anything else, our team is ready to answer all your questions.
                </p>

                <div className="mt-8 flex flex-col gap-6">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                        <item.icon className="h-5 w-5 text-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="font-serif text-xl">Send a Message</CardTitle>
                    <CardDescription>Fill out the form and we will respond within 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="contact-name">Your Name</Label>
                          <Input
                            id="contact-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Rajnish Bhandari"
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contact-email">Email Address</Label>
                          <Input
                            id="contact-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="contact-subject">Subject</Label>
                        <Input
                          id="contact-subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="How can we help?"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact-message">Message</Label>
                        <Textarea
                          id="contact-message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us more about your inquiry..."
                          required
                          rows={5}
                          className="mt-1"
                        />
                      </div>
                      <Button type="submit" disabled={submitting} size="lg">
                        {submitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
