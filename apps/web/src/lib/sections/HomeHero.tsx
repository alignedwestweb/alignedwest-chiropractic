import type { PageType } from "@/components/ui/navigation/types"
import { Hero, HeroContent } from "@/lib/blocks/hero"
import { WaveAnimation } from "@/components/ui/wave"
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
      overlays={["none"]}
      className="relative size-full"
      onNavigate={onNavigate}
    >
      <HeroContent
        title={`Experience Healing,\nReimagined`}
        subheader={`Personalized chiropractic care blending mind,\nbody, and soul for holistic wellness.`}
        onNavigate={onNavigate}
        onBookNow={onBookNow}
      />
      <div className="absolute size-full inset-0 z-0">
        <WaveAnimation />
      </div>
      <WaveSeparator />
    </Hero>
  )
}
