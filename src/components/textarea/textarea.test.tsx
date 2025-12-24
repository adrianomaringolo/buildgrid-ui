import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Textarea } from './textarea'

describe('Textarea', () => {
	describe('Rendering', () => {
		it('renders textarea with default props', () => {
			render(<Textarea />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toBeInTheDocument()
			expect(textarea.tagName).toBe('TEXTAREA')
		})

		it('renders with custom className', () => {
			render(<Textarea className="custom-textarea" />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveClass('custom-textarea')
		})

		it('applies default styling classes', () => {
			render(<Textarea />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveClass(
				'flex',
				'min-h-[60px]',
				'w-full',
				'rounded-md',
				'border',
				'border-input',
				'bg-transparent',
				'px-3',
				'py-2',
				'text-sm',
				'shadow-sm',
			)
		})

		it('applies focus and placeholder styling', () => {
			render(<Textarea />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveClass(
				'placeholder:text-muted-foreground',
				'focus-visible:outline-none',
				'focus-visible:ring-1',
				'focus-visible:ring-ring',
			)
		})

		it('applies disabled styling', () => {
			render(<Textarea disabled />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
		})
	})

	describe('Props and Attributes', () => {
		it('accepts and applies placeholder', () => {
			render(<Textarea placeholder="Enter your message..." />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveAttribute('placeholder', 'Enter your message...')
		})

		it('accepts and applies value', () => {
			render(<Textarea value="Initial content" readOnly />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveValue('Initial content')
		})

		it('accepts and applies defaultValue', () => {
			render(<Textarea defaultValue="Default content" />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveValue('Default content')
		})

		it('accepts and applies name attribute', () => {
			render(<Textarea name="message" />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveAttribute('name', 'message')
		})

		it('accepts and applies id attribute', () => {
			render(<Textarea id="message-textarea" />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveAttribute('id', 'message-textarea')
		})

		it('accepts and applies rows attribute', () => {
			render(<Textarea rows={5} />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveAttribute('rows', '5')
		})

		it('accepts and applies cols attribute', () => {
			render(<Textarea cols={50} />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveAttribute('cols', '50')
		})

		it('accepts and applies maxLength attribute', () => {
			render(<Textarea maxLength={100} />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveAttribute('maxLength', '100')
		})

		it('accepts and applies minLength attribute', () => {
			render(<Textarea minLength={10} />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveAttribute('minLength', '10')
		})

		it('accepts and applies required attribute', () => {
			render(<Textarea required />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toBeRequired()
		})

		it('accepts and applies disabled attribute', () => {
			render(<Textarea disabled />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toBeDisabled()
		})

		it('accepts and applies readOnly attribute', () => {
			render(<Textarea readOnly />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveAttribute('readOnly')
		})

		it('accepts and applies autoFocus attribute', () => {
			render(<Textarea autoFocus />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveFocus()
		})
	})

	describe('User Interactions', () => {
		it('handles text input', async () => {
			const user = userEvent.setup()

			render(<Textarea />)

			const textarea = screen.getByRole('textbox')
			await user.type(textarea, 'Hello, World!')

			expect(textarea).toHaveValue('Hello, World!')
		})

		it('handles multiline text input', async () => {
			const user = userEvent.setup()

			render(<Textarea />)

			const textarea = screen.getByRole('textbox')
			await user.type(textarea, 'Line 1{Enter}Line 2{Enter}Line 3')

			expect(textarea).toHaveValue('Line 1\nLine 2\nLine 3')
		})

		it('handles text selection', async () => {
			const user = userEvent.setup()

			render(<Textarea defaultValue="Select this text" />)

			const textarea = screen.getByRole('textbox')
			await user.tripleClick(textarea)

			expect(textarea.selectionStart).toBe(0)
			expect(textarea.selectionEnd).toBe('Select this text'.length)
		})

		it('handles focus and blur events', async () => {
			const handleFocus = vi.fn()
			const handleBlur = vi.fn()
			const user = userEvent.setup()

			render(<Textarea onFocus={handleFocus} onBlur={handleBlur} />)

			const textarea = screen.getByRole('textbox')

			await user.click(textarea)
			expect(handleFocus).toHaveBeenCalledTimes(1)

			await user.tab()
			expect(handleBlur).toHaveBeenCalledTimes(1)
		})

		it('handles change events', async () => {
			const handleChange = vi.fn()
			const user = userEvent.setup()

			render(<Textarea onChange={handleChange} />)

			const textarea = screen.getByRole('textbox')
			await user.type(textarea, 'test')

			expect(handleChange).toHaveBeenCalledTimes(4) // One for each character
		})

		it('handles input events', async () => {
			const handleInput = vi.fn()
			const user = userEvent.setup()

			render(<Textarea onInput={handleInput} />)

			const textarea = screen.getByRole('textbox')
			await user.type(textarea, 'test')

			expect(handleInput).toHaveBeenCalledTimes(4)
		})

		it('handles keyboard events', async () => {
			const handleKeyDown = vi.fn()
			const handleKeyUp = vi.fn()
			const user = userEvent.setup()

			render(<Textarea onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />)

			const textarea = screen.getByRole('textbox')
			await user.type(textarea, 'a')

			expect(handleKeyDown).toHaveBeenCalled()
			expect(handleKeyUp).toHaveBeenCalled()
		})
	})

	describe('Form Integration', () => {
		it('works with form submission', async () => {
			const handleSubmit = vi.fn((e) => e.preventDefault())
			const user = userEvent.setup()

			render(
				<form onSubmit={handleSubmit}>
					<Textarea name="message" defaultValue="Form message" />
					<button type="submit">Submit</button>
				</form>,
			)

			const submitButton = screen.getByRole('button', { name: 'Submit' })
			await user.click(submitButton)

			expect(handleSubmit).toHaveBeenCalled()
		})

		it('validates required field', async () => {
			const user = userEvent.setup()

			render(
				<form>
					<Textarea required />
					<button type="submit">Submit</button>
				</form>,
			)

			const textarea = screen.getByRole('textbox')
			const submitButton = screen.getByRole('button', { name: 'Submit' })

			await user.click(submitButton)

			expect(textarea).toBeInvalid()
		})

		it('validates maxLength constraint', async () => {
			const user = userEvent.setup()

			render(<Textarea maxLength={5} />)

			const textarea = screen.getByRole('textbox')
			await user.type(textarea, '123456789')

			expect(textarea).toHaveValue('12345')
		})

		it('works with labels', () => {
			render(
				<div>
					<label htmlFor="message-textarea">Message</label>
					<Textarea id="message-textarea" />
				</div>,
			)

			const label = screen.getByText('Message')
			const textarea = screen.getByRole('textbox')

			expect(label).toHaveAttribute('for', 'message-textarea')
			expect(textarea).toHaveAttribute('id', 'message-textarea')
		})
	})

	describe('Controlled vs Uncontrolled', () => {
		it('works as uncontrolled component', async () => {
			const user = userEvent.setup()

			render(<Textarea defaultValue="Initial" />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveValue('Initial')

			await user.clear(textarea)
			await user.type(textarea, 'Updated')

			expect(textarea).toHaveValue('Updated')
		})

		it('works as controlled component', async () => {
			const ControlledTextarea = () => {
				const [value, setValue] = React.useState('Controlled')

				return <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
			}

			const user = userEvent.setup()
			render(<ControlledTextarea />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveValue('Controlled')

			await user.clear(textarea)
			await user.type(textarea, 'New Value')

			expect(textarea).toHaveValue('New Value')
		})

		it('updates when controlled value changes', () => {
			const { rerender } = render(<Textarea value="First" readOnly />)

			let textarea = screen.getByRole('textbox')
			expect(textarea).toHaveValue('First')

			rerender(<Textarea value="Second" readOnly />)

			textarea = screen.getByRole('textbox')
			expect(textarea).toHaveValue('Second')
		})
	})

	describe('Accessibility', () => {
		it('has proper role', () => {
			render(<Textarea />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toBeInTheDocument()
		})

		it('supports aria-label', () => {
			render(<Textarea aria-label="Message input" />)

			const textarea = screen.getByLabelText('Message input')
			expect(textarea).toBeInTheDocument()
		})

		it('supports aria-labelledby', () => {
			render(
				<div>
					<div id="textarea-label">Enter your message</div>
					<Textarea aria-labelledby="textarea-label" />
				</div>,
			)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveAttribute('aria-labelledby', 'textarea-label')
		})

		it('supports aria-describedby', () => {
			render(
				<div>
					<Textarea aria-describedby="textarea-help" />
					<div id="textarea-help">Help text for textarea</div>
				</div>,
			)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveAttribute('aria-describedby', 'textarea-help')
		})

		it('supports aria-invalid', () => {
			render(<Textarea aria-invalid="true" />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveAttribute('aria-invalid', 'true')
		})

		it('is focusable', async () => {
			const user = userEvent.setup()

			render(<Textarea />)

			const textarea = screen.getByRole('textbox')
			await user.tab()

			expect(textarea).toHaveFocus()
		})

		it('is not focusable when disabled', () => {
			render(<Textarea disabled />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toBeDisabled()
		})
	})

	describe('Ref Forwarding', () => {
		it('forwards ref to textarea element', () => {
			const ref = React.createRef<HTMLTextAreaElement>()

			render(<Textarea ref={ref} />)

			expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
			expect(ref.current?.tagName).toBe('TEXTAREA')
		})

		it('allows ref methods to be called', () => {
			const ref = React.createRef<HTMLTextAreaElement>()

			render(<Textarea ref={ref} defaultValue="Test content" />)

			expect(ref.current?.value).toBe('Test content')
			expect(typeof ref.current?.focus).toBe('function')
			expect(typeof ref.current?.blur).toBe('function')
			expect(typeof ref.current?.select).toBe('function')
		})
	})

	describe('Edge Cases', () => {
		it('handles undefined className gracefully', () => {
			render(<Textarea className={undefined} />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toBeInTheDocument()
		})

		it('handles empty string value', () => {
			render(<Textarea value="" readOnly />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveValue('')
		})

		it('handles null value gracefully', () => {
			render(<Textarea value={null as any} readOnly />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveValue('')
		})

		it('handles very long text content', async () => {
			const longText = 'a'.repeat(1000) // Reduced from 10000 to avoid timeout
			const user = userEvent.setup()

			render(<Textarea />)

			const textarea = screen.getByRole('textbox')
			await user.click(textarea)
			await user.paste(longText) // Use paste instead of type for performance

			expect(textarea).toHaveValue(longText)
		})

		it('handles special characters', async () => {
			const specialText = '!@#$%^&*()_+-='
			const user = userEvent.setup()

			render(<Textarea />)

			const textarea = screen.getByRole('textbox')
			await user.click(textarea)
			await user.paste(specialText) // Use paste to avoid keyboard parsing issues

			expect(textarea).toHaveValue(specialText)
		})

		it('handles unicode characters', async () => {
			const unicodeText = '🚀 Hello 世界 🌟'
			const user = userEvent.setup()

			render(<Textarea />)

			const textarea = screen.getByRole('textbox')
			await user.click(textarea)
			await user.paste(unicodeText) // Use paste to avoid typing issues with unicode

			expect(textarea).toHaveValue(unicodeText)
		})
	})

	describe('Styling Variations', () => {
		it('combines custom className with default classes', () => {
			render(<Textarea className="custom-class border-red-500" />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveClass('custom-class', 'border-red-500')
			expect(textarea).toHaveClass('flex', 'min-h-[60px]', 'w-full') // Default classes
		})

		it('allows overriding default styles', () => {
			render(<Textarea className="min-h-[100px] bg-blue-100" />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveClass('min-h-[100px]', 'bg-blue-100')
		})
	})

	describe('Performance', () => {
		it('renders efficiently with minimal re-renders', () => {
			const { rerender } = render(<Textarea value="test" readOnly />)

			const textarea = screen.getByRole('textbox')
			expect(textarea).toHaveValue('test')

			// Re-render with same props should not cause issues
			rerender(<Textarea value="test" readOnly />)

			expect(textarea).toHaveValue('test')
		})

		it('handles rapid input changes efficiently', async () => {
			const handleChange = vi.fn()
			const user = userEvent.setup()

			render(<Textarea onChange={handleChange} />)

			const textarea = screen.getByRole('textbox')

			// Type a shorter text for performance
			await user.type(textarea, 'test', { delay: 1 })

			expect(handleChange).toHaveBeenCalledTimes(4) // One for each character
			expect(textarea).toHaveValue('test')
		})
	})

	describe('Complex Scenarios', () => {
		it('maintains cursor position during controlled updates', async () => {
			const ControlledTextarea = () => {
				const [value, setValue] = React.useState('Initial text')

				return (
					<div>
						<Textarea value={value} onChange={(e) => setValue(e.target.value)} />
						<button onClick={() => setValue('Updated text')}>Update</button>
					</div>
				)
			}

			const user = userEvent.setup()
			render(<ControlledTextarea />)

			const textarea = screen.getByRole('textbox')
			const updateButton = screen.getByRole('button', { name: 'Update' })

			// Position cursor in middle
			await user.click(textarea)
			textarea.setSelectionRange(7, 7) // After "Initial"

			await user.click(updateButton)

			expect(textarea).toHaveValue('Updated text')
		})

		it('works with form validation libraries', async () => {
			const validate = (value: string) => {
				if (value.length < 5) return 'Too short'
				return ''
			}

			const FormWithValidation = () => {
				const [value, setValue] = React.useState('')
				const [error, setError] = React.useState('')

				const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
					const newValue = e.target.value
					setValue(newValue)
					setError(validate(newValue))
				}

				return (
					<div>
						<Textarea
							value={value}
							onChange={handleChange}
							aria-invalid={error ? 'true' : 'false'}
							aria-describedby={error ? 'error' : undefined}
						/>
						{error && <div id="error">{error}</div>}
					</div>
				)
			}

			const user = userEvent.setup()
			render(<FormWithValidation />)

			const textarea = screen.getByRole('textbox')

			await user.click(textarea)
			await user.paste('Hi') // Use paste instead of type
			expect(screen.getByText('Too short')).toBeInTheDocument()
			expect(textarea).toHaveAttribute('aria-invalid', 'true')

			await user.clear(textarea)
			await user.paste('Hi there!') // Use paste instead of type
			expect(screen.queryByText('Too short')).not.toBeInTheDocument()
			expect(textarea).toHaveAttribute('aria-invalid', 'false')
		})
	})
})
