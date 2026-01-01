import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, X, ChevronDown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { services } from '@/lib/data/services'
import { Icon as AppIcon } from '@/components/ui/Icon'
import type { AvailableIcons } from '@/components/ui/Icon/mapping'

type DurationFilter = 'all' | '30' | '60' | '90'
type ModalityFilter = 'all' | 'massage' | 'energy'
type SortOption = 'popular' | 'price-low' | 'price-high' | 'duration-short' | 'duration-long'

type Service = {
  id: string
  title: string
  description: string
  image?: string
  durations: string
  prices: string
  modality?: string
  popularity?: boolean
  iconName?: AvailableIcons
    bookingUrl: string
  learnMoreUrl?: string
}

type ServicesProps = {
  onBook?: (id: string) => void
  onLearnMore?: (id: string) => void
}

const toMinutes = (durations: string): number[] => {
  // supports: "30", "30 min", "30, 60", "30 / 60 / 90", "30-60", etc.
  const nums = (durations ?? '').match(/\d+/g)?.map((n) => Number(n)) ?? []
  return nums.filter((n) => Number.isFinite(n) && n > 0)
}

const toPriceNumber = (prices: string): number => {
  // supports "$125", "125", "$125 / $150", etc -> picks the FIRST number as baseline
  const n = Number((prices ?? '').replace(/[^0-9.]/g, '').match(/[0-9.]+/)?.[0] ?? NaN)
  return Number.isFinite(n) ? n : Infinity
}

export default function Services({ onBook, onLearnMore }: ServicesProps) {
  const [durationFilter, setDurationFilter] = useState<DurationFilter>('all')
  const [modalityFilter, setModalityFilter] = useState<ModalityFilter>('all')
  const [sortBy, setSortBy] = useState<SortOption>('popular')

  const normalizedServices: Service[] = useMemo(() => {
    return (services as any[]).map((s) => ({
      id: s.id ?? s.title ?? crypto.randomUUID(),
      title: s.title ?? '',
      description: s.description ?? '',
      image: s.image ?? s.imageUrl ?? '',
      durations: String(s.durations ?? s.duration ?? ''),
      prices: String(s.prices ?? s.price ?? ''),
      modality: String(s.modality ?? ''),
      popularity: Boolean(s.popularity ?? s.popular ?? false),
      iconName: (s.iconName ?? 'sparkles') as AvailableIcons,
        bookingUrl: s.bookingUrl,
      learnMoreUrl: s.learnMoreUrl,
    }))
  }, [])

  const filteredAndSortedServices = useMemo(() => {
    const list = normalizedServices.filter((service) => {
      const mins = toMinutes(service.durations)

      const matchesDuration =
        durationFilter === 'all' || mins.includes(Number(durationFilter))

      const matchesModality =
        modalityFilter === 'all' || service.modality === modalityFilter

      return matchesDuration && matchesModality
    })

    return [...list].sort((a, b) => {
      const aMins = toMinutes(a.durations)
      const bMins = toMinutes(b.durations)

      const aMin = aMins.length ? Math.min(...aMins) : Infinity
      const bMin = bMins.length ? Math.min(...bMins) : Infinity

      const aMax = aMins.length ? Math.max(...aMins) : -Infinity
      const bMax = bMins.length ? Math.max(...bMins) : -Infinity

      const aPrice = toPriceNumber(a.prices)
      const bPrice = toPriceNumber(b.prices)

      switch (sortBy) {
        case 'popular':
          // true first
          return Number(b.popularity) - Number(a.popularity)
        case 'price-low':
          return aPrice - bPrice
        case 'price-high':
          return bPrice - aPrice
        case 'duration-short':
          return aMin - bMin
        case 'duration-long':
          return bMax - aMax
        default:
          return 0
      }
    })
  }, [normalizedServices, durationFilter, modalityFilter, sortBy])

  return (
    <section id="services" className="pt-50 pb-30 bg-linear-to-b from-background to-amber-50 w-full" style={{ zIndex: 20 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Sparkles className="w-6 h-6 text-amber-600" />
            <span className="text-sm text-muted-foreground tracking-wider uppercase">
              Healing Treatments
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl text-primary mb-6 tracking-tight">
            Your Journey to
            <span className="block text-amber-700 italic">Wellness</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Each treatment is thoughtfully crafted to honor your body's wisdom and support your unique healing journey.
            Experience the gentle power of natural restoration.
          </p>
        </div>
        <div className="mt-8 mb-12 max-w-xl mx-auto text-center bg-emerald-50/40 backdrop-blur-sm border border-emerald-200/60 rounded-2xl p-5 shadow-md">
          <p className="text-sm text-emerald-900 leading-relaxed">
            <strong className="font-medium">New Patient Visits:</strong><br />
            Your first session includes additional time for a deeper, intuitive assessment.
            <span className="block mt-1">
              Adjustments: <strong>+15 min</strong> · NAET Sessions: <strong>+30 min</strong>
            </span>
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 sticky top-0 bg-white/90 backdrop-blur z-10 py-4">
          <div className="flex items-center gap-2 overflow-visible pb-2 hide-scrollbar">
            {/* Duration */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-gray-300 transition-colors whitespace-nowrap text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Duration</span>
                  {durationFilter !== 'all' && (
                    <span className="ml-1 px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs">
                      {durationFilter} min
                    </span>
                  )}
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuRadioGroup
                  value={durationFilter}
                  onValueChange={(v) => setDurationFilter(v as DurationFilter)}
                >
                  <DropdownMenuRadioItem value="all">All Durations</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="30">30 minutes</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="60">60 minutes</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="90">90 minutes</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Modality */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-gray-300 transition-colors whitespace-nowrap text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Service Type</span>
                  {modalityFilter !== 'all' && (
                    <span className="ml-1 px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs capitalize">
                      {modalityFilter}
                    </span>
                  )}
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuRadioGroup
                  value={modalityFilter}
                  onValueChange={(v) => setModalityFilter(v as ModalityFilter)}
                >
                  <DropdownMenuRadioItem value="all">All Types</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="massage">Massage</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="energy">Energy</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-gray-300 transition-colors whitespace-nowrap text-sm">
                  <span>Sort</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuRadioGroup value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <DropdownMenuRadioItem value="popular">Most Loved</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-low">Price: Low to High</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-high">Price: High to Low</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="duration-short">Duration: Shortest First</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="duration-long">Duration: Longest First</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Clear */}
            {(durationFilter !== 'all' || modalityFilter !== 'all') && (
              <button
                onClick={() => {
                  setDurationFilter('all')
                  setModalityFilter('all')
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-gray-300 transition-colors whitespace-nowrap text-sm text-gray-600 hover:text-gray-900"
              >
                <X className="w-4 h-4" />
                <span>Clear</span>
              </button>
            )}

            <div className="ml-auto text-sm text-gray-600 whitespace-nowrap pl-4">
              {filteredAndSortedServices.length} {filteredAndSortedServices.length === 1 ? 'service' : 'services'}
            </div>
          </div>
        </div>

        <style>{`
          .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {filteredAndSortedServices.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white/80 rounded-[21px] overflow-hidden shadow-[0px_10px_25px_-5px_rgba(107,68,35,0.1),0px_10px_10px_-5px_rgba(107,68,35,0.04)] hover:shadow-[0px_15px_30px_-5px_rgba(107,68,35,0.15)] transition-all duration-300 group flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Image */}
              <div className="relative h-[252px] overflow-hidden">
                <img
                  src={service.image ?? ''}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

                {/* Most Loved */}
                {service.popularity && (
                  <div className="absolute top-4 left-4 text-secondary bg-white/70 backdrop-blur-lg rounded-full px-4 py-1.5 flex items-center justify-center gap-2">
                    <span className="text-[10.5px] font-semibold">Most Loved</span>
                  </div>
                )}

                {/* Heart */}
                <button
                  className="absolute top-[196px] right-4 w-[42px] h-[42px] bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Save"
                >
                  <AppIcon className="text-primary w-6 h-6" name={service.iconName ?? 'loading'} />
                </button>


              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-6">
                  <h3 className="text-[17.5px] tracking-[0.4375px] text-gray-900 mb-1.5">
                    {service.title}
                  </h3>
                  <p className="text-[14px] leading-[22.75px] text-gray-600">
                    {service.description}
                  </p>
                </div>
                <div className="flex flex-col mt-auto">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-stone-600" />
                      <span className="text-[12.25px] text-gray-600">{service.durations}</span>
                    </div>
                    <span className="text-[21px] leading-7 tracking-[-0.525px] text-primary">
                      {service.prices}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => onBook?.(service.id)}
                      className="flex-1 btn-gradient-primary text-white py-3 rounded-md shadow-[0px_8px_20px_-12px_rgba(0,0,0,0.25)] hover:shadow-[0px_10px_25px_-12px_rgba(0,0,0,0.3)] transition-all duration-300"
                    >
                      Book Now
                    </Button>

                    <Button
                      variant="outlined"
                      onClick={() => onLearnMore?.(service.id)}
                      className="flex-1 rounded-md"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="px-8" onClick={() => onBook?.('consultation')}>
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  )
}