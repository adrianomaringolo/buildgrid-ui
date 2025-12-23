import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible'

describe('Collapsible', () => {
	describe('Collapsible Component', () => {
		it('renders collapsible with default props', () => {
			render(
				<Collapsible>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Content</CollapsibleContent>
				</Collapsible>,
			)

			const collapsible = document.querySelector('[data-slot="collapsible"]')
			expect(collapsible).toBeInTheDocument()
		})

		it('renders collapsible with custom className', () => {
			render(
				<Collapsible className="custom-collapsible">
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Content</CollapsibleContent>
				</Collapsible>,
			)

			const collapsible = document.querySelector('[data-slot="collapsible"]')
			expect(collapsible).toHaveClass('custom-collapsible')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Collapsible data-testid="test-collapsible" id="collapsible-id">
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Content</CollapsibleContent>
				</Collapsible>,
			)

			const collapsible = screen.getByTestId('test-collapsible')
			expect(collapsible).toHaveAttribute('id', 'collapsible-id')
		})

		it('renders closed by default', () => {
			render(
				<Collapsible>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Hidden content</CollapsibleContent>
				</Collapsible>,
			)

			const trigger = screen.getByRole('button', { name: 'Toggle' })
			expect(trigger).toHaveAttribute('aria-expanded', 'false')
		})

		it('renders open when defaultOpen is true', () => {
			render(
				<Collapsible defaultOpen>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Visible content</CollapsibleContent>
				</Collapsible>,
			)

			const trigger = screen.getByRole('button', { name: 'Toggle' })
			expect(trigger).toHaveAttribute('aria-expanded', 'true')
			expect(screen.getByText('Visible content')).toBeInTheDocument()
		})

		it('renders open when open prop is true', () => {
			render(
				<Collapsible open>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Visible content</CollapsibleContent>
				</Collapsible>,
			)

			const trigger = screen.getByRole('button', { name: 'Toggle' })
			expect(trigger).toHaveAttribute('aria-expanded', 'true')
			expect(screen.getByText('Visible content')).toBeInTheDocument()
		})
	})

	describe('CollapsibleTrigger Component', () => {
		it('renders trigger with default props', () => {
			render(
				<Collapsible>
					<CollapsibleTrigger>Toggle content</CollapsibleTrigger>
					<CollapsibleContent>Content</CollapsibleContent>
				</Collapsible>,
			)

			const trigger = screen.getByRole('button', { name: 'Toggle content' })
			expect(trigger).toBeInTheDocument()
			expect(trigger).toHaveAttribute('data-slot', 'collapsible-trigger')
		})

		it('renders trigger with custom className', () => {
			render(
				<Collapsible>
					<CollapsibleTrigger className="custom-trigger">Toggle</CollapsibleTrigger>
					<CollapsibleContent>Content</CollapsibleContent>
				</Collapsible>,
			)

			const trigger = screen.getByRole('button', { name: 'Toggle' })
			expect(trigger).toHaveClass('custom-trigger')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Collapsible>
					<CollapsibleTrigger data-testid="test-trigger" id="trigger-id">
						Toggle
					</CollapsibleTrigger>
					<CollapsibleContent>Content</CollapsibleContent>
				</Collapsible>,
			)

			const trigger = screen.getByTestId('test-trigger')
			expect(trigger).toHaveAttribute('id', 'trigger-id')
		})

		it('has proper accessibility attributes', () => {
			render(
				<Collapsible>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Content</CollapsibleContent>
				</Collapsible>,
			)

			const trigger = screen.getByRole('button', { name: 'Toggle' })
			expect(trigger).toHaveAttribute('aria-expanded', 'false')
			expect(trigger).toHaveAttribute('aria-controls')
		})

		it('renders as button element', () => {
			render(
				<Collapsible>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Content</CollapsibleContent>
				</Collapsible>,
			)

			const trigger = screen.getByRole('button', { name: 'Toggle' })
			expect(trigger.tagName).toBe('BUTTON')
		})

		it('can render as different element using asChild', () => {
			render(
				<Collapsible>
					<CollapsibleTrigger asChild>
						<div role="button" tabIndex={0}>
							Custom trigger
						</div>
					</CollapsibleTrigger>
					<CollapsibleContent>Content</CollapsibleContent>
				</Collapsible>,
			)

			const trigger = screen.getByRole('button', { name: 'Custom trigger' })
			expect(trigger.tagName).toBe('DIV')
		})
	})

	describe('CollapsibleContent Component', () => {
		it('renders content with default props', () => {
			render(
				<Collapsible defaultOpen>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Content text</CollapsibleContent>
				</Collapsible>,
			)

			const content = screen.getByText('Content text')
			expect(content).toBeInTheDocument()
			expect(content).toHaveAttribute('data-slot', 'collapsible-content')
		})

		it('renders content with custom className', () => {
			render(
				<Collapsible defaultOpen>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent className="custom-content">Content</CollapsibleContent>
				</Collapsible>,
			)

			const content = screen.getByText('Content')
			expect(content).toHaveClass('custom-content')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Collapsible defaultOpen>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent data-testid="test-content" id="content-id">
						Content
					</CollapsibleContent>
				</Collapsible>,
			)

			const content = screen.getByTestId('test-content')
			expect(content).toHaveAttribute('id', 'content-id')
		})

		it('is hidden when collapsible is closed', () => {
			render(
				<Collapsible>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Hidden content</CollapsibleContent>
				</Collapsible>,
			)

			// Content should not be visible when closed
			expect(screen.queryByText('Hidden content')).not.toBeInTheDocument()
		})

		it('is visible when collapsible is open', () => {
			render(
				<Collapsible defaultOpen>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Visible content</CollapsibleContent>
				</Collapsible>,
			)

			expect(screen.getByText('Visible content')).toBeInTheDocument()
		})
	})

	describe('Interactions', () => {
		it('toggles content when trigger is clicked', async () => {
			const user = userEvent.setup()

			render(
				<Collapsible>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Toggleable content</CollapsibleContent>
				</Collapsible>,
			)

			const trigger = screen.getByRole('button', { name: 'Toggle' })

			// Initially closed
			expect(trigger).toHaveAttribute('aria-expanded', 'false')
			expect(screen.queryByText('Toggleable content')).not.toBeInTheDocument()

			// Click to open
			await user.click(trigger)
			expect(trigger).toHaveAttribute('aria-expanded', 'true')
			await waitFor(() => {
				expect(screen.getByText('Toggleable content')).toBeInTheDocument()
			})

			// Click to close
			await user.click(trigger)
			expect(trigger).toHaveAttribute('aria-expanded', 'false')
			await waitFor(() => {
				expect(screen.queryByText('Toggleable content')).not.toBeInTheDocument()
			})
		})

		it('calls onOpenChange when toggled', async () => {
			const handleOpenChange = vi.fn()
			const user = userEvent.setup()

			render(
				<Collapsible onOpenChange={handleOpenChange}>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Content</CollapsibleContent>
				</Collapsible>,
			)

			const trigger = screen.getByRole('button', { name: 'Toggle' })
			await user.click(trigger)

			expect(handleOpenChange).toHaveBeenCalledOnce()
			expect(handleOpenChange).toHaveBeenCalledWith(true)
		})

		it('supports keyboard navigation with Enter key', async () => {
			const user = userEvent.setup()

			render(
				<Collapsible>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Keyboard content</CollapsibleContent>
				</Collapsible>,
			)

			const trigger = screen.getByRole('button', { name: 'Toggle' })
			trigger.focus()
			await user.keyboard('{Enter}')

			expect(trigger).toHaveAttribute('aria-expanded', 'true')
			await waitFor(() => {
				expect(screen.getByText('Keyboard content')).toBeInTheDocument()
			})
		})

		it('supports keyboard navigation with Space key', async () => {
			const user = userEvent.setup()

			render(
				<Collapsible>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Space content</CollapsibleContent>
				</Collapsible>,
			)

			const trigger = screen.getByRole('button', { name: 'Toggle' })
			trigger.focus()
			await user.keyboard(' ')

			expect(trigger).toHaveAttribute('aria-expanded', 'true')
			await waitFor(() => {
				expect(screen.getByText('Space content')).toBeInTheDocument()
			})
		})
	})

	describe('Controlled Component', () => {
		it('works as controlled component', async () => {
			const ControlledCollapsible = () => {
				const [open, setOpen] = React.useState(false)

				return (
					<Collapsible open={open} onOpenChange={setOpen}>
						<CollapsibleTrigger>Toggle</CollapsibleTrigger>
						<CollapsibleContent>Controlled content</CollapsibleContent>
					</Collapsible>
				)
			}

			const user = userEvent.setup()
			render(<ControlledCollapsible />)

			const trigger = screen.getByRole('button', { name: 'Toggle' })

			// Initially closed
			expect(trigger).toHaveAttribute('aria-expanded', 'false')
			expect(screen.queryByText('Controlled content')).not.toBeInTheDocument()

			// Click to open
			await user.click(trigger)
			expect(trigger).toHaveAttribute('aria-expanded', 'true')
			await waitFor(() => {
				expect(screen.getByText('Controlled content')).toBeInTheDocument()
			})

			// Click to close
			await user.click(trigger)
			expect(trigger).toHaveAttribute('aria-expanded', 'false')
			await waitFor(() => {
				expect(screen.queryByText('Controlled content')).not.toBeInTheDocument()
			})
		})

		it('respects external open state changes', () => {
			const ControlledCollapsible = ({ isOpen }: { isOpen: boolean }) => (
				<Collapsible open={isOpen}>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>External control content</CollapsibleContent>
				</Collapsible>
			)

			const { rerender } = render(<ControlledCollapsible isOpen={false} />)

			const trigger = screen.getByRole('button', { name: 'Toggle' })
			expect(trigger).toHaveAttribute('aria-expanded', 'false')
			expect(screen.queryByText('External control content')).not.toBeInTheDocument()

			rerender(<ControlledCollapsible isOpen={true} />)
			expect(trigger).toHaveAttribute('aria-expanded', 'true')
			expect(screen.getByText('External control content')).toBeInTheDocument()
		})
	})

	describe('Disabled State', () => {
		it('renders disabled trigger', () => {
			render(
				<Collapsible>
					<CollapsibleTrigger disabled>Disabled Toggle</CollapsibleTrigger>
					<CollapsibleContent>Content</CollapsibleContent>
				</Collapsible>,
			)

			const trigger = screen.getByRole('button', { name: 'Disabled Toggle' })
			expect(trigger).toBeDisabled()
		})

		it('does not toggle when disabled trigger is clicked', async () => {
			const handleOpenChange = vi.fn()
			const user = userEvent.setup()

			render(
				<Collapsible onOpenChange={handleOpenChange}>
					<CollapsibleTrigger disabled>Disabled Toggle</CollapsibleTrigger>
					<CollapsibleContent>Content</CollapsibleContent>
				</Collapsible>,
			)

			const trigger = screen.getByRole('button', { name: 'Disabled Toggle' })
			await user.click(trigger)

			expect(handleOpenChange).not.toHaveBeenCalled()
			expect(trigger).toHaveAttribute('aria-expanded', 'false')
		})
	})

	describe('Content Types', () => {
		it('renders collapsible with text content', () => {
			render(
				<Collapsible defaultOpen>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Simple text content</CollapsibleContent>
				</Collapsible>,
			)

			expect(screen.getByText('Simple text content')).toBeInTheDocument()
		})

		it('renders collapsible with complex JSX content', () => {
			render(
				<Collapsible defaultOpen>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>
						<div>
							<h3>Content Title</h3>
							<p>Content description</p>
							<button>Action button</button>
						</div>
					</CollapsibleContent>
				</Collapsible>,
			)

			expect(screen.getByText('Content Title')).toBeInTheDocument()
			expect(screen.getByText('Content description')).toBeInTheDocument()
			expect(screen.getByRole('button', { name: 'Action button' })).toBeInTheDocument()
		})

		it('renders collapsible with form elements', () => {
			render(
				<Collapsible defaultOpen>
					<CollapsibleTrigger>Show form</CollapsibleTrigger>
					<CollapsibleContent>
						<form>
							<input type="text" placeholder="Name" />
							<input type="email" placeholder="Email" />
							<button type="submit">Submit</button>
						</form>
					</CollapsibleContent>
				</Collapsible>,
			)

			expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
			expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
			expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
		})
	})

	describe('Accessibility', () => {
		it('has proper ARIA attributes', () => {
			render(
				<Collapsible>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Content</CollapsibleContent>
				</Collapsible>,
			)

			const trigger = screen.getByRole('button', { name: 'Toggle' })
			expect(trigger).toHaveAttribute('aria-expanded', 'false')
			expect(trigger).toHaveAttribute('aria-controls')
		})

		it('updates aria-expanded when toggled', async () => {
			const user = userEvent.setup()

			render(
				<Collapsible>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Content</CollapsibleContent>
				</Collapsible>,
			)

			const trigger = screen.getByRole('button', { name: 'Toggle' })

			expect(trigger).toHaveAttribute('aria-expanded', 'false')

			await user.click(trigger)
			expect(trigger).toHaveAttribute('aria-expanded', 'true')

			await user.click(trigger)
			expect(trigger).toHaveAttribute('aria-expanded', 'false')
		})

		it('supports aria-label on trigger', () => {
			render(
				<Collapsible>
					<CollapsibleTrigger aria-label="Toggle section">▼</CollapsibleTrigger>
					<CollapsibleContent>Content</CollapsibleContent>
				</Collapsible>,
			)

			const trigger = screen.getByLabelText('Toggle section')
			expect(trigger).toBeInTheDocument()
		})

		it('supports aria-describedby', () => {
			render(
				<div>
					<Collapsible>
						<CollapsibleTrigger aria-describedby="help-text">Toggle</CollapsibleTrigger>
						<CollapsibleContent>Content</CollapsibleContent>
					</Collapsible>
					<div id="help-text">Click to expand or collapse</div>
				</div>,
			)

			const trigger = screen.getByRole('button', { name: 'Toggle' })
			expect(trigger).toHaveAttribute('aria-describedby', 'help-text')
		})
	})

	describe('Edge Cases', () => {
		it('renders empty collapsible', () => {
			render(<Collapsible></Collapsible>)

			const collapsible = document.querySelector('[data-slot="collapsible"]')
			expect(collapsible).toBeInTheDocument()
		})

		it('renders collapsible with only trigger', () => {
			render(
				<Collapsible>
					<CollapsibleTrigger>Only trigger</CollapsibleTrigger>
				</Collapsible>,
			)

			const trigger = screen.getByRole('button', { name: 'Only trigger' })
			expect(trigger).toBeInTheDocument()
		})

		it('renders collapsible with only content', () => {
			render(
				<Collapsible defaultOpen>
					<CollapsibleContent>Only content</CollapsibleContent>
				</Collapsible>,
			)

			expect(screen.getByText('Only content')).toBeInTheDocument()
		})

		it('handles undefined className gracefully', () => {
			render(
				<Collapsible className={undefined}>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>Content</CollapsibleContent>
				</Collapsible>,
			)

			const collapsible = document.querySelector('[data-slot="collapsible"]')
			expect(collapsible).toBeInTheDocument()
		})

		it('handles very long content', () => {
			const longContent =
				'This is very long content that might cause layout issues. '.repeat(50)

			render(
				<Collapsible defaultOpen>
					<CollapsibleTrigger>Toggle</CollapsibleTrigger>
					<CollapsibleContent>{longContent}</CollapsibleContent>
				</Collapsible>,
			)

			// Use a more flexible matcher for long text
			expect(
				screen.getByText((content, element) => {
					return element?.textContent === longContent
				}),
			).toBeInTheDocument()
		})
	})

	describe('Multiple Collapsibles', () => {
		it('renders multiple collapsibles independently', async () => {
			const user = userEvent.setup()

			render(
				<div>
					<Collapsible>
						<CollapsibleTrigger>Toggle 1</CollapsibleTrigger>
						<CollapsibleContent>Content 1</CollapsibleContent>
					</Collapsible>
					<Collapsible>
						<CollapsibleTrigger>Toggle 2</CollapsibleTrigger>
						<CollapsibleContent>Content 2</CollapsibleContent>
					</Collapsible>
				</div>,
			)

			const trigger1 = screen.getByRole('button', { name: 'Toggle 1' })
			const trigger2 = screen.getByRole('button', { name: 'Toggle 2' })

			// Both initially closed
			expect(trigger1).toHaveAttribute('aria-expanded', 'false')
			expect(trigger2).toHaveAttribute('aria-expanded', 'false')

			// Open first collapsible
			await user.click(trigger1)
			expect(trigger1).toHaveAttribute('aria-expanded', 'true')
			expect(trigger2).toHaveAttribute('aria-expanded', 'false')
			await waitFor(() => {
				expect(screen.getByText('Content 1')).toBeInTheDocument()
			})
			expect(screen.queryByText('Content 2')).not.toBeInTheDocument()

			// Open second collapsible
			await user.click(trigger2)
			expect(trigger1).toHaveAttribute('aria-expanded', 'true')
			expect(trigger2).toHaveAttribute('aria-expanded', 'true')
			await waitFor(() => {
				expect(screen.getByText('Content 2')).toBeInTheDocument()
			})
			expect(screen.getByText('Content 1')).toBeInTheDocument()
		})
	})

	describe('Custom Styling', () => {
		it('merges custom classes with default behavior', () => {
			render(
				<Collapsible className="custom-collapsible">
					<CollapsibleTrigger className="custom-trigger">Toggle</CollapsibleTrigger>
					<CollapsibleContent className="custom-content">Content</CollapsibleContent>
				</Collapsible>,
			)

			const collapsible = document.querySelector('[data-slot="collapsible"]')
			const trigger = screen.getByRole('button', { name: 'Toggle' })

			expect(collapsible).toHaveClass('custom-collapsible')
			expect(trigger).toHaveClass('custom-trigger')
		})
	})
})
