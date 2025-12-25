import { cn } from "@/lib/utils"
import type { CardProps } from "@/components/ui/card/types"
import type { HTMLAttributes } from "react"

export function CardContent({
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div className={cn("p-6 pt-0", className)} {...(props as HTMLAttributes<HTMLDivElement>)}>
      {children}
    </div>
  )
}
