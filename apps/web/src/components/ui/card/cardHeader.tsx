import { cn } from "@/lib/utils"
import type { CardProps } from "@/components/ui/card/types"

export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div className={cn("flex flex-col typography space-y-1.5 p-6", className)} {...props as React.HTMLAttributes<HTMLDivElement>}>
      {children}
    </div>
  )
}
