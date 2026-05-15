'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

type ButtonGroupProps = React.ComponentProps<'div'> & {
  orientation?: 'horizontal' | 'vertical'
}

function ButtonGroup({ className, orientation = 'horizontal', ...props }: ButtonGroupProps) {
  return (
    <div
      data-slot="button-group"
      role="group"
      className={cn(
        'inline-flex',
        orientation === 'horizontal'
          ? '[&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none'
          : 'flex-col [&>*:not(:first-child)]:-mt-px [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none',
        className,
      )}
      {...props}
    />
  )
}

export { ButtonGroup, type ButtonGroupProps }
