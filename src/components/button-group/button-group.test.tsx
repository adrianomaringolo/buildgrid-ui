import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ButtonGroup } from './button-group'

describe('ButtonGroup', () => {
  describe('Rendering', () => {
    it('renders a div element', () => {
      const { container } = render(
        <ButtonGroup>
          <button>A</button>
        </ButtonGroup>,
      )
      const el = container.firstElementChild
      expect(el?.tagName).toBe('DIV')
    })

    it('renders children', () => {
      render(
        <ButtonGroup>
          <button>First</button>
          <button>Second</button>
          <button>Third</button>
        </ButtonGroup>,
      )
      expect(screen.getByText('First')).toBeInTheDocument()
      expect(screen.getByText('Second')).toBeInTheDocument()
      expect(screen.getByText('Third')).toBeInTheDocument()
    })

    it('sets data-slot="button-group"', () => {
      const { container } = render(<ButtonGroup />)
      expect(container.firstElementChild).toHaveAttribute('data-slot', 'button-group')
    })

    it('sets role="group"', () => {
      render(<ButtonGroup aria-label="Actions" />)
      const el = screen.getByRole('group', { name: 'Actions' })
      expect(el).toBeInTheDocument()
    })

    it('applies inline-flex class', () => {
      const { container } = render(<ButtonGroup />)
      expect(container.firstElementChild).toHaveClass('inline-flex')
    })
  })

  describe('Orientation', () => {
    it('defaults to horizontal orientation', () => {
      const { container } = render(
        <ButtonGroup>
          <button>A</button>
          <button>B</button>
        </ButtonGroup>,
      )
      const el = container.firstElementChild
      // horizontal: negative margin-left on non-first children
      expect(el).toHaveClass('[&>*:not(:first-child)]:-ml-px')
      expect(el).not.toHaveClass('flex-col')
    })

    it('applies horizontal classes when orientation="horizontal"', () => {
      const { container } = render(
        <ButtonGroup orientation="horizontal">
          <button>A</button>
          <button>B</button>
        </ButtonGroup>,
      )
      const el = container.firstElementChild
      expect(el).toHaveClass('[&>*:not(:first-child)]:-ml-px')
      expect(el).toHaveClass('[&>*:not(:first-child)]:rounded-l-none')
      expect(el).toHaveClass('[&>*:not(:last-child)]:rounded-r-none')
    })

    it('applies vertical classes when orientation="vertical"', () => {
      const { container } = render(
        <ButtonGroup orientation="vertical">
          <button>A</button>
          <button>B</button>
        </ButtonGroup>,
      )
      const el = container.firstElementChild
      expect(el).toHaveClass('flex-col')
      expect(el).toHaveClass('[&>*:not(:first-child)]:-mt-px')
      expect(el).toHaveClass('[&>*:not(:first-child)]:rounded-t-none')
      expect(el).toHaveClass('[&>*:not(:last-child)]:rounded-b-none')
    })

    it('does not apply vertical classes in horizontal mode', () => {
      const { container } = render(<ButtonGroup orientation="horizontal" />)
      const el = container.firstElementChild
      expect(el).not.toHaveClass('flex-col')
      expect(el).not.toHaveClass('[&>*:not(:first-child)]:-mt-px')
    })

    it('does not apply horizontal negative margin in vertical mode', () => {
      const { container } = render(<ButtonGroup orientation="vertical" />)
      const el = container.firstElementChild
      expect(el).not.toHaveClass('[&>*:not(:first-child)]:-ml-px')
    })
  })

  describe('Accessibility', () => {
    it('supports aria-label', () => {
      render(<ButtonGroup aria-label="Text formatting" />)
      const el = screen.getByRole('group', { name: 'Text formatting' })
      expect(el).toBeInTheDocument()
    })

    it('supports aria-labelledby', () => {
      render(
        <div>
          <span id="group-label">Alignment options</span>
          <ButtonGroup aria-labelledby="group-label">
            <button>Left</button>
          </ButtonGroup>
        </div>,
      )
      const el = screen.getByRole('group', { name: 'Alignment options' })
      expect(el).toBeInTheDocument()
    })

    it('children buttons remain accessible', () => {
      render(
        <ButtonGroup aria-label="Actions">
          <button>Save</button>
          <button>Cancel</button>
        </ButtonGroup>,
      )
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    })
  })

  describe('className forwarding', () => {
    it('forwards custom className', () => {
      const { container } = render(<ButtonGroup className="custom-group" />)
      expect(container.firstElementChild).toHaveClass('custom-group')
    })

    it('custom className does not replace base classes', () => {
      const { container } = render(<ButtonGroup className="custom-group" />)
      const el = container.firstElementChild
      expect(el).toHaveClass('inline-flex', 'custom-group')
    })
  })

  describe('Edge Cases', () => {
    it('renders with a single child', () => {
      render(
        <ButtonGroup>
          <button>Only</button>
        </ButtonGroup>,
      )
      expect(screen.getByText('Only')).toBeInTheDocument()
    })

    it('renders with no children', () => {
      const { container } = render(<ButtonGroup />)
      expect(container.firstElementChild).toBeInTheDocument()
      expect(container.firstElementChild?.children).toHaveLength(0)
    })

    it('forwards arbitrary HTML attributes', () => {
      render(<ButtonGroup data-testid="my-group" id="action-bar" />)
      const el = screen.getByTestId('my-group')
      expect(el).toHaveAttribute('id', 'action-bar')
    })

    it('renders many children without breaking layout classes', () => {
      const { container } = render(
        <ButtonGroup>
          {Array.from({ length: 10 }, (_, i) => (
            <button key={i}>Item {i + 1}</button>
          ))}
        </ButtonGroup>,
      )
      expect(container.firstElementChild?.children).toHaveLength(10)
    })
  })
})
