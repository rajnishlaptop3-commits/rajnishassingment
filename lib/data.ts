export interface Room {
  id: string
  name: string
  type: "standard" | "deluxe" | "suite" | "penthouse" | "family" | "executive"
  price: number
  capacity: number
  description: string
  amenities: string[]
  image: string
  available: boolean
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: "guest" | "admin"
  phone: string
  createdAt: string
}

export interface Booking {
  id: string
  userId: string
  roomId: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: "confirmed" | "pending" | "cancelled" | "completed"
  createdAt: string
  specialRequests?: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  read: boolean
}

// --- In-memory data store ---

export const rooms: Room[] = [
  {
    id: "room-1",
    name: "Standard Room",
    type: "standard",
    price: 120,
    capacity: 2,
    description:
      "A comfortable standard room with modern amenities, perfect for solo travelers or couples. Enjoy a restful stay with a queen-size bed, flat-screen TV, and complimentary Wi-Fi.",
    amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Fridge", "Safe"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    available: true,
  },
  {
    id: "room-2",
    name: "Deluxe Room",
    type: "deluxe",
    price: 220,
    capacity: 2,
    description:
      "Upgrade your experience with our Deluxe Room featuring a king-size bed, premium linens, city views, and a spacious bathroom with luxury toiletries.",
    amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Safe", "City View", "Bathrobe"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d955e4c47?w=800&q=80",
    available: true,
  },
  {
    id: "room-3",
    name: "Executive Suite",
    type: "executive",
    price: 350,
    capacity: 2,
    description:
      "Designed for the business traveler, the Executive Suite includes a separate workspace, ergonomic seating, high-speed internet, and access to the executive lounge.",
    amenities: [
      "Wi-Fi",
      "TV",
      "Air Conditioning",
      "Mini Bar",
      "Safe",
      "Workspace",
      "Executive Lounge Access",
      "Coffee Machine",
    ],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    available: true,
  },
  {
    id: "room-4",
    name: "Family Room",
    type: "family",
    price: 280,
    capacity: 4,
    description:
      "Spacious and welcoming, our Family Room features two queen-size beds, a cozy seating area, and kid-friendly amenities. Perfect for families with children.",
    amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Fridge", "Safe", "Extra Beds", "Play Area"],
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    available: true,
  },
  {
    id: "room-5",
    name: "Premium Suite",
    type: "suite",
    price: 480,
    capacity: 3,
    description:
      "Indulge in luxury with our Premium Suite. Features a separate living area, dining space, premium minibar, and breathtaking ocean views from floor-to-ceiling windows.",
    amenities: [
      "Wi-Fi",
      "TV",
      "Air Conditioning",
      "Premium Mini Bar",
      "Safe",
      "Ocean View",
      "Living Area",
      "Dining Area",
      "Jacuzzi",
    ],
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    available: true,
  },
  {
    id: "room-6",
    name: "Penthouse Suite",
    type: "penthouse",
    price: 850,
    capacity: 4,
    description:
      "The pinnacle of luxury, our Penthouse Suite offers panoramic city views, a private terrace, butler service, and the finest amenities for an unforgettable experience.",
    amenities: [
      "Wi-Fi",
      "TV",
      "Air Conditioning",
      "Premium Mini Bar",
      "Safe",
      "Panoramic View",
      "Private Terrace",
      "Butler Service",
      "Jacuzzi",
      "Kitchen",
    ],
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80",
    available: true,
  },
]

export const users: User[] = [
  {
    id: "user-admin",
    name: "Rajnish Bhandari",
    email: "admin@grandvista.com",
    password: "admin123",
    role: "admin",
    phone: "+977 1234567890",
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "user-1",
    name: "Rajnish Bhandari",
    email: "rajnish@example.com",
    password: "password123",
    role: "guest",
    phone: "+977 1234567890",
    createdAt: "2025-06-15T10:30:00Z",
  },
]

export const bookings: Booking[] = [
  {
    id: "booking-1",
    userId: "user-1",
    roomId: "room-2",
    checkIn: "2026-03-01",
    checkOut: "2026-03-05",
    guests: 2,
    totalPrice: 880,
    status: "confirmed",
    createdAt: "2026-02-10T14:00:00Z",
    specialRequests: "Late check-in please",
  },
  {
    id: "booking-2",
    userId: "user-1",
    roomId: "room-5",
    checkIn: "2026-04-10",
    checkOut: "2026-04-14",
    guests: 2,
    totalPrice: 1920,
    status: "pending",
    createdAt: "2026-02-12T09:00:00Z",
  },
]

export const contactMessages: ContactMessage[] = []

// --- Helper to generate IDs ---
export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}
