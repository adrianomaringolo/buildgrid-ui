import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'

describe('Accordion', () => {
	const AccordionExample = ({ type = 'single' }: { type?: 'single' | 'multiple' }) => (
		<Accordion type={type} collapsible>
			<AccordionItem value="item-1">
				<AccordionTrigger>First Item</AccordionTrigger>
				<AccordionContent>First item content</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>Second Item</AccordionTrigger>
				<AccordionContent>Second item content</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-3">
				<AccordionTrigger>Third Item</AccordionTrigger>
				<AccordionContent>Third item content</AccordionContent>
			</AccordionItem>
		</Accordion>
	)

	describe('Rendering', () => {
		it('renders accordion with all items', () => {
			render(<AccordionExample />)

			expect(screen.getByText('First Item')).toBeInTheDocument()
			expect(screen.getByText('Second Item')).toBeInTheDocument()
			expect(screen.getByText('Third Item')).toBeInTheDocument()
		})

		it('renders accordion items with proper structure', () => {
			render(<AccordionExample />)

			const triggers = screen.getAllByRole('button')
			expect(triggers).toHaveLength(3)

			triggers.forEach((trigger) => {
				expect(trigger).toHaveAttribute('aria-expanded', 'false')
			})
		})

		it('renders chevron icons in triggers', () => {
			render(<AccordionExample />)

			const chevronIcons = document.querySelectorAll('svg')
			expect(chevronIcons).toHaveLength(3)

			chevronIcons.forEach((icon) => {
				expect(icon).toHaveClass('h-4', 'w-4', 'shrink-0')
			})
		})
	})

	describe('Single Type Accordion', () => {
		it('opens and closes accordion items', async () => {
			const user = userEvent.setup()
			render(<AccordionExample type="single" />)

			const firstTrigger = screen.getByText('First Item')

			// Initially closed
			expect(firstTrigger).toHaveAttribute('aria-expanded', 'false')
			expect(screen.queryByText('First item content')).toBeNull()

			// Click to open
			await user.click(firstTrigger)
			expect(firstTrigger).toHaveAttribute('aria-expanded', 'true')
			expect(screen.getByText('First item content')).toBeInTheDocument()

			// Click again to close
			await user.click(firstTrigger)
			expect(firstTrigger).toHaveAttribute('aria-expanded', 'false')
		})

		it('closes other items when opening a new one', async () => {
			const user = userEvent.setup()
			render(<AccordionExample type="single" />)

			const firstTrigger = screen.getByText('First Item')
			const secondTrigger = screen.getByText('Second Item')

			// Open first item
			await user.click(firstTrigger)
			expect(firstTrigger).toHaveAttribute('aria-expanded', 'true')
			expect(screen.getByText('First item content')).toBeInTheDocument()

			// Open second item - should close first
			await user.click(secondTrigger)
			expect(firstTrigger).toHaveAttribute('aria-expanded', 'false')
			expect(secondTrigger).toHaveAttribute('aria-expanded', 'true')
			expect(screen.getByText('Second item content')).toBeInTheDocument()
		})
	})

	describe('Multiple Type Accordion', () => {
		it('allows multiple items to be open simultaneously', async () => {
			const user = userEvent.setup()
			render(<AccordionExample type="multiple" />)

			const firstTrigger = screen.getByText('First Item')
			const secondTrigger = screen.getByText('Second Item')

			// Open first item
			await user.click(firstTrigger)
			expect(firstTrigger).toHaveAttribute('aria-expanded', 'true')
			expect(screen.getByText('First item content')).toBeInTheDocument()

			// Open second item - first should remain open
			await user.click(secondTrigger)
			expect(firstTrigger).toHaveAttribute('aria-expanded', 'true')
			expect(secondTrigger).toHaveAttribute('aria-expanded', 'true')
			expect(screen.getByText('First item content')).toBeInTheDocument()
			expect(screen.getByText('Second item content')).toBeInTheDocument()
		})

		it('allows closing individual items independently', async () => {
			const user = userEvent.setup()
			render(<AccordionExample type="multiple" />)

			const firstTrigger = screen.getByText('First Item')
			const secondTrigger = screen.getByText('Second Item')

			// Open both items
			await user.click(firstTrigger)
			await user.click(secondTrigger)

			expect(firstTrigger).toHaveAttribute('aria-expanded', 'true')
			expect(secondTrigger).toHaveAttribute('aria-expanded', 'true')

			// Close first item - second should remain open
			await user.click(firstTrigger)
			expect(firstTrigger).toHaveAttribute('aria-expanded', 'false')
			expect(secondTrigger).toHaveAttribute('aria-expanded', 'true')
			expect(screen.getByText('Second item content')).toBeInTheDocument()
		})
	})

	describe('Keyboard Navigation', () => {
		it('supports keyboard navigation with Tab', async () => {
			const user = userEvent.setup()
			render(<AccordionExample />)

			const triggers = screen.getAllByRole('button')

			// Tab through triggers
			await user.tab()
			expect(triggers[0]).toHaveFocus()

			await user.tab()
			expect(triggers[1]).toHaveFocus()

			await user.tab()
			expect(triggers[2]).toHaveFocus()
		})

		it('opens/closes items with Enter key', async () => {
			const user = userEvent.setup()
			render(<AccordionExample />)

			const firstTrigger = screen.getByText('First Item')

			// Focus and press Enter
			firstTrigger.focus()
			await user.keyboard('{Enter}')

			expect(firstTrigger).toHaveAttribute('aria-expanded', 'true')
			expect(screen.getByText('First item content')).toBeInTheDocument()
		})

		it('opens/closes items with Space key', async () => {
			const user = userEvent.setup()
			render(<AccordionExample />)

			const firstTrigger = screen.getByText('First Item')

			// Focus and press Space
			firstTrigger.focus()
			await user.keyboard(' ')

			expect(firstTrigger).toHaveAttribute('aria-expanded', 'true')
			expect(screen.getByText('First item content')).toBeInTheDocument()
		})
	})

	describe('Accessibility', () => {
		it('has proper ARIA attributes', () => {
			render(<AccordionExample />)

			const triggers = screen.getAllByRole('button')

			triggers.forEach((trigger) => {
				expect(trigger).toHaveAttribute('aria-expanded')
				expect(trigger).toHaveAttribute('aria-controls')
			})
		})

		it('associates triggers with content via aria-controls', async () => {
			const user = userEvent.setup()
			render(<AccordionExample />)

			const firstTrigger = screen.getByText('First Item')
			await user.click(firstTrigger)

			const controlsId = firstTrigger.getAttribute('aria-controls')
			const content = screen.getByText('First item content').closest('[role="region"]')

			expect(content).toHaveAttribute('id', controlsId)
		})

		it('has proper role attributes', async () => {
			const user = userEvent.setup()
			render(<AccordionExample />)

			const firstTrigger = screen.getByText('First Item')
			await user.click(firstTrigger)

			const content = screen.getByText('First item content').closest('[role="region"]')
			expect(content).toHaveAttribute('role', 'region')
		})
	})

	describe('Custom Props and Styling', () => {
		it('applies custom className to AccordionTrigger', () => {
			render(
				<Accordion type="single">
					<AccordionItem value="item-1">
						<AccordionTrigger className="custom-trigger-class">Item</AccordionTrigger>
						<AccordionContent>Content</AccordionContent>
					</AccordionItem>
				</Accordion>,
			)

			const trigger = screen.getByText('Item')
			expect(trigger).toHaveClass('custom-trigger-class')
		})

		it('forwards refs correctly', () => {
			const itemRef = { current: null }
			const triggerRef = { current: null }
			const contentRef = { current: null }

			render(
				<Accordion type="single">
					<AccordionItem value="item-1" ref={itemRef}>
						<AccordionTrigger ref={triggerRef}>Item</AccordionTrigger>
						<AccordionContent ref={contentRef}>Content</AccordionContent>
					</AccordionItem>
				</Accordion>,
			)

			expect(itemRef.current).toBeTruthy()
			expect(triggerRef.current).toBeTruthy()
			expect(contentRef.current).toBeTruthy()
		})
	})

	describe('Animation and State', () => {
		it('rotates chevron icon when item is open', async () => {
			const user = userEvent.setup()
			render(<AccordionExample />)

			const trigger = screen.getByText('First Item')

			// Initially has rotation class for open state
			expect(trigger).toHaveClass('[&[data-state=open]>svg]:rotate-180')

			// Click to open
			await user.click(trigger)
			expect(trigger).toHaveAttribute('data-state', 'open')
		})

		it('applies transition classes to trigger', () => {
			render(<AccordionExample />)

			const trigger = screen.getByText('First Item')
			expect(trigger).toHaveClass('transition-all')
		})
	})

	describe('Edge Cases', () => {
		it('handles accordion with single item', async () => {
			const user = userEvent.setup()
			render(
				<Accordion type="single" collapsible>
					<AccordionItem value="single">
						<AccordionTrigger>Single Item</AccordionTrigger>
						<AccordionContent>Single content</AccordionContent>
					</AccordionItem>
				</Accordion>,
			)

			const trigger = screen.getByText('Single Item')
			await user.click(trigger)

			expect(trigger).toHaveAttribute('aria-expanded', 'true')
			expect(screen.getByText('Single content')).toBeInTheDocument()
		})

		it('handles accordion without collapsible prop', async () => {
			const user = userEvent.setup()
			render(
				<Accordion type="single">
					<AccordionItem value="item-1">
						<AccordionTrigger>Item 1</AccordionTrigger>
						<AccordionContent>Content 1</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>Item 2</AccordionTrigger>
						<AccordionContent>Content 2</AccordionContent>
					</AccordionItem>
				</Accordion>,
			)

			const trigger1 = screen.getByText('Item 1')
			const trigger2 = screen.getByText('Item 2')

			// Open first item
			await user.click(trigger1)
			expect(trigger1).toHaveAttribute('aria-expanded', 'true')

			// Open second item - first should close
			await user.click(trigger2)
			expect(trigger1).toHaveAttribute('aria-expanded', 'false')
			expect(trigger2).toHaveAttribute('aria-expanded', 'true')

			// Try to close second item - should not close without collapsible
			await user.click(trigger2)
			expect(trigger2).toHaveAttribute('aria-expanded', 'true')
		})

		it('renders with default props', () => {
			render(
				<Accordion type="single">
					<AccordionItem value="test">
						<AccordionTrigger>Test</AccordionTrigger>
						<AccordionContent>Test content</AccordionContent>
					</AccordionItem>
				</Accordion>,
			)

			expect(screen.getByText('Test')).toBeInTheDocument()
			expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
		})
	})
})
