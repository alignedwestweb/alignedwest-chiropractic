import type { BadgeSize, BadgeVariant, BadgeShape, BadgeColor } from './constants'

export interface BadgeProps {
    className?: string
    children?: React.ReactNode
    variant?: BadgeVariant
    color?: BadgeColor
    shape?: BadgeShape
    size?: BadgeSize
}
