// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Kbd } from './kbd'

const meta: Meta<typeof Kbd> = {
  component: Kbd,
}

export default meta
type Story = StoryObj<typeof Kbd>

export const Single: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <p className="text-sm text-muted-foreground">Individual keys:</p>
      <div className="flex flex-wrap gap-2">
        <Kbd>⌘</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌃</Kbd>
        <Kbd>↩</Kbd>
        <Kbd>⎋</Kbd>
        <Kbd>⌫</Kbd>
        <Kbd>Tab</Kbd>
        <Kbd>Space</Kbd>
        <Kbd>↑</Kbd>
        <Kbd>↓</Kbd>
        <Kbd>←</Kbd>
        <Kbd>→</Kbd>
      </div>
    </div>
  ),
}

export const Combination: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <p className="text-sm text-muted-foreground">Key combinations:</p>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm w-48">Open command palette</span>
          <div className="flex items-center gap-1">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm w-48">Find and replace</span>
          <div className="flex items-center gap-1">
            <Kbd>Ctrl</Kbd>
            <span className="text-muted-foreground">+</span>
            <Kbd>Shift</Kbd>
            <span className="text-muted-foreground">+</span>
            <Kbd>P</Kbd>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm w-48">Save file</span>
          <div className="flex items-center gap-1">
            <Kbd>⌘</Kbd>
            <Kbd>S</Kbd>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm w-48">Select all</span>
          <div className="flex items-center gap-1">
            <Kbd>⌘</Kbd>
            <Kbd>A</Kbd>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm w-48">Undo</span>
          <div className="flex items-center gap-1">
            <Kbd>⌘</Kbd>
            <Kbd>Z</Kbd>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm w-48">Toggle sidebar</span>
          <div className="flex items-center gap-1">
            <Kbd>⌘</Kbd>
            <Kbd>B</Kbd>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Inline: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <p className="text-sm leading-relaxed">
        Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette. You can search for any
        command or file by name.
      </p>
      <p className="text-sm leading-relaxed">
        Use <Kbd>Tab</Kbd> to move between form fields, and press <Kbd>↩</Kbd> to submit. To
        cancel, press <Kbd>⎋</Kbd>.
      </p>
      <p className="text-sm leading-relaxed">
        Hold <Kbd>Shift</Kbd> and click to select a range of items, or hold <Kbd>⌘</Kbd> to
        select multiple individual items.
      </p>
      <p className="text-sm leading-relaxed">
        To open a new tab in your browser, press <Kbd>⌘</Kbd> <Kbd>T</Kbd>. To close the current
        tab, press <Kbd>⌘</Kbd> <Kbd>W</Kbd>.
      </p>
    </div>
  ),
}

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-8">
      <div>
        <h3 className="font-semibold mb-3 text-sm">Individual Keys</h3>
        <div className="flex flex-wrap gap-2">
          <Kbd>⌘</Kbd>
          <Kbd>⌥</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>⌃</Kbd>
          <Kbd>↩</Kbd>
          <Kbd>⎋</Kbd>
          <Kbd>⌫</Kbd>
          <Kbd>Tab</Kbd>
          <Kbd>Space</Kbd>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-sm">Key Combinations</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm w-40">Command palette</span>
            <div className="flex items-center gap-1">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm w-40">Open terminal</span>
            <div className="flex items-center gap-1">
              <Kbd>Ctrl</Kbd>
              <span className="text-muted-foreground">+</span>
              <Kbd>`</Kbd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm w-40">Format document</span>
            <div className="flex items-center gap-1">
              <Kbd>⇧</Kbd>
              <Kbd>⌥</Kbd>
              <Kbd>F</Kbd>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-sm">Inline Usage</h3>
        <p className="text-sm leading-relaxed">
          Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette, or use <Kbd>⎋</Kbd> to
          dismiss any open dialog.
        </p>
      </div>
    </div>
  ),
}
