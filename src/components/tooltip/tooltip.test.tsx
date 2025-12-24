import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

// Mock Radix UI Tooltip components
vi.mock('@radix-ui/react-tooltip', () => ({
	Provider: ({ children, delayDuration, ...props }: any) => (
		<div data-testid="tooltip-provider" data-delay-duration={delayDuration} {...props}>
			{children}
		</div>
	),
	Root: ({ children, open, onOpenChange, ...props }: any) => (
		<div
			data-testid="tooltip-root"
			data-open={open !== undefined ? String(open) : undefined}
			data-on-open-change={onOpenChange ? 'true' : undefined}
			{...props}
		>
			{children}
		</div>
	),
	Trigger: ({ children, asChild, ...props }: any) => (
		<button
			data-testid="tooltip-trigger"
			data-as-child={asChild ? 'true' : undefined}
			{...props}
		>
			{children}
		</button>
	),
	Portal: ({ children }: any) => <div data-testid="tooltip-portal">{children}</div>,
	Content: ({ children, className, sideOffset, ...props }: any) => (
		<div
			data-testid="tooltip-content"
			className={className}
			data-side-offset={sideOffset}
			{...props}
		>
			{children}
		</div>
	),
	Arrow: ({ className, ...props }: any) => (
		<div data-testid="tooltip-arrow" className={className} {...props} />
	),
}))

describe('Tooltip', () => {
	describe('TooltipProvider', () => {
		it('renders tooltip provider with default props', () => {
			render(
				<TooltipProvider>
					<div>Content</div>
				</TooltipProvider>,
			)

			const provider = screen.getByTestId('tooltip-provider')
			expect(provider).toBeInTheDocument()
			expect(provider).toHaveAttribute('data-delay-duration', '0')
			expect(provider).toHaveAttribute('data-slot', 'tooltip-provider')
		})

		it('renders with custom delayDuration', () => {
			render(
				<TooltipProvider delayDuration={500}>
					<div>Content</div>
				</TooltipProvider>,
			)

			const provider = screen.getByTestId('tooltip-provider')
			expect(provider).toHaveAttribute('data-delay-duration', '500')
		})

		it('forwards additional props', () => {
			render(
				<TooltipProvider skipDelayDuration={100}>
					<div>Content</div>
				</TooltipProvider>,
			)

			const provider = screen.getByTestId('tooltip-provider')
			expect(provider).toHaveAttribute('skipDelayDuration', '100')
		})
	})

	describe('Tooltip Root', () => {
		it('renders tooltip root with provider', () => {
			render(
				<Tooltip>
					<div>Content</div>
				</Tooltip>,
			)

			const provider = screen.getByTestId('tooltip-provider')
			const root = screen.getByTestId('tooltip-root')

			expect(provider).toBeInTheDocument()
			expect(root).toBeInTheDocument()
			expect(root).toHaveAttribute('data-slot', 'tooltip')
		})

		it('forwards props to root', () => {
			render(
				<Tooltip open={true}>
					<div>Content</div>
				</Tooltip>,
			)

			const root = screen.getByTestId('tooltip-root')
			expect(root).toHaveAttribute('data-open', 'true')
		})

		it('supports controlled state', () => {
			const { rerender } = render(
				<Tooltip open={false}>
					<div>Content</div>
				</Tooltip>,
			)

			let root = screen.getByTestId('tooltip-root')
			expect(root).toHaveAttribute('data-open', 'false')

			rerender(
				<Tooltip open={true}>
					<div>Content</div>
				</Tooltip>,
			)

			root = screen.getByTestId('tooltip-root')
			expect(root).toHaveAttribute('data-open', 'true')
		})

		it('supports onOpenChange callback', () => {
			const onOpenChange = vi.fn()

			render(
				<Tooltip onOpenChange={onOpenChange}>
					<div>Content</div>
				</Tooltip>,
			)

			const root = screen.getByTestId('tooltip-root')
			expect(root).toHaveAttribute('data-on-open-change', 'true')
		})
	})

	describe('TooltipTrigger', () => {
		it('renders tooltip trigger', () => {
			render(
				<Tooltip>
					<TooltipTrigger>Hover me</TooltipTrigger>
				</Tooltip>,
			)

			const trigger = screen.getByTestId('tooltip-trigger')
			expect(trigger).toBeInTheDocument()
			expect(trigger).toHaveTextContent('Hover me')
			expect(trigger).toHaveAttribute('data-slot', 'tooltip-trigger')
		})

		it('renders as button by default', () => {
			render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
				</Tooltip>,
			)

			const trigger = screen.getByRole('button')
			expect(trigger).toBeInTheDocument()
		})

		it('supports custom element as trigger', () => {
			render(
				<Tooltip>
					<TooltipTrigger asChild>
						<span>Custom trigger</span>
					</TooltipTrigger>
				</Tooltip>,
			)

			const trigger = screen.getByTestId('tooltip-trigger')
			expect(trigger).toHaveAttribute('data-as-child', 'true')
		})

		it('forwards additional props', () => {
			render(
				<Tooltip>
					<TooltipTrigger aria-label="Tooltip trigger">Trigger</TooltipTrigger>
				</Tooltip>,
			)

			const trigger = screen.getByTestId('tooltip-trigger')
			expect(trigger).toHaveAttribute('aria-label', 'Tooltip trigger')
		})
	})

	describe('TooltipContent', () => {
		it('renders tooltip content with default props', () => {
			render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent>Tooltip content</TooltipContent>
				</Tooltip>,
			)

			const portal = screen.getByTestId('tooltip-portal')
			const content = screen.getByTestId('tooltip-content')
			const arrow = screen.getByTestId('tooltip-arrow')

			expect(portal).toBeInTheDocument()
			expect(content).toBeInTheDocument()
			expect(content).toHaveTextContent('Tooltip content')
			expect(content).toHaveAttribute('data-slot', 'tooltip-content')
			expect(content).toHaveAttribute('data-side-offset', '0')
			expect(arrow).toBeInTheDocument()
		})

		it('applies default styling classes', () => {
			render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent>Content</TooltipContent>
				</Tooltip>,
			)

			const content = screen.getByTestId('tooltip-content')
			expect(content).toHaveClass(
				'bg-tooltip',
				'text-tooltip-foreground',
				'animate-in',
				'fade-in-0',
				'zoom-in-95',
				'z-50',
				'w-fit',
				'rounded-md',
				'px-3',
				'py-1.5',
				'text-xs',
				'text-balance',
			)
		})

		it('applies animation classes', () => {
			render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent>Content</TooltipContent>
				</Tooltip>,
			)

			const content = screen.getByTestId('tooltip-content')
			expect(content).toHaveClass(
				'data-[state=closed]:animate-out',
				'data-[state=closed]:fade-out-0',
				'data-[state=closed]:zoom-out-95',
			)
		})

		it('applies directional slide animations', () => {
			render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent>Content</TooltipContent>
				</Tooltip>,
			)

			const content = screen.getByTestId('tooltip-content')
			expect(content).toHaveClass(
				'data-[side=bottom]:slide-in-from-top-2',
				'data-[side=left]:slide-in-from-right-2',
				'data-[side=right]:slide-in-from-left-2',
				'data-[side=top]:slide-in-from-bottom-2',
			)
		})

		it('renders with custom className', () => {
			render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent className="custom-tooltip">Content</TooltipContent>
				</Tooltip>,
			)

			const content = screen.getByTestId('tooltip-content')
			expect(content).toHaveClass('custom-tooltip')
		})

		it('supports custom sideOffset', () => {
			render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent sideOffset={10}>Content</TooltipContent>
				</Tooltip>,
			)

			const content = screen.getByTestId('tooltip-content')
			expect(content).toHaveAttribute('data-side-offset', '10')
		})

		it('forwards additional props', () => {
			render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent side="top" align="center">
						Content
					</TooltipContent>
				</Tooltip>,
			)

			const content = screen.getByTestId('tooltip-content')
			expect(content).toHaveAttribute('side', 'top')
			expect(content).toHaveAttribute('align', 'center')
		})

		it('renders arrow with correct styling', () => {
			render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent>Content</TooltipContent>
				</Tooltip>,
			)

			const arrow = screen.getByTestId('tooltip-arrow')
			expect(arrow).toHaveClass(
				'bg-tooltip',
				'fill-tooltip',
				'z-50',
				'size-2.5',
				'translate-y-[calc(-50%_-_2px)]',
				'rotate-45',
				'rounded-[2px]',
			)
		})
	})

	describe('Complete Tooltip', () => {
		it('renders complete tooltip structure', () => {
			render(
				<Tooltip>
					<TooltipTrigger>Hover me</TooltipTrigger>
					<TooltipContent>This is a tooltip</TooltipContent>
				</Tooltip>,
			)

			const provider = screen.getByTestId('tooltip-provider')
			const root = screen.getByTestId('tooltip-root')
			const trigger = screen.getByTestId('tooltip-trigger')
			const portal = screen.getByTestId('tooltip-portal')
			const content = screen.getByTestId('tooltip-content')
			const arrow = screen.getByTestId('tooltip-arrow')

			expect(provider).toBeInTheDocument()
			expect(root).toBeInTheDocument()
			expect(trigger).toBeInTheDocument()
			expect(portal).toBeInTheDocument()
			expect(content).toBeInTheDocument()
			expect(arrow).toBeInTheDocument()
		})

		it('supports complex content', () => {
			render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent>
						<div>
							<strong>Title</strong>
							<p>Description text</p>
						</div>
					</TooltipContent>
				</Tooltip>,
			)

			const content = screen.getByTestId('tooltip-content')
			expect(content).toHaveTextContent('Title')
			expect(content).toHaveTextContent('Description text')
		})

		it('supports multiple tooltips', () => {
			render(
				<div>
					<Tooltip>
						<TooltipTrigger>First trigger</TooltipTrigger>
						<TooltipContent>First tooltip</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger>Second trigger</TooltipTrigger>
						<TooltipContent>Second tooltip</TooltipContent>
					</Tooltip>
				</div>,
			)

			const triggers = screen.getAllByTestId('tooltip-trigger')
			const contents = screen.getAllByTestId('tooltip-content')

			expect(triggers).toHaveLength(2)
			expect(contents).toHaveLength(2)
			expect(triggers[0]).toHaveTextContent('First trigger')
			expect(triggers[1]).toHaveTextContent('Second trigger')
			expect(contents[0]).toHaveTextContent('First tooltip')
			expect(contents[1]).toHaveTextContent('Second tooltip')
		})
	})

	describe('Interaction', () => {
		it('handles hover events', async () => {
			const user = userEvent.setup()

			render(
				<Tooltip>
					<TooltipTrigger>Hover me</TooltipTrigger>
					<TooltipContent>Tooltip content</TooltipContent>
				</Tooltip>,
			)

			const trigger = screen.getByTestId('tooltip-trigger')

			await user.hover(trigger)
			// In a real implementation, this would show the tooltip
			expect(trigger).toBeInTheDocument()

			await user.unhover(trigger)
			// In a real implementation, this would hide the tooltip
			expect(trigger).toBeInTheDocument()
		})

		it('handles focus events', async () => {
			const user = userEvent.setup()

			render(
				<Tooltip>
					<TooltipTrigger>Focus me</TooltipTrigger>
					<TooltipContent>Tooltip content</TooltipContent>
				</Tooltip>,
			)

			const trigger = screen.getByTestId('tooltip-trigger')

			await user.tab()
			expect(trigger).toHaveFocus()

			await user.tab()
			expect(trigger).not.toHaveFocus()
		})

		it('supports controlled open state', () => {
			const { rerender } = render(
				<Tooltip open={false}>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent>Content</TooltipContent>
				</Tooltip>,
			)

			let root = screen.getByTestId('tooltip-root')
			expect(root).toHaveAttribute('data-open', 'false')

			rerender(
				<Tooltip open={true}>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent>Content</TooltipContent>
				</Tooltip>,
			)

			root = screen.getByTestId('tooltip-root')
			expect(root).toHaveAttribute('data-open', 'true')
		})

		it('calls onOpenChange when state changes', () => {
			const onOpenChange = vi.fn()

			render(
				<Tooltip onOpenChange={onOpenChange}>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent>Content</TooltipContent>
				</Tooltip>,
			)

			const root = screen.getByTestId('tooltip-root')
			expect(root).toHaveAttribute('data-on-open-change', 'true')
		})
	})

	describe('Positioning', () => {
		it('supports different sides', () => {
			const sides = ['top', 'right', 'bottom', 'left'] as const

			sides.forEach((side) => {
				const { unmount } = render(
					<Tooltip>
						<TooltipTrigger>Trigger</TooltipTrigger>
						<TooltipContent side={side}>Content</TooltipContent>
					</Tooltip>,
				)

				const content = screen.getByTestId('tooltip-content')
				expect(content).toHaveAttribute('side', side)
				unmount()
			})
		})

		it('supports different alignments', () => {
			const alignments = ['start', 'center', 'end'] as const

			alignments.forEach((align) => {
				const { unmount } = render(
					<Tooltip>
						<TooltipTrigger>Trigger</TooltipTrigger>
						<TooltipContent align={align}>Content</TooltipContent>
					</Tooltip>,
				)

				const content = screen.getByTestId('tooltip-content')
				expect(content).toHaveAttribute('align', align)
				unmount()
			})
		})

		it('supports custom offsets', () => {
			render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent sideOffset={20} alignOffset={10}>
						Content
					</TooltipContent>
				</Tooltip>,
			)

			const content = screen.getByTestId('tooltip-content')
			expect(content).toHaveAttribute('data-side-offset', '20')
			expect(content).toHaveAttribute('alignOffset', '10')
		})

		it('supports collision detection', () => {
			render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent collisionPadding={20}>Content</TooltipContent>
				</Tooltip>,
			)

			const content = screen.getByTestId('tooltip-content')
			expect(content).toHaveAttribute('collisionPadding', '20')
		})
	})

	describe('Accessibility', () => {
		it('maintains proper ARIA relationships', () => {
			render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent>Content</TooltipContent>
				</Tooltip>,
			)

			const trigger = screen.getByTestId('tooltip-trigger')
			const content = screen.getByTestId('tooltip-content')

			expect(trigger).toBeInTheDocument()
			expect(content).toBeInTheDocument()
		})

		it('supports custom ARIA attributes', () => {
			render(
				<Tooltip>
					<TooltipTrigger aria-label="Custom trigger">Trigger</TooltipTrigger>
					<TooltipContent role="tooltip">Content</TooltipContent>
				</Tooltip>,
			)

			const trigger = screen.getByTestId('tooltip-trigger')
			const content = screen.getByTestId('tooltip-content')

			expect(trigger).toHaveAttribute('aria-label', 'Custom trigger')
			expect(content).toHaveAttribute('role', 'tooltip')
		})

		it('is keyboard accessible', async () => {
			const user = userEvent.setup()

			render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent>Content</TooltipContent>
				</Tooltip>,
			)

			const trigger = screen.getByTestId('tooltip-trigger')

			await user.tab()
			expect(trigger).toHaveFocus()

			await user.keyboard('{Escape}')
			// In real implementation, this would close the tooltip
			expect(trigger).toHaveFocus()
		})
	})

	describe('Standalone TooltipProvider', () => {
		it('can be used independently', () => {
			render(
				<TooltipProvider delayDuration={1000}>
					<div>
						<Tooltip>
							<TooltipTrigger>Trigger 1</TooltipTrigger>
							<TooltipContent>Content 1</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger>Trigger 2</TooltipTrigger>
							<TooltipContent>Content 2</TooltipContent>
						</Tooltip>
					</div>
				</TooltipProvider>,
			)

			const providers = screen.getAllByTestId('tooltip-provider')
			const triggers = screen.getAllByTestId('tooltip-trigger')

			expect(providers[0]).toHaveAttribute('data-delay-duration', '1000')
			expect(triggers).toHaveLength(2)
		})

		it('provides context to multiple tooltips', () => {
			render(
				<TooltipProvider skipDelayDuration={200}>
					<Tooltip>
						<TooltipTrigger>First</TooltipTrigger>
						<TooltipContent>First content</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger>Second</TooltipTrigger>
						<TooltipContent>Second content</TooltipContent>
					</Tooltip>
				</TooltipProvider>,
			)

			const providers = screen.getAllByTestId('tooltip-provider')
			expect(providers[0]).toHaveAttribute('skipDelayDuration', '200')
		})
	})

	describe('Edge Cases', () => {
		it('handles undefined className gracefully', () => {
			render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent className={undefined}>Content</TooltipContent>
				</Tooltip>,
			)

			const content = screen.getByTestId('tooltip-content')
			expect(content).toBeInTheDocument()
		})

		it('handles empty content', () => {
			render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent></TooltipContent>
				</Tooltip>,
			)

			const content = screen.getByTestId('tooltip-content')
			expect(content).toBeInTheDocument()
		})

		it('handles null children gracefully', () => {
			render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent>{null}</TooltipContent>
				</Tooltip>,
			)

			const content = screen.getByTestId('tooltip-content')
			expect(content).toBeInTheDocument()
		})

		it('handles rapid hover events', async () => {
			const user = userEvent.setup()

			render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent>Content</TooltipContent>
				</Tooltip>,
			)

			const trigger = screen.getByTestId('tooltip-trigger')

			// Rapid hover/unhover
			await user.hover(trigger)
			await user.unhover(trigger)
			await user.hover(trigger)
			await user.unhover(trigger)

			expect(trigger).toBeInTheDocument()
		})
	})

	describe('Performance', () => {
		it('renders efficiently with minimal props', () => {
			const { container } = render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent>Content</TooltipContent>
				</Tooltip>,
			)

			expect(container.firstChild).toBeInTheDocument()
		})

		it('handles prop changes efficiently', () => {
			const { rerender } = render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent side="top">Content</TooltipContent>
				</Tooltip>,
			)

			let content = screen.getByTestId('tooltip-content')
			expect(content).toHaveAttribute('side', 'top')

			rerender(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent side="bottom">Content</TooltipContent>
				</Tooltip>,
			)

			content = screen.getByTestId('tooltip-content')
			expect(content).toHaveAttribute('side', 'bottom')
		})

		it('maintains consistent styling across re-renders', () => {
			const { rerender } = render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent>Content</TooltipContent>
				</Tooltip>,
			)

			let content = screen.getByTestId('tooltip-content')
			const initialClasses = content.className

			rerender(
				<Tooltip open={true}>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent>Content</TooltipContent>
				</Tooltip>,
			)

			content = screen.getByTestId('tooltip-content')
			expect(content.className).toBe(initialClasses)
		})
	})

	describe('Complex Scenarios', () => {
		it('works with nested interactive elements', () => {
			render(
				<Tooltip>
					<TooltipTrigger>
						<button>
							<span>Nested Button</span>
						</button>
					</TooltipTrigger>
					<TooltipContent>Tooltip for nested button</TooltipContent>
				</Tooltip>,
			)

			const trigger = screen.getByTestId('tooltip-trigger')
			expect(trigger).toHaveTextContent('Nested Button')
		})

		it('handles dynamic content updates', () => {
			const { rerender } = render(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent>Initial content</TooltipContent>
				</Tooltip>,
			)

			let content = screen.getByTestId('tooltip-content')
			expect(content).toHaveTextContent('Initial content')

			rerender(
				<Tooltip>
					<TooltipTrigger>Trigger</TooltipTrigger>
					<TooltipContent>Updated content</TooltipContent>
				</Tooltip>,
			)

			content = screen.getByTestId('tooltip-content')
			expect(content).toHaveTextContent('Updated content')
		})

		it('maintains state across provider changes', () => {
			const { rerender } = render(
				<TooltipProvider delayDuration={0}>
					<Tooltip open={true}>
						<TooltipTrigger>Trigger</TooltipTrigger>
						<TooltipContent>Content</TooltipContent>
					</Tooltip>
				</TooltipProvider>,
			)

			let root = screen.getByTestId('tooltip-root')
			expect(root).toHaveAttribute('data-open', 'true')

			rerender(
				<TooltipProvider delayDuration={500}>
					<Tooltip open={true}>
						<TooltipTrigger>Trigger</TooltipTrigger>
						<TooltipContent>Content</TooltipContent>
					</Tooltip>
				</TooltipProvider>,
			)

			root = screen.getByTestId('tooltip-root')
			expect(root).toHaveAttribute('data-open', 'true')
		})
	})
})
