import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './alert-dialog'

describe('AlertDialog', () => {
	const AlertDialogExample = ({
		onAction,
		onCancel,
	}: {
		onAction?: () => void
		onCancel?: () => void
	}) => (
		<AlertDialog>
			<AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your account and
						remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onAction}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)

	describe('Rendering', () => {
		it('renders trigger button', () => {
			render(<AlertDialogExample />)

			expect(screen.getByRole('button', { name: 'Open Dialog' })).toBeInTheDocument()
		})

		it('does not show dialog content initially', () => {
			render(<AlertDialogExample />)

			expect(screen.queryByText('Are you absolutely sure?')).not.toBeInTheDocument()
		})

		it('shows dialog content when trigger is clicked', async () => {
			const user = userEvent.setup()
			render(<AlertDialogExample />)

			const trigger = screen.getByRole('button', { name: 'Open Dialog' })
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Are you absolutely sure?')).toBeInTheDocument()
			})
		})
	})

	describe('Dialog Content', () => {
		it('renders title correctly', async () => {
			const user = userEvent.setup()
			render(<AlertDialogExample />)

			await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

			await waitFor(() => {
				const title = screen.getByText('Are you absolutely sure?')
				expect(title).toBeInTheDocument()
				expect(title).toHaveClass('text-lg', 'font-semibold')
			})
		})

		it('renders description correctly', async () => {
			const user = userEvent.setup()
			render(<AlertDialogExample />)

			await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

			await waitFor(() => {
				const description = screen.getByText(/This action cannot be undone/)
				expect(description).toBeInTheDocument()
				expect(description).toHaveClass('text-sm', 'text-muted-foreground')
			})
		})

		it('renders action and cancel buttons', async () => {
			const user = userEvent.setup()
			render(<AlertDialogExample />)

			await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

			await waitFor(() => {
				expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument()
				expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
			})
		})
	})

	describe('Dialog Structure', () => {
		it('applies correct classes to header', async () => {
			const user = userEvent.setup()
			render(<AlertDialogExample />)

			await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

			await waitFor(() => {
				const title = screen.getByText('Are you absolutely sure?')
				const header = title.closest('div')
				expect(header).toHaveClass(
					'flex',
					'flex-col',
					'space-y-2',
					'text-center',
					'sm:text-left',
				)
			})
		})

		it('applies correct classes to footer', async () => {
			const user = userEvent.setup()
			render(<AlertDialogExample />)

			await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

			await waitFor(() => {
				const cancelButton = screen.getByRole('button', { name: 'Cancel' })
				const footer = cancelButton.closest('div')
				expect(footer).toHaveClass(
					'flex',
					'flex-col-reverse',
					'sm:flex-row',
					'sm:justify-end',
					'sm:space-x-2',
				)
			})
		})

		it('applies correct classes to content', async () => {
			const user = userEvent.setup()
			render(<AlertDialogExample />)

			await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

			await waitFor(() => {
				const dialog = screen.getByRole('alertdialog')
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
					'duration-200',
				)
			})
		})
	})

	describe('Button Interactions', () => {
		it('calls onAction when action button is clicked', async () => {
			const handleAction = vi.fn()
			const user = userEvent.setup()

			render(<AlertDialogExample onAction={handleAction} />)

			await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

			await waitFor(() => {
				expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument()
			})

			await user.click(screen.getByRole('button', { name: 'Continue' }))
			expect(handleAction).toHaveBeenCalledOnce()
		})

		it('calls onCancel when cancel button is clicked', async () => {
			const handleCancel = vi.fn()
			const user = userEvent.setup()

			render(<AlertDialogExample onCancel={handleCancel} />)

			await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

			await waitFor(() => {
				expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
			})

			await user.click(screen.getByRole('button', { name: 'Cancel' }))
			expect(handleCancel).toHaveBeenCalledOnce()
		})

		it('closes dialog when cancel button is clicked', async () => {
			const user = userEvent.setup()
			render(<AlertDialogExample />)

			await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

			await waitFor(() => {
				expect(screen.getByText('Are you absolutely sure?')).toBeInTheDocument()
			})

			await user.click(screen.getByRole('button', { name: 'Cancel' }))

			await waitFor(() => {
				expect(screen.queryByText('Are you absolutely sure?')).not.toBeInTheDocument()
			})
		})

		it('closes dialog when action button is clicked', async () => {
			const user = userEvent.setup()
			render(<AlertDialogExample />)

			await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

			await waitFor(() => {
				expect(screen.getByText('Are you absolutely sure?')).toBeInTheDocument()
			})

			await user.click(screen.getByRole('button', { name: 'Continue' }))

			await waitFor(() => {
				expect(screen.queryByText('Are you absolutely sure?')).not.toBeInTheDocument()
			})
		})
	})

	describe('Button Styling', () => {
		it('applies default button styles to action button', async () => {
			const user = userEvent.setup()
			render(<AlertDialogExample />)

			await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

			await waitFor(() => {
				const actionButton = screen.getByRole('button', { name: 'Continue' })
				expect(actionButton).toHaveClass('bg-primary', 'text-primary-foreground')
			})
		})

		it('applies outline button styles to cancel button', async () => {
			const user = userEvent.setup()
			render(<AlertDialogExample />)

			await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

			await waitFor(() => {
				const cancelButton = screen.getByRole('button', { name: 'Cancel' })
				expect(cancelButton).toHaveClass('border', 'bg-background')
				expect(cancelButton).toHaveClass('mt-2', 'sm:mt-0')
			})
		})
	})

	describe('Keyboard Navigation', () => {
		it('supports Escape key to close dialog', async () => {
			const user = userEvent.setup()
			render(<AlertDialogExample />)

			await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

			await waitFor(() => {
				expect(screen.getByText('Are you absolutely sure?')).toBeInTheDocument()
			})

			await user.keyboard('{Escape}')

			await waitFor(() => {
				expect(screen.queryByText('Are you absolutely sure?')).not.toBeInTheDocument()
			})
		})

		it('supports Tab navigation between buttons', async () => {
			const user = userEvent.setup()
			render(<AlertDialogExample />)

			await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

			await waitFor(() => {
				expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
			})

			// Tab should focus one of the buttons (order may vary)
			await user.tab()
			const focusedElement = document.activeElement
			const cancelButton = screen.getByRole('button', { name: 'Cancel' })
			const actionButton = screen.getByRole('button', { name: 'Continue' })

			expect([cancelButton, actionButton]).toContain(focusedElement)
		})

		it('supports Enter key on focused buttons', async () => {
			const handleAction = vi.fn()
			const user = userEvent.setup()

			render(<AlertDialogExample onAction={handleAction} />)

			await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

			await waitFor(() => {
				expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument()
			})

			// Focus the action button and press Enter
			const actionButton = screen.getByRole('button', { name: 'Continue' })
			actionButton.focus()
			await user.keyboard('{Enter}')

			expect(handleAction).toHaveBeenCalledOnce()
		})
	})

	describe('Accessibility', () => {
		it('has proper dialog role', async () => {
			const user = userEvent.setup()
			render(<AlertDialogExample />)

			await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

			await waitFor(() => {
				expect(screen.getByRole('alertdialog')).toBeInTheDocument()
			})
		})

		it('has proper aria-labelledby and aria-describedby', async () => {
			const user = userEvent.setup()
			render(<AlertDialogExample />)

			await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

			await waitFor(() => {
				const dialog = screen.getByRole('alertdialog')
				expect(dialog).toHaveAttribute('aria-labelledby')
				expect(dialog).toHaveAttribute('aria-describedby')
			})
		})

		it('traps focus within dialog', async () => {
			const user = userEvent.setup()
			render(<AlertDialogExample />)

			await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

			await waitFor(() => {
				expect(screen.getByRole('alertdialog')).toBeInTheDocument()
			})

			// Focus should be trapped within the dialog
			const cancelButton = screen.getByRole('button', { name: 'Cancel' })
			const actionButton = screen.getByRole('button', { name: 'Continue' })

			// Tab through the dialog
			await user.tab()
			expect([cancelButton, actionButton]).toContain(document.activeElement)
		})
	})

	describe('Custom Props', () => {
		it('applies custom className to components', async () => {
			const user = userEvent.setup()
			render(
				<AlertDialog>
					<AlertDialogTrigger className="custom-trigger">Open</AlertDialogTrigger>
					<AlertDialogContent className="custom-content">
						<AlertDialogHeader className="custom-header">
							<AlertDialogTitle className="custom-title">Title</AlertDialogTitle>
							<AlertDialogDescription className="custom-description">
								Description
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter className="custom-footer">
							<AlertDialogCancel className="custom-cancel">Cancel</AlertDialogCancel>
							<AlertDialogAction className="custom-action">Action</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>,
			)

			expect(screen.getByRole('button', { name: 'Open' })).toHaveClass('custom-trigger')

			await user.click(screen.getByRole('button', { name: 'Open' }))

			await waitFor(() => {
				expect(screen.getByRole('alertdialog')).toHaveClass('custom-content')
				expect(screen.getByText('Title')).toHaveClass('custom-title')
				expect(screen.getByText('Description')).toHaveClass('custom-description')
				expect(screen.getByRole('button', { name: 'Cancel' })).toHaveClass(
					'custom-cancel',
				)
				expect(screen.getByRole('button', { name: 'Action' })).toHaveClass(
					'custom-action',
				)
			})
		})

		it('forwards refs correctly', () => {
			const titleRef = { current: null }
			const descriptionRef = { current: null }
			const actionRef = { current: null }
			const cancelRef = { current: null }

			render(
				<AlertDialog defaultOpen>
					<AlertDialogContent>
						<AlertDialogTitle ref={titleRef}>Title</AlertDialogTitle>
						<AlertDialogDescription ref={descriptionRef}>
							Description
						</AlertDialogDescription>
						<AlertDialogAction ref={actionRef}>Action</AlertDialogAction>
						<AlertDialogCancel ref={cancelRef}>Cancel</AlertDialogCancel>
					</AlertDialogContent>
				</AlertDialog>,
			)

			expect(titleRef.current).toBeTruthy()
			expect(descriptionRef.current).toBeTruthy()
			expect(actionRef.current).toBeTruthy()
			expect(cancelRef.current).toBeTruthy()
		})
	})

	describe('Edge Cases', () => {
		it('handles dialog without title', async () => {
			const user = userEvent.setup()
			render(
				<AlertDialog>
					<AlertDialogTrigger>Open</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogDescription>Just a description</AlertDialogDescription>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>,
			)

			await user.click(screen.getByRole('button', { name: 'Open' }))

			await waitFor(() => {
				expect(screen.getByText('Just a description')).toBeInTheDocument()
				expect(screen.getByRole('alertdialog')).toBeInTheDocument()
			})
		})

		it('handles dialog without description', async () => {
			const user = userEvent.setup()
			render(
				<AlertDialog>
					<AlertDialogTrigger>Open</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogTitle>Just a title</AlertDialogTitle>
						<AlertDialogFooter>
							<AlertDialogAction>Action</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>,
			)

			await user.click(screen.getByRole('button', { name: 'Open' }))

			await waitFor(() => {
				expect(screen.getByText('Just a title')).toBeInTheDocument()
				expect(screen.getByRole('alertdialog')).toBeInTheDocument()
			})
		})

		it('handles dialog with only action button', async () => {
			const user = userEvent.setup()
			render(
				<AlertDialog>
					<AlertDialogTrigger>Open</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogTitle>Confirmation</AlertDialogTitle>
						<AlertDialogFooter>
							<AlertDialogAction>OK</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>,
			)

			await user.click(screen.getByRole('button', { name: 'Open' }))

			await waitFor(() => {
				expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument()
				expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument()
			})
		})
	})
})
