import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { PasswordInput } from './password-input'

describe('PasswordInput', () => {
	describe('Rendering', () => {
		it('renders password input with default props', () => {
			render(<PasswordInput />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			expect(input).toBeInTheDocument()
			expect(input).toHaveAttribute('type', 'password')

			const toggleButton = screen.getByLabelText('Show password')
			expect(toggleButton).toBeInTheDocument()

			expect(screen.getByText('Password strength:')).toBeInTheDocument()
			expect(screen.getByText('Very weak')).toBeInTheDocument()
		})

		it('renders with custom className', () => {
			render(<PasswordInput className="custom-password" />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			expect(input).toHaveClass('custom-password')
		})

		it('renders without strength meter when disabled', () => {
			render(<PasswordInput showStrengthMeter={false} />)

			expect(screen.queryByText('Password strength:')).not.toBeInTheDocument()
			expect(screen.queryByText('Very weak')).not.toBeInTheDocument()
		})

		it('renders with custom labels', () => {
			const customLabels = {
				veryWeak: 'Muito fraca',
				weak: 'Fraca',
				medium: 'Média',
				strong: 'Forte',
				veryStrong: 'Muito forte',
			}

			render(<PasswordInput strengthLabels={customLabels} />)

			expect(screen.getByText('Muito fraca')).toBeInTheDocument()
		})

		it('renders with custom button labels', () => {
			render(
				<PasswordInput
					showPasswordLabel="Mostrar senha"
					hidePasswordLabel="Ocultar senha"
				/>,
			)

			const toggleButton = screen.getByLabelText('Mostrar senha')
			expect(toggleButton).toBeInTheDocument()
		})

		it('renders with custom strength title', () => {
			render(<PasswordInput strengthTitle="Força da senha" />)

			expect(screen.getByText('Força da senha:')).toBeInTheDocument()
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<PasswordInput
					data-testid="test-password"
					id="password-id"
					placeholder="Enter password"
				/>,
			)

			const input = screen.getByTestId('test-password')
			expect(input).toHaveAttribute('id', 'password-id')
			expect(input).toHaveAttribute('placeholder', 'Enter password')
		})
	})

	describe('Password Visibility Toggle', () => {
		it('toggles password visibility when button is clicked', async () => {
			const user = userEvent.setup()

			render(<PasswordInput />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			const toggleButton = screen.getByLabelText('Show password')

			// Initially password type
			expect(input).toHaveAttribute('type', 'password')

			// Click to show password
			await user.click(toggleButton)
			expect(input).toHaveAttribute('type', 'text')
			expect(screen.getByLabelText('Hide password')).toBeInTheDocument()

			// Click to hide password again
			await user.click(toggleButton)
			expect(input).toHaveAttribute('type', 'password')
			expect(screen.getByLabelText('Show password')).toBeInTheDocument()
		})

		it('shows correct icons for visibility states', async () => {
			const user = userEvent.setup()

			render(<PasswordInput />)

			const toggleButton = screen.getByLabelText('Show password')

			// Initially shows Eye icon (password hidden)
			let eyeIcon = toggleButton.querySelector('svg')
			expect(eyeIcon).toBeInTheDocument()

			// Click to show password - should show EyeOff icon
			await user.click(toggleButton)
			const eyeOffIcon = screen.getByLabelText('Hide password').querySelector('svg')
			expect(eyeOffIcon).toBeInTheDocument()
		})

		it('maintains focus on toggle button after click', async () => {
			const user = userEvent.setup()

			render(<PasswordInput />)

			const toggleButton = screen.getByLabelText('Show password')
			await user.click(toggleButton)

			expect(toggleButton).toHaveFocus()
		})
	})

	describe('Password Input Handling', () => {
		it('updates password value when typing', async () => {
			const user = userEvent.setup()

			render(<PasswordInput />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			await user.type(input, 'mypassword')

			expect(input).toHaveValue('mypassword')
		})

		it('calls onChange prop when provided', async () => {
			const handleChange = vi.fn()
			const user = userEvent.setup()

			render(<PasswordInput onChange={handleChange} />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			await user.type(input, 'test')

			expect(handleChange).toHaveBeenCalledTimes(4) // Once for each character
		})

		it('handles controlled component pattern', async () => {
			const handleChange = vi.fn()
			const user = userEvent.setup()

			const ControlledPassword = () => {
				const [value, setValue] = React.useState('')
				return (
					<PasswordInput
						value={value}
						onChange={(e) => {
							setValue(e.target.value)
							handleChange(e)
						}}
					/>
				)
			}

			render(<ControlledPassword />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			await user.type(input, 'controlled')

			expect(input).toHaveValue('controlled')
			expect(handleChange).toHaveBeenCalledTimes(10)
		})

		it('handles paste events', async () => {
			const user = userEvent.setup()

			render(<PasswordInput />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			await user.click(input)
			await user.paste('pastedpassword')

			expect(input).toHaveValue('pastedpassword')
		})
	})

	describe('Password Strength Calculation', () => {
		it('shows very weak for empty password', () => {
			render(<PasswordInput />)

			expect(screen.getByText('Very weak')).toBeInTheDocument()
		})

		it('shows weak for short password', async () => {
			const user = userEvent.setup()

			render(<PasswordInput />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			await user.type(input, 'abc')

			await waitFor(() => {
				expect(screen.getByText('Weak')).toBeInTheDocument()
			})
		})

		it('shows medium for password with length and lowercase', async () => {
			const user = userEvent.setup()

			render(<PasswordInput />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			await user.type(input, 'abcdefgh')

			await waitFor(() => {
				expect(screen.getByText('Medium')).toBeInTheDocument()
			})
		})

		it('shows strong for password with length, lowercase, and uppercase', async () => {
			const user = userEvent.setup()

			render(<PasswordInput />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			await user.type(input, 'AbcDefgh')

			await waitFor(() => {
				expect(screen.getByText('Strong')).toBeInTheDocument()
			})
		})

		it('shows very strong for password with all criteria', async () => {
			const user = userEvent.setup()

			render(<PasswordInput />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			await user.type(input, 'AbcDefgh123')

			await waitFor(() => {
				expect(screen.getByText('Very strong')).toBeInTheDocument()
			})
		})

		it('updates progress bar based on strength', async () => {
			const user = userEvent.setup()

			render(<PasswordInput />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement

			// Type a strong password
			await user.type(input, 'AbcDefgh123')

			await waitFor(() => {
				const progressBar = document.querySelector('[role="progressbar"]')
				expect(progressBar).toBeInTheDocument()
			})
		})
	})

	describe('Accessibility', () => {
		it('has proper ARIA labels for toggle button', () => {
			render(<PasswordInput />)

			const toggleButton = screen.getByLabelText('Show password')
			expect(toggleButton).toHaveAttribute('aria-label', 'Show password')
		})

		it('updates ARIA label when visibility changes', async () => {
			const user = userEvent.setup()

			render(<PasswordInput />)

			const toggleButton = screen.getByLabelText('Show password')
			await user.click(toggleButton)

			expect(screen.getByLabelText('Hide password')).toBeInTheDocument()
		})

		it('supports keyboard navigation', async () => {
			const user = userEvent.setup()

			render(<PasswordInput />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			const toggleButton = screen.getByLabelText('Show password')

			// Tab to input
			await user.tab()
			expect(input).toHaveFocus()

			// Tab to toggle button
			await user.tab()
			expect(toggleButton).toHaveFocus()

			// Activate with Enter
			await user.keyboard('{Enter}')
			expect(input).toHaveAttribute('type', 'text')
		})

		it('supports Space key activation for toggle button', async () => {
			const user = userEvent.setup()

			render(<PasswordInput />)

			const toggleButton = screen.getByLabelText('Show password')
			toggleButton.focus()

			await user.keyboard(' ')
			expect(document.querySelector('input[type="text"]')).toBeInTheDocument()
		})

		it('has proper form integration', () => {
			render(
				<form>
					<label htmlFor="password">Password</label>
					<PasswordInput id="password" name="password" />
				</form>,
			)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			expect(input).toHaveAttribute('id', 'password')
			expect(input).toHaveAttribute('name', 'password')
		})
	})

	describe('Form Integration', () => {
		it('works with form submission', async () => {
			const handleSubmit = vi.fn((e) => e.preventDefault())
			const user = userEvent.setup()

			render(
				<form onSubmit={handleSubmit}>
					<PasswordInput name="password" />
					<button type="submit">Submit</button>
				</form>,
			)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			const submitButton = screen.getByRole('button', { name: 'Submit' })

			await user.type(input, 'testpassword')
			await user.click(submitButton)

			expect(handleSubmit).toHaveBeenCalledOnce()
		})

		it('supports required attribute', () => {
			render(<PasswordInput required />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			expect(input).toBeRequired()
		})

		it('supports disabled state', () => {
			render(<PasswordInput disabled />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			const toggleButton = screen.getByLabelText('Show password')

			expect(input).toBeDisabled()
			expect(toggleButton).toBeDisabled()
		})

		it('supports validation attributes', () => {
			render(<PasswordInput minLength={8} maxLength={20} />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			expect(input).toHaveAttribute('minlength', '8')
			expect(input).toHaveAttribute('maxlength', '20')
		})
	})

	describe('Edge Cases', () => {
		it('handles very long passwords', async () => {
			const user = userEvent.setup()
			const longPassword = 'a'.repeat(100)

			render(<PasswordInput />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			await user.type(input, longPassword)

			expect(input).toHaveValue(longPassword)
		})

		it('handles special characters in password', async () => {
			const user = userEvent.setup()
			const specialPassword = '!@#$%^&*()_+-=[]{}|;:,.<>?'

			render(<PasswordInput />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement
			await user.click(input)
			await user.paste(specialPassword)

			expect(input).toHaveValue(specialPassword)
		})

		it('handles undefined className gracefully', () => {
			render(<PasswordInput className={undefined} />)

			const input = document.querySelector('input[type="password"]')
			expect(input).toBeInTheDocument()
		})

		it('handles empty custom labels', () => {
			const emptyLabels = {
				veryWeak: '',
				weak: '',
				medium: '',
				strong: '',
				veryStrong: '',
			}

			render(<PasswordInput strengthLabels={emptyLabels} />)

			// Should still render but with empty labels
			expect(screen.getByText('Password strength:')).toBeInTheDocument()
		})

		it('handles rapid typing', async () => {
			const user = userEvent.setup()

			render(<PasswordInput />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement

			// Type rapidly
			await user.type(input, 'RapidTyping123!', { delay: 1 })

			expect(input).toHaveValue('RapidTyping123!')

			await waitFor(() => {
				expect(screen.getByText('Very strong')).toBeInTheDocument()
			})
		})
	})

	describe('Ref Forwarding', () => {
		it('forwards ref to input element', () => {
			const ref = React.createRef<HTMLInputElement>()

			render(<PasswordInput ref={ref} />)

			expect(ref.current).toBeInstanceOf(HTMLInputElement)
			expect(ref.current?.type).toBe('password')
		})

		it('allows ref access to input methods', () => {
			const ref = React.createRef<HTMLInputElement>()

			render(<PasswordInput ref={ref} />)

			expect(ref.current?.focus).toBeDefined()
			expect(typeof ref.current?.focus).toBe('function')
		})
	})

	describe('Custom Strength Calculation', () => {
		it('calculates strength correctly for different password patterns', async () => {
			const user = userEvent.setup()

			render(<PasswordInput />)

			const input = document.querySelector('input[type="password"]') as HTMLInputElement

			// Test different patterns
			const testCases = [
				{ password: '', expected: 'Very weak' },
				{ password: 'abc', expected: 'Weak' },
				{ password: 'abcdefgh', expected: 'Medium' },
				{ password: 'Abcdefgh', expected: 'Strong' },
				{ password: 'Abcdefgh1', expected: 'Very strong' },
			]

			for (const testCase of testCases) {
				await user.clear(input)
				if (testCase.password) {
					await user.type(input, testCase.password)
				}

				await waitFor(() => {
					expect(screen.getByText(testCase.expected)).toBeInTheDocument()
				})
			}
		})
	})

	describe('Component Structure', () => {
		it('renders with correct DOM structure', () => {
			render(<PasswordInput />)

			// Main container
			const container = document.querySelector('.w-full.space-y-4')
			expect(container).toBeInTheDocument()

			// Input container
			const inputContainer = document.querySelector('.relative')
			expect(inputContainer).toBeInTheDocument()

			// Strength meter container
			const strengthContainer = document.querySelector('.space-y-2')
			expect(strengthContainer).toBeInTheDocument()
		})

		it('applies correct CSS classes', () => {
			render(<PasswordInput />)

			const input = document.querySelector('input[type="password"]')
			expect(input).toHaveClass('pr-10')

			const toggleButton = screen.getByLabelText('Show password')
			expect(toggleButton).toHaveClass('absolute', 'right-0', 'top-0', 'h-full')
		})
	})
})
