// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ButtonGroup } from './button-group'
import { Button } from '../button/button'
import {
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
}

export default meta
type Story = StoryObj<typeof ButtonGroup>

export const Horizontal: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <p className="text-sm text-muted-foreground">Horizontal button group (default):</p>
      <ButtonGroup>
        <Button variant="outline">Previous</Button>
        <Button variant="outline">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
        <Button variant="outline">Next</Button>
      </ButtonGroup>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <p className="text-sm text-muted-foreground">Vertical button group:</p>
      <ButtonGroup orientation="vertical">
        <Button variant="outline">Account settings</Button>
        <Button variant="outline">Notifications</Button>
        <Button variant="outline">Privacy & security</Button>
        <Button variant="outline">Billing & plans</Button>
      </ButtonGroup>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mb-3">Text alignment:</p>
        <ButtonGroup aria-label="Text alignment">
          <Button variant="outline" size="icon" aria-label="Align left">
            <AlignLeftIcon />
          </Button>
          <Button variant="outline" size="icon" aria-label="Align center">
            <AlignCenterIcon />
          </Button>
          <Button variant="outline" size="icon" aria-label="Align right">
            <AlignRightIcon />
          </Button>
          <Button variant="outline" size="icon" aria-label="Justify">
            <AlignJustifyIcon />
          </Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-3">Text formatting:</p>
        <ButtonGroup aria-label="Text formatting">
          <Button variant="outline" size="icon" aria-label="Bold">
            <BoldIcon />
          </Button>
          <Button variant="outline" size="icon" aria-label="Italic">
            <ItalicIcon />
          </Button>
          <Button variant="outline" size="icon" aria-label="Underline">
            <UnderlineIcon />
          </Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-3">Navigation:</p>
        <ButtonGroup aria-label="Slide navigation">
          <Button variant="outline">
            <ChevronLeftIcon />
            Prev
          </Button>
          <Button variant="outline">
            Next
            <ChevronRightIcon />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ),
}

export const MixedVariants: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mb-3">Action group with mixed intent:</p>
        <ButtonGroup>
          <Button variant="default">Save draft</Button>
          <Button variant="outline">Preview</Button>
          <Button variant="destructive">Discard</Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-3">Segment control (secondary):</p>
        <ButtonGroup>
          <Button variant="secondary">Day</Button>
          <Button variant="secondary">Week</Button>
          <Button variant="secondary">Month</Button>
          <Button variant="secondary">Year</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
}

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-8">
      <div>
        <h3 className="font-semibold mb-3 text-sm">Horizontal (default)</h3>
        <ButtonGroup>
          <Button variant="outline">Previous</Button>
          <Button variant="outline">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Next</Button>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-sm">Vertical</h3>
        <ButtonGroup orientation="vertical">
          <Button variant="outline">Account settings</Button>
          <Button variant="outline">Notifications</Button>
          <Button variant="outline">Billing & plans</Button>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-sm">Icon group</h3>
        <ButtonGroup aria-label="Text alignment">
          <Button variant="outline" size="icon" aria-label="Align left">
            <AlignLeftIcon />
          </Button>
          <Button variant="outline" size="icon" aria-label="Align center">
            <AlignCenterIcon />
          </Button>
          <Button variant="outline" size="icon" aria-label="Align right">
            <AlignRightIcon />
          </Button>
          <Button variant="outline" size="icon" aria-label="Justify">
            <AlignJustifyIcon />
          </Button>
        </ButtonGroup>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-sm">Mixed variants</h3>
        <ButtonGroup>
          <Button variant="default">Save draft</Button>
          <Button variant="outline">Preview</Button>
          <Button variant="destructive">Discard</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
}
