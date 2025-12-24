import {
  type LucideIcon as LucideIconType
} from 'lucide-react'
export interface ServiceCardProps {
  id: string
  icon: LucideIconType
  title: string
  description: string
  durations: number[]
  prices: Record<number, number>
  modality: 'massage' | 'energy' | string
  popularity: number
  image?: string
  onBook?: (id: string) => void
  onLearnMore?: (id: string) => void
  // features: string[]
  // color: string
  index?: number
}

export interface Testimonial {
  name: string
  treatment: string
  rating: number
  image: string
  review: string
}

export interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
  currentIndex?: number
}