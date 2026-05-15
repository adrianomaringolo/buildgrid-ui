// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { AspectRatio } from './aspect-ratio'

const meta: Meta<typeof AspectRatio> = {
  component: AspectRatio,
}

export default meta
type Story = StoryObj<typeof AspectRatio>

const Placeholder = ({
  label,
  className = '',
}: {
  label: string
  className?: string
}) => (
  <div
    className={`w-full h-full flex items-center justify-center rounded-lg bg-muted text-muted-foreground font-medium text-sm ${className}`}
  >
    {label}
  </div>
)

export const Square: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <p className="text-sm text-muted-foreground">Square — 1:1</p>
      <div className="w-48">
        <AspectRatio ratio={1 / 1}>
          <Placeholder label="1 : 1" />
        </AspectRatio>
      </div>
    </div>
  ),
}

export const Video: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <p className="text-sm text-muted-foreground">Video — 16:9</p>
      <AspectRatio ratio={16 / 9}>
        <Placeholder label="16 : 9  (Standard Video)" />
      </AspectRatio>
    </div>
  ),
}

export const Portrait: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <p className="text-sm text-muted-foreground">Portrait — 3:4</p>
      <div className="w-48">
        <AspectRatio ratio={3 / 4}>
          <Placeholder label="3 : 4  (Portrait)" />
        </AspectRatio>
      </div>
    </div>
  ),
}

export const Widescreen: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <p className="text-sm text-muted-foreground">Widescreen — 21:9</p>
      <AspectRatio ratio={21 / 9}>
        <Placeholder label="21 : 9  (Cinematic Widescreen)" />
      </AspectRatio>
    </div>
  ),
}

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-8">
      <div>
        <p className="text-sm font-medium mb-2">Square (1:1)</p>
        <div className="w-40">
          <AspectRatio ratio={1 / 1}>
            <Placeholder label="1 : 1" className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300" />
          </AspectRatio>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Video (16:9)</p>
        <AspectRatio ratio={16 / 9}>
          <Placeholder label="16 : 9" className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300" />
        </AspectRatio>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Portrait (3:4)</p>
        <div className="w-40">
          <AspectRatio ratio={3 / 4}>
            <Placeholder label="3 : 4" className="bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300" />
          </AspectRatio>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Widescreen (21:9)</p>
        <AspectRatio ratio={21 / 9}>
          <Placeholder label="21 : 9" className="bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300" />
        </AspectRatio>
      </div>
    </div>
  ),
}
