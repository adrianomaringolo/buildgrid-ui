'use client'

import * as React from 'react'
import { GripVerticalIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface ResizablePanelGroupProps extends React.ComponentProps<'div'> {
  direction?: 'horizontal' | 'vertical'
}

function ResizablePanelGroup({
  className,
  direction = 'horizontal',
  children,
  ...props
}: ResizablePanelGroupProps) {
  return (
    <div
      data-slot="resizable-panel-group"
      data-direction={direction}
      className={cn(
        'flex h-full w-full overflow-hidden',
        direction === 'vertical' && 'flex-col',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface ResizablePanelProps extends React.ComponentProps<'div'> {
  defaultSize?: number
  minSize?: number
}

function ResizablePanel({
  className,
  defaultSize,
  minSize,
  style,
  ...props
}: ResizablePanelProps) {
  return (
    <div
      data-slot="resizable-panel"
      className={cn('relative overflow-auto', className)}
      style={{
        flex: defaultSize != null ? `0 0 ${defaultSize}%` : '1 1 0',
        minWidth: minSize != null ? `${minSize}%` : undefined,
        ...style,
      }}
      {...props}
    />
  )
}

interface ResizableHandleProps extends React.ComponentProps<'div'> {
  withHandle?: boolean
  direction?: 'horizontal' | 'vertical'
}

function ResizableHandle({
  className,
  withHandle = false,
  direction = 'horizontal',
  ...props
}: ResizableHandleProps) {
  const handleRef = React.useRef<HTMLDivElement>(null)

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)

    const group = e.currentTarget.closest('[data-slot="resizable-panel-group"]') as HTMLElement | null
    if (!group) return

    const groupDirection = group.getAttribute('data-direction') as 'horizontal' | 'vertical'
    const resolvedDirection = groupDirection ?? direction

    const allChildren = Array.from(group.children) as HTMLElement[]
    const handleEl = e.currentTarget
    const handleIdx = allChildren.indexOf(handleEl)

    // Find the panel immediately before and after the handle
    const beforePanel = allChildren
      .slice(0, handleIdx)
      .reverse()
      .find((el) => el.getAttribute('data-slot') === 'resizable-panel') as HTMLElement | undefined

    const afterPanel = allChildren
      .slice(handleIdx + 1)
      .find((el) => el.getAttribute('data-slot') === 'resizable-panel') as HTMLElement | undefined

    if (!beforePanel || !afterPanel) return

    const startX = e.clientX
    const startY = e.clientY
    const startBeforeSize =
      resolvedDirection === 'horizontal' ? beforePanel.offsetWidth : beforePanel.offsetHeight
    const startAfterSize =
      resolvedDirection === 'horizontal' ? afterPanel.offsetWidth : afterPanel.offsetHeight
    const total = startBeforeSize + startAfterSize

    const onMove = (moveEvent: PointerEvent) => {
      const delta =
        resolvedDirection === 'horizontal'
          ? moveEvent.clientX - startX
          : moveEvent.clientY - startY

      const newBefore = Math.max(50, Math.min(total - 50, startBeforeSize + delta))
      const newAfter = total - newBefore

      beforePanel.style.flex = `0 0 ${newBefore}px`
      afterPanel.style.flex = `0 0 ${newAfter}px`
    }

    const onUp = () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)
    }

    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
  }

  return (
    <div
      ref={handleRef}
      data-slot="resizable-handle"
      onPointerDown={onPointerDown}
      role="separator"
      aria-orientation={direction === 'horizontal' ? 'vertical' : 'horizontal'}
      tabIndex={0}
      className={cn(
        'relative flex shrink-0 items-center justify-center bg-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        'dark:bg-border',
        direction === 'horizontal'
          ? 'w-px cursor-col-resize after:absolute after:inset-y-0 after:left-1/2 after:w-4 after:-translate-x-1/2'
          : 'h-px w-full cursor-row-resize after:absolute after:inset-x-0 after:top-1/2 after:h-4 after:-translate-y-1/2',
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border dark:bg-border">
          <GripVerticalIcon className="size-2.5 text-muted-foreground" />
        </div>
      )}
    </div>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
export type { ResizableHandleProps, ResizablePanelGroupProps, ResizablePanelProps }
