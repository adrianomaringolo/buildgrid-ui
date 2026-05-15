'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

function Drawer({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'dark:bg-black/70',
        className,
      )}
      {...props}
    />
  )
}

type DrawerDirection = 'top' | 'bottom' | 'left' | 'right'

interface DrawerContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {
  direction?: DrawerDirection
}

function DrawerContent({
  className,
  children,
  direction = 'bottom',
  ...props
}: DrawerContentProps) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        data-slot="drawer-content"
        data-direction={direction}
        className={cn(
          'fixed z-50 flex flex-col bg-background shadow-lg',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
          'dark:bg-background dark:border-border',
          direction === 'bottom' && [
            'inset-x-0 bottom-0 rounded-t-2xl border-t',
            'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
            'max-h-[85vh]',
          ],
          direction === 'top' && [
            'inset-x-0 top-0 rounded-b-2xl border-b',
            'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
            'max-h-[85vh]',
          ],
          direction === 'left' && [
            'inset-y-0 left-0 h-full w-3/4 rounded-r-2xl border-r',
            'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
            'sm:max-w-sm',
          ],
          direction === 'right' && [
            'inset-y-0 right-0 h-full w-3/4 rounded-l-2xl border-l',
            'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
            'sm:max-w-sm',
          ],
          className,
        )}
        {...props}
      >
        {(direction === 'bottom' || direction === 'top') && (
          <div
            aria-hidden="true"
            className={cn(
              'mx-auto shrink-0 rounded-full bg-muted w-12 h-1.5',
              direction === 'bottom' ? 'mt-4' : 'mb-4 mt-2',
            )}
          />
        )}
        {children}
        <DialogPrimitive.Close className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:outline-none disabled:pointer-events-none dark:text-foreground">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn('flex flex-col gap-1.5 p-4 pb-2', className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('flex flex-col-reverse gap-2 p-4 pt-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="drawer-title"
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  )
}

function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="drawer-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
}
export type { DrawerContentProps, DrawerDirection }
