import {
  Hero,
} from "@/lib/blocks/Hero"
import { HeroContent } from "@/lib/blocks/HeroContent"
import bgImage from "@/assets/bg-home-hero.webp"
import HeroBG from "@/components/ui/wave/wave"
import type { PageType } from "@/components/ui/navigation/types"
import { WaveSeparator } from "@/components/ui/separator/waveSeparator"

interface HomeHeroProps {
  onNavigate: (page: PageType) => void;
    onBookNow?: () => void;

}

export default function HomeHero({ onNavigate, onBookNow }: HomeHeroProps) {
  return (
          <Hero
          variant="fullscreen"
            size="lg"
            bg={{ images: { sm: bgImage, md: bgImage, lg: bgImage }, alt: "Chiropractic care background", fixed: true }}
            overlays={["none"]}
            className="relative size-full w-full h-full"
            onNavigate={onNavigate}
          >
            <HeroContent
              title={`Experience Healing,\nReimagined`}
              subheader={`Personalized chiropractic care blending mind,\nbody, and soul for holistic wellness.`}
              onNavigate={onNavigate}
                      onBookNow={onBookNow}
            />
             <div className="absolute inset-0 z-0">
                    <HeroBG />
                  </div>
                  <WaveSeparator />
                  
          </Hero>
        
   
  )
}
