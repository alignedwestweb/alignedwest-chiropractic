import type { OverlayVariant, Breakpoint, HeroVariant, HeroHeight, HeroAlignment, HeroLayout } from "@/lib/constants"
import type { VariantProps } from "class-variance-authority"
import { heroVariants } from "@/lib/styles"
import type { PageType } from "@/components/ui/navigation/types"

// Background
export interface BGProps {
  fixed?: boolean;
  images?: Record<Breakpoint, string>;
  fallback?: string;
  alt?: string;
  className?: string;
}

// Overlay
export interface OverlayProps {
  variants?: OverlayVariant | OverlayVariant[];
  className?: string;
}

// Buttons
export interface HeroButton {
  text: string;
  onClick: () => void;
}

// Gallery
export interface GalleryProps {
  images: string[];
  className?: string;
  size?: "sm" | "md" | "lg";
}

// Content
export interface HeroContent extends VariantProps<typeof heroVariants> {
  title: string;
  subheader?: string;
  badge?: string;
  buttons?: HeroButton[];
  gallery?: GalleryProps;
  children?: React.ReactNode;
  className?: string;
  onNavigate?: (page: PageType) => void;
}

// Hero Props
export interface HeroProps extends VariantProps<typeof heroVariants> {
  children?: React.ReactNode;
  className?: string;

  // Backgrounds
  bg?: BGProps;
  backgroundImage?: string;   // legacy support
  backgroundOpacity?: number;

  // Overlays
  overlays?: OverlayVariant[];

  // Layout
  size?: "sm" | "md" | "lg";
  variant?: HeroVariant;
  container?: boolean;
  fullHeight?: HeroHeight;
  alignment?: HeroAlignment;
  layout?: HeroLayout;

  // Content
  content?: HeroContent;

  // Behavior
  parallax?: boolean;
  onNavigate?: (page: PageType) => void;
}

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