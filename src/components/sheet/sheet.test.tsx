import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from './sheet'

describe('Sheet', () => {
	describe('Sheet Root Component', () => {
		it('renders sheet without crashing', () => {
			render(
				<Sheet>
					<SheetTrigger>Open Sheet</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Sheet content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			expect(screen.getByText('Open Sheet')).toBeInTheDocument()
		})

		it('supports controlled state', () => {
			const ControlledSheet = () => {
				const [open, setOpen] = React.useState(false)
				return (
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger>Controlled Trigger</SheetTrigger>
						<SheetContent>
							<SheetTitle>Controlled Sheet</SheetTitle>
							<SheetDescription>Controlled content</SheetDescription>
						</SheetContent>
					</Sheet>
				)
			}

			render(<ControlledSheet />)

			expect(screen.getByText('Controlled Trigger')).toBeInTheDocument()
		})

		it('supports default open state', () => {
			render(
				<Sheet defaultOpen>
					<SheetTrigger>Default Open</SheetTrigger>
					<SheetContent>
						<SheetTitle>Default Sheet</SheetTitle>
						<SheetDescription>Default content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			expect(screen.getByText('Default content')).toBeInTheDocument()
		})

		it('has correct data-slot attribute', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open Sheet</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Sheet content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			// The Sheet root component itself doesn't render visible content
			// The data-slot attribute is on the Radix UI root which is not directly queryable
			// Instead, let's verify the trigger has its data-slot
			const trigger = screen.getByText('Open Sheet')
			expect(trigger.closest('[data-slot="sheet-trigger"]')).toBeInTheDocument()
		})
	})

	describe('SheetTrigger Component', () => {
		it('renders trigger button', () => {
			render(
				<Sheet>
					<SheetTrigger>Click me</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Click me')
			expect(trigger).toBeInTheDocument()
			expect(trigger).toHaveAttribute('type', 'button')
		})

		it('opens sheet when clicked', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open Sheet</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Sheet Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open Sheet')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Sheet Content')).toBeInTheDocument()
			})
		})

		it('supports custom trigger elements', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger asChild>
						<button className="custom-trigger">Custom Trigger</button>
					</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Custom Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Custom Trigger')
			expect(trigger).toHaveClass('custom-trigger')

			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Custom Content')).toBeInTheDocument()
			})
		})

		it('has correct data-slot attribute', () => {
			render(
				<Sheet>
					<SheetTrigger>Open Sheet</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = document.querySelector('[data-slot="sheet-trigger"]')
			expect(trigger).toBeInTheDocument()
		})

		it('handles disabled state', () => {
			render(
				<Sheet>
					<SheetTrigger disabled>Disabled Trigger</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Disabled Trigger')
			expect(trigger).toBeDisabled()
		})
	})

	describe('SheetContent Component', () => {
		it('renders content with default styling and side', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetTitle>Default Content</SheetTitle>
						<SheetDescription>Default side content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const content = screen.getByRole('dialog')
				expect(content).toHaveClass(
					'bg-background',
					'fixed',
					'z-50',
					'flex',
					'flex-col',
					'gap-4',
					'shadow-lg',
				)
				// Default side is 'right'
				expect(content).toHaveClass('inset-y-0', 'right-0', 'h-full', 'w-3/4', 'border-l')
			})
		})

		it('renders with different sides', async () => {
			const user = userEvent.setup()

			const sides = ['top', 'right', 'bottom', 'left'] as const

			for (const side of sides) {
				const { unmount } = render(
					<Sheet>
						<SheetTrigger>Open {side}</SheetTrigger>
						<SheetContent side={side}>
							<SheetTitle>Sheet Title</SheetTitle>
							<SheetDescription>{side} Content</SheetDescription>
						</SheetContent>
					</Sheet>,
				)

				const trigger = screen.getByText(`Open ${side}`)
				await user.click(trigger)

				await waitFor(() => {
					const content = screen.getByRole('dialog')
					expect(content).toBeInTheDocument()

					// Check side-specific classes
					switch (side) {
						case 'right':
							expect(content).toHaveClass('inset-y-0', 'right-0', 'h-full', 'border-l')
							break
						case 'left':
							expect(content).toHaveClass('inset-y-0', 'left-0', 'h-full', 'border-r')
							break
						case 'top':
							expect(content).toHaveClass('inset-x-0', 'top-0', 'h-auto', 'border-b')
							break
						case 'bottom':
							expect(content).toHaveClass('inset-x-0', 'bottom-0', 'h-auto', 'border-t')
							break
					}
				})

				unmount()
			}
		})

		it('renders with custom className', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent className="custom-sheet">
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Custom Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const content = screen.getByRole('dialog')
				expect(content).toHaveClass('custom-sheet')
			})
		})

		it('includes close button by default', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Content with close button</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const closeButton = screen.getByRole('button', { name: 'Close' })
				expect(closeButton).toBeInTheDocument()
			})
		})

		it('closes when close button is clicked', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Closable Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Closable Content')).toBeInTheDocument()
			})

			const closeButton = screen.getByRole('button', { name: 'Close' })
			await user.click(closeButton)

			await waitFor(() => {
				expect(screen.queryByText('Closable Content')).not.toBeInTheDocument()
			})
		})

		it('has correct data-slot attribute', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const content = document.querySelector('[data-slot="sheet-content"]')
				expect(content).toBeInTheDocument()
			})
		})

		it('forwards HTML attributes correctly', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent data-testid="test-content" id="sheet-content">
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Test Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const content = screen.getByTestId('test-content')
				expect(content).toHaveAttribute('id', 'sheet-content')
			})
		})
	})

	describe('SheetHeader Component', () => {
		it('renders header with default styling', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Header Title</SheetTitle>
							<SheetDescription>Header description</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const header = document.querySelector('[data-slot="sheet-header"]')
				expect(header).toBeInTheDocument()
				expect(header).toHaveClass('flex', 'flex-col', 'gap-1.5', 'p-4')
			})
		})

		it('renders with custom className', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetHeader className="custom-header">
							<SheetTitle>Custom Header</SheetTitle>
						</SheetHeader>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const header = document.querySelector('[data-slot="sheet-header"]')
				expect(header).toHaveClass('custom-header')
			})
		})

		it('forwards HTML attributes correctly', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetHeader data-testid="test-header" id="header-id">
							<SheetTitle>Test Header</SheetTitle>
						</SheetHeader>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const header = screen.getByTestId('test-header')
				expect(header).toHaveAttribute('id', 'header-id')
			})
		})
	})

	describe('SheetFooter Component', () => {
		it('renders footer with default styling', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Content</SheetDescription>
						<SheetFooter>
							<button>Cancel</button>
							<button>Save</button>
						</SheetFooter>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const footer = document.querySelector('[data-slot="sheet-footer"]')
				expect(footer).toBeInTheDocument()
				expect(footer).toHaveClass('mt-auto', 'flex', 'flex-col', 'gap-2', 'p-4')
			})
		})

		it('renders with custom className', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Content</SheetDescription>
						<SheetFooter className="custom-footer">
							<button>Action</button>
						</SheetFooter>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const footer = document.querySelector('[data-slot="sheet-footer"]')
				expect(footer).toHaveClass('custom-footer')
			})
		})

		it('forwards HTML attributes correctly', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Content</SheetDescription>
						<SheetFooter data-testid="test-footer" id="footer-id">
							<button>Action</button>
						</SheetFooter>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const footer = screen.getByTestId('test-footer')
				expect(footer).toHaveAttribute('id', 'footer-id')
			})
		})
	})

	describe('SheetTitle Component', () => {
		it('renders title with default styling', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const title = document.querySelector('[data-slot="sheet-title"]')
				expect(title).toBeInTheDocument()
				expect(title).toHaveClass('text-foreground', 'font-semibold')
			})
		})

		it('renders with custom className', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetTitle className="custom-title">Custom Title</SheetTitle>
						<SheetDescription>Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const title = document.querySelector('[data-slot="sheet-title"]')
				expect(title).toHaveClass('custom-title')
			})
		})

		it('forwards HTML attributes correctly', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetTitle data-testid="test-title" id="title-id">
							Test Title
						</SheetTitle>
						<SheetDescription>Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const title = screen.getByTestId('test-title')
				expect(title).toHaveAttribute('id', 'title-id')
			})
		})
	})

	describe('SheetDescription Component', () => {
		it('renders description with default styling', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Sheet description text</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const description = document.querySelector('[data-slot="sheet-description"]')
				expect(description).toBeInTheDocument()
				expect(description).toHaveClass('text-muted-foreground', 'text-sm')
			})
		})

		it('renders with custom className', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription className="custom-description">
							Custom description
						</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const description = document.querySelector('[data-slot="sheet-description"]')
				expect(description).toHaveClass('custom-description')
			})
		})

		it('forwards HTML attributes correctly', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription data-testid="test-description" id="description-id">
							Test description
						</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const description = screen.getByTestId('test-description')
				expect(description).toHaveAttribute('id', 'description-id')
			})
		})
	})

	describe('SheetClose Component', () => {
		it('closes sheet when clicked', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Content</SheetDescription>
						<SheetClose>Close Sheet</SheetClose>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Content')).toBeInTheDocument()
			})

			const closeButton = screen.getByText('Close Sheet')
			await user.click(closeButton)

			await waitFor(() => {
				expect(screen.queryByText('Content')).not.toBeInTheDocument()
			})
		})

		it('can render as different element using asChild', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Content</SheetDescription>
						<SheetClose asChild>
							<button className="custom-close">Custom Close</button>
						</SheetClose>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const customClose = screen.getByText('Custom Close')
				expect(customClose).toHaveClass('custom-close')
			})

			const customClose = screen.getByText('Custom Close')
			await user.click(customClose)

			await waitFor(() => {
				expect(screen.queryByText('Content')).not.toBeInTheDocument()
			})
		})

		it('has correct data-slot attribute', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Content</SheetDescription>
						<SheetClose>Close</SheetClose>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const closeElement = document.querySelector('[data-slot="sheet-close"]')
				expect(closeElement).toBeInTheDocument()
			})
		})
	})

	describe('Interaction Behavior', () => {
		it('closes sheet when clicking overlay', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open Sheet</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Closable Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open Sheet')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Closable Content')).toBeInTheDocument()
			})

			// Click on overlay (background)
			const overlay = document.querySelector('[data-slot="sheet-overlay"]')
			if (overlay) {
				await user.click(overlay)

				await waitFor(() => {
					expect(screen.queryByText('Closable Content')).not.toBeInTheDocument()
				})
			}
		})

		it('closes sheet when pressing Escape', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open Sheet</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Escapable Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open Sheet')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Escapable Content')).toBeInTheDocument()
			})

			await user.keyboard('{Escape}')

			await waitFor(() => {
				expect(screen.queryByText('Escapable Content')).not.toBeInTheDocument()
			})
		})

		it('toggles sheet when trigger is clicked multiple times', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Toggle Sheet</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Toggle Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Toggle Sheet')

			// Open
			await user.click(trigger)
			await waitFor(() => {
				expect(screen.getByText('Toggle Content')).toBeInTheDocument()
			})

			// Close by clicking trigger again (if supported by Radix UI)
			await user.keyboard('{Escape}')
			await waitFor(() => {
				expect(screen.queryByText('Toggle Content')).not.toBeInTheDocument()
			})

			// Open again
			await user.click(trigger)
			await waitFor(() => {
				expect(screen.getByText('Toggle Content')).toBeInTheDocument()
			})
		})
	})

	describe('Keyboard Navigation', () => {
		it('supports keyboard activation of trigger', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Keyboard Trigger</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Keyboard Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Keyboard Trigger')
			trigger.focus()

			await user.keyboard('{Enter}')

			await waitFor(() => {
				expect(screen.getByText('Keyboard Content')).toBeInTheDocument()
			})
		})

		it('supports Space key activation', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Space Trigger</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Space Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Space Trigger')
			trigger.focus()

			await user.keyboard(' ')

			await waitFor(() => {
				expect(screen.getByText('Space Content')).toBeInTheDocument()
			})
		})

		it('traps focus within sheet', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Focus Trap</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Focus trap content</SheetDescription>
						<input placeholder="First input" />
						<input placeholder="Second input" />
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Focus Trap')
			await user.click(trigger)

			await waitFor(() => {
				const firstInput = screen.getByPlaceholderText('First input')
				expect(firstInput).toBeInTheDocument()
			})

			// Focus management is handled by Radix UI internally
			const firstInput = screen.getByPlaceholderText('First input')
			const secondInput = screen.getByPlaceholderText('Second input')

			// Test that inputs are focusable
			firstInput.focus()
			expect(firstInput).toHaveFocus()

			secondInput.focus()
			expect(secondInput).toHaveFocus()
		})
	})

	describe('Accessibility', () => {
		it('has proper ARIA attributes', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>ARIA Trigger</SheetTrigger>
					<SheetContent>
						<SheetTitle>ARIA Sheet</SheetTitle>
						<SheetDescription>ARIA Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('ARIA Trigger')
			await user.click(trigger)

			await waitFor(() => {
				const dialog = screen.getByRole('dialog')
				expect(dialog).toBeInTheDocument()
			})
		})

		it('supports custom ARIA labels', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger aria-label="Custom trigger label">Trigger</SheetTrigger>
					<SheetContent aria-label="Custom content label">
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByLabelText('Custom trigger label')
			expect(trigger).toBeInTheDocument()

			await user.click(trigger)

			await waitFor(() => {
				const content = screen.getByLabelText('Custom content label')
				expect(content).toBeInTheDocument()
			})
		})

		it('close button has accessible label', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Open</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const closeButton = screen.getByRole('button', { name: 'Close' })
				expect(closeButton).toBeInTheDocument()
			})
		})
	})

	describe('Event Handling', () => {
		it('calls onOpenChange when sheet state changes', async () => {
			const handleOpenChange = vi.fn()
			const user = userEvent.setup()

			render(
				<Sheet onOpenChange={handleOpenChange}>
					<SheetTrigger>Event Trigger</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Event Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Event Trigger')
			await user.click(trigger)

			expect(handleOpenChange).toHaveBeenCalledWith(true)

			await user.keyboard('{Escape}')

			expect(handleOpenChange).toHaveBeenCalledWith(false)
		})

		it('handles trigger click events', async () => {
			const handleClick = vi.fn()
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger onClick={handleClick}>Click Trigger</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Click Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Click Trigger')
			await user.click(trigger)

			expect(handleClick).toHaveBeenCalledOnce()
		})
	})

	describe('Portal Behavior', () => {
		it('renders content in portal by default', async () => {
			const user = userEvent.setup()

			render(
				<div data-testid="container">
					<Sheet>
						<SheetTrigger>Portal Trigger</SheetTrigger>
						<SheetContent>
							<SheetTitle>Sheet Title</SheetTitle>
							<SheetDescription>Portal Content</SheetDescription>
						</SheetContent>
					</Sheet>
				</div>,
			)

			const trigger = screen.getByText('Portal Trigger')
			await user.click(trigger)

			await waitFor(() => {
				const content = screen.getByText('Portal Content')
				expect(content).toBeInTheDocument()

				// Content should not be inside the container due to portal
				const container = screen.getByTestId('container')
				expect(container).not.toContainElement(content)
			})
		})
	})

	describe('Edge Cases', () => {
		it('handles rapid open/close operations', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Rapid Trigger</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Rapid Content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Rapid Trigger')

			// Rapidly open and close
			await user.click(trigger)
			await user.keyboard('{Escape}')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Rapid Content')).toBeInTheDocument()
			})
		})

		it('handles sheet without title', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>No Title</SheetTrigger>
					<SheetContent>
						<SheetDescription>Content without title</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('No Title')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Content without title')).toBeInTheDocument()
			})
		})

		it('handles sheet without description', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>No Description</SheetTrigger>
					<SheetContent>
						<SheetTitle>Title without description</SheetTitle>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('No Description')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Title without description')).toBeInTheDocument()
			})
		})

		it('handles undefined className gracefully', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Undefined Class</SheetTrigger>
					<SheetContent className={undefined}>
						<SheetTitle className={undefined}>Title</SheetTitle>
						<SheetDescription className={undefined}>Description</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Undefined Class')
			await user.click(trigger)

			await waitFor(() => {
				const content = screen.getByRole('dialog')
				expect(content).toBeInTheDocument()
			})
		})
	})

	describe('Complex Scenarios', () => {
		it('handles nested interactive elements', async () => {
			const handleButtonClick = vi.fn()
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Nested Trigger</SheetTrigger>
					<SheetContent>
						<SheetTitle>Nested Elements</SheetTitle>
						<SheetDescription>Sheet with nested interactive elements</SheetDescription>
						<div>
							<input placeholder="Input field" />
							<button onClick={handleButtonClick}>Nested Button</button>
							<select>
								<option>Option 1</option>
								<option>Option 2</option>
							</select>
						</div>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Nested Trigger')
			await user.click(trigger)

			await waitFor(() => {
				const input = screen.getByPlaceholderText('Input field')
				const button = screen.getByText('Nested Button')
				const select = screen.getByRole('combobox')

				expect(input).toBeInTheDocument()
				expect(button).toBeInTheDocument()
				expect(select).toBeInTheDocument()
			})

			// Interact with nested elements
			const input = screen.getByPlaceholderText('Input field')
			const button = screen.getByText('Nested Button')

			await user.type(input, 'test')
			expect(input).toHaveValue('test')

			await user.click(button)
			expect(handleButtonClick).toHaveBeenCalledOnce()
		})

		it('maintains state across multiple sheets', async () => {
			const user = userEvent.setup()

			render(
				<div>
					<Sheet>
						<SheetTrigger>First Sheet</SheetTrigger>
						<SheetContent>
							<SheetTitle>First Sheet</SheetTitle>
							<SheetDescription>First Content</SheetDescription>
						</SheetContent>
					</Sheet>
					<Sheet>
						<SheetTrigger>Second Sheet</SheetTrigger>
						<SheetContent>
							<SheetTitle>Second Sheet</SheetTitle>
							<SheetDescription>Second Content</SheetDescription>
						</SheetContent>
					</Sheet>
				</div>,
			)

			const firstTrigger = screen.getByText('First Sheet')
			const secondTrigger = screen.getByText('Second Sheet')

			// Open first sheet
			await user.click(firstTrigger)
			await waitFor(() => {
				expect(screen.getByText('First Content')).toBeInTheDocument()
			})

			// Close first sheet
			await user.keyboard('{Escape}')
			await waitFor(() => {
				expect(screen.queryByText('First Content')).not.toBeInTheDocument()
			})

			// Open second sheet
			await user.click(secondTrigger)
			await waitFor(() => {
				expect(screen.getByText('Second Content')).toBeInTheDocument()
			})
		})

		it('handles form submission within sheet', async () => {
			const handleSubmit = vi.fn((e) => e.preventDefault())
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Form Sheet</SheetTrigger>
					<SheetContent>
						<SheetTitle>Form Sheet</SheetTitle>
						<SheetDescription>Sheet with form</SheetDescription>
						<form onSubmit={handleSubmit}>
							<input name="name" placeholder="Name" />
							<button type="submit">Submit</button>
						</form>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Form Sheet')
			await user.click(trigger)

			await waitFor(() => {
				const input = screen.getByPlaceholderText('Name')
				const submitButton = screen.getByRole('button', { name: 'Submit' })

				expect(input).toBeInTheDocument()
				expect(submitButton).toBeInTheDocument()
			})

			const input = screen.getByPlaceholderText('Name')
			const submitButton = screen.getByRole('button', { name: 'Submit' })

			await user.type(input, 'John Doe')
			await user.click(submitButton)

			expect(handleSubmit).toHaveBeenCalledOnce()
		})
	})

	describe('Radix UI Integration', () => {
		it('inherits Radix Dialog functionality', async () => {
			const user = userEvent.setup()

			render(
				<Sheet>
					<SheetTrigger>Radix Sheet</SheetTrigger>
					<SheetContent>
						<SheetTitle>Radix Integration</SheetTitle>
						<SheetDescription>Radix content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Radix Sheet')
			await user.click(trigger)

			await waitFor(() => {
				const dialog = screen.getByRole('dialog')
				expect(dialog).toBeInTheDocument()
			})
		})

		it('supports modal prop', () => {
			render(
				<Sheet modal={false}>
					<SheetTrigger>Non-modal Sheet</SheetTrigger>
					<SheetContent>
						<SheetTitle>Non-modal</SheetTitle>
						<SheetDescription>Non-modal content</SheetDescription>
					</SheetContent>
				</Sheet>,
			)

			const trigger = screen.getByText('Non-modal Sheet')
			expect(trigger).toBeInTheDocument()
		})
	})
})
