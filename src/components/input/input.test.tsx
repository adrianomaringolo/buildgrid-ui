import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Input } from './input'

describe('Input', () => {
	describe('Rendering', () => {
		it('renders input with default props', () => {
			render(<Input />)

			const input = screen.getByRole('textbox')
			expect(input).toBeInTheDocument()
			expect(input).toHaveClass(
				'flex',
				'h-10',
				'w-full',
				'rounded-md',
				'border',
				'border-input',
				'bg-transparent',
				'px-3',
				'py-1',
				'text-sm',
				'shadow-sm',
			)
		})

		it('renders with custom type', () => {
			render(<Input type="email" />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('type', 'email')
		})

		it('renders password input', () => {
			render(<Input type="password" />)

			const input = document.querySelector('input[type="password"]')
			expect(input).toBeInTheDocument()
			expect(input).toHaveAttribute('type', 'password')
		})

		it('renders number input', () => {
			render(<Input type="number" />)

			const input = screen.getByRole('spinbutton')
			expect(input).toHaveAttribute('type', 'number')
		})

		it('renders with placeholder', () => {
			render(<Input placeholder="Enter your name" />)

			const input = screen.getByPlaceholderText('Enter your name')
			expect(input).toBeInTheDocument()
		})

		it('renders with initial value', () => {
			render(<Input value="Initial value" onChange={() => {}} />)

			const input = screen.getByDisplayValue('Initial value')
			expect(input).toBeInTheDocument()
		})

		it('renders with defaultValue', () => {
			render(<Input defaultValue="Default value" />)

			const input = screen.getByDisplayValue('Default value')
			expect(input).toBeInTheDocument()
		})

		it('renders with custom className', () => {
			render(<Input className="custom-input" />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveClass('custom-input')
		})

		it('forwards HTML attributes correctly', () => {
			render(<Input data-testid="test-input" id="input-id" name="test-name" />)

			const input = screen.getByTestId('test-input')
			expect(input).toHaveAttribute('id', 'input-id')
			expect(input).toHaveAttribute('name', 'test-name')
		})
	})

	describe('Sizing Variants', () => {
		it('renders with small sizing', () => {
			render(<Input sizing="sm" />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveClass('h-8', 'text-xs', 'px-2')
		})

		it('renders with medium sizing (default)', () => {
			render(<Input sizing="md" />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveClass('h-10', 'text-sm', 'px-3')
		})

		it('renders with large sizing', () => {
			render(<Input sizing="lg" />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveClass('h-12', 'text-base', 'px-4')
		})

		it('renders with extra large sizing', () => {
			render(<Input sizing="xl" />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveClass('h-14', 'text-lg', 'px-5')
		})

		it('renders with 2xl sizing', () => {
			render(<Input sizing="2xl" />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveClass('h-16', 'text-xl', 'px-6')
		})

		it('uses medium sizing as default when no sizing prop provided', () => {
			render(<Input />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveClass('h-10', 'text-sm', 'px-3')
		})
	})

	describe('User Interaction', () => {
		it('handles text input correctly', async () => {
			const handleChange = vi.fn()
			const user = userEvent.setup()

			render(<Input onChange={handleChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'Hello World')

			expect(input).toHaveValue('Hello World')
			expect(handleChange).toHaveBeenCalledTimes(11) // One call per character
		})

		it('handles clearing input', async () => {
			const handleChange = vi.fn()
			const user = userEvent.setup()

			render(<Input defaultValue="Initial text" onChange={handleChange} />)

			const input = screen.getByRole('textbox')
			await user.clear(input)

			expect(input).toHaveValue('')
			expect(handleChange).toHaveBeenCalled()
		})

		it('handles focus and blur events', async () => {
			const handleFocus = vi.fn()
			const handleBlur = vi.fn()
			const user = userEvent.setup()

			render(<Input onFocus={handleFocus} onBlur={handleBlur} />)

			const input = screen.getByRole('textbox')

			await user.click(input)
			expect(handleFocus).toHaveBeenCalledOnce()

			await user.tab()
			expect(handleBlur).toHaveBeenCalledOnce()
		})

		it('handles key events', async () => {
			const handleKeyDown = vi.fn()
			const handleKeyUp = vi.fn()
			const user = userEvent.setup()

			render(<Input onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'a')

			expect(handleKeyDown).toHaveBeenCalled()
			expect(handleKeyUp).toHaveBeenCalled()
		})

		it('handles Enter key press', async () => {
			const handleKeyDown = vi.fn()
			const user = userEvent.setup()

			render(<Input onKeyDown={handleKeyDown} />)

			const input = screen.getByRole('textbox')
			await user.type(input, '{Enter}')

			expect(handleKeyDown).toHaveBeenCalledWith(
				expect.objectContaining({
					key: 'Enter',
				}),
			)
		})
	})

	describe('States', () => {
		it('supports disabled state', () => {
			render(<Input disabled />)

			const input = screen.getByRole('textbox')
			expect(input).toBeDisabled()
			expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
		})

		it('supports readonly state', () => {
			render(<Input readOnly />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('readonly')
		})

		it('supports required state', () => {
			render(<Input required />)

			const input = screen.getByRole('textbox')
			expect(input).toBeRequired()
		})

		it('does not accept input when disabled', async () => {
			const handleChange = vi.fn()
			const user = userEvent.setup()

			render(<Input disabled onChange={handleChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'test')

			expect(input).toHaveValue('')
			expect(handleChange).not.toHaveBeenCalled()
		})

		it('does not accept input when readonly', async () => {
			const handleChange = vi.fn()
			const user = userEvent.setup()

			render(<Input readOnly defaultValue="readonly text" onChange={handleChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'new text')

			expect(input).toHaveValue('readonly text')
			expect(handleChange).not.toHaveBeenCalled()
		})
	})

	describe('Accessibility', () => {
		it('supports aria-label', () => {
			render(<Input aria-label="Username input" />)

			const input = screen.getByLabelText('Username input')
			expect(input).toBeInTheDocument()
		})

		it('supports aria-describedby', () => {
			render(
				<div>
					<Input aria-describedby="input-help" />
					<div id="input-help">Enter your username</div>
				</div>,
			)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('aria-describedby', 'input-help')
		})

		it('supports aria-invalid', () => {
			render(<Input aria-invalid />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('aria-invalid', 'true')
		})

		it('supports aria-required', () => {
			render(<Input aria-required />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('aria-required', 'true')
		})

		it('can be associated with a label', () => {
			render(
				<div>
					<label htmlFor="username">Username</label>
					<Input id="username" />
				</div>,
			)

			const input = screen.getByLabelText('Username')
			expect(input).toBeInTheDocument()
		})
	})

	describe('Form Integration', () => {
		it('works in form context', async () => {
			const handleSubmit = vi.fn((e) => e.preventDefault())
			const user = userEvent.setup()

			render(
				<form onSubmit={handleSubmit}>
					<Input name="username" />
					<button type="submit">Submit</button>
				</form>,
			)

			const input = screen.getByRole('textbox')
			const submitButton = screen.getByRole('button', { name: 'Submit' })

			await user.type(input, 'testuser')
			await user.click(submitButton)

			expect(handleSubmit).toHaveBeenCalledOnce()
			expect(input).toHaveValue('testuser')
		})

		it('supports name attribute', () => {
			render(<Input name="email" />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('name', 'email')
		})

		it('supports form validation', () => {
			render(<Input required pattern="[a-z]+" title="Only lowercase letters" />)

			const input = screen.getByRole('textbox')
			expect(input).toBeRequired()
			expect(input).toHaveAttribute('pattern', '[a-z]+')
			expect(input).toHaveAttribute('title', 'Only lowercase letters')
		})

		it('supports minLength and maxLength', () => {
			render(<Input minLength={3} maxLength={10} />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('minlength', '3')
			expect(input).toHaveAttribute('maxlength', '10')
		})
	})

	describe('File Input', () => {
		it('renders file input correctly', () => {
			render(<Input type="file" />)

			const input = document.querySelector('input[type="file"]')
			expect(input).toBeInTheDocument()
			expect(input).toHaveClass('file:border-0', 'file:bg-transparent', 'file:text-sm')
		})

		it('supports file input with accept attribute', () => {
			render(<Input type="file" accept=".jpg,.png" />)

			const input = document.querySelector('input[type="file"]')
			expect(input).toHaveAttribute('accept', '.jpg,.png')
		})

		it('supports multiple file selection', () => {
			render(<Input type="file" multiple />)

			const input = document.querySelector('input[type="file"]')
			expect(input).toHaveAttribute('multiple')
		})
	})

	describe('Number Input', () => {
		it('handles number input with min and max', () => {
			render(<Input type="number" min={0} max={100} />)

			const input = screen.getByRole('spinbutton')
			expect(input).toHaveAttribute('min', '0')
			expect(input).toHaveAttribute('max', '100')
		})

		it('handles number input with step', () => {
			render(<Input type="number" step={0.1} />)

			const input = screen.getByRole('spinbutton')
			expect(input).toHaveAttribute('step', '0.1')
		})

		it('handles numeric input', async () => {
			const handleChange = vi.fn()
			const user = userEvent.setup()

			render(<Input type="number" onChange={handleChange} />)

			const input = screen.getByRole('spinbutton')
			await user.type(input, '123')

			expect(input).toHaveValue(123)
			expect(handleChange).toHaveBeenCalled()
		})
	})

	describe('Controlled vs Uncontrolled', () => {
		it('works as controlled component', async () => {
			const ControlledInput = () => {
				const [value, setValue] = React.useState('')

				return (
					<Input
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="Controlled input"
					/>
				)
			}

			const user = userEvent.setup()
			render(<ControlledInput />)

			const input = screen.getByPlaceholderText('Controlled input')
			await user.type(input, 'controlled')

			expect(input).toHaveValue('controlled')
		})

		it('works as uncontrolled component', async () => {
			const user = userEvent.setup()

			render(<Input defaultValue="uncontrolled" placeholder="Uncontrolled input" />)

			const input = screen.getByPlaceholderText('Uncontrolled input')
			await user.clear(input)
			await user.type(input, 'new value')

			expect(input).toHaveValue('new value')
		})
	})

	describe('Ref Forwarding', () => {
		it('forwards ref correctly', () => {
			const ref = React.createRef<HTMLInputElement>()

			render(<Input ref={ref} />)

			expect(ref.current).toBeInstanceOf(HTMLInputElement)
			expect(ref.current?.type).toBe('text')
		})

		it('allows ref access to focus method', () => {
			const ref = React.createRef<HTMLInputElement>()

			render(<Input ref={ref} />)

			expect(ref.current?.focus).toBeDefined()
			expect(typeof ref.current?.focus).toBe('function')
		})

		it('allows programmatic focus via ref', () => {
			const ref = React.createRef<HTMLInputElement>()

			render(<Input ref={ref} />)

			ref.current?.focus()
			expect(ref.current).toHaveFocus()
		})
	})

	describe('Edge Cases', () => {
		it('handles undefined className gracefully', () => {
			render(<Input className={undefined} />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveClass('flex', 'h-10', 'w-full') // Should still have default classes
		})

		it('handles undefined sizing gracefully', () => {
			render(<Input sizing={undefined} />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveClass('h-10', 'text-sm', 'px-3') // Should use default sizing
		})

		it('handles empty string value', () => {
			render(<Input value="" onChange={() => {}} />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveValue('')
		})

		it('handles null defaultValue', () => {
			render(<Input defaultValue={null as any} />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveValue('')
		})

		it('handles undefined value prop', () => {
			render(<Input value={undefined} onChange={() => {}} />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveValue('')
		})
	})

	describe('Custom Styling', () => {
		it('combines custom className with default classes', () => {
			render(<Input className="border-red-500 bg-red-50" />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveClass('border-red-500', 'bg-red-50')
			expect(input).toHaveClass('flex', 'w-full', 'rounded-md') // Should still have base classes
		})

		it('allows overriding default classes', () => {
			render(<Input className="h-20 text-2xl" sizing="sm" />)

			const input = screen.getByRole('textbox')
			// Custom classes should take precedence
			expect(input).toHaveClass('h-20', 'text-2xl')
		})
	})

	describe('Input Types', () => {
		it('renders search input', () => {
			render(<Input type="search" />)

			const input = screen.getByRole('searchbox')
			expect(input).toHaveAttribute('type', 'search')
		})

		it('renders tel input', () => {
			render(<Input type="tel" />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('type', 'tel')
		})

		it('renders url input', () => {
			render(<Input type="url" />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('type', 'url')
		})

		it('renders date input', () => {
			render(<Input type="date" />)

			const input = document.querySelector('input[type="date"]')
			expect(input).toBeInTheDocument()
			expect(input).toHaveAttribute('type', 'date')
		})

		it('renders time input', () => {
			render(<Input type="time" />)

			const input = document.querySelector('input[type="time"]')
			expect(input).toBeInTheDocument()
			expect(input).toHaveAttribute('type', 'time')
		})

		it('renders datetime-local input', () => {
			render(<Input type="datetime-local" />)

			const input = document.querySelector('input[type="datetime-local"]')
			expect(input).toBeInTheDocument()
			expect(input).toHaveAttribute('type', 'datetime-local')
		})

		it('renders color input', () => {
			render(<Input type="color" />)

			const input = document.querySelector('input[type="color"]')
			expect(input).toBeInTheDocument()
			expect(input).toHaveAttribute('type', 'color')
		})

		it('renders range input', () => {
			render(<Input type="range" />)

			const input = screen.getByRole('slider')
			expect(input).toHaveAttribute('type', 'range')
		})
	})

	describe('Placeholder Styling', () => {
		it('applies placeholder styling classes', () => {
			render(<Input placeholder="Styled placeholder" />)

			const input = screen.getByPlaceholderText('Styled placeholder')
			expect(input).toHaveClass('placeholder:text-muted-foreground')
		})
	})

	describe('Focus Styling', () => {
		it('applies focus styling classes', () => {
			render(<Input />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveClass(
				'focus-visible:outline-none',
				'focus-visible:ring-1',
				'focus-visible:ring-ring',
			)
		})
	})

	describe('Transition Effects', () => {
		it('applies transition classes', () => {
			render(<Input />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveClass('transition-colors')
		})
	})
})
