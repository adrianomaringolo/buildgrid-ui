import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ScrollArea, ScrollBar } from './scroll-area'

// Mock Radix UI ScrollArea primitives
vi.mock('@radix-ui/react-scroll-area', () => ({
	Root: ({ children, className, ...props }: any) => (
		<div data-testid="scroll-area-root" className={className} {...props}>
			{children}
		</div>
	),
	Viewport: ({ children, className, ...props }: any) => (
		<div data-testid="scroll-area-viewport" className={className} {...props}>
			{children}
		</div>
	),
	ScrollAreaScrollbar: ({ children, className, orientation, ...props }: any) => (
		<div
			data-testid="scroll-area-scrollbar"
			className={className}
			data-orientation={orientation}
			{...props}
		>
			{children}
		</div>
	),
	ScrollAreaThumb: ({ className, ...props }: any) => (
		<div data-testid="scroll-area-thumb" className={className} {...props} />
	),
	Corner: () => <div data-testid="scroll-area-corner" />,
}))

describe('ScrollArea', () => {
	describe('Rendering', () => {
		it('renders without crashing', () => {
			render(<ScrollArea>Content</ScrollArea>)
			expect(screen.getByTestId('scroll-area-root')).toBeInTheDocument()
		})

		it('renders children inside the viewport', () => {
			render(
				<ScrollArea>
					<p>Hello ScrollArea</p>
				</ScrollArea>,
			)
			expect(screen.getByText('Hello ScrollArea')).toBeInTheDocument()
			const viewport = screen.getByTestId('scroll-area-viewport')
			expect(viewport).toContainElement(screen.getByText('Hello ScrollArea'))
		})

		it('renders the default vertical scrollbar', () => {
			render(<ScrollArea>Content</ScrollArea>)
			const scrollbar = screen.getByTestId('scroll-area-scrollbar')
			expect(scrollbar).toBeInTheDocument()
			expect(scrollbar).toHaveAttribute('data-orientation', 'vertical')
		})

		it('renders the corner element', () => {
			render(<ScrollArea>Content</ScrollArea>)
			expect(screen.getByTestId('scroll-area-corner')).toBeInTheDocument()
		})

		it('renders the thumb element', () => {
			render(<ScrollArea>Content</ScrollArea>)
			expect(screen.getByTestId('scroll-area-thumb')).toBeInTheDocument()
		})
	})

	describe('data-slot attributes', () => {
		it('sets data-slot="scroll-area" on root', () => {
			render(<ScrollArea>Content</ScrollArea>)
			expect(screen.getByTestId('scroll-area-root')).toHaveAttribute(
				'data-slot',
				'scroll-area',
			)
		})

		it('sets data-slot="scroll-area-viewport" on viewport', () => {
			render(<ScrollArea>Content</ScrollArea>)
			expect(screen.getByTestId('scroll-area-viewport')).toHaveAttribute(
				'data-slot',
				'scroll-area-viewport',
			)
		})

		it('sets data-slot="scroll-area-scrollbar" on scrollbar', () => {
			render(<ScrollArea>Content</ScrollArea>)
			expect(screen.getByTestId('scroll-area-scrollbar')).toHaveAttribute(
				'data-slot',
				'scroll-area-scrollbar',
			)
		})

		it('sets data-slot="scroll-area-thumb" on thumb', () => {
			render(<ScrollArea>Content</ScrollArea>)
			expect(screen.getByTestId('scroll-area-thumb')).toHaveAttribute(
				'data-slot',
				'scroll-area-thumb',
			)
		})
	})

	describe('Variants', () => {
		it('forwards className to root element', () => {
			render(<ScrollArea className="h-72 w-48 rounded-md border">Content</ScrollArea>)
			const root = screen.getByTestId('scroll-area-root')
			expect(root).toHaveClass('h-72', 'w-48', 'rounded-md', 'border')
		})

		it('includes base classes on root element', () => {
			render(<ScrollArea>Content</ScrollArea>)
			const root = screen.getByTestId('scroll-area-root')
			expect(root).toHaveClass('relative', 'overflow-hidden')
		})

		it('forwards extra props to root', () => {
			render(<ScrollArea id="my-scroll" data-custom="value">Content</ScrollArea>)
			const root = screen.getByTestId('scroll-area-root')
			expect(root).toHaveAttribute('id', 'my-scroll')
			expect(root).toHaveAttribute('data-custom', 'value')
		})
	})

	describe('ScrollBar', () => {
		it('renders with vertical orientation by default', () => {
			render(
				<div>
					<ScrollBar />
				</div>,
			)
			const scrollbar = screen.getByTestId('scroll-area-scrollbar')
			expect(scrollbar).toHaveAttribute('data-orientation', 'vertical')
		})

		it('renders with horizontal orientation when specified', () => {
			render(
				<div>
					<ScrollBar orientation="horizontal" />
				</div>,
			)
			const scrollbar = screen.getByTestId('scroll-area-scrollbar')
			expect(scrollbar).toHaveAttribute('data-orientation', 'horizontal')
		})

		it('applies vertical-specific classes for vertical orientation', () => {
			render(
				<div>
					<ScrollBar orientation="vertical" />
				</div>,
			)
			const scrollbar = screen.getByTestId('scroll-area-scrollbar')
			expect(scrollbar).toHaveClass('h-full', 'w-2.5')
		})

		it('applies horizontal-specific classes for horizontal orientation', () => {
			render(
				<div>
					<ScrollBar orientation="horizontal" />
				</div>,
			)
			const scrollbar = screen.getByTestId('scroll-area-scrollbar')
			expect(scrollbar).toHaveClass('h-2.5', 'flex-col')
		})

		it('forwards className to scrollbar', () => {
			render(
				<div>
					<ScrollBar className="custom-scrollbar" />
				</div>,
			)
			const scrollbar = screen.getByTestId('scroll-area-scrollbar')
			expect(scrollbar).toHaveClass('custom-scrollbar')
		})

		it('renders thumb inside scrollbar', () => {
			render(
				<div>
					<ScrollBar />
				</div>,
			)
			const scrollbar = screen.getByTestId('scroll-area-scrollbar')
			const thumb = screen.getByTestId('scroll-area-thumb')
			expect(scrollbar).toContainElement(thumb)
		})
	})

	describe('Accessibility', () => {
		it('renders children accessible content', () => {
			render(
				<ScrollArea>
					<ul>
						<li>Item 1</li>
						<li>Item 2</li>
						<li>Item 3</li>
					</ul>
				</ScrollArea>,
			)
			expect(screen.getByRole('list')).toBeInTheDocument()
			expect(screen.getAllByRole('listitem')).toHaveLength(3)
		})
	})

	describe('Edge Cases', () => {
		it('renders with no children', () => {
			render(<ScrollArea />)
			expect(screen.getByTestId('scroll-area-root')).toBeInTheDocument()
		})

		it('renders multiple nested children', () => {
			render(
				<ScrollArea>
					<div>Child 1</div>
					<div>Child 2</div>
					<div>Child 3</div>
				</ScrollArea>,
			)
			expect(screen.getByText('Child 1')).toBeInTheDocument()
			expect(screen.getByText('Child 2')).toBeInTheDocument()
			expect(screen.getByText('Child 3')).toBeInTheDocument()
		})
	})
})
