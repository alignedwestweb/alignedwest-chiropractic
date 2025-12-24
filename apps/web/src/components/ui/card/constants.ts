export type CardSize = "sm" | "md" | "lg"
export type CardColor = "primary" | "secondary" | "contrast" | "critical" | "neutral" | "promo"
export type CardVariant = "filled" | "outlined" | "ghost"
export type CardAmenityKey = "bed" | "bath" | "sqft"
export type CardAmenity = CardAmenityKey | { icon: CardAmenityKey; label: string }
export type CardAmenities = CardAmenity[]
export type CardBadge = "apartment" | "townhome" | "condo" | "house"
export type CardOrientation = "vertical" | "horizontal"
export type CardImagePosition = "inline" | "background"
export type CardHorizAlign = "center" | "left" | "right"
export type CardVertAlign = "center" | "top" | "bottom"

export const amenityIcons = {
  bed: { icon: "bed", label: "Bed" },
  bath: { icon: "bath", label: "Bath" },
  sqft: { icon: "sqft", label: "Square Feet" }
} as const