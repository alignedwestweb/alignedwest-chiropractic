'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { HeroContentProps } from '@/lib/blocks/hero'
import type { PageType } from '@/components/ui/navigation/types'

export function HeroContent({
  title,
  subheader,
  children,
  className,
  onNavigate,
  onBookNow
}: HeroContentProps) {
  return (
    <div className={cn("box-border z-10 content-stretch flex flex-col gap-8 items-center justify-center p-0 relative w-full h-screen", className)}>
      <h1 className="text-7xl sm:text-5xl lg:text-6xl font-primary font-normal font-semibold leading-tight tracking-tight whitespace-pre-line text-primary">
        {title}
      </h1>

      {subheader && (
        <p className="font-secondary text-2xl sm:text-xl lg:text-2xl text-white max-w-3xl whitespace-pre-line">
          {subheader}
        </p>
      )}

      <div className="flex items-start gap-4 mt-4">
        {children}
        {onNavigate && (
          <Button
            size="lg"
            onClick={onBookNow}
            className="bg-white/20 text-white hover:bg-white/30 text-lg font-secondary font-semibold px-12 py-6 rounded-lg backdrop-blur-sm shadow-lg"
          >
            Book Now
          </Button>
          
        )}
        {onNavigate && (
          <Button
            size="lg"
            onClick={() => onNavigate("about" as PageType)}
            className="bg-transparent text-white font-secondary hover:bg-white/30 outline-2 outline-white/30 outline-solid -outline-offset-2 text-lg font-semibold px-12 py-6 rounded-lg backdrop-blur-sm shadow-lg"
          >
            Learn More
          </Button>
          
        )}
      </div>
    </div>
  )
}