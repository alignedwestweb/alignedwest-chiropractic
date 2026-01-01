import React from 'react'
import { cn } from '@/lib/utils'
import { IconMapping } from './mapping'
import type { IconProps } from './types'

export const Icon = ({ name, size = 'md', className }: IconProps): React.ReactElement => {
  return (
    <i aria-hidden='true' className={cn(iconCss(size), className)}>
      {IconMapping[name]}
    </i>
  )
}

const iconCss = (size: string) =>
  cn('[&>svg]:h-inherit [&>svg]:w-inherit', {
    'h-8 min-w-8 w-8': size === 'lg',
    'h-6 min-w-6 w-6': size === 'md',
    'h-4 min-w-4 w-4': size === 'sm',
  })