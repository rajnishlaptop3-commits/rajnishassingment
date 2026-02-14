import type { Metadata } from "next"
import { Playfair_Display, Lato } from "next/font/google"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "sonner"

import "./globals.css"

const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})
const _lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
})

export const metadata: Metadata = {
  title: "Grand Vista Hotel - Luxury Accommodation & Booking",
  description:
    "Experience luxury at Grand Vista Hotel. Book premium rooms, suites, and penthouses with world-class amenities and exceptional service.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </body>
    </html>
  )
}
