import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  Calendar,
  Info,
  Car,
  Train,
  AlertCircle
} from 'lucide-react'

const businessHours = [
  { day: 'Monday', open: '10:00', close: '19:00' },
  { day: 'Tuesday', open: '10:00', close: '17:00' },
  { day: 'Wednesday', open: '13:00', close: '19:00' },
  { day: 'Thursday', open: '11:00', close: '18:00' },
  { day: 'Friday', open: '8:00', close: '16:00' },
  { day: 'Saturday', open: null, close: null },
  { day: 'Sunday', open: null, close: null }
]

const parkingDirections = [
  "Free parking available",
  "Park on the northeast side of Troon Park Building",
  "Accessible parking spaces available near both entrances"
]

const publicTransit = [
  "SB Frontrunner (Ogden) → Lehi Station (Bay A) (1 min walk)",
  "SB Bus 850 (Provo Central Station) → State St / 600 S (1 min walk)",
  "NB FrontRunner (SLC) → Lehi Station (Bay B) (1 min walk)",
  "NB Bus 850 (Lehi Station) → State St / 800 S (Northbound) (7 min walk)",
  "Use entrance on the north east side of the building facing Scera Park"
]

const clinicAddress = "AlignedWest Chiropractic, 574 S State St Suite #232, Orem, UT 84058"

function getDirectionsUrl(address: string) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const encodedAddress = encodeURIComponent(address)
  return isIOS
    ? `https://maps.apple.com/?daddr=${encodedAddress}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
}

function isTimeWithinRange(open: string | null, close: string | null) {
  if (!open || !close) return false

  const now = new Date()
  const current = now.getHours() * 60 + now.getMinutes()

  const [oH, oM] = open.split(":").map(Number)
  const [cH, cM] = close.split(":").map(Number)

  const openMin = oH * 60 + oM
  const closeMin = cH * 60 + cM

  return current >= openMin && current <= closeMin
}

function formatTime(t: string | null) {
  if (!t) return "Closed"

  const [h, m] = t.split(":").map(Number)

  const suffix = h >= 12 ? "PM" : "AM"
  const hour = h % 12 === 0 ? 12 : h % 12
  const minutes = m.toString().padStart(2, "0")

  return `${hour}:${minutes} ${suffix}`
}

function formatHours(open: string | null, close: string | null) {
  if (!open || !close) return "Closed"
  return `${formatTime(open)} – ${formatTime(close)}`
}


export default function ClinicInfo() {
  const todayIdx = new Date().getDay() // 0=Sun
  const mappedIdx = todayIdx === 0 ? 6 : todayIdx - 1

  const todayHours = businessHours[mappedIdx]
  const isOpenNow = isTimeWithinRange(todayHours?.open, todayHours?.close)

  return (
    <section id="clinic-info" className="relative pt-50 pb-24 bg-white" style={{ zIndex: 10 }}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-8 w-8 text-primary" />
            <Badge variant="outline" className="text-sm px-4 py-1">
              Visit Us
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6">
            Clinic Information
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            You’ll find us on State Street, right across from Scera Park, with convenient parking and easy access to public transportation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden flex-col gap-0 border-0 shadow-lg h-full">
              <CardHeader className="bg-linear-to-r from-blue-50 to-sage-50">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                {/* Interactive Map */}
                <div className="relative p-0 h-3/4 bg-gray-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2909.4228735033676!2d-111.6910600463255!3d40.28675976410365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874d9aeac13286df%3A0x66dcd593e4f83e60!2s574%20S%20State%20St%20Suite%20%23232%2C%20Orem%2C%20UT%2084058!5e0!3m2!1sen!2sus!4v1767386304197!5m2!1sen!2sus"
                    className="w-full h-full border-0"
                    title="Clinic Location Map"
                    loading="lazy"
                  />
                  <Button
                    className="absolute bottom-4 right-4 shadow-lg bg-white text-gray-800 hover:bg-gray-100"
                    size="sm"
                    onClick={() => window.open(getDirectionsUrl(clinicAddress), "_blank")}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </div>

                {/* Address Details */}
                <div className="p-6 bg-gray-50 border-t">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Address</p>
                      <p className="text-lg">574 S State St, Suite 232</p>
                      <p className="text-gray-600">Orem, UT 84058</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Phone</p>
                        <a href="tel:+18016230912" className="text-primary hover:underline">
                          (801) 623-0912
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Email</p>
                        <a href="mailto:weston@alignedwest.com" className="text-primary hover:underline">
                          weston@alignedwest.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hours Section */}
          <div className="space-y-6">
            <Card className="border-0 flex-col gap-0 shadow-lg">
              <CardHeader className="bg-linear-to-r from-blue-50 to-sage-50">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Hours of Operation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {/* Current Status */}
                <div
                  className={`
                    mb-6 p-4 rounded-lg border
                    ${isOpenNow ? "bg-sage-50 border-sage-200" : "bg-rose-50 border-rose-200"}
                  `}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`
                        h-2 w-2 rounded-full animate-pulse
                        ${isOpenNow ? "bg-sage-500" : "bg-rose-500"}
                      `}
                    />
                    <span className={isOpenNow ? "text-sage-800" : "text-rose-800"}>
                      {isOpenNow ? "Open Now" : "Closed Now"}
                    </span>
                  </div>
                  <p className={isOpenNow ? "text-sm text-sage-700" : "text-sm text-rose-700"}>
                    Today: {formatHours(todayHours.open, todayHours.close)}
                  </p>
                </div>

                {/* Weekly Hours */}
                <div className="space-y-3">
                  {businessHours.map((item, idx) => {
                    const isToday = idx === mappedIdx
                    const textColor = item.open ? "text-stone-700" : "text-stone-400"

                    return (
                      <div
                        key={idx}
                        className={`
                          flex justify-between items-center pb-3 border-b last:border-0
                          ${isToday ? "font-semibold text-primary" : "text-stone-600"}
                        `}
                      >
                        <span>{item.day}</span>
                        <span className={textColor}>
                          {formatHours(item.open, item.close)}
                        </span>
                      </div>
                    )
                  })}
                </div>

                <Button className="w-full mt-6" variant="outlined">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </CardContent>
            </Card>

            {/* Important Info */}
            <Card className="border-0 flex-col gap-0 shadow-lg bg-ocean-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <AlertCircle className="h-5 w-5" />
                  Important Info
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-ocean-800 space-y-2">
                <p>• 15 min are added to new patient appointments</p>
                <p>• Hydrate before and after to aid recovery</p>
                <p>• Wear comfortable clothing</p>
                <p>• Share any relevant health concerns beforehand</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Directions Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Parking */}
          <Card className="border-0 flex-col gap-0 shadow-lg">
            <CardHeader className="bg-linear-to-r from-purple-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                Parking Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {parkingDirections.map((direction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Info className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-gray-700">{direction}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Public Transit */}
          <Card className="border-0 shadow-lg gap-0 flex-col">
            <CardHeader className="bg-linear-to-r from-sage-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Train className="h-5 w-5 text-primary" />
                Public Transportation
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {publicTransit.map((transit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Info className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-gray-700">{transit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
