import * as React from 'react'
import { cn } from '@/lib/utils'

type KbdProps = React.ComponentProps<'kbd'>

function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'inline-flex items-center justify-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.7rem] font-medium text-muted-foreground shadow-sm dark:bg-muted/50 dark:text-muted-foreground dark:border-border/70',
        className,
      )}
      {...props}
    />
  )
}

export { Kbd, type KbdProps }
