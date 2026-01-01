"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { AnimatedSection } from '../blocks/AnimatedSection'
import { TestimonialCard } from '@/lib/blocks/cards/TestimonialCard'
import { testimonials } from '@/lib/data/testimonials'

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length]
  ]

  return (
    <section id="testimonials" className="relative py-20 w-full bg-white z-20 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover why thousands of clients choose Serenity Spa for their wellness journey.
          </p>
          <div className="flex justify-center items-center gap-2 mt-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
            ))}
            <span className="ml-3 text-lg text-gray-700">4.9/5 from 500+ patients</span>
          </div>
        </AnimatedSection>

        <div className="flex justify-center gap-4 mb-8">
          <Button onClick={prevTestimonial} variant="outlined" size="lg" className="p-3">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button onClick={nextTestimonial} variant="outlined" size="lg" className="p-3">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${currentIndex}-${index}`}
              testimonial={testimonial}
              index={index}
              currentIndex={currentIndex}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="px-8">
            Start Your Journey Today
          </Button>
        </div>
      </div>
    </section>
  )
}