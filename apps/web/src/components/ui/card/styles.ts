import { cva, type VariantProps } from "class-variance-authority"

export const cardStyles = cva(
  "flex rounded-2xl transition-shadow relative overflow-hidden",
  {
    variants: {
      size: {
        sm: "",
        md: "p-4 gap-4",
        lg: "p-6 gap-4",
      },
      color: {
        primary: "border-neutral-200",
        secondary: "border-secondary",
        contrast: "border-white",
        critical: "border-error",
        neutral: "border-neutral-300",
        promo: "border-primary",
      },
      variant: {
        filled: "",
        outlined: "bg-transparent border border-1 border-solid",
        ghost: "bg-transparent border-0 shadow-none",
      },
      orientation: {
        vertical: "flex-col",
        horizontal: "flex-row",
      },
      alignH: {
        left: "items-start text-left",
        center: "items-center text-center",
        right: "items-end text-right",
      },
      alignV: {
        top: "justify-start",
        center: "justify-center",
        bottom: "justify-end",
      },
    },
    defaultVariants: {
      size: "md",
      color: "primary",
      variant: "filled",
      orientation: "vertical",
      alignH: "left",
      alignV: "top",
    },
    compoundVariants: [
      { variant: "filled", color: "primary", class: "bg-neutral-50 hover:shadow-md" },
      { variant: "filled", color: "secondary", class: "bg-secondary hover:shadow-md" },
      { variant: "filled", color: "contrast", class: "bg-white hover:shadow-md" },
      { variant: "filled", color: "critical", class: "bg-error text-white hover:shadow-md" },
      { variant: "filled", color: "neutral", class: "bg-neutral-300 hover:shadow-md" },
      { variant: "filled", color: "promo", class: "bg-primary text-white hover:shadow-md" },

      { variant: "outlined", color: "primary", class: "border-neutral-300" },
      { variant: "outlined", color: "secondary", class: "border-secondary" },
      { variant: "outlined", color: "contrast", class: "border-white" },
      { variant: "outlined", color: "critical", class: "border-error" },
      { variant: "outlined", color: "neutral", class: "border-neutral-400" },
      { variant: "outlined", color: "promo", class: "border-primary" },

      { variant: "ghost", color: "primary", class: "border-none" },
      { variant: "ghost", color: "secondary", class: "border-none" },
      { variant: "ghost", color: "contrast", class: "border-none" },
      { variant: "ghost", color: "critical", class: "border-none" },
      { variant: "ghost", color: "neutral", class: "border-none" },
      { variant: "ghost", color: "promo", class: "border-none" },


    ],
  }
)

export type CardStyleVariants = VariantProps<typeof cardStyles>

export function getImageClasses(
  imagePosition: "inline" | "background",
  orientation: "vertical" | "horizontal" = "vertical"
) {
  if (imagePosition === "inline") {
    return orientation === "vertical" ? "w-full h-50" : "w-72 h-full"
  }
  if (imagePosition === "background") {
    return "absolute inset-0 w-full h-full object-cover z-0"
  }
  return ""
}

export function getContentAlignH(align: "center" | "left" | "right" = "left") {
  switch (align) {
    case "center": return "items-center text-center"
    case "right": return "items-end text-right"
    default: return "items-start text-left"
  }
}

export function getContentAlignV(align: "center" | "top" | "bottom" = "top") {
  switch (align) {
    case "center": return "justify-center"
    case "bottom": return "justify-end"
    default: return "justify-start"
  }
}