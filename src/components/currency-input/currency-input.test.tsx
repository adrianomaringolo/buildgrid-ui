import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { CurrencyInput } from './currency-input'

describe('CurrencyInput', () => {
	describe('Rendering', () => {
		it('renders currency input with default props', () => {
			const handleValueChange = vi.fn()

			render(<CurrencyInput onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			expect(input).toBeInTheDocument()
			expect(input).toHaveAttribute('type', 'text')
			expect(input).toHaveAttribute('inputmode', 'numeric')
			expect(input).toHaveValue('$ 0.00')
			expect(input).toHaveAttribute('placeholder', '$ 0.00')
		})

		it('renders with custom currency symbol', () => {
			const handleValueChange = vi.fn()

			render(<CurrencyInput currencySymbol="€" onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveValue('€ 0.00')
			expect(input).toHaveAttribute('placeholder', '€ 0.00')
		})

		it('renders with custom separators', () => {
			const handleValueChange = vi.fn()

			render(
				<CurrencyInput
					currencySymbol="€"
					decimalSeparator=","
					thousandSeparator="."
					onValueChange={handleValueChange}
				/>,
			)

			const input = screen.getByRole('textbox')
			expect(input).toHaveValue('€ 0,00')
			expect(input).toHaveAttribute('placeholder', '€ 0,00')
		})

		it('renders with initial value', () => {
			const handleValueChange = vi.fn()

			render(<CurrencyInput value={1234.56} onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveValue('$ 1,234.56')
		})

		it('renders with custom className', () => {
			const handleValueChange = vi.fn()

			render(
				<CurrencyInput className="custom-currency" onValueChange={handleValueChange} />,
			)

			const input = screen.getByRole('textbox')
			expect(input).toHaveClass('custom-currency')
		})

		it('forwards HTML attributes correctly', () => {
			const handleValueChange = vi.fn()

			render(
				<CurrencyInput
					data-testid="test-currency"
					id="currency-id"
					onValueChange={handleValueChange}
				/>,
			)

			const input = screen.getByTestId('test-currency')
			expect(input).toHaveAttribute('id', 'currency-id')
		})
	})

	describe('Value Formatting', () => {
		it('formats large numbers with thousand separators', () => {
			const handleValueChange = vi.fn()

			render(<CurrencyInput value={1234567.89} onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveValue('$ 1,234,567.89')
		})

		it('formats numbers with custom thousand separator', () => {
			const handleValueChange = vi.fn()

			render(
				<CurrencyInput
					value={1234567.89}
					thousandSeparator="."
					decimalSeparator=","
					onValueChange={handleValueChange}
				/>,
			)

			const input = screen.getByRole('textbox')
			expect(input).toHaveValue('$ 1.234.567,89')
		})

		it('always shows two decimal places', () => {
			const handleValueChange = vi.fn()

			render(<CurrencyInput value={100} onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveValue('$ 100.00')
		})

		it('handles zero value correctly', () => {
			const handleValueChange = vi.fn()

			render(<CurrencyInput value={0} onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveValue('$ 0.00')
		})
	})

	describe('User Input', () => {
		it('handles numeric input correctly', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<CurrencyInput onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			await user.clear(input)
			await user.type(input, '12345')

			expect(handleValueChange).toHaveBeenCalledWith(123.45)
			expect(input).toHaveValue('$ 123.45')
		})

		it('handles large number input', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<CurrencyInput onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			await user.clear(input)
			await user.type(input, '1234567')

			expect(handleValueChange).toHaveBeenCalledWith(12345.67)
			expect(input).toHaveValue('$ 12,345.67')
		})

		it('ignores non-numeric characters', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<CurrencyInput onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			await user.clear(input)
			await user.type(input, 'abc123def')

			expect(handleValueChange).toHaveBeenCalledWith(1.23)
			expect(input).toHaveValue('$ 1.23')
		})

		it('handles empty input', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<CurrencyInput value={100} onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			await user.clear(input)

			expect(handleValueChange).toHaveBeenCalledWith(0)
			expect(input).toHaveValue('$ 0.00')
		})

		it('handles single digit input', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<CurrencyInput onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			await user.clear(input)
			await user.type(input, '5')

			expect(handleValueChange).toHaveBeenCalledWith(0.05)
			expect(input).toHaveValue('$ 0.05')
		})
	})

	describe('Focus and Cursor Management', () => {
		it('moves cursor to end on focus', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<CurrencyInput value={123.45} onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox') as HTMLInputElement
			await user.click(input)

			// Cursor should be at the end
			expect(input.selectionStart).toBe(input.value.length)
			expect(input.selectionEnd).toBe(input.value.length)
		})

		it('moves cursor to end on click', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<CurrencyInput value={123.45} onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox') as HTMLInputElement
			await user.click(input)

			expect(input.selectionStart).toBe(input.value.length)
			expect(input.selectionEnd).toBe(input.value.length)
		})
	})

	describe('Props Integration', () => {
		it('supports disabled state', () => {
			const handleValueChange = vi.fn()

			render(<CurrencyInput disabled onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			expect(input).toBeDisabled()
		})

		it('supports required attribute', () => {
			const handleValueChange = vi.fn()

			render(<CurrencyInput required onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			expect(input).toBeRequired()
		})

		it('supports aria-label', () => {
			const handleValueChange = vi.fn()

			render(<CurrencyInput aria-label="Price input" onValueChange={handleValueChange} />)

			const input = screen.getByLabelText('Price input')
			expect(input).toBeInTheDocument()
		})

		it('supports aria-describedby', () => {
			const handleValueChange = vi.fn()

			render(
				<div>
					<CurrencyInput
						aria-describedby="price-help"
						onValueChange={handleValueChange}
					/>
					<div id="price-help">Enter the price in dollars</div>
				</div>,
			)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('aria-describedby', 'price-help')
		})
	})

	describe('Value Updates', () => {
		it('updates display when value prop changes', () => {
			const handleValueChange = vi.fn()

			const { rerender } = render(
				<CurrencyInput value={100} onValueChange={handleValueChange} />,
			)

			let input = screen.getByRole('textbox')
			expect(input).toHaveValue('$ 100.00')

			rerender(<CurrencyInput value={250.75} onValueChange={handleValueChange} />)

			input = screen.getByRole('textbox')
			expect(input).toHaveValue('$ 250.75')
		})

		it('handles value prop changes with custom formatting', () => {
			const handleValueChange = vi.fn()

			const { rerender } = render(
				<CurrencyInput
					value={1000}
					currencySymbol="€"
					decimalSeparator=","
					thousandSeparator="."
					onValueChange={handleValueChange}
				/>,
			)

			let input = screen.getByRole('textbox')
			expect(input).toHaveValue('€ 1.000,00')

			rerender(
				<CurrencyInput
					value={2500.5}
					currencySymbol="€"
					decimalSeparator=","
					thousandSeparator="."
					onValueChange={handleValueChange}
				/>,
			)

			input = screen.getByRole('textbox')
			expect(input).toHaveValue('€ 2.500,50')
		})
	})

	describe('Edge Cases', () => {
		it('handles very large numbers', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<CurrencyInput onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			await user.clear(input)
			await user.type(input, '999999999')

			expect(handleValueChange).toHaveBeenCalledWith(9999999.99)
			expect(input).toHaveValue('$ 9,999,999.99')
		})

		it('handles undefined value prop', () => {
			const handleValueChange = vi.fn()

			render(<CurrencyInput value={undefined} onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveValue('$ 0.00')
		})

		it('handles null value prop', () => {
			const handleValueChange = vi.fn()

			render(<CurrencyInput value={null as any} onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveValue('$ 0.00')
		})

		it('handles string value prop', () => {
			const handleValueChange = vi.fn()

			render(<CurrencyInput value={'123.45' as any} onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveValue('$ 123.45')
		})
	})

	describe('Ref Forwarding', () => {
		it('forwards ref correctly', () => {
			const handleValueChange = vi.fn()
			const ref = React.createRef<HTMLInputElement>()

			render(<CurrencyInput ref={ref} onValueChange={handleValueChange} />)

			expect(ref.current).toBeInstanceOf(HTMLInputElement)
			expect(ref.current?.type).toBe('text')
		})

		it('allows ref access to focus method', () => {
			const handleValueChange = vi.fn()
			const ref = React.createRef<HTMLInputElement>()

			render(<CurrencyInput ref={ref} onValueChange={handleValueChange} />)

			expect(ref.current?.focus).toBeDefined()
			expect(typeof ref.current?.focus).toBe('function')
		})
	})

	describe('Form Integration', () => {
		it('works in form context', async () => {
			const handleSubmit = vi.fn((e) => e.preventDefault())
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<form onSubmit={handleSubmit}>
					<CurrencyInput name="price" onValueChange={handleValueChange} />
					<button type="submit">Submit</button>
				</form>,
			)

			const input = screen.getByRole('textbox')
			const submitButton = screen.getByRole('button', { name: 'Submit' })

			await user.clear(input)
			await user.type(input, '12345')
			await user.click(submitButton)

			expect(handleSubmit).toHaveBeenCalledOnce()
			expect(handleValueChange).toHaveBeenCalledWith(123.45)
		})

		it('supports name attribute', () => {
			const handleValueChange = vi.fn()

			render(<CurrencyInput name="amount" onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('name', 'amount')
		})
	})

	describe('Different Currency Configurations', () => {
		it('handles Euro configuration', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<CurrencyInput
					currencySymbol="€"
					decimalSeparator=","
					thousandSeparator=" "
					onValueChange={handleValueChange}
				/>,
			)

			const input = screen.getByRole('textbox')
			await user.clear(input)
			await user.type(input, '123456')

			expect(handleValueChange).toHaveBeenCalledWith(1234.56)
			expect(input).toHaveValue('€ 1 234,56')
		})

		it('handles British Pound configuration', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<CurrencyInput currencySymbol="£" onValueChange={handleValueChange} />)

			const input = screen.getByRole('textbox')
			await user.clear(input)
			await user.type(input, '98765')

			expect(handleValueChange).toHaveBeenCalledWith(987.65)
			expect(input).toHaveValue('£ 987.65')
		})
	})
})
