import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer'

describe('Drawer', () => {
  describe('Rendering', () => {
    it('renders the trigger button', () => {
      render(
        <Drawer>
          <DrawerTrigger>Open Drawer</DrawerTrigger>
          <DrawerContent>Content</DrawerContent>
        </Drawer>,
      )
      expect(screen.getByText('Open Drawer')).toBeInTheDocument()
    })

    it('renders content when open is true', () => {
      render(
        <Drawer open>
          <DrawerContent>Drawer Content</DrawerContent>
        </Drawer>,
      )
      expect(screen.getByText('Drawer Content')).toBeInTheDocument()
    })

    it('does not render content when open is false', () => {
      render(
        <Drawer open={false}>
          <DrawerContent>Hidden Content</DrawerContent>
        </Drawer>,
      )
      expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument()
    })

    it('renders DrawerHeader with data-slot', () => {
      render(
        <Drawer open>
          <DrawerContent>
            <DrawerHeader>Header content</DrawerHeader>
          </DrawerContent>
        </Drawer>,
      )
      const header = document.querySelector('[data-slot="drawer-header"]')
      expect(header).toBeInTheDocument()
    })

    it('renders DrawerFooter with data-slot', () => {
      render(
        <Drawer open>
          <DrawerContent>
            <DrawerFooter>Footer content</DrawerFooter>
          </DrawerContent>
        </Drawer>,
      )
      const footer = document.querySelector('[data-slot="drawer-footer"]')
      expect(footer).toBeInTheDocument()
    })

    it('renders DrawerTitle with data-slot', () => {
      render(
        <Drawer open>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>My Title</DrawerTitle>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>,
      )
      const title = document.querySelector('[data-slot="drawer-title"]')
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('My Title')
    })

    it('renders DrawerDescription with data-slot', () => {
      render(
        <Drawer open>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Title</DrawerTitle>
              <DrawerDescription>My description</DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>,
      )
      const desc = document.querySelector('[data-slot="drawer-description"]')
      expect(desc).toBeInTheDocument()
      expect(desc).toHaveTextContent('My description')
    })

    it('renders the built-in close button', () => {
      render(
        <Drawer open>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Title</DrawerTitle>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>,
      )
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
    })
  })

  describe('Data Slots', () => {
    it('sets data-slot="drawer-content" on the content element', () => {
      render(
        <Drawer open>
          <DrawerContent>Content</DrawerContent>
        </Drawer>,
      )
      const content = document.querySelector('[data-slot="drawer-content"]')
      expect(content).toBeInTheDocument()
    })

    it('sets data-slot="drawer-overlay" on the overlay', () => {
      render(
        <Drawer open>
          <DrawerContent>Content</DrawerContent>
        </Drawer>,
      )
      const overlay = document.querySelector('[data-slot="drawer-overlay"]')
      expect(overlay).toBeInTheDocument()
    })

    it('sets data-slot="drawer-trigger" on the trigger', () => {
      render(
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>Content</DrawerContent>
        </Drawer>,
      )
      const trigger = document.querySelector('[data-slot="drawer-trigger"]')
      expect(trigger).toBeInTheDocument()
    })
  })

  describe('Direction Prop', () => {
    it('defaults to bottom direction', () => {
      render(
        <Drawer open>
          <DrawerContent>Content</DrawerContent>
        </Drawer>,
      )
      const content = document.querySelector('[data-slot="drawer-content"]')
      expect(content).toHaveAttribute('data-direction', 'bottom')
    })

    it('applies right direction', () => {
      render(
        <Drawer open>
          <DrawerContent direction="right">Content</DrawerContent>
        </Drawer>,
      )
      const content = document.querySelector('[data-slot="drawer-content"]')
      expect(content).toHaveAttribute('data-direction', 'right')
    })

    it('applies left direction', () => {
      render(
        <Drawer open>
          <DrawerContent direction="left">Content</DrawerContent>
        </Drawer>,
      )
      const content = document.querySelector('[data-slot="drawer-content"]')
      expect(content).toHaveAttribute('data-direction', 'left')
    })

    it('applies top direction', () => {
      render(
        <Drawer open>
          <DrawerContent direction="top">Content</DrawerContent>
        </Drawer>,
      )
      const content = document.querySelector('[data-slot="drawer-content"]')
      expect(content).toHaveAttribute('data-direction', 'top')
    })

    it('renders the drag handle indicator for bottom direction', () => {
      render(
        <Drawer open>
          <DrawerContent direction="bottom">Content</DrawerContent>
        </Drawer>,
      )
      const content = document.querySelector('[data-slot="drawer-content"]')
      // The handle is a plain div with rounded-full class
      const handle = content?.querySelector('div.rounded-full')
      expect(handle).toBeInTheDocument()
    })

    it('does not render the drag handle div for right direction', () => {
      render(
        <Drawer open>
          <DrawerContent direction="right">Content</DrawerContent>
        </Drawer>,
      )
      const content = document.querySelector('[data-slot="drawer-content"]')
      // The handle is a plain div (not a button, not an svg) with rounded-full class
      const handle = content?.querySelector('div.rounded-full')
      expect(handle).not.toBeInTheDocument()
    })
  })

  describe('DrawerClose', () => {
    it('renders DrawerClose with data-slot', () => {
      render(
        <Drawer open>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Title</DrawerTitle>
            </DrawerHeader>
            <DrawerClose data-slot="drawer-close">Close</DrawerClose>
          </DrawerContent>
        </Drawer>,
      )
      const closeBtn = document.querySelector('[data-slot="drawer-close"]')
      expect(closeBtn).toBeInTheDocument()
    })
  })

  describe('className Forwarding', () => {
    it('forwards className to DrawerHeader', () => {
      render(
        <Drawer open>
          <DrawerContent>
            <DrawerHeader className="custom-header-class">Header</DrawerHeader>
          </DrawerContent>
        </Drawer>,
      )
      const header = document.querySelector('[data-slot="drawer-header"]')
      expect(header).toHaveClass('custom-header-class')
    })

    it('forwards className to DrawerFooter', () => {
      render(
        <Drawer open>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Title</DrawerTitle>
            </DrawerHeader>
            <DrawerFooter className="custom-footer-class">Footer</DrawerFooter>
          </DrawerContent>
        </Drawer>,
      )
      const footer = document.querySelector('[data-slot="drawer-footer"]')
      expect(footer).toHaveClass('custom-footer-class')
    })

    it('forwards className to DrawerTitle', () => {
      render(
        <Drawer open>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="custom-title-class">Title</DrawerTitle>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>,
      )
      const title = document.querySelector('[data-slot="drawer-title"]')
      expect(title).toHaveClass('custom-title-class')
    })

    it('forwards className to DrawerContent', () => {
      render(
        <Drawer open>
          <DrawerContent className="custom-content-class">
            <DrawerHeader>
              <DrawerTitle>Title</DrawerTitle>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>,
      )
      const content = document.querySelector('[data-slot="drawer-content"]')
      expect(content).toHaveClass('custom-content-class')
    })
  })

  describe('Accessibility', () => {
    it('has correct dialog role', () => {
      render(
        <Drawer open>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Accessible Drawer</DrawerTitle>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>,
      )
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('associates content with title via aria-labelledby', () => {
      render(
        <Drawer open>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>My Drawer</DrawerTitle>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>,
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-labelledby')
    })
  })

  describe('Edge Cases', () => {
    it('renders with no children in content', () => {
      render(
        <Drawer open>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Empty Drawer</DrawerTitle>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>,
      )
      expect(document.querySelector('[data-slot="drawer-content"]')).toBeInTheDocument()
    })

    it('renders multiple drawers independently', () => {
      render(
        <div>
          <Drawer>
            <DrawerTrigger>Open First</DrawerTrigger>
            <DrawerContent>First Content</DrawerContent>
          </Drawer>
          <Drawer>
            <DrawerTrigger>Open Second</DrawerTrigger>
            <DrawerContent>Second Content</DrawerContent>
          </Drawer>
        </div>,
      )
      expect(screen.getByText('Open First')).toBeInTheDocument()
      expect(screen.getByText('Open Second')).toBeInTheDocument()
    })
  })
})
