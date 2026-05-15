import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Kbd } from './kbd'

describe('Kbd', () => {
  describe('Rendering', () => {
    it('renders a kbd element', () => {
      render(<Kbd>⌘</Kbd>)
      const el = screen.getByText('⌘')
      expect(el.tagName).toBe('KBD')
    })

    it('renders text content', () => {
      render(<Kbd>Enter</Kbd>)
      expect(screen.getByText('Enter')).toBeInTheDocument()
    })

    it('renders with default styles', () => {
      render(<Kbd>K</Kbd>)
      const el = screen.getByText('K')
      expect(el).toHaveClass('inline-flex', 'items-center', 'justify-center', 'rounded', 'font-mono')
    })

    it('sets data-slot="kbd"', () => {
      render(<Kbd>K</Kbd>)
      const el = screen.getByText('K')
      expect(el).toHaveAttribute('data-slot', 'kbd')
    })
  })

  describe('Variants', () => {
    it('applies muted background', () => {
      render(<Kbd>Tab</Kbd>)
      const el = screen.getByText('Tab')
      expect(el).toHaveClass('bg-muted')
    })

    it('applies border styles', () => {
      render(<Kbd>Space</Kbd>)
      const el = screen.getByText('Space')
      expect(el).toHaveClass('border', 'border-border')
    })

    it('applies shadow', () => {
      render(<Kbd>⎋</Kbd>)
      const el = screen.getByText('⎋')
      expect(el).toHaveClass('shadow-sm')
    })

    it('applies correct text size and weight', () => {
      render(<Kbd>X</Kbd>)
      const el = screen.getByText('X')
      expect(el).toHaveClass('font-medium', 'text-muted-foreground')
    })

    it('applies dark mode classes', () => {
      render(<Kbd>D</Kbd>)
      const el = screen.getByText('D')
      expect(el).toHaveClass('dark:bg-muted/50', 'dark:border-border/70')
    })
  })

  describe('Accessibility', () => {
    it('supports aria-label', () => {
      render(<Kbd aria-label="Command key">⌘</Kbd>)
      const el = screen.getByLabelText('Command key')
      expect(el).toBeInTheDocument()
    })

    it('supports title attribute', () => {
      render(<Kbd title="Escape key">⎋</Kbd>)
      const el = screen.getByTitle('Escape key')
      expect(el).toBeInTheDocument()
    })

    it('supports role attribute', () => {
      render(<Kbd role="img" aria-label="Shift key">⇧</Kbd>)
      const el = screen.getByRole('img', { name: 'Shift key' })
      expect(el).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('forwards custom className', () => {
      render(<Kbd className="custom-kbd-class">K</Kbd>)
      const el = screen.getByText('K')
      expect(el).toHaveClass('custom-kbd-class')
    })

    it('custom className does not replace base classes', () => {
      render(<Kbd className="custom-kbd-class">K</Kbd>)
      const el = screen.getByText('K')
      expect(el).toHaveClass('inline-flex', 'rounded', 'custom-kbd-class')
    })

    it('forwards arbitrary HTML attributes', () => {
      render(<Kbd id="my-kbd" data-testid="kbd-el">A</Kbd>)
      const el = screen.getByTestId('kbd-el')
      expect(el).toHaveAttribute('id', 'my-kbd')
    })

    it('renders with children as ReactNode', () => {
      render(
        <Kbd>
          <span data-testid="inner">⌘</span>
        </Kbd>,
      )
      expect(screen.getByTestId('inner')).toBeInTheDocument()
    })

    it('renders an empty kbd element', () => {
      const { container } = render(<Kbd />)
      const el = container.querySelector('kbd')
      expect(el).toBeInTheDocument()
    })
  })
})
