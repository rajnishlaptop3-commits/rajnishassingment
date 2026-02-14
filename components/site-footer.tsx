import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent">
                <span className="text-sm font-bold text-accent-foreground">GV</span>
              </div>
              <span className="font-serif text-xl font-bold">Grand Vista</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed opacity-80">
              Experience unparalleled luxury and hospitality at Grand Vista Hotel. Your comfort is our priority.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold">Quick Links</h3>
            <nav className="mt-3 flex flex-col gap-2" aria-label="Footer navigation">
              <Link href="/" className="text-sm opacity-80 transition-opacity hover:opacity-100">
                Home
              </Link>
              <Link href="/rooms" className="text-sm opacity-80 transition-opacity hover:opacity-100">
                Rooms
              </Link>
              <Link href="/contact" className="text-sm opacity-80 transition-opacity hover:opacity-100">
                Contact
              </Link>
              <Link href="/login" className="text-sm opacity-80 transition-opacity hover:opacity-100">
                Sign In
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold">Contact Info</h3>
            <div className="mt-3 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm opacity-80">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Boudha, Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-80">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+977 1234567890</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-80">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@grandvista.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-sm opacity-60">
          <p>{'2026 Grand Vista Hotel. All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  )
}
