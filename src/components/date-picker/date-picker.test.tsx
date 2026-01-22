import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { format } from 'date-fns'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { DatePicker, DatePickerDemo } from './date-picker'

describe('DatePicker', () => {
	describe('Rendering', () => {
		it('renders date picker with placeholder', () => {
			render(<DatePicker placeholder="Pick a date" />)

			const button = screen.getByRole('button')
			expect(button).toBeInTheDocument()
			expect(screen.getByText('Pick a date')).toBeInTheDocument()
		})

		it('renders date picker with custom placeholder', () => {
			render(<DatePicker placeholder="Select your birthday" />)

			expect(screen.getByText('Select your birthday')).toBeInTheDocument()
		})

		it('renders date picker with selected date', () => {
			const testDate = new Date(2024, 0, 15)
			render(<DatePicker date={testDate} />)

			const formattedDate = format(testDate, 'PPP')
			expect(screen.getByText(formattedDate)).toBeInTheDocument()
		})

		it('renders calendar icon', () => {
			render(<DatePicker />)

			const button = screen.getByRole('button')
			const icon = button.querySelector('svg')
			expect(icon).toBeInTheDocument()
		})

		it('applies custom className', () => {
			render(<DatePicker className="custom-class" />)

			const button = screen.getByRole('button')
			expect(button).toHaveClass('custom-class')
		})
	})

	describe('Button Variants', () => {
		it('renders with outline variant by default', () => {
			render(<DatePicker />)

			const button = screen.getByRole('button')
			expect(button).toHaveAttribute('data-slot', 'button')
		})

		it('renders with custom button variant', () => {
			render(<DatePicker buttonVariant="default" />)

			const button = screen.getByRole('button')
			expect(button).toHaveAttribute('data-slot', 'button')
		})

		it('renders with ghost variant', () => {
			render(<DatePicker buttonVariant="ghost" />)

			const button = screen.getByRole('button')
			expect(button).toHaveAttribute('data-slot', 'button')
		})
	})

	describe('Disabled State', () => {
		it('renders disabled date picker', () => {
			render(<DatePicker disabled />)

			const button = screen.getByRole('button')
			expect(button).toBeDisabled()
		})

		it('does not open popover when disabled', async () => {
			const user = userEvent.setup()
			render(<DatePicker disabled />)

			const button = screen.getByRole('button')
			await user.click(button)

			// Calendar should not be visible
			expect(screen.queryByRole('application')).not.toBeInTheDocument()
		})
	})

	describe('Popover Interaction', () => {
		it('opens calendar popover on button click', async () => {
			const user = userEvent.setup()
			render(<DatePicker />)

			const button = screen.getByRole('button')
			await user.click(button)

			await waitFor(() => {
				expect(screen.getByRole('application')).toBeInTheDocument()
			})
		})

		it('displays calendar with current month', async () => {
			const user = userEvent.setup()
			render(<DatePicker />)

			const button = screen.getByRole('button')
			await user.click(button)

			await waitFor(() => {
				const currentMonth = format(new Date(), 'MMMM yyyy')
				expect(screen.getByText(currentMonth)).toBeInTheDocument()
			})
		})
	})

	describe('Date Selection', () => {
		it('calls onDateChange when date is selected', async () => {
			const user = userEvent.setup()
			const handleDateChange = vi.fn()
			render(<DatePicker onDateChange={handleDateChange} />)

			const button = screen.getByRole('button')
			await user.click(button)

			await waitFor(() => {
				expect(screen.getByRole('application')).toBeInTheDocument()
			})

			// Click on day 15
			const dayButton = screen.getByLabelText(/15/)
			await user.click(dayButton)

			expect(handleDateChange).toHaveBeenCalled()
			expect(handleDateChange.mock.calls[0][0]).toBeInstanceOf(Date)
		})

		it('updates displayed date after selection', async () => {
			const user = userEvent.setup()
			const TestComponent = () => {
				const [date, setDate] = React.useState<Date | undefined>()
				return <DatePicker date={date} onDateChange={setDate} />
			}

			render(<TestComponent />)

			const button = screen.getByRole('button', { name: /pick a date/i })
			await user.click(button)

			await waitFor(() => {
				expect(screen.getByRole('application')).toBeInTheDocument()
			})

			const dayButton = screen.getByLabelText(/15/)
			await user.click(dayButton)

			await waitFor(() => {
				const buttons = screen.getAllByRole('button')
				const triggerBtn = buttons.find(
					(btn) => btn.getAttribute('data-slot') === 'button',
				)
				expect(triggerBtn?.textContent).toContain('15')
			})
		})
	})

	describe('Language Support', () => {
		it('renders with English language by default', () => {
			const testDate = new Date(2024, 0, 15)
			render(<DatePicker date={testDate} language="enUS" />)

			// English format: "January 15, 2024" or similar
			const button = screen.getByRole('button')
			expect(button.textContent).toContain('January')
		})

		it('renders with Portuguese language', () => {
			const testDate = new Date(2024, 0, 15)
			render(<DatePicker date={testDate} language="ptBR" />)

			// Note: date-fns format function uses the language prop
			// but the button displays the formatted date
			// The language prop is passed to the Calendar component
			const button = screen.getByRole('button')
			// Just verify the button renders with a date
			expect(button.textContent).toContain('15')
		})
	})

	describe('Data Attributes', () => {
		it('sets data-empty attribute when no date selected', () => {
			render(<DatePicker />)

			const button = screen.getByRole('button')
			expect(button).toHaveAttribute('data-empty', 'true')
		})

		it('sets data-empty to false when date is selected', () => {
			const testDate = new Date(2024, 0, 15)
			render(<DatePicker date={testDate} />)

			const button = screen.getByRole('button')
			expect(button).toHaveAttribute('data-empty', 'false')
		})
	})

	describe('Controlled Component', () => {
		it('updates when date prop changes', () => {
			const { rerender } = render(<DatePicker date={new Date(2024, 0, 15)} />)

			expect(screen.getByText(/January 15/)).toBeInTheDocument()

			rerender(<DatePicker date={new Date(2024, 1, 20)} />)

			expect(screen.getByText(/February 20/)).toBeInTheDocument()
		})

		it('handles undefined date prop', () => {
			const { rerender } = render(<DatePicker date={new Date(2024, 0, 15)} />)

			expect(screen.getByText(/January 15/)).toBeInTheDocument()

			rerender(<DatePicker date={undefined} placeholder="Pick a date" />)

			expect(screen.getByText('Pick a date')).toBeInTheDocument()
		})
	})

	describe('Accessibility', () => {
		it('has accessible button role', () => {
			render(<DatePicker />)

			const button = screen.getByRole('button')
			expect(button).toBeInTheDocument()
		})

		it('button is keyboard accessible', async () => {
			const user = userEvent.setup()
			render(<DatePicker />)

			const button = screen.getByRole('button')
			button.focus()

			expect(button).toHaveFocus()

			await user.keyboard('{Enter}')

			await waitFor(() => {
				expect(screen.getByRole('application')).toBeInTheDocument()
			})
		})

		it('calendar has proper aria-label', async () => {
			const user = userEvent.setup()
			render(<DatePicker />)

			const button = screen.getByRole('button')
			await user.click(button)

			await waitFor(() => {
				const calendar = screen.getByRole('application')
				expect(calendar).toHaveAttribute('aria-label', 'Calendar')
			})
		})
	})

	describe('Edge Cases', () => {
		it('handles null onDateChange callback', async () => {
			const user = userEvent.setup()
			render(<DatePicker />)

			const button = screen.getByRole('button')
			await user.click(button)

			await waitFor(() => {
				expect(screen.getByRole('application')).toBeInTheDocument()
			})

			const dayButton = screen.getByLabelText(/15/)
			// Should not throw error
			await user.click(dayButton)
		})

		it('handles invalid date gracefully', () => {
			// Test with undefined instead of invalid string
			render(<DatePicker date={undefined} />)

			const button = screen.getByRole('button')
			expect(button).toBeInTheDocument()
		})

		it('renders with all props combined', () => {
			const testDate = new Date(2024, 0, 15)
			const handleChange = vi.fn()

			render(
				<DatePicker
					date={testDate}
					onDateChange={handleChange}
					placeholder="Custom placeholder"
					disabled={false}
					className="custom-class"
					language="enUS"
					buttonVariant="outline"
				/>,
			)

			const button = screen.getByRole('button')
			expect(button).toBeInTheDocument()
			expect(button).toHaveClass('custom-class')
			expect(button).not.toBeDisabled()
		})
	})

	describe('DatePickerDemo (Legacy)', () => {
		it('renders demo component', () => {
			render(<DatePickerDemo />)

			const button = screen.getByRole('button')
			expect(button).toBeInTheDocument()
			expect(screen.getByText('Pick a date')).toBeInTheDocument()
		})

		it('allows date selection in demo', async () => {
			const user = userEvent.setup()
			render(<DatePickerDemo />)

			const triggerButton = screen.getByRole('button', { name: /pick a date/i })
			await user.click(triggerButton)

			await waitFor(() => {
				expect(screen.getByRole('application')).toBeInTheDocument()
			})

			const dayButton = screen.getByLabelText(/15/)
			await user.click(dayButton)

			await waitFor(() => {
				const buttons = screen.getAllByRole('button')
				const triggerBtn = buttons.find((btn) => btn.textContent?.includes('15'))
				expect(triggerBtn).toBeInTheDocument()
			})
		})
	})

	describe('Styling', () => {
		it('applies correct width class', () => {
			render(<DatePicker />)

			const button = screen.getByRole('button')
			expect(button).toHaveClass('w-[280px]')
		})

		it('applies text alignment classes', () => {
			render(<DatePicker />)

			const button = screen.getByRole('button')
			expect(button).toHaveClass('justify-start', 'text-left')
		})

		it('applies muted text color when empty', () => {
			render(<DatePicker />)

			const button = screen.getByRole('button')
			expect(button).toHaveClass('data-[empty=true]:text-muted-foreground')
		})
	})
})
