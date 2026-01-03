import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator/separator"
import type { PageType } from "@/components/ui/navigation/types"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Heart,
} from "lucide-react"
import logoprimary from "/logo-primary.svg"
import { Link } from "react-router-dom"
import { useBooking } from '@/lib/blocks/BookingProvider'

export function Footer({ onNavigate }: { onNavigate: (page: PageType) => void }) {

    const { openBooking } = useBooking()
  
  return (
    <footer className="relative shrink-0 w-full bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* --- Brand Column --- */}
            <div className="space-y-6">
              <Link to="/" onClick={() => { onNavigate('home')  }} className="h-20 w-auto p-0 bg-transparent hover:scale-105 transition-transform flex items-center">
              <img
                src={logoprimary}
                alt="Aligned West Chiropractic"
                className="h-full max-h-15 w-auto"
              />
            </Link>

              <p className="text-muted-foreground leading-relaxed">
                Where ancient healing traditions intersect with modern chiropractic
                techniques. A space for balance, renewal, and transformation.
              </p>

              <div className="flex space-x-4">
                <Button
                  onClick={() => window.location.href = 'https://www.facebook.com/alignedwest' }
                  variant="outlined"
                  size="sm"
                  className="rounded-full border-amber-200 hover:border-amber-400 hover:bg-amber-50"
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                
                <Button
                onClick={() => window.location.href = "https://www.instagram.com/dr.weston.sorenson?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="}
                  variant="outlined"
                  size="sm"
                  className="rounded-full border-amber-200 hover:border-amber-400 hover:bg-amber-50"
                >
                  <Instagram className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* --- Navigation Links --- */}
            <div className="space-y-6">
              <h3 className="text-lg text-primary flex items-center gap-2">
                <Heart className="w-5 h-5 text-amber-600" />
                Healing Paths
              </h3>
              <div className="space-y-4">
                <button
                  onClick={() => onNavigate("services")}
                  className="block text-muted-foreground hover:text-amber-700 transition-colors leading-relaxed text-left"
                >
                  Our Sacred Treatments
                </button>
                <button
                  onClick={() => onNavigate("about")}
                  className="block text-muted-foreground hover:text-amber-700 transition-colors leading-relaxed text-left"
                >
                  Meet Dr. Weston
                </button>
                <button
                  onClick={() => onNavigate("resources")}
                  className="block text-muted-foreground hover:text-amber-700 transition-colors leading-relaxed text-left"
                >
                  Wellness Resources
                </button>
                <button
                  onClick={() => onNavigate("clinic")}
                  className="block text-muted-foreground hover:text-amber-700 transition-colors leading-relaxed text-left"
                >
                  Visit Our Clinic
                </button>
              </div>
            </div>

            {/* --- Location --- */}
            <div className="space-y-6">
              <h3 className="text-lg text-primary flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                Visit Our Clinic
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-600 mt-1 shrink-0" />
                  <div>
                    <p className="text-muted-foreground leading-relaxed">
                      574 S State Street
                      <br />
                      Suite 232
                      <br />
                      Orem, UT 84058​
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-600" />
                  <p className="text-muted-foreground">(801) 623-0912</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-600" />
                  <p className="text-muted-foreground">weston@alignedwest.com</p>
                </div>
              </div>
            </div>

            {/* --- Hours & CTA --- */}
            <div className="space-y-6">
              <h3 className="text-lg text-primary flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                Hours
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monday</span>
                  <span className="text-muted-foreground">10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Tuesday</span>
                  <span className="text-muted-foreground">10:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Wednesday</span>
                  <span className="text-muted-foreground">1:00 PM - 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Thursday</span>
                  <span className="text-muted-foreground">11:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Friday</span>
                  <span className="text-muted-foreground">8:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Saturday - Sunday</span>
                  <span className="text-muted-foreground">Closed</span>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  onClick={() => openBooking()}
                  className="w-full bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-full py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Begin Your Journey
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-amber-200/30" />

        {/* --- Bottom Bar --- */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4 md:mb-0">
            <Heart className="w-4 h-4 text-amber-600" />
            <span>© 2024 AlignedWest Chiropractic.</span>
          </div>
          <div className="flex space-x-8">
            <button
              onClick={() => onNavigate("resources")}
              className="text-sm text-muted-foreground hover:text-amber-700 transition-colors"
            >
              Privacy & Sacred Trust
            </button>
            <button
              onClick={() => onNavigate("resources")}
              className="text-sm text-muted-foreground hover:text-amber-700 transition-colors"
            >
              Terms of Care
            </button>
            <button
              onClick={() => onNavigate("resources")}
              className="text-sm text-muted-foreground hover:text-amber-700 transition-colors"
            >
              HIPAA Promise
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}