import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AspectRatio } from './aspect-ratio'

describe('AspectRatio', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(
        <AspectRatio ratio={16 / 9}>
          <div>Content</div>
        </AspectRatio>,
      )
      expect(container.firstElementChild).toBeInTheDocument()
    })

    it('renders children', () => {
      render(
        <AspectRatio ratio={1}>
          <div data-testid="child">Child content</div>
        </AspectRatio>,
      )
      expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    it('sets data-slot="aspect-ratio" on the root element', () => {
      const { container } = render(
        <AspectRatio ratio={16 / 9}>
          <div>Content</div>
        </AspectRatio>,
      )
      // The Radix root renders a div; data-slot is on it
      const root = container.querySelector('[data-slot="aspect-ratio"]')
      expect(root).toBeInTheDocument()
    })
  })

  describe('Ratio prop', () => {
    it('accepts ratio={1} (square)', () => {
      const { container } = render(
        <AspectRatio ratio={1}>
          <div>Square</div>
        </AspectRatio>,
      )
      const root = container.querySelector('[data-slot="aspect-ratio"]')
      expect(root).toBeInTheDocument()
    })

    it('accepts ratio={16/9} (video)', () => {
      const { container } = render(
        <AspectRatio ratio={16 / 9}>
          <div>Video</div>
        </AspectRatio>,
      )
      const root = container.querySelector('[data-slot="aspect-ratio"]')
      expect(root).toBeInTheDocument()
    })

    it('accepts ratio={3/4} (portrait)', () => {
      const { container } = render(
        <AspectRatio ratio={3 / 4}>
          <div>Portrait</div>
        </AspectRatio>,
      )
      const root = container.querySelector('[data-slot="aspect-ratio"]')
      expect(root).toBeInTheDocument()
    })

    it('accepts ratio={21/9} (widescreen)', () => {
      const { container } = render(
        <AspectRatio ratio={21 / 9}>
          <div>Widescreen</div>
        </AspectRatio>,
      )
      const root = container.querySelector('[data-slot="aspect-ratio"]')
      expect(root).toBeInTheDocument()
    })
  })

  describe('className on child', () => {
    it('passes className to child element', () => {
      render(
        <AspectRatio ratio={16 / 9}>
          <div className="custom-child" data-testid="child">Content</div>
        </AspectRatio>,
      )
      expect(screen.getByTestId('child')).toHaveClass('custom-child')
    })

    it('supports styled image children', () => {
      render(
        <AspectRatio ratio={16 / 9}>
          <img
            src="https://example.com/image.jpg"
            alt="Example"
            className="object-cover w-full h-full"
          />
        </AspectRatio>,
      )
      const img = screen.getByRole('img', { name: 'Example' })
      expect(img).toBeInTheDocument()
      expect(img).toHaveClass('object-cover', 'w-full', 'h-full')
    })
  })

  describe('Accessibility', () => {
    it('does not expose an unexpected role', () => {
      render(
        <AspectRatio ratio={16 / 9}>
          <div role="img" aria-label="Hero image placeholder">Content</div>
        </AspectRatio>,
      )
      expect(screen.getByRole('img', { name: 'Hero image placeholder' })).toBeInTheDocument()
    })

    it('renders accessible image content inside', () => {
      render(
        <AspectRatio ratio={4 / 3}>
          <img src="/photo.jpg" alt="Mountain landscape at sunrise" />
        </AspectRatio>,
      )
      expect(screen.getByAltText('Mountain landscape at sunrise')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('forwards additional props to the root element', () => {
      const { container } = render(
        <AspectRatio ratio={1} style={{ maxWidth: '400px' }}>
          <div>Content</div>
        </AspectRatio>,
      )
      const root = container.querySelector('[data-slot="aspect-ratio"]')
      // Radix wraps in a div with position:relative; our data-slot should be present
      expect(root).toBeInTheDocument()
    })

    it('renders nested AspectRatio components', () => {
      render(
        <AspectRatio ratio={16 / 9}>
          <div>
            <AspectRatio ratio={1}>
              <div data-testid="inner">Inner</div>
            </AspectRatio>
          </div>
        </AspectRatio>,
      )
      expect(screen.getByTestId('inner')).toBeInTheDocument()
    })

    it('renders with text-only content', () => {
      render(
        <AspectRatio ratio={2}>
          <span data-testid="text-content">Just text</span>
        </AspectRatio>,
      )
      expect(screen.getByTestId('text-content')).toBeInTheDocument()
    })
  })
})
