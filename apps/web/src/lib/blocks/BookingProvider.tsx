import React, { createContext, useContext, useMemo, useState } from "react"
import { BookingDialog } from "@/lib/blocks/JotformsDialog"
import { buildBookingSrc } from "@/lib/blocks/buildBooking"

type BookingContextValue = {
  openBooking: (serviceType?: string) => void
  closeBooking: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [src, setSrc] = useState(buildBookingSrc())

  const openBooking = (serviceType?: string) => {
    setSrc(buildBookingSrc({ serviceType }))
    setIsOpen(true)
  }

  const closeBooking = () => setIsOpen(false)

  const value = useMemo(() => ({ openBooking, closeBooking }), [])

  return (
    <BookingContext.Provider value={value}>
      {children}

      {/* Render ONCE so it can open from anywhere */}
      <BookingDialog isOpen={isOpen} onClose={closeBooking} src={src} />
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error("useBooking must be used within <BookingProvider />")
  return ctx
}