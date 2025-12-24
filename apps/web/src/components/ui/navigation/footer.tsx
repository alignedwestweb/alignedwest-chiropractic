import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator/separator"
import type { PageType } from "@/components/ui/navigation/types"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Leaf,
  Heart,
} from "lucide-react"

export function Footer({ onNavigate }: { onNavigate: (page: PageType) => void }) {
  return (
    <footer className="relative shrink-0 w-full bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* --- Brand Column --- */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-linear-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-xl text-primary tracking-wide">AlignedWest</h3>
                  <p className="text-xs text-muted-foreground tracking-wider uppercase">
                    Chiropractic
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Where ancient healing traditions intersect with modern chiropractic
                techniques. A space for balance, renewal, and transformation.
              </p>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-amber-200 hover:border-amber-400 hover:bg-amber-50"
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-amber-200 hover:border-amber-400 hover:bg-amber-50"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
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
                Visit Our Sanctuary
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
                Sacred Hours
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="text-muted-foreground">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="text-muted-foreground">9:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="text-muted-foreground">Rest & Renewal</span>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  onClick={() => onNavigate("book")}
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
            <span>© 2024 AlignedWest Chiropractic. Crafted with love.</span>
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