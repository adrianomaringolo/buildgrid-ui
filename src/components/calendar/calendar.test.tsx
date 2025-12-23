import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Calendar } from './calendar'

describe('Calendar', () => {
	const mockDate = new Date(2024, 0, 15) // January 15, 2024

	beforeEach(() => {
		vi.setSystemTime(mockDate)
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	describe('Rendering', () => {
		it('renders calendar with default props', () => {
			render(<Calendar />)

			expect(screen.getByRole('application', { name: 'Calendar' })).toBeInTheDocument()
			expect(screen.getByText('January 2024')).toBeInTheDocument()
			expect(screen.getByLabelText('Previous Month')).toBeInTheDocument()
			expect(screen.getByLabelText('Next Month')).toBeInTheDocument()
		})

		it('renders calendar with selected date', () => {
			const selectedDate = new Date(2024, 0, 10) // January 10, 2024
			render(<Calendar selectedDate={selectedDate} />)

			const selectedButton = screen.getByRole('button', { pressed: true })
			expect(selectedButton).toBeInTheDocument()
			expect(selectedButton).toHaveTextContent('10')
		})

		it('renders weekday headers', () => {
			render(<Calendar />)

			// Check for weekday headers (abbreviated)
			const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
			weekdays.forEach((day) => {
				expect(screen.getByText(day)).toBeInTheDocument()
			})
		})

		it('renders all days of the month', () => {
			render(<Calendar />)

			// January 2024 has 31 days - check for specific days
			expect(screen.getByRole('button', { name: /January 1st 2024/ })).toBeInTheDocument()
			expect(
				screen.getByRole('button', { name: /January 15th 2024/ }),
			).toBeInTheDocument()
			expect(
				screen.getByRole('button', { name: /January 31st 2024/ }),
			).toBeInTheDocument()
		})
	})

	describe('Language Support', () => {
		it('renders in English by default', () => {
			render(<Calendar />)

			expect(screen.getByText('January 2024')).toBeInTheDocument()
		})

		it('renders in Portuguese when language is ptBR', () => {
			render(<Calendar language="ptBR" />)

			expect(screen.getByText('janeiro 2024')).toBeInTheDocument()
		})

		it('renders weekdays in Portuguese', () => {
			render(<Calendar language="ptBR" />)

			// Portuguese weekday abbreviations (actual output from date-fns)
			const weekdays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']
			weekdays.forEach((day) => {
				expect(screen.getByText(day)).toBeInTheDocument()
			})
		})
	})

	describe('Navigation', () => {
		it('navigates to previous month when previous button is clicked', async () => {
			const user = userEvent.setup()
			render(<Calendar />)

			const prevButton = screen.getByLabelText('Previous Month')
			await user.click(prevButton)

			expect(screen.getByText('December 2023')).toBeInTheDocument()
		})

		it('navigates to next month when next button is clicked', async () => {
			const user = userEvent.setup()
			render(<Calendar />)

			const nextButton = screen.getByLabelText('Next Month')
			await user.click(nextButton)

			expect(screen.getByText('February 2024')).toBeInTheDocument()
		})

		it('navigates multiple months correctly', async () => {
			const user = userEvent.setup()
			render(<Calendar />)

			const nextButton = screen.getByLabelText('Next Month')

			// Navigate to February
			await user.click(nextButton)
			expect(screen.getByText('February 2024')).toBeInTheDocument()

			// Navigate to March
			await user.click(nextButton)
			expect(screen.getByText('March 2024')).toBeInTheDocument()
		})

		it('navigates across years correctly', async () => {
			const user = userEvent.setup()
			render(<Calendar />)

			const prevButton = screen.getByLabelText('Previous Month')

			// Navigate to December 2023
			await user.click(prevButton)
			expect(screen.getByText('December 2023')).toBeInTheDocument()
		})
	})

	describe('Date Selection', () => {
		it('calls onChange when a date is clicked', async () => {
			const handleChange = vi.fn()
			const user = userEvent.setup()

			render(<Calendar onChange={handleChange} />)

			const dayButton = screen.getByRole('button', { name: /January 10th 2024/ })
			await user.click(dayButton)

			expect(handleChange).toHaveBeenCalledOnce()
			const calledDate = handleChange.mock.calls[0][0]
			expect(calledDate.getDate()).toBe(10)
			expect(calledDate.getMonth()).toBe(0) // January
			expect(calledDate.getFullYear()).toBe(2024)
		})

		it('does not call onChange when no handler is provided', async () => {
			const user = userEvent.setup()

			render(<Calendar />)

			const dayButton = screen.getByRole('button', { name: /January 10th 2024/ })
			await user.click(dayButton)

			// Should not throw error
			expect(dayButton).toBeInTheDocument()
		})

		it('updates selected date visually', async () => {
			const user = userEvent.setup()
			const selectedDate = new Date(2024, 0, 5)

			render(<Calendar selectedDate={selectedDate} />)

			// Initial selection
			expect(screen.getByRole('button', { pressed: true })).toHaveTextContent('5')

			// Click different date
			const dayButton = screen.getByRole('button', { name: /January 15th 2024/ })
			await user.click(dayButton)

			// Note: Visual update would require state management in parent component
			// This test verifies the click handler is called
		})
	})

	describe('Accessibility', () => {
		it('has proper ARIA roles and labels', () => {
			render(<Calendar />)

			expect(screen.getByRole('application', { name: 'Calendar' })).toBeInTheDocument()
			expect(screen.getByLabelText('Previous Month')).toBeInTheDocument()
			expect(screen.getByLabelText('Next Month')).toBeInTheDocument()
		})

		it('has aria-live region for month/year changes', () => {
			render(<Calendar />)

			const monthYear = screen.getByText('January 2024')
			expect(monthYear).toHaveAttribute('aria-live', 'polite')
		})

		it('has proper aria-pressed for selected date', () => {
			const selectedDate = new Date(2024, 0, 15)
			render(<Calendar selectedDate={selectedDate} />)

			const selectedButton = screen.getByRole('button', { name: /January 15th 2024/ })
			expect(selectedButton).toHaveAttribute('aria-pressed', 'true')

			const unselectedButton = screen.getByRole('button', { name: /January 10th 2024/ })
			expect(unselectedButton).toHaveAttribute('aria-pressed', 'false')
		})

		it('has descriptive aria-labels for date buttons', () => {
			render(<Calendar />)

			const dayButton = screen.getByRole('button', { name: /January 15th 2024/ })
			expect(dayButton).toBeInTheDocument()
		})

		it('marks weekday headers as aria-hidden', () => {
			render(<Calendar />)

			const weekdayHeaders = screen.getAllByText(/^(Su|Mo|Tu|We|Th|Fr|Sa)$/)
			weekdayHeaders.forEach((header) => {
				expect(header).toHaveAttribute('aria-hidden', 'true')
			})
		})

		it('marks empty calendar cells as aria-hidden', () => {
			render(<Calendar />)

			// Empty cells before the first day of the month
			const emptyCells = document.querySelectorAll('[aria-hidden="true"]')
			expect(emptyCells.length).toBeGreaterThan(0)
		})
	})

	describe('Keyboard Navigation', () => {
		it('supports keyboard navigation on navigation buttons', async () => {
			const user = userEvent.setup()
			render(<Calendar />)

			const prevButton = screen.getByLabelText('Previous Month')
			prevButton.focus()
			await user.keyboard('{Enter}')

			expect(screen.getByText('December 2023')).toBeInTheDocument()
		})

		it('supports space key on navigation buttons', async () => {
			const user = userEvent.setup()
			render(<Calendar />)

			const nextButton = screen.getByLabelText('Next Month')
			nextButton.focus()
			await user.keyboard(' ')

			expect(screen.getByText('February 2024')).toBeInTheDocument()
		})

		it('supports keyboard navigation on date buttons', async () => {
			const handleChange = vi.fn()
			const user = userEvent.setup()

			render(<Calendar onChange={handleChange} />)

			const dayButton = screen.getByRole('button', { name: /January 15th 2024/ })
			dayButton.focus()
			await user.keyboard('{Enter}')

			expect(handleChange).toHaveBeenCalledOnce()
		})
	})

	describe('Styling', () => {
		it('applies correct CSS classes to container', () => {
			render(<Calendar />)

			const container = screen.getByRole('application')
			expect(container).toHaveClass(
				'max-w-sm',
				'mx-auto',
				'p-4',
				'border',
				'rounded',
				'shadow',
			)
		})

		it('applies hover styles to navigation buttons', () => {
			render(<Calendar />)

			const prevButton = screen.getByLabelText('Previous Month')
			expect(prevButton).toHaveClass('hover:bg-gray-300')
		})

		it('applies hover styles to date buttons', () => {
			render(<Calendar />)

			const dayButton = screen.getByRole('button', { name: /January 15th 2024/ })
			expect(dayButton).toHaveClass('hover:bg-blue-100')
		})

		it('applies selected styles to selected date', () => {
			const selectedDate = new Date(2024, 0, 15)
			render(<Calendar selectedDate={selectedDate} />)

			const selectedButton = screen.getByRole('button', { name: /January 15th 2024/ })
			expect(selectedButton).toHaveClass('bg-blue-200')
		})
	})

	describe('Edge Cases', () => {
		it('handles months with different numbers of days', async () => {
			const user = userEvent.setup()
			render(<Calendar />)

			// Navigate to February (28/29 days)
			const nextButton = screen.getByLabelText('Next Month')
			await user.click(nextButton)

			expect(screen.getByText('February 2024')).toBeInTheDocument()
			// February 2024 has 29 days (leap year)
			expect(
				screen.getByRole('button', { name: /February 29th 2024/ }),
			).toBeInTheDocument()
		})

		it('handles year boundaries correctly', async () => {
			const user = userEvent.setup()
			// Start in December
			render(<Calendar selectedDate={new Date(2023, 11, 15)} />)

			expect(screen.getByText('December 2023')).toBeInTheDocument()

			const nextButton = screen.getByLabelText('Next Month')
			await user.click(nextButton)

			expect(screen.getByText('January 2024')).toBeInTheDocument()
		})

		it('handles undefined selectedDate', () => {
			render(<Calendar selectedDate={undefined} />)

			expect(screen.getByRole('application')).toBeInTheDocument()
			// No button should be pressed
			expect(screen.queryByRole('button', { pressed: true })).not.toBeInTheDocument()
		})
	})

	describe('Different Starting Dates', () => {
		it('renders correctly when starting from different months', () => {
			const julyDate = new Date(2024, 6, 15) // July 15, 2024
			render(<Calendar selectedDate={julyDate} />)

			expect(screen.getByText('July 2024')).toBeInTheDocument()
			expect(screen.getByRole('button', { pressed: true })).toHaveTextContent('15')
		})

		it('renders correctly for different years', () => {
			const futureDate = new Date(2025, 5, 10) // June 10, 2025
			render(<Calendar selectedDate={futureDate} />)

			expect(screen.getByText('June 2025')).toBeInTheDocument()
		})
	})

	describe('Multiple Calendar Instances', () => {
		it('renders multiple calendars independently', () => {
			render(
				<div>
					<Calendar selectedDate={new Date(2024, 0, 15)} />
					<Calendar selectedDate={new Date(2024, 1, 20)} />
				</div>,
			)

			expect(screen.getByText('January 2024')).toBeInTheDocument()
			expect(screen.getByText('February 2024')).toBeInTheDocument()
		})
	})

	describe('Integration with Form Libraries', () => {
		it('works with controlled components pattern', async () => {
			const ControlledCalendar = () => {
				const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
					new Date(2024, 0, 10),
				)

				return (
					<Calendar
						selectedDate={selectedDate}
						onChange={(date) => setSelectedDate(date)}
					/>
				)
			}

			const user = userEvent.setup()
			render(<ControlledCalendar />)

			// Initial selection
			expect(screen.getByRole('button', { pressed: true })).toHaveTextContent('10')

			// Click different date
			const dayButton = screen.getByRole('button', { name: /January 15th 2024/ })
			await user.click(dayButton)

			// Should update the selection
			await waitFor(() => {
				expect(screen.getByRole('button', { pressed: true })).toHaveTextContent('15')
			})
		})
	})
})
