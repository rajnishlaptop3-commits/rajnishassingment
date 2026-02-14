import Link from "next/link"
/* eslint-disable @next/next/no-img-element */
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Wifi, Coffee, Dumbbell, Car, Utensils, ShieldCheck } from "lucide-react"

const features = [
  { icon: Wifi, title: "Free Wi-Fi", description: "High-speed internet access throughout the hotel" },
  { icon: Coffee, title: "Room Service", description: "24/7 in-room dining with gourmet options" },
  { icon: Dumbbell, title: "Fitness Center", description: "State-of-the-art gym open around the clock" },
  { icon: Car, title: "Valet Parking", description: "Complimentary valet parking for all guests" },
  { icon: Utensils, title: "Fine Dining", description: "Award-winning restaurant and rooftop bar" },
  { icon: ShieldCheck, title: "24/7 Security", description: "Round-the-clock security for your peace of mind" },
]

const testimonials = [
  {
    name: "Sarah Mitchell",
    rating: 5,
    text: "Absolutely stunning hotel. The service was impeccable and the rooms are beautifully designed. Will definitely return!",
  },
  {
    name: "James Rodriguez",
    rating: 5,
    text: "The Penthouse Suite exceeded all expectations. The panoramic views and butler service made our anniversary truly special.",
  },
  {
    name: "Emily Chen",
    rating: 4,
    text: "Great location, friendly staff, and the breakfast buffet is outstanding. Highly recommend the Executive Suite for business trips.",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] overflow-hidden lg:h-[700px]">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80"
            alt="Grand Vista Hotel luxury lobby"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center lg:px-8">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
              Luxury Redefined
            </p>
            <h1 className="max-w-3xl font-serif text-4xl font-bold text-background text-balance md:text-5xl lg:text-6xl">
              Welcome to Grand Vista Hotel
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-background/80">
              Experience world-class hospitality with breathtaking views, premium amenities, and unmatched service in the heart of the city.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild className="text-base">
                <Link href="/rooms">Browse Rooms</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background text-base">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-accent-foreground">
                Why Choose Us
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground text-balance md:text-4xl">
                World-Class Amenities
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground leading-relaxed">
                From fine dining to fitness, we provide everything you need for an exceptional stay.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="border-border bg-card transition-shadow hover:shadow-md">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <feature.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground">{feature.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Room Highlights */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-accent-foreground">
                Our Rooms
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground text-balance md:text-4xl">
                Featured Accommodations
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { name: "Deluxe Room", price: 220, image: "https://images.unsplash.com/photo-1590490360182-c33d955e4c47?w=800&q=80", id: "room-2" },
                { name: "Premium Suite", price: 480, image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80", id: "room-5" },
                { name: "Penthouse Suite", price: 850, image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80", id: "room-6" },
              ].map((room) => (
                <Link key={room.id} href={`/rooms/${room.id}`} className="group">
                  <Card className="overflow-hidden border-border bg-card transition-shadow hover:shadow-lg">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-serif text-lg font-semibold text-foreground">{room.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        From <span className="text-lg font-bold text-foreground">${room.price}</span> / night
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button size="lg" asChild>
                <Link href="/rooms">View All Rooms</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-accent-foreground">
                Testimonials
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground text-balance md:text-4xl">
                What Our Guests Say
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <Card key={t.name} className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {`"${t.text}"`}
                    </p>
                    <p className="mt-4 font-serif font-semibold text-foreground">{t.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 text-primary-foreground lg:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-balance md:text-4xl">
              Ready to Experience Luxury?
            </h2>
            <p className="mt-4 text-lg leading-relaxed opacity-80">
              Book your stay today and discover why Grand Vista Hotel is the preferred choice for discerning travelers.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" variant="secondary" asChild className="text-base">
                <Link href="/rooms">Book Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground text-base">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
