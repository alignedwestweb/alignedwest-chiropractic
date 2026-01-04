import type { PageType } from "@/components/ui/navigation/types"

export interface FeatureProps {
  title?: string
  description?: string
  buttons?: { text: string; to: string }[]
  layout?: "text" | "cards" | "carousel"
  items?: any[] // for cards or carousel
  onNavigate: (page: PageType) => void
  onCardClick?: (item: any) => void
  onAddToCart?: (item: any) => void
}

export interface Product {
  id: string | number
  title: string
  description?: string
  price: number
  image: string
  slug?: string
  category?: string
  tags?: string[]
  inStock?: boolean
  rating?: number
  imageUrl?: string
  name?: string
  badge?: string
  seller?: {
    avatar?: string;
    name?: string;
  };
  categories?: string[];
}

export type ProductWithQuantity = Product & {
  quantity: number;
};