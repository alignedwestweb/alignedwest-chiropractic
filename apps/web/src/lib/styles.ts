import { cva } from "class-variance-authority"
import type { OverlayVariant, HeroVariant, HeroAlignment, HeroLayout } from "@/lib/constants"

// Background image styles
export const bgStyles = {
  lg: "fixed z-0 inset-0 size-full object-cover object-top-right hidden lg:block",
  md: "fixed z-0 inset-0 size-full object-cover bg-center hidden md:block lg:hidden",
  sm: "fixed z-0 inset-0 size-full object-cover bg-center block md:hidden",
}

// Overlay styles
export const OVERLAY_STYLES: Record<OverlayVariant, string> = {
  gradient: "fixed inset-0 w-full h-screen bg-gradient-to-br from-[#5e4684]/80 via-[#7a5ba8]/70 to-[#45a9a7]/60 pointer-events-none z-0",
  dark: "fixed inset-0 w-full h-screen bg-black/20 pointer-events-none z-0",
  light: "fixed inset-0 w-full h-screen bg-white/40 pointer-events-none z-0",
  pattern: "fixed inset-0 w-full h-screen bg-[url('/patterns/dots.svg')] opacity-30 pointer-events-none z-0",
  home: "fixed inset-0 w-full h-screen bg-secondary-dark pointer-events-none z-0",
  none: "",
}

export const GALLERY_GRID_CLASSES: Record<"sm"|"md"|"lg", string> = {
  sm: "grid grid-cols-2 gap-2",
  md: "grid grid-cols-3 gap-3",
  lg: "grid grid-cols-4 gap-4",
}

// Layout alignment maps
export const HERO_ALIGNMENT_STYLES: Record<HeroAlignment, string> = {
  center: "items-center justify-center text-center",
  left: "items-start justify-start text-left",
  right: "items-end justify-end text-right",
}

export const HERO_LAYOUT_STYLES: Record<HeroLayout, string> = {
  default: "flex-col",
  columns: "grid grid-cols-2 gap-8",
}

// Content
export const HERO_CONTENT_STYLES = {
  container: "relative z-10 flex flex-col gap-4 p-8",
  title: "flex relative w-full max-w-285 shrink-0 justify-center animate-fade-in font-primary text-center not-italic text-6xl md:text-5xl sm:text-4xl text-white",
  subheader: "flex relative w-full max-w-150 mb-8 text-center font-secondary text-white/90 text-xl leading-relaxed animate-fade-in",
  buttons: "flex gap-3 z-10",
  button: "bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white font-semibold text-lg px-6 py-3 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl",
  galleryWrapper: "mt-6",
  galleryImage: "w-full h-auto object-cover rounded-lg shadow",
}

export const HERO_VARIANT_CLASSES = {
  default: "bg-gradient-to-br from-blue-50 to-indigo-100",
  dark: "bg-gradient-to-br from-gray-900 to-gray-800 text-white",
  image: "text-white",
  minimal: "bg-white",
  fullscreen: "relative w-full h-screen overflow-hidden flex items-center justify-center",
  section: "relative w-full overflow-hidden flex items-center justify-center",
} as const satisfies Record<HeroVariant, string>

// Background wrapper styles for Hero parallax
export const HERO_BG_WRAPPER_STYLES = {
  parallax: "absolute inset-0 z-0",            // scrolls with content
  fixed: "fixed overflow-hidden w-full h-screen", // full-screen static
}

// Hero variants (canonical definition)
export const heroVariants = cva(
  "flex relative shrink-0 w-full h-screen",
  {
    variants: {
      size: {
        sm: "min-h-[50vh] py-16",
        md: "min-h-[70vh] py-20",
        lg: "min-h-screen py-24",
      },
      variant: HERO_VARIANT_CLASSES,
      container: {
        true: "px-4 sm:px-6 lg:px-8",
        false: "",
      },
    },
    defaultVariants: {
      size: "lg",
      variant: "default",
      container: true,
    },
  }
)