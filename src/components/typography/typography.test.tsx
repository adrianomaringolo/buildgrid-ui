import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyBlockquote,
  TypographyCode,
  TypographyList,
} from './typography'

describe('Typography', () => {
  describe('Rendering', () => {
    it('TypographyH1 renders an h1 element', () => {
      render(<TypographyH1>Heading One</TypographyH1>)
      expect(screen.getByRole('heading', { level: 1, name: 'Heading One' })).toBeInTheDocument()
    })

    it('TypographyH2 renders an h2 element', () => {
      render(<TypographyH2>Heading Two</TypographyH2>)
      expect(screen.getByRole('heading', { level: 2, name: 'Heading Two' })).toBeInTheDocument()
    })

    it('TypographyH3 renders an h3 element', () => {
      render(<TypographyH3>Heading Three</TypographyH3>)
      expect(screen.getByRole('heading', { level: 3, name: 'Heading Three' })).toBeInTheDocument()
    })

    it('TypographyH4 renders an h4 element', () => {
      render(<TypographyH4>Heading Four</TypographyH4>)
      expect(screen.getByRole('heading', { level: 4, name: 'Heading Four' })).toBeInTheDocument()
    })

    it('TypographyP renders a p element', () => {
      render(<TypographyP>Paragraph text</TypographyP>)
      const el = screen.getByText('Paragraph text')
      expect(el.tagName).toBe('P')
    })

    it('TypographyLead renders a p element', () => {
      render(<TypographyLead>Lead text</TypographyLead>)
      const el = screen.getByText('Lead text')
      expect(el.tagName).toBe('P')
    })

    it('TypographyLarge renders a div element', () => {
      render(<TypographyLarge>Large text</TypographyLarge>)
      const el = screen.getByText('Large text')
      expect(el.tagName).toBe('DIV')
    })

    it('TypographySmall renders a small element', () => {
      render(<TypographySmall>Small text</TypographySmall>)
      const el = screen.getByText('Small text')
      expect(el.tagName).toBe('SMALL')
    })

    it('TypographyMuted renders a p element', () => {
      render(<TypographyMuted>Muted text</TypographyMuted>)
      const el = screen.getByText('Muted text')
      expect(el.tagName).toBe('P')
    })

    it('TypographyBlockquote renders a blockquote element', () => {
      render(<TypographyBlockquote>A great quote</TypographyBlockquote>)
      const el = screen.getByText('A great quote')
      expect(el.tagName).toBe('BLOCKQUOTE')
    })

    it('TypographyCode renders a code element', () => {
      render(<TypographyCode>const x = 1</TypographyCode>)
      const el = screen.getByText('const x = 1')
      expect(el.tagName).toBe('CODE')
    })

    it('TypographyList renders a ul element', () => {
      render(
        <TypographyList>
          <li>Item one</li>
          <li>Item two</li>
        </TypographyList>,
      )
      const el = screen.getByRole('list')
      expect(el.tagName).toBe('UL')
      expect(screen.getByText('Item one')).toBeInTheDocument()
      expect(screen.getByText('Item two')).toBeInTheDocument()
    })
  })

  describe('Variants — className and styles', () => {
    it('TypographyH1 applies correct classes', () => {
      render(<TypographyH1>H1</TypographyH1>)
      const el = screen.getByText('H1')
      expect(el).toHaveClass('scroll-m-20', 'text-4xl', 'font-extrabold', 'tracking-tight')
    })

    it('TypographyH2 applies correct classes', () => {
      render(<TypographyH2>H2</TypographyH2>)
      const el = screen.getByText('H2')
      expect(el).toHaveClass('scroll-m-20', 'border-b', 'pb-2', 'text-3xl', 'font-semibold')
    })

    it('TypographyH3 applies correct classes', () => {
      render(<TypographyH3>H3</TypographyH3>)
      const el = screen.getByText('H3')
      expect(el).toHaveClass('scroll-m-20', 'text-2xl', 'font-semibold', 'tracking-tight')
    })

    it('TypographyH4 applies correct classes', () => {
      render(<TypographyH4>H4</TypographyH4>)
      const el = screen.getByText('H4')
      expect(el).toHaveClass('scroll-m-20', 'text-xl', 'font-semibold', 'tracking-tight')
    })

    it('TypographyP applies leading-7', () => {
      render(<TypographyP>P</TypographyP>)
      expect(screen.getByText('P')).toHaveClass('leading-7')
    })

    it('TypographyLead applies text-xl and text-muted-foreground', () => {
      render(<TypographyLead>Lead</TypographyLead>)
      const el = screen.getByText('Lead')
      expect(el).toHaveClass('text-xl', 'text-muted-foreground')
    })

    it('TypographyLarge applies text-lg and font-semibold', () => {
      render(<TypographyLarge>Large</TypographyLarge>)
      const el = screen.getByText('Large')
      expect(el).toHaveClass('text-lg', 'font-semibold')
    })

    it('TypographySmall applies text-sm and font-medium', () => {
      render(<TypographySmall>Small</TypographySmall>)
      const el = screen.getByText('Small')
      expect(el).toHaveClass('text-sm', 'font-medium', 'leading-none')
    })

    it('TypographyMuted applies text-sm and text-muted-foreground', () => {
      render(<TypographyMuted>Muted</TypographyMuted>)
      const el = screen.getByText('Muted')
      expect(el).toHaveClass('text-sm', 'text-muted-foreground')
    })

    it('TypographyBlockquote applies border-l-2 and italic', () => {
      render(<TypographyBlockquote>Quote</TypographyBlockquote>)
      const el = screen.getByText('Quote')
      expect(el).toHaveClass('mt-6', 'border-l-2', 'pl-6', 'italic')
    })

    it('TypographyCode applies bg-muted and font-mono', () => {
      render(<TypographyCode>code</TypographyCode>)
      const el = screen.getByText('code')
      expect(el).toHaveClass('bg-muted', 'font-mono', 'font-semibold')
    })

    it('TypographyCode applies dark mode class', () => {
      render(<TypographyCode>dark</TypographyCode>)
      const el = screen.getByText('dark')
      expect(el).toHaveClass('dark:bg-muted/50')
    })

    it('TypographyList applies list-disc and ml-6', () => {
      render(
        <TypographyList>
          <li>Item</li>
        </TypographyList>,
      )
      const el = screen.getByRole('list')
      expect(el).toHaveClass('my-6', 'ml-6', 'list-disc')
    })
  })

  describe('className merging', () => {
    it('TypographyH1 merges custom className', () => {
      render(<TypographyH1 className="custom-h1">Title</TypographyH1>)
      const el = screen.getByText('Title')
      expect(el).toHaveClass('custom-h1', 'scroll-m-20', 'font-extrabold')
    })

    it('TypographyP merges custom className', () => {
      render(<TypographyP className="custom-p">Para</TypographyP>)
      const el = screen.getByText('Para')
      expect(el).toHaveClass('custom-p', 'leading-7')
    })

    it('TypographyCode merges custom className', () => {
      render(<TypographyCode className="custom-code">fn()</TypographyCode>)
      const el = screen.getByText('fn()')
      expect(el).toHaveClass('custom-code', 'font-mono')
    })
  })

  describe('data-slot attributes', () => {
    it('TypographyH1 has data-slot="typography-h1"', () => {
      render(<TypographyH1>H1</TypographyH1>)
      expect(screen.getByText('H1')).toHaveAttribute('data-slot', 'typography-h1')
    })

    it('TypographyH2 has data-slot="typography-h2"', () => {
      render(<TypographyH2>H2</TypographyH2>)
      expect(screen.getByText('H2')).toHaveAttribute('data-slot', 'typography-h2')
    })

    it('TypographyP has data-slot="typography-p"', () => {
      render(<TypographyP>P</TypographyP>)
      expect(screen.getByText('P')).toHaveAttribute('data-slot', 'typography-p')
    })

    it('TypographyLead has data-slot="typography-lead"', () => {
      render(<TypographyLead>Lead</TypographyLead>)
      expect(screen.getByText('Lead')).toHaveAttribute('data-slot', 'typography-lead')
    })

    it('TypographyBlockquote has data-slot="typography-blockquote"', () => {
      render(<TypographyBlockquote>Quote</TypographyBlockquote>)
      expect(screen.getByText('Quote')).toHaveAttribute('data-slot', 'typography-blockquote')
    })

    it('TypographyCode has data-slot="typography-code"', () => {
      render(<TypographyCode>code</TypographyCode>)
      expect(screen.getByText('code')).toHaveAttribute('data-slot', 'typography-code')
    })

    it('TypographyList has data-slot="typography-list"', () => {
      render(
        <TypographyList>
          <li>Item</li>
        </TypographyList>,
      )
      expect(screen.getByRole('list')).toHaveAttribute('data-slot', 'typography-list')
    })
  })

  describe('Accessibility', () => {
    it('headings are accessible by role', () => {
      render(
        <div>
          <TypographyH1>Main Title</TypographyH1>
          <TypographyH2>Section</TypographyH2>
          <TypographyH3>Subsection</TypographyH3>
          <TypographyH4>Detail</TypographyH4>
        </div>,
      )
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument()
    })

    it('TypographyList items are accessible by role', () => {
      render(
        <TypographyList>
          <li>First item</li>
          <li>Second item</li>
        </TypographyList>,
      )
      expect(screen.getAllByRole('listitem')).toHaveLength(2)
    })

    it('supports id attribute for anchor links', () => {
      render(<TypographyH2 id="section-intro">Introduction</TypographyH2>)
      const el = screen.getByText('Introduction')
      expect(el).toHaveAttribute('id', 'section-intro')
    })
  })

  describe('Edge Cases', () => {
    it('renders with no children', () => {
      const { container } = render(<TypographyP />)
      expect(container.querySelector('p')).toBeInTheDocument()
    })

    it('renders nested typography components', () => {
      render(
        <TypographyP>
          Use <TypographyCode>React.memo</TypographyCode> to prevent unnecessary re-renders.
        </TypographyP>,
      )
      expect(screen.getByText('React.memo')).toBeInTheDocument()
    })

    it('forwards arbitrary HTML attributes', () => {
      render(<TypographyH1 data-testid="main-title">Title</TypographyH1>)
      expect(screen.getByTestId('main-title')).toBeInTheDocument()
    })
  })
})
