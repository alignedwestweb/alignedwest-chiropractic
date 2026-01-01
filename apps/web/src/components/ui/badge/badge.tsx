import { cn } from "@/lib/utils"
import { badgeVariants } from "./styles"
import type { BadgeProps } from "./types"

export function Badge({
  className,
  children,
  variant = "filled",
    size = "md",
        color = "default",
    shape = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ color, size, shape, variant}),
      className
    )}
    {...props}
    >
      {children}
    </span>
  )
}
