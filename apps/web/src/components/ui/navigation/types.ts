import React from "react"
import type { AvailableIcons } from '@/components/ui/Icon'

export type PageType =
  | 'home'
  | 'about'
  | 'services'
  | 'resources'
  | 'contact'
  | 'blog'
  | 'clinic'
  | 'book'
  | 'booking'
  | 'signin'
  | 'privacy'
  | 'terms'
  | 'policies';

export interface NavigationProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  heroHeight?: number;
  onBookNow?: () => void;
}

export interface Socials {
  platform: string;
  href: string;
  icon: AvailableIcons;
}

export interface FooterProps {
  socials?: Socials[];
  links?: { text: string; page: PageType }[];
  logo: React.ReactNode;
  name?: string;
  email?: string;
  phone?: string;
  licensing?: string;
  copyright?: number | string;
  privacy?: string;
  terms?: string;
  policy?: string;
}
