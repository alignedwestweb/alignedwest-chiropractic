import type {
  CardSize,
  CardColor,
  CardVariant,
  CardBadge,
  CardAmenityKey,
  CardOrientation,
  CardImagePosition,
  CardHorizAlign,
  CardVertAlign
} from "./constants"

export type CardAmenity = CardAmenityKey | { icon: CardAmenityKey; label: string }

export interface CardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  classname?: string
  children?: React.ReactNode
  size?: CardSize
  color?: CardColor
  variant?: CardVariant
  badge?: CardBadge
  price?: number
  amenities?: CardAmenity[]
  title?: string
  description?: string
  location?: string
  loading?: boolean
  link?: boolean
  image?: string | { url?: string; imagePosition?: CardImagePosition }
  tag?: string[]
  orientation?: CardOrientation
  imagePosition?: CardImagePosition
  alignH?: CardHorizAlign
  alignV?: CardVertAlign
}