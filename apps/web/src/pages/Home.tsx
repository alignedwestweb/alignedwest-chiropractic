import { useState } from "react"
import type { PageType } from "@/components/ui/navigation/types"
import About from "@/components/about"
import headshot from "@/assets/headshot.webp"
import HomeHero from "@/lib/sections/HomeHero"
import Services from "@/lib/sections/Services"
import { Details } from "@/lib/blocks/Details"
import { CTA } from '@/lib/sections/CTASection'
import BookingDialog from "@/lib/blocks/BookingDialog"
import { Toaster } from "@/components/ui/sonner"
import Info from "@/lib/sections/Info"

export interface HomeProps {
  onNavigate: (page: PageType) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined)

  // ✅ open the booking dialog (optionally with a service ID)
  const openBooking = (serviceId?: string) => {
    setPreselectedService(serviceId)
    setIsBookingOpen(true)
  }

  const closeBooking = () => {
    setIsBookingOpen(false)
    setPreselectedService(undefined)
  }

  return (
    <div className="flex relative size-full bg-white">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border flex flex-col items-center justify-start size-full">
          
          {/* 👇 pass openBooking to Hero */}
          <HomeHero onNavigate={onNavigate} onBookNow={() => openBooking()} />

          <About image={headshot} />
          <Services />
          <Details />
          <Info />
          <CTA onNavigate={onNavigate} />

          {/* ✅ Booking dialog opens when user clicks "Book Now" */}
          <BookingDialog
            isOpen={isBookingOpen}
            onClose={closeBooking}
            preselectedService={preselectedService}
          />

          <Toaster position="top-center" richColors />
        </div>
      </div>
    </div>
  )
}