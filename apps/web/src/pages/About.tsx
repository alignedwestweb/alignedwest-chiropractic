import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Image } from "@/components/ui/image"
import { GraduationCap, Users, Clock, Heart, Sparkles, Leaf, Compass } from "lucide-react"
import headshot from "@/assets/headshot.webp"

const achievements = [
  { icon: Users, value: "3,000+", label: "Souls Nurtured" },
  { icon: Clock, value: "13+", label: "Years of Devotion" },
  { icon: Heart, value: "99%", label: "Love & Satisfaction" },
  { icon: Sparkles, value: "4", label: "Healing Modalities" }
]

const credentials = [
  "Doctor of Chiropractic (D.C.)",
  "Licensed Massage Therapist",
  "Certified Wellness Practitioner",
  "Mindful Movement Specialist",
  "NAET Therapy Certification",
  "Soul Alignment Healer"
]

export default function About() {
  const image = headshot

  return (
    <section id="about" className="mt-20 py-24 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Compass className="w-6 h-6 text-amber-700" />
            <span className="text-sm text-muted-foreground tracking-wider uppercase">
              Our Story
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl mb-6 tracking-tight">
                        <span className="block text-primary">Ancient Wisdom Meets
</span>
            <span className="block text-amber-700 italic">Modern Wellness</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Welcome to AlignedWest Chiropractic, where ancient healing traditions intersect with modern chiropractic techniques.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative h-full ">
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
                <Leaf className="w-6 h-6 text-amber-700" />
                <h3 className="text-2xl text-primary tracking-wide">
                  Meet Dr. Weston Sorenson
                </h3>
              </div>

               <p className="text-lg leading-relaxed text-muted-foreground">
                I'm Dr. Weston Sorenson, a chiropractic physician devoted to holistic health and the art of alignment. 
                I believe true wellness is found in harmony—between the physical, emotional, and spiritual—and I'm here to guide you on that path.
              </p>
              
              <div className="h-px bg-linear-to-r from-transparent via-amber-300 to-transparent"></div>
              </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Leaf className="w-6 h-6 text-amber-700" />
                <h4 className="text-xl text-primary">My Journey and Philosophy</h4>
              </div>
               <p className="text-base leading-relaxed text-muted-foreground">
                With over fifteen years as a licensed massage therapist, a decade of teaching massage therapy, 
                and certification as a Reiki Master, I bring a deep and diverse foundation in wellness to my chiropractic practice.
              </p>
              
              <p className="text-base leading-relaxed text-muted-foreground">
                My path began with a lifelong curiosity about the body's wisdom and its remarkable capacity for healing. 
                AlignedWest Chiropractic is the culmination of that journey—a space for integrative, patient-centered care 
                that combines chiropractic adjustments, energy healing, and advanced techniques including Sacral Occipital 
                Technique (SOT), Activator Methods, and Nambudripad's Allergy Elimination Technique (NAET).
              </p>

              <p className="text-base leading-relaxed text-muted-foreground">
                At the heart of AlignedWest lies the symbolism of the West—a place of balance, renewal, and transformation—reflecting 
                both my name and my commitment to personalized, compassionate care.
              </p>
            </div>

      
          </div>
        </div>
{/* Credentials Section */}
        <div className="mb-20">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <GraduationCap className="w-5 h-5 text-amber-700" />
            <h4 className="text-2xl text-primary text-center">Credentials & Expertise</h4>
          </div>
          <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
            {credentials.map((credential, index) => (
              <Badge key={index} variant="secondary" className="text-sm py-2 px-4 rounded-full bg-amber-50 text-amber-800 border-amber-200">
                {credential}
              </Badge>
            ))}
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="mb-20">
          <div className="relative p-8 md:p-12 rounded-3xl bg-linear-to-br from-amber-50 via-orange-50/50 to-rose-50/30 border border-amber-100 warm-shadow">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-linear-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
                  <Compass className="w-8 h-8 text-amber-700" />
                </div>
              </div>
              
              <h3 className="text-2xl text-primary mb-6 text-center">Why Choose AlignedWest Chiropractic</h3>
              
              <div className="space-y-4 text-center">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  AlignedWest is more than a chiropractic clinic—it's a space for transformation.
                </p>
                
                <p className="text-base leading-relaxed text-muted-foreground">
                  My holistic approach focuses on removing barriers that block your body's natural ability to heal, 
                  restoring alignment across your body, mind, and spirit.
                </p>
                
                <p className="text-base leading-relaxed text-muted-foreground">
                  Whether through chiropractic adjustments, Reiki, acupressure, or reflexology, I offer care designed 
                  around you—gentle, intuitive, and deeply effective.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-amber-200/50">
                <blockquote className="text-lg italic leading-relaxed text-center text-amber-900">
                  "Join me at AlignedWest Chiropractic and take your first step toward balance, vitality, and lasting wellness. 
                  Together, we'll align your health with your highest potential."
                </blockquote>
                <p className="text-sm text-amber-700 mt-4 font-medium text-center">— Dr. Weston Sorenson</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center border-0 warm-shadow bg-white/60 backdrop-blur-sm rounded-2xl">
              <CardContent className="pt-8 w-full pb-6">
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
            <Heart className="w-6 h-6 text-amber-700" />
            <div className="w-12 h-0.5 bg-linear-to-l from-amber-300 to-amber-500"></div>
            <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
          </div>
        </div>
      

      </div>
    </section>
  )
}



