import * as React from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./styles"
import type { ButtonProps } from './types'
import { Icon } from "@/components/ui/Icon/Icon"

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = "md",
      color = "primary",
      variant = "filled",
      as: Comp = "button",
      loading = false,
      linkStyle = false,
      icon = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ size, color, variant, linkStyle, icon }),
          loading && "cursor-wait opacity-70",
          className
        )}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Icon name="loading" size={icon ? size : "sm"} className="animate-spin" />
            {!icon && <span>Loading…</span>}
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">{children}</span>
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button }