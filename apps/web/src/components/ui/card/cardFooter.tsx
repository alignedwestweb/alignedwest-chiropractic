import { cn } from "@/lib/utils"
import type { CardProps } from "@/components/ui/card/types"

export function CardFooter({
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)} {...props as React.HTMLAttributes<HTMLDivElement>}>
      {children}
    </div>
  )
}