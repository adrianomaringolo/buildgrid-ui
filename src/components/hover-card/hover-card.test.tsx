import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card'

// Mock Radix UI HoverCard primitives
vi.mock('@radix-ui/react-hover-card', () => ({
	Root: ({ children, open, openDelay, closeDelay, ...props }: any) => (
		<div
			data-testid="hover-card-root"
			data-open={open !== undefined ? String(open) : undefined}
			{...props}
		>
			{children}
		</div>
	),
	Trigger: ({ children, asChild, ...props }: any) => (
		<button data-testid="hover-card-trigger" {...props}>
			{children}
		</button>
	),
	Portal: ({ children }: any) => <div data-testid="hover-card-portal">{children}</div>,
	Content: ({
		children,
		className,
		align,
		sideOffset,
		...props
	}: any) => (
		<div
			data-testid="hover-card-content"
			className={className}
			data-align={align}
			data-side-offset={sideOffset}
			{...props}
		>
			{children}
		</div>
	),
}))

describe('HoverCard', () => {
	describe('Rendering', () => {
		it('renders without crashing', () => {
			render(
				<HoverCard>
					<HoverCardTrigger>Hover me</HoverCardTrigger>
					<HoverCardContent>Card content</HoverCardContent>
				</HoverCard>,
			)
			expect(screen.getByTestId('hover-card-root')).toBeInTheDocument()
		})

		it('renders the trigger', () => {
			render(
				<HoverCard>
					<HoverCardTrigger>Hover me</HoverCardTrigger>
					<HoverCardContent>Card content</HoverCardContent>
				</HoverCard>,
			)
			expect(screen.getByTestId('hover-card-trigger')).toBeInTheDocument()
			expect(screen.getByText('Hover me')).toBeInTheDocument()
		})

		it('renders the content via portal', () => {
			render(
				<HoverCard>
					<HoverCardTrigger>Hover me</HoverCardTrigger>
					<HoverCardContent>Card content</HoverCardContent>
				</HoverCard>,
			)
			expect(screen.getByTestId('hover-card-portal')).toBeInTheDocument()
			expect(screen.getByTestId('hover-card-content')).toBeInTheDocument()
			expect(screen.getByText('Card content')).toBeInTheDocument()
		})

		it('renders with open prop', () => {
			render(
				<HoverCard open>
					<HoverCardTrigger>Hover me</HoverCardTrigger>
					<HoverCardContent>Card content</HoverCardContent>
				</HoverCard>,
			)
			const root = screen.getByTestId('hover-card-root')
			expect(root).toHaveAttribute('data-open', 'true')
		})

		it('renders complex content children', () => {
			render(
				<HoverCard>
					<HoverCardTrigger>Profile</HoverCardTrigger>
					<HoverCardContent>
						<div>
							<h4>John Doe</h4>
							<p>Software Engineer</p>
						</div>
					</HoverCardContent>
				</HoverCard>,
			)
			expect(screen.getByText('John Doe')).toBeInTheDocument()
			expect(screen.getByText('Software Engineer')).toBeInTheDocument()
		})
	})

	describe('data-slot attributes', () => {
		it('sets data-slot="hover-card" on root', () => {
			render(
				<HoverCard>
					<HoverCardTrigger>Hover</HoverCardTrigger>
				</HoverCard>,
			)
			expect(screen.getByTestId('hover-card-root')).toHaveAttribute(
				'data-slot',
				'hover-card',
			)
		})

		it('sets data-slot="hover-card-trigger" on trigger', () => {
			render(
				<HoverCard>
					<HoverCardTrigger>Hover</HoverCardTrigger>
				</HoverCard>,
			)
			expect(screen.getByTestId('hover-card-trigger')).toHaveAttribute(
				'data-slot',
				'hover-card-trigger',
			)
		})

		it('sets data-slot="hover-card-content" on content', () => {
			render(
				<HoverCard>
					<HoverCardTrigger>Hover</HoverCardTrigger>
					<HoverCardContent>Content</HoverCardContent>
				</HoverCard>,
			)
			expect(screen.getByTestId('hover-card-content')).toHaveAttribute(
				'data-slot',
				'hover-card-content',
			)
		})
	})

	describe('Variants', () => {
		it('applies default align="center" to content', () => {
			render(
				<HoverCard>
					<HoverCardTrigger>Hover</HoverCardTrigger>
					<HoverCardContent>Content</HoverCardContent>
				</HoverCard>,
			)
			const content = screen.getByTestId('hover-card-content')
			expect(content).toHaveAttribute('data-align', 'center')
		})

		it('applies custom align prop to content', () => {
			render(
				<HoverCard>
					<HoverCardTrigger>Hover</HoverCardTrigger>
					<HoverCardContent align="start">Content</HoverCardContent>
				</HoverCard>,
			)
			const content = screen.getByTestId('hover-card-content')
			expect(content).toHaveAttribute('data-align', 'start')
		})

		it('applies align="end" prop to content', () => {
			render(
				<HoverCard>
					<HoverCardTrigger>Hover</HoverCardTrigger>
					<HoverCardContent align="end">Content</HoverCardContent>
				</HoverCard>,
			)
			const content = screen.getByTestId('hover-card-content')
			expect(content).toHaveAttribute('data-align', 'end')
		})

		it('applies default sideOffset=4 to content', () => {
			render(
				<HoverCard>
					<HoverCardTrigger>Hover</HoverCardTrigger>
					<HoverCardContent>Content</HoverCardContent>
				</HoverCard>,
			)
			const content = screen.getByTestId('hover-card-content')
			expect(content).toHaveAttribute('data-side-offset', '4')
		})

		it('applies custom sideOffset prop to content', () => {
			render(
				<HoverCard>
					<HoverCardTrigger>Hover</HoverCardTrigger>
					<HoverCardContent sideOffset={8}>Content</HoverCardContent>
				</HoverCard>,
			)
			const content = screen.getByTestId('hover-card-content')
			expect(content).toHaveAttribute('data-side-offset', '8')
		})

		it('forwards className to content', () => {
			render(
				<HoverCard>
					<HoverCardTrigger>Hover</HoverCardTrigger>
					<HoverCardContent className="custom-class w-96">Content</HoverCardContent>
				</HoverCard>,
			)
			const content = screen.getByTestId('hover-card-content')
			expect(content).toHaveClass('custom-class', 'w-96')
		})

		it('includes base classes on content', () => {
			render(
				<HoverCard>
					<HoverCardTrigger>Hover</HoverCardTrigger>
					<HoverCardContent>Content</HoverCardContent>
				</HoverCard>,
			)
			const content = screen.getByTestId('hover-card-content')
			expect(content).toHaveClass('z-50', 'w-64', 'rounded-md', 'border', 'shadow-md')
		})
	})

	describe('Accessibility', () => {
		it('renders trigger as a focusable element', () => {
			render(
				<HoverCard>
					<HoverCardTrigger>Hover me</HoverCardTrigger>
					<HoverCardContent>Content</HoverCardContent>
				</HoverCard>,
			)
			const trigger = screen.getByTestId('hover-card-trigger')
			expect(trigger).toBeInTheDocument()
			// Trigger is rendered as a button in our mock
			expect(trigger.tagName).toBe('BUTTON')
		})

		it('wraps content in a portal', () => {
			render(
				<HoverCard>
					<HoverCardTrigger>Hover</HoverCardTrigger>
					<HoverCardContent>Portal content</HoverCardContent>
				</HoverCard>,
			)
			const portal = screen.getByTestId('hover-card-portal')
			const content = screen.getByTestId('hover-card-content')
			expect(portal).toContainElement(content)
		})
	})

	describe('Edge Cases', () => {
		it('forwards extra props to root', () => {
			render(
				<HoverCard openDelay={200} closeDelay={100}>
					<HoverCardTrigger>Hover</HoverCardTrigger>
				</HoverCard>,
			)
			expect(screen.getByTestId('hover-card-root')).toBeInTheDocument()
		})

		it('renders without content', () => {
			render(
				<HoverCard>
					<HoverCardTrigger>Trigger only</HoverCardTrigger>
				</HoverCard>,
			)
			expect(screen.getByText('Trigger only')).toBeInTheDocument()
		})

		it('renders with multiple trigger children', () => {
			render(
				<HoverCard>
					<HoverCardTrigger>
						<span>Icon</span>
						<span>Label</span>
					</HoverCardTrigger>
					<HoverCardContent>Content</HoverCardContent>
				</HoverCard>,
			)
			expect(screen.getByText('Icon')).toBeInTheDocument()
			expect(screen.getByText('Label')).toBeInTheDocument()
		})
	})
})
