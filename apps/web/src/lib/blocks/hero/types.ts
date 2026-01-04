import type { OverlayVariant, HeroVariant, HeroHeight, HeroAlignment, HeroLayout, heroVariants } from "@/lib/blocks/hero"
import type { VariantProps } from "class-variance-authority"
import type { PageType } from "@/components/ui/navigation/types"
import type { Breakpoint } from "@/lib/constants"

export interface HeroButton {
  text: string;
  onClick: () => void;
}

export interface HeroContentProps extends HeroContent {
  onBookNow?: () => void;
}

export interface BGProps {
  fixed?: boolean;
  images?: Record<Breakpoint, string>;
  fallback?: string;
  alt?: string;
  className?: string;
}

export interface OverlayProps {
  variants?: OverlayVariant | OverlayVariant[];
  className?: string;
}

export interface GalleryProps {
  images: string[];
  className?: string;
  size?: "sm" | "md" | "lg";
}

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

export interface HeroProps extends VariantProps<typeof heroVariants> {
  children?: React.ReactNode;
  className?: string;
  bg?: BGProps;
  backgroundImage?: string;
  backgroundOpacity?: number;
  overlays?: OverlayVariant[];
  size?: "sm" | "md" | "lg";
  variant?: HeroVariant;
  container?: boolean;
  fullHeight?: HeroHeight;
  alignment?: HeroAlignment;
  layout?: HeroLayout;
  content?: HeroContent;
  parallax?: boolean;
  onNavigate?: (page: PageType) => void;
}