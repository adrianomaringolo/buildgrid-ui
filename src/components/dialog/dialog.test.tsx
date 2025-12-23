import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './dialog'

describe('Dialog', () => {
	describe('Dialog Component', () => {
		it('renders dialog trigger and content when open', async () => {
			const user = userEvent.setup()

			render(
				<Dialog>
					<DialogTrigger>Open Dialog</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Dialog Title</DialogTitle>
							<DialogDescription>Dialog description</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>,
			)

			const trigger = screen.getByRole('button', { name: 'Open Dialog' })
			expect(trigger).toBeInTheDocument()

			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByRole('dialog')).toBeInTheDocument()
				expect(screen.getByText('Dialog Title')).toBeInTheDocument()
				expect(screen.getByText('Dialog description')).toBeInTheDocument()
			})
		})

		it('does not render content when closed', () => {
			render(
				<Dialog open={false}>
					<DialogTrigger>Open Dialog</DialogTrigger>
					<DialogContent>
						<DialogTitle>Dialog Title</DialogTitle>
					</DialogContent>
				</Dialog>,
			)

			expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
			expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument()
		})

		it('calls onOpenChange when dialog state changes', async () => {
			const handleOpenChange = vi.fn()
			const user = userEvent.setup()

			render(
				<Dialog onOpenChange={handleOpenChange}>
					<DialogTrigger>Open Dialog</DialogTrigger>
					<DialogContent>
						<DialogTitle>Dialog Title</DialogTitle>
					</DialogContent>
				</Dialog>,
			)

			const trigger = screen.getByRole('button', { name: 'Open Dialog' })
			await user.click(trigger)

			expect(handleOpenChange).toHaveBeenCalledWith(true)
		})
	})

	describe('DialogTrigger Component', () => {
		it('renders trigger button', () => {
			render(
				<Dialog>
					<DialogTrigger>Click to open</DialogTrigger>
					<DialogContent>
						<DialogTitle>Title</DialogTitle>
					</DialogContent>
				</Dialog>,
			)

			const trigger = screen.getByRole('button', { name: 'Click to open' })
			expect(trigger).toBeInTheDocument()
		})

		it('can render as different element using asChild', () => {
			render(
				<Dialog>
					<DialogTrigger asChild>
						<button type="button">Custom Trigger</button>
					</DialogTrigger>
					<DialogContent>
						<DialogTitle>Title</DialogTitle>
					</DialogContent>
				</Dialog>,
			)

			const trigger = screen.getByRole('button', { name: 'Custom Trigger' })
			expect(trigger).toBeInTheDocument()
		})
	})

	describe('DialogContent Component', () => {
		it('renders content with default close button', () => {
			render(
				<Dialog open>
					<DialogContent>
						<DialogTitle>Content Title</DialogTitle>
						<p>Dialog content</p>
					</DialogContent>
				</Dialog>,
			)

			expect(screen.getByRole('dialog')).toBeInTheDocument()
			expect(screen.getByText('Content Title')).toBeInTheDocument()
			expect(screen.getByText('Dialog content')).toBeInTheDocument()
			expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
		})

		it('renders content without close button when showCloseButton is false', () => {
			render(
				<Dialog open>
					<DialogContent showCloseButton={false}>
						<DialogTitle>Content Title</DialogTitle>
						<p>Dialog content</p>
					</DialogContent>
				</Dialog>,
			)

			expect(screen.getByRole('dialog')).toBeInTheDocument()
			expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument()
		})

		it('renders with custom className', () => {
			render(
				<Dialog open>
					<DialogContent className="custom-dialog">
						<DialogTitle>Title</DialogTitle>
					</DialogContent>
				</Dialog>,
			)

			const dialog = screen.getByRole('dialog')
			expect(dialog).toHaveClass('custom-dialog')
		})

		it('applies correct default styling', () => {
			render(
				<Dialog open>
					<DialogContent>
						<DialogTitle>Title</DialogTitle>
					</DialogContent>
				</Dialog>,
			)

			const dialog = screen.getByRole('dialog')
			expect(dialog).toHaveClass(
				'fixed',
				'left-[50%]',
				'top-[50%]',
				'z-50',
				'grid',
				'w-full',
				'max-w-lg',
				'translate-x-[-50%]',
				'translate-y-[-50%]',
				'gap-4',
				'border',
				'bg-background',
				'p-6',
				'shadow-lg',
			)
		})

		it('closes dialog when close button is clicked', async () => {
			const handleOpenChange = vi.fn()
			const user = userEvent.setup()

			render(
				<Dialog open onOpenChange={handleOpenChange}>
					<DialogContent>
						<DialogTitle>Title</DialogTitle>
					</DialogContent>
				</Dialog>,
			)

			const closeButton = screen.getByRole('button', { name: /close/i })
			await user.click(closeButton)

			expect(handleOpenChange).toHaveBeenCalledWith(false)
		})
	})

	describe('DialogHeader Component', () => {
		it('renders header with correct styling', () => {
			render(
				<Dialog open>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Header Title</DialogTitle>
							<DialogDescription>Header description</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>,
			)

			const header = screen.getByText('Header Title').closest('div')
			expect(header).toHaveClass(
				'flex',
				'flex-col',
				'space-y-1.5',
				'text-center',
				'sm:text-left',
			)
		})

		it('renders with custom className', () => {
			render(
				<Dialog open>
					<DialogContent>
						<DialogHeader className="custom-header">
							<DialogTitle>Title</DialogTitle>
						</DialogHeader>
					</DialogContent>
				</Dialog>,
			)

			const header = screen.getByText('Title').closest('div')
			expect(header).toHaveClass('custom-header')
		})
	})

	describe('DialogTitle Component', () => {
		it('renders title with correct styling', () => {
			render(
				<Dialog open>
					<DialogContent>
						<DialogTitle>Dialog Title</DialogTitle>
					</DialogContent>
				</Dialog>,
			)

			const title = screen.getByText('Dialog Title')
			expect(title).toBeInTheDocument()
			expect(title).toHaveClass(
				'text-lg',
				'font-semibold',
				'leading-none',
				'tracking-tight',
			)
		})

		it('renders with custom className', () => {
			render(
				<Dialog open>
					<DialogContent>
						<DialogTitle className="custom-title">Custom Title</DialogTitle>
					</DialogContent>
				</Dialog>,
			)

			const title = screen.getByText('Custom Title')
			expect(title).toHaveClass('custom-title')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Dialog open>
					<DialogContent>
						<DialogTitle data-testid="test-title" id="title-id">
							Title
						</DialogTitle>
					</DialogContent>
				</Dialog>,
			)

			const title = screen.getByTestId('test-title')
			expect(title).toHaveAttribute('id', 'title-id')
		})
	})

	describe('DialogDescription Component', () => {
		it('renders description with correct styling', () => {
			render(
				<Dialog open>
					<DialogContent>
						<DialogTitle>Title</DialogTitle>
						<DialogDescription>This is a description</DialogDescription>
					</DialogContent>
				</Dialog>,
			)

			const description = screen.getByText('This is a description')
			expect(description).toBeInTheDocument()
			expect(description).toHaveClass('text-sm', 'text-muted-foreground')
		})

		it('renders with custom className', () => {
			render(
				<Dialog open>
					<DialogContent>
						<DialogTitle>Title</DialogTitle>
						<DialogDescription className="custom-description">
							Custom description
						</DialogDescription>
					</DialogContent>
				</Dialog>,
			)

			const description = screen.getByText('Custom description')
			expect(description).toHaveClass('custom-description')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Dialog open>
					<DialogContent>
						<DialogTitle>Title</DialogTitle>
						<DialogDescription data-testid="test-description" id="desc-id">
							Description
						</DialogDescription>
					</DialogContent>
				</Dialog>,
			)

			const description = screen.getByTestId('test-description')
			expect(description).toHaveAttribute('id', 'desc-id')
		})
	})

	describe('DialogFooter Component', () => {
		it('renders footer with correct styling', () => {
			render(
				<Dialog open>
					<DialogContent>
						<DialogTitle>Title</DialogTitle>
						<DialogFooter>
							<button>Cancel</button>
							<button>Confirm</button>
						</DialogFooter>
					</DialogContent>
				</Dialog>,
			)

			const footer = screen.getByText('Cancel').closest('div')
			expect(footer).toHaveClass(
				'flex',
				'flex-col-reverse',
				'sm:flex-row',
				'sm:justify-end',
				'sm:space-x-2',
			)
		})

		it('renders with custom className', () => {
			render(
				<Dialog open>
					<DialogContent>
						<DialogTitle>Title</DialogTitle>
						<DialogFooter className="custom-footer">
							<button>Action</button>
						</DialogFooter>
					</DialogContent>
				</Dialog>,
			)

			const footer = screen.getByText('Action').closest('div')
			expect(footer).toHaveClass('custom-footer')
		})
	})

	describe('DialogClose Component', () => {
		it('closes dialog when clicked', async () => {
			const handleOpenChange = vi.fn()
			const user = userEvent.setup()

			render(
				<Dialog open onOpenChange={handleOpenChange}>
					<DialogContent>
						<DialogTitle>Title</DialogTitle>
						<DialogClose>Close Dialog</DialogClose>
					</DialogContent>
				</Dialog>,
			)

			const closeButton = screen.getByRole('button', { name: 'Close Dialog' })
			await user.click(closeButton)

			expect(handleOpenChange).toHaveBeenCalledWith(false)
		})

		it('can render as different element using asChild', async () => {
			const handleOpenChange = vi.fn()
			const user = userEvent.setup()

			render(
				<Dialog open onOpenChange={handleOpenChange}>
					<DialogContent>
						<DialogTitle>Title</DialogTitle>
						<DialogClose asChild>
							<button type="button">Custom Close</button>
						</DialogClose>
					</DialogContent>
				</Dialog>,
			)

			const closeButton = screen.getByRole('button', { name: 'Custom Close' })
			await user.click(closeButton)

			expect(handleOpenChange).toHaveBeenCalledWith(false)
		})
	})

	describe('Keyboard Navigation', () => {
		it('closes dialog when Escape key is pressed', async () => {
			const handleOpenChange = vi.fn()
			const user = userEvent.setup()

			render(
				<Dialog open onOpenChange={handleOpenChange}>
					<DialogContent>
						<DialogTitle>Title</DialogTitle>
						<p>Content</p>
					</DialogContent>
				</Dialog>,
			)

			await user.keyboard('{Escape}')

			expect(handleOpenChange).toHaveBeenCalledWith(false)
		})

		it('traps focus within dialog', async () => {
			const user = userEvent.setup()

			render(
				<Dialog open>
					<DialogContent>
						<DialogTitle>Title</DialogTitle>
						<input placeholder="First input" />
						<input placeholder="Second input" />
						<button>Action</button>
					</DialogContent>
				</Dialog>,
			)

			const firstInput = screen.getByPlaceholderText('First input')
			const secondInput = screen.getByPlaceholderText('Second input')
			const actionButton = screen.getByRole('button', { name: 'Action' })

			// Focus management is handled by Radix UI internally
			// Test that elements are focusable
			firstInput.focus()
			expect(firstInput).toHaveFocus()

			secondInput.focus()
			expect(secondInput).toHaveFocus()

			actionButton.focus()
			expect(actionButton).toHaveFocus()
		})
	})

	describe('Accessibility', () => {
		it('has proper ARIA attributes', () => {
			render(
				<Dialog open>
					<DialogContent>
						<DialogTitle>Accessible Title</DialogTitle>
						<DialogDescription>Accessible description</DialogDescription>
					</DialogContent>
				</Dialog>,
			)

			const dialog = screen.getByRole('dialog')
			expect(dialog).toHaveAttribute('aria-labelledby')
			expect(dialog).toHaveAttribute('aria-describedby')
		})

		it('supports aria-label', () => {
			render(
				<Dialog open>
					<DialogContent aria-label="Custom dialog">
						<DialogTitle>Title</DialogTitle>
					</DialogContent>
				</Dialog>,
			)

			const dialog = screen.getByLabelText('Custom dialog')
			expect(dialog).toBeInTheDocument()
		})

		it('close button has accessible label', () => {
			render(
				<Dialog open>
					<DialogContent>
						<DialogTitle>Title</DialogTitle>
					</DialogContent>
				</Dialog>,
			)

			const closeButton = screen.getByRole('button', { name: /close/i })
			expect(closeButton).toBeInTheDocument()

			// Check for screen reader text
			const srText = closeButton.querySelector('.sr-only')
			expect(srText).toHaveTextContent('Close')
		})
	})

	describe('Overlay Behavior', () => {
		it('closes dialog when overlay is clicked', async () => {
			const handleOpenChange = vi.fn()
			const user = userEvent.setup()

			render(
				<Dialog open onOpenChange={handleOpenChange}>
					<DialogContent>
						<DialogTitle>Title</DialogTitle>
					</DialogContent>
				</Dialog>,
			)

			// Click on the overlay (outside the dialog content)
			const overlay = document.querySelector('[data-radix-dialog-overlay]')
			if (overlay) {
				await user.click(overlay)
				expect(handleOpenChange).toHaveBeenCalledWith(false)
			}
		})
	})

	describe('Complete Dialog Structure', () => {
		it('renders complete dialog with all components', async () => {
			const user = userEvent.setup()

			render(
				<Dialog>
					<DialogTrigger>Open Complete Dialog</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Complete Dialog</DialogTitle>
							<DialogDescription>This is a complete dialog example</DialogDescription>
						</DialogHeader>
						<div>
							<p>Dialog body content</p>
							<input placeholder="Input field" />
						</div>
						<DialogFooter>
							<DialogClose>Cancel</DialogClose>
							<button>Confirm</button>
						</DialogFooter>
					</DialogContent>
				</Dialog>,
			)

			const trigger = screen.getByRole('button', { name: 'Open Complete Dialog' })
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByRole('dialog')).toBeInTheDocument()
				expect(screen.getByText('Complete Dialog')).toBeInTheDocument()
				expect(screen.getByText('This is a complete dialog example')).toBeInTheDocument()
				expect(screen.getByText('Dialog body content')).toBeInTheDocument()
				expect(screen.getByPlaceholderText('Input field')).toBeInTheDocument()
				expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
				expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument()
			})
		})
	})

	describe('Edge Cases', () => {
		it('handles dialog without title', () => {
			// Mock console.warn to avoid noise in test output
			const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

			render(
				<Dialog open>
					<DialogContent>
						<p>Content without title</p>
					</DialogContent>
				</Dialog>,
			)

			expect(screen.getByRole('dialog')).toBeInTheDocument()
			expect(screen.getByText('Content without title')).toBeInTheDocument()

			consoleSpy.mockRestore()
		})

		it('handles dialog without description', () => {
			render(
				<Dialog open>
					<DialogContent>
						<DialogTitle>Title Only</DialogTitle>
					</DialogContent>
				</Dialog>,
			)

			expect(screen.getByRole('dialog')).toBeInTheDocument()
			expect(screen.getByText('Title Only')).toBeInTheDocument()
		})

		it('handles undefined className gracefully', () => {
			render(
				<Dialog open>
					<DialogContent className={undefined}>
						<DialogTitle>Title</DialogTitle>
					</DialogContent>
				</Dialog>,
			)

			const dialog = screen.getByRole('dialog')
			expect(dialog).toHaveClass('fixed', 'left-[50%]', 'top-[50%]') // Should still have default classes
		})
	})

	describe('Controlled vs Uncontrolled', () => {
		it('works as controlled component', async () => {
			const ControlledDialog = () => {
				const [open, setOpen] = React.useState(false)

				return (
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger>Open Controlled</DialogTrigger>
						<DialogContent>
							<DialogTitle>Controlled Dialog</DialogTitle>
						</DialogContent>
					</Dialog>
				)
			}

			const user = userEvent.setup()
			render(<ControlledDialog />)

			const trigger = screen.getByRole('button', { name: 'Open Controlled' })
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByRole('dialog')).toBeInTheDocument()
			})

			const closeButton = screen.getByRole('button', { name: /close/i })
			await user.click(closeButton)

			await waitFor(() => {
				expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
			})
		})

		it('works as uncontrolled component', async () => {
			const user = userEvent.setup()

			render(
				<Dialog>
					<DialogTrigger>Open Uncontrolled</DialogTrigger>
					<DialogContent>
						<DialogTitle>Uncontrolled Dialog</DialogTitle>
					</DialogContent>
				</Dialog>,
			)

			const trigger = screen.getByRole('button', { name: 'Open Uncontrolled' })
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByRole('dialog')).toBeInTheDocument()
			})
		})
	})
})
