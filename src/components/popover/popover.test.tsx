import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from './popover'

describe('Popover', () => {
	describe('Popover Root Component', () => {
		it('renders popover root without crashing', () => {
			render(
				<Popover>
					<PopoverTrigger>Open</PopoverTrigger>
					<PopoverContent>Content</PopoverContent>
				</Popover>,
			)

			expect(screen.getByText('Open')).toBeInTheDocument()
		})

		it('supports controlled state', () => {
			const ControlledPopover = () => {
				const [open, setOpen] = React.useState(false)
				return (
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger>Controlled Trigger</PopoverTrigger>
						<PopoverContent>Controlled Content</PopoverContent>
					</Popover>
				)
			}

			render(<ControlledPopover />)

			expect(screen.getByText('Controlled Trigger')).toBeInTheDocument()
		})

		it('supports default open state', () => {
			render(
				<Popover defaultOpen>
					<PopoverTrigger>Default Open</PopoverTrigger>
					<PopoverContent>Default Content</PopoverContent>
				</Popover>,
			)

			expect(screen.getByText('Default Content')).toBeInTheDocument()
		})
	})

	describe('PopoverTrigger Component', () => {
		it('renders trigger button', () => {
			render(
				<Popover>
					<PopoverTrigger>Click me</PopoverTrigger>
					<PopoverContent>Content</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Click me')
			expect(trigger).toBeInTheDocument()
			expect(trigger).toHaveAttribute('type', 'button')
		})

		it('opens popover when clicked', async () => {
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger>Open Popover</PopoverTrigger>
					<PopoverContent>Popover Content</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Open Popover')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Popover Content')).toBeInTheDocument()
			})
		})

		it('supports custom trigger elements', async () => {
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger asChild>
						<button className="custom-trigger">Custom Trigger</button>
					</PopoverTrigger>
					<PopoverContent>Custom Content</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Custom Trigger')
			expect(trigger).toHaveClass('custom-trigger')

			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Custom Content')).toBeInTheDocument()
			})
		})

		it('handles disabled state', () => {
			render(
				<Popover>
					<PopoverTrigger disabled>Disabled Trigger</PopoverTrigger>
					<PopoverContent>Content</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Disabled Trigger')
			expect(trigger).toBeDisabled()
		})
	})

	describe('PopoverContent Component', () => {
		it('renders content with default styling', async () => {
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger>Open</PopoverTrigger>
					<PopoverContent>Default Content</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const content = screen.getByText('Default Content')
				expect(content).toBeInTheDocument()
				expect(content).toHaveClass(
					'z-50',
					'w-72',
					'rounded-md',
					'border',
					'bg-popover',
					'p-4',
					'text-popover-foreground',
					'shadow-md',
				)
			})
		})

		it('renders with custom className', async () => {
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger>Open</PopoverTrigger>
					<PopoverContent className="custom-popover">Custom Content</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const content = screen.getByText('Custom Content')
				expect(content).toHaveClass('custom-popover')
			})
		})

		it('supports different alignment options', async () => {
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger>Open</PopoverTrigger>
					<PopoverContent align="start">Start Aligned</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Start Aligned')).toBeInTheDocument()
			})
		})

		it('supports custom side offset', async () => {
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger>Open</PopoverTrigger>
					<PopoverContent sideOffset={10}>Offset Content</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Offset Content')).toBeInTheDocument()
			})
		})

		it('renders complex content', async () => {
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger>Open Complex</PopoverTrigger>
					<PopoverContent>
						<div>
							<h3>Title</h3>
							<p>Description</p>
							<button>Action</button>
						</div>
					</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Open Complex')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Title')).toBeInTheDocument()
				expect(screen.getByText('Description')).toBeInTheDocument()
				expect(screen.getByText('Action')).toBeInTheDocument()
			})
		})

		it('forwards HTML attributes correctly', async () => {
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger>Open</PopoverTrigger>
					<PopoverContent data-testid="test-content" id="popover-content">
						Test Content
					</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				const content = screen.getByTestId('test-content')
				expect(content).toHaveAttribute('id', 'popover-content')
			})
		})
	})

	describe('PopoverAnchor Component', () => {
		it('renders anchor element', () => {
			render(
				<Popover>
					<PopoverAnchor>
						<div>Anchor Element</div>
					</PopoverAnchor>
					<PopoverTrigger>Open</PopoverTrigger>
					<PopoverContent>Content</PopoverContent>
				</Popover>,
			)

			expect(screen.getByText('Anchor Element')).toBeInTheDocument()
		})

		it('positions popover relative to anchor', async () => {
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverAnchor>
						<div>Anchor Point</div>
					</PopoverAnchor>
					<PopoverTrigger>Open</PopoverTrigger>
					<PopoverContent>Anchored Content</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Anchored Content')).toBeInTheDocument()
			})
		})
	})

	describe('Interaction Behavior', () => {
		it('closes popover when clicking outside', async () => {
			const user = userEvent.setup()

			render(
				<div>
					<Popover>
						<PopoverTrigger>Open</PopoverTrigger>
						<PopoverContent>Closable Content</PopoverContent>
					</Popover>
					<div data-testid="outside">Outside Element</div>
				</div>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Closable Content')).toBeInTheDocument()
			})

			const outside = screen.getByTestId('outside')
			await user.click(outside)

			await waitFor(() => {
				expect(screen.queryByText('Closable Content')).not.toBeInTheDocument()
			})
		})

		it('closes popover when pressing Escape', async () => {
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger>Open</PopoverTrigger>
					<PopoverContent>Escapable Content</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Open')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Escapable Content')).toBeInTheDocument()
			})

			await user.keyboard('{Escape}')

			await waitFor(() => {
				expect(screen.queryByText('Escapable Content')).not.toBeInTheDocument()
			})
		})

		it('toggles popover when trigger is clicked multiple times', async () => {
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger>Toggle</PopoverTrigger>
					<PopoverContent>Toggle Content</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Toggle')

			// Open
			await user.click(trigger)
			await waitFor(() => {
				expect(screen.getByText('Toggle Content')).toBeInTheDocument()
			})

			// Close
			await user.click(trigger)
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
				<Popover>
					<PopoverTrigger>Keyboard Trigger</PopoverTrigger>
					<PopoverContent>Keyboard Content</PopoverContent>
				</Popover>,
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
				<Popover>
					<PopoverTrigger>Space Trigger</PopoverTrigger>
					<PopoverContent>Space Content</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Space Trigger')
			trigger.focus()

			await user.keyboard(' ')

			await waitFor(() => {
				expect(screen.getByText('Space Content')).toBeInTheDocument()
			})
		})

		it('manages focus correctly', async () => {
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger>Focus Trigger</PopoverTrigger>
					<PopoverContent>
						<button>Focus Button</button>
					</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Focus Trigger')
			await user.click(trigger)

			await waitFor(() => {
				const button = screen.getByText('Focus Button')
				expect(button).toBeInTheDocument()
			})

			// Focus should be managed by Radix UI
			await user.keyboard('{Tab}')
			const button = screen.getByText('Focus Button')
			expect(button).toHaveFocus()
		})
	})

	describe('Accessibility', () => {
		it('has proper ARIA attributes', async () => {
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger>ARIA Trigger</PopoverTrigger>
					<PopoverContent>ARIA Content</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('ARIA Trigger')
			expect(trigger).toHaveAttribute('aria-haspopup')
			expect(trigger).toHaveAttribute('aria-expanded', 'false')

			await user.click(trigger)

			await waitFor(() => {
				expect(trigger).toHaveAttribute('aria-expanded', 'true')
			})
		})

		it('supports custom ARIA labels', async () => {
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger aria-label="Custom trigger label">Trigger</PopoverTrigger>
					<PopoverContent aria-label="Custom content label">Content</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByLabelText('Custom trigger label')
			expect(trigger).toBeInTheDocument()

			await user.click(trigger)

			await waitFor(() => {
				const content = screen.getByLabelText('Custom content label')
				expect(content).toBeInTheDocument()
			})
		})

		it('supports role attributes', async () => {
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger>Role Trigger</PopoverTrigger>
					<PopoverContent role="dialog">Role Content</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Role Trigger')
			await user.click(trigger)

			await waitFor(() => {
				const content = screen.getByRole('dialog')
				expect(content).toBeInTheDocument()
			})
		})
	})

	describe('Event Handling', () => {
		it('calls onOpenChange when popover state changes', async () => {
			const handleOpenChange = vi.fn()
			const user = userEvent.setup()

			render(
				<Popover onOpenChange={handleOpenChange}>
					<PopoverTrigger>Event Trigger</PopoverTrigger>
					<PopoverContent>Event Content</PopoverContent>
				</Popover>,
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
				<Popover>
					<PopoverTrigger onClick={handleClick}>Click Trigger</PopoverTrigger>
					<PopoverContent>Click Content</PopoverContent>
				</Popover>,
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
					<Popover>
						<PopoverTrigger>Portal Trigger</PopoverTrigger>
						<PopoverContent>Portal Content</PopoverContent>
					</Popover>
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
				<Popover>
					<PopoverTrigger>Rapid Trigger</PopoverTrigger>
					<PopoverContent>Rapid Content</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Rapid Trigger')

			// Rapidly click multiple times
			await user.click(trigger)
			await user.click(trigger)
			await user.click(trigger)

			// Should end up open (odd number of clicks)
			await waitFor(() => {
				expect(screen.getByText('Rapid Content')).toBeInTheDocument()
			})
		})

		it('handles empty content', async () => {
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger>Empty Trigger</PopoverTrigger>
					<PopoverContent></PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Empty Trigger')
			await user.click(trigger)

			// Should still render the popover container
			await waitFor(() => {
				const popoverContent = document.querySelector('[role="dialog"]')
				expect(popoverContent).toBeInTheDocument()
			})
		})

		it('handles undefined className gracefully', async () => {
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger>Undefined Class</PopoverTrigger>
					<PopoverContent className={undefined}>Undefined Content</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Undefined Class')
			await user.click(trigger)

			await waitFor(() => {
				const content = screen.getByText('Undefined Content')
				expect(content).toBeInTheDocument()
				expect(content).toHaveClass('z-50', 'w-72') // Should still have default classes
			})
		})
	})

	describe('Ref Forwarding', () => {
		it('forwards ref to content element', async () => {
			const ref = React.createRef<HTMLDivElement>()
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger>Ref Trigger</PopoverTrigger>
					<PopoverContent ref={ref}>Ref Content</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Ref Trigger')
			await user.click(trigger)

			await waitFor(() => {
				expect(ref.current).toBeInstanceOf(HTMLDivElement)
				expect(ref.current?.textContent).toBe('Ref Content')
			})
		})

		it('allows ref access to DOM methods', async () => {
			const ref = React.createRef<HTMLDivElement>()
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger>Method Trigger</PopoverTrigger>
					<PopoverContent ref={ref}>Method Content</PopoverContent>
				</Popover>,
			)

			const trigger = screen.getByText('Method Trigger')
			await user.click(trigger)

			await waitFor(() => {
				expect(ref.current?.focus).toBeDefined()
				expect(typeof ref.current?.focus).toBe('function')
			})
		})
	})

	describe('Complex Scenarios', () => {
		it('handles nested interactive elements', async () => {
			const handleButtonClick = vi.fn()
			const user = userEvent.setup()

			render(
				<Popover>
					<PopoverTrigger>Nested Trigger</PopoverTrigger>
					<PopoverContent>
						<div>
							<input placeholder="Input field" />
							<button onClick={handleButtonClick}>Nested Button</button>
							<select>
								<option>Option 1</option>
								<option>Option 2</option>
							</select>
						</div>
					</PopoverContent>
				</Popover>,
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

		it('maintains state across multiple popovers', async () => {
			const user = userEvent.setup()

			render(
				<div>
					<Popover>
						<PopoverTrigger>First Trigger</PopoverTrigger>
						<PopoverContent>First Content</PopoverContent>
					</Popover>
					<Popover>
						<PopoverTrigger>Second Trigger</PopoverTrigger>
						<PopoverContent>Second Content</PopoverContent>
					</Popover>
				</div>,
			)

			const firstTrigger = screen.getByText('First Trigger')
			const secondTrigger = screen.getByText('Second Trigger')

			// Open first popover
			await user.click(firstTrigger)
			await waitFor(() => {
				expect(screen.getByText('First Content')).toBeInTheDocument()
			})

			// Open second popover (first should close)
			await user.click(secondTrigger)
			await waitFor(() => {
				expect(screen.getByText('Second Content')).toBeInTheDocument()
				expect(screen.queryByText('First Content')).not.toBeInTheDocument()
			})
		})
	})
})
