import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Image } from "./ui/image"
import { GraduationCap, Users, Clock, Heart, Sparkles, Leaf } from "lucide-react"

const achievements = [
  { icon: Users, value: "1,000+", label: "Souls Nurtured" },
  { icon: Clock, value: "15+", label: "Years of Devotion" },
  { icon: Heart, value: "99%", label: "Love & Satisfaction" },
  { icon: Sparkles, value: "4", label: "Healing Modalities" }
]

const credentials = [
  "Doctor of Chiropractic (D.C.)",
  "Licensed Massage Therapist",
  "Certified Wellness Practitioner",
  "Mindful Movement Specialist",
  "NAET Therapy Certification",
  "Soul Alignment Guide"
]

export default function About({ image }: { image: string }) {
  return (
    <section id="about" className="relative w-full bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Heart className="w-6 h-6 text-accent" />
            <span className="font-secondary text-2xl text-default tracking-wide">
              Your Wellness Guide
            </span>
          </div>

          <h2 className="font-primary text-4xl lg:text-5xl text-primary mb-6 tracking-wide">
            Meet Dr. Weston
            <span className="block text-accent italic">Sorenson</span>
          </h2>

          <p className="font-secondary text-lg text-default max-w-xl mx-auto leading-relaxed">
            Guiding you toward balance and renewal through compassionate, integrative chiropractic care.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative h-full">
            <div className="size-full rounded-3xl overflow-hidden warm-shadow">
              <Image
                src={image}
                alt="Dr. Weston Sorenson"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-amber-200/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-rose-200/20 rounded-full blur-xl"></div>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Leaf className="w-6 h-6 text-accent" />
                <h3 className="font-secondary text-2xl text-primary tracking-wide">
                  A Sacred Partnership in Healing
                </h3>
              </div>
              <p className="font-secondary text-lg leading-relaxed text-default">
                For more than fifteen years, Dr. Weston Sorenson has supported thousands on their path to wellness—integrating ancient healing practices with modern chiropractic techniques to honor the body’s innate capacity to restore itself.
              </p>
              <p className="font-secondary text-lg leading-relaxed text-default">
                His approach goes beyond traditional care, addressing the whole person—body, mind, and spirit. Each session becomes a collaborative, intentional space where your system can realign, release, and return to its natural state of balance.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-6 h-6 text-accent" />
                <h4 className="font-secondary text-2xl text-primary">Credentials & Continuing Journey</h4>
              </div>
              <div className="flex flex-wrap gap-3">
                {credentials.map((credential, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-2 px-4 rounded-full bg-amber-50 text-amber-800 border-amber-200">
                    {credential}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="relative p-8 rounded-2xl bg-linear-to-br from-amber-50 to-orange-50 border border-amber-100">
              <blockquote className="text-lg italic leading-relaxed text-default">
                "True healing happens when we listen to the body’s innate wisdom and find balance in our physical, emotional, and spiritual well-being. My role is to be a guide—helping remove the barriers that hinder your body’s natural ability to heal so you can align with your highest potential."
              </blockquote>
              <p className="text-sm text-amber-700 mt-4 font-medium">— Dr. Weston Sorenson</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center items-center border-0 warm-shadow bg-white/60 backdrop-blur-sm rounded-2xl">
              <CardContent className="pt-8 pb-6 w-full">
                <div className="w-16 h-16 mx-auto bg-linear-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mb-6">
                  <achievement.icon className="w-8 h-8 text-amber-700" />
                </div>
                <div className="text-3xl text-primary mb-2 tracking-tight">
                  {achievement.value}
                </div>
                <p className="text-muted-foreground">{achievement.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Decorative divider */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
            <div className="w-12 h-0.5 bg-linear-to-r from-amber-300 to-amber-500"></div>
            <Heart className="w-6 h-6 text-amber-600" />
            <div className="w-12 h-0.5 bg-linear-to-l from-amber-300 to-amber-500"></div>
            <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}



