import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Search, User } from 'lucide-react'
import { describe, expect, it, vi } from 'vitest'

import { AdaptiveInput } from './adaptive-input'

describe('AdaptiveInput', () => {
	describe('Rendering', () => {
		it('renders correctly with default props', () => {
			render(<AdaptiveInput placeholder="Enter text" />)

			const input = screen.getByPlaceholderText('Enter text')
			expect(input).toBeInTheDocument()
			expect(input).toHaveClass('flex', 'h-10', 'w-full')
		})

		it('renders with left icon', () => {
			render(
				<AdaptiveInput
					placeholder="Search"
					leftIcon={<Search data-testid="search-icon" />}
				/>,
			)

			expect(screen.getByTestId('search-icon')).toBeInTheDocument()
			expect(screen.getByPlaceholderText('Search')).toHaveClass('pl-8')
		})

		it('renders with right icon', () => {
			render(
				<AdaptiveInput
					placeholder="Username"
					rightIcon={<User data-testid="user-icon" />}
				/>,
			)

			expect(screen.getByTestId('user-icon')).toBeInTheDocument()
			expect(screen.getByPlaceholderText('Username')).toHaveClass('pr-8')
		})

		it('renders with both left and right icons', () => {
			render(
				<AdaptiveInput
					placeholder="Search users"
					leftIcon={<Search data-testid="search-icon" />}
					rightIcon={<User data-testid="user-icon" />}
				/>,
			)

			expect(screen.getByTestId('search-icon')).toBeInTheDocument()
			expect(screen.getByTestId('user-icon')).toBeInTheDocument()

			const input = screen.getByPlaceholderText('Search users')
			expect(input).toHaveClass('pl-8', 'pr-8')
		})

		it('applies custom className', () => {
			render(<AdaptiveInput placeholder="Custom input" className="custom-class" />)

			expect(screen.getByPlaceholderText('Custom input')).toHaveClass('custom-class')
		})

		it('forwards ref correctly', () => {
			const ref = { current: null }
			render(<AdaptiveInput ref={ref} placeholder="Ref test" />)

			expect(ref.current).toBeTruthy()
			expect(ref.current).toBe(screen.getByPlaceholderText('Ref test'))
		})
	})

	describe('Icon Positioning', () => {
		it('positions left icon correctly', () => {
			render(
				<AdaptiveInput
					leftIcon={<Search data-testid="search-icon" />}
					placeholder="Search"
				/>,
			)

			const iconContainer = screen.getByTestId('search-icon').parentElement
			expect(iconContainer).toHaveClass(
				'absolute',
				'left-2',
				'top-1/2',
				'-translate-y-1/2',
				'text-muted-foreground',
			)
		})

		it('positions right icon correctly', () => {
			render(
				<AdaptiveInput
					rightIcon={<User data-testid="user-icon" />}
					placeholder="Username"
				/>,
			)

			const iconContainer = screen.getByTestId('user-icon').parentElement
			expect(iconContainer).toHaveClass(
				'absolute',
				'right-2',
				'top-1/2',
				'-translate-y-1/2',
				'text-muted-foreground',
			)
		})

		it('applies correct padding when left icon is present', () => {
			render(<AdaptiveInput leftIcon={<Search />} placeholder="Search" />)

			const input = screen.getByPlaceholderText('Search')
			expect(input).toHaveStyle({ paddingLeft: '2rem' })
		})
	})

	describe('Mask Functionality', () => {
		it('applies phone mask correctly', async () => {
			const user = userEvent.setup()
			render(<AdaptiveInput placeholder="Phone number" mask="(000) 000-0000" />)

			const input = screen.getByPlaceholderText('Phone number')

			await user.type(input, '1234567890')
			expect(input).toHaveValue('(123) 456-7890')
		})

		it('applies CPF mask correctly', async () => {
			const user = userEvent.setup()
			render(<AdaptiveInput placeholder="CPF" mask="000.000.000-00" />)

			const input = screen.getByPlaceholderText('CPF')

			await user.type(input, '12345678901')
			expect(input).toHaveValue('123.456.789-01')
		})

		it('applies date mask correctly', async () => {
			const user = userEvent.setup()
			render(<AdaptiveInput placeholder="Date" mask="00/00/0000" />)

			const input = screen.getByPlaceholderText('Date')

			await user.type(input, '25122024')
			expect(input).toHaveValue('25/12/2024')
		})

		it('handles partial input with mask', async () => {
			const user = userEvent.setup()
			render(<AdaptiveInput placeholder="Phone" mask="(000) 000-0000" />)

			const input = screen.getByPlaceholderText('Phone')

			await user.type(input, '123')
			expect(input).toHaveValue('(123')
		})

		it('ignores non-numeric characters with mask', async () => {
			const user = userEvent.setup()
			render(<AdaptiveInput placeholder="Phone" mask="(000) 000-0000" />)

			const input = screen.getByPlaceholderText('Phone')

			await user.type(input, 'abc123def456')
			expect(input).toHaveValue('(123) 456')
		})

		it('works without mask', async () => {
			const user = userEvent.setup()
			render(<AdaptiveInput placeholder="Regular input" />)

			const input = screen.getByPlaceholderText('Regular input')

			await user.type(input, 'Hello World!')
			expect(input).toHaveValue('Hello World!')
		})
	})

	describe('Event Handling', () => {
		it('calls onChange when provided', async () => {
			const handleChange = vi.fn()
			const user = userEvent.setup()

			render(<AdaptiveInput placeholder="Test input" onChange={handleChange} />)

			const input = screen.getByPlaceholderText('Test input')
			await user.type(input, 'test')

			expect(handleChange).toHaveBeenCalled()
		})

		it('calls onChange with masked value', async () => {
			const handleChange = vi.fn()
			const user = userEvent.setup()

			render(
				<AdaptiveInput
					placeholder="Phone"
					mask="(000) 000-0000"
					onChange={handleChange}
				/>,
			)

			const input = screen.getByPlaceholderText('Phone')
			await user.type(input, '123')

			expect(handleChange).toHaveBeenCalled()
			// The last call should have the masked value
			const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1]
			expect(lastCall[0].target.value).toBe('(123')
		})

		it('handles onFocus and onBlur events', async () => {
			const handleFocus = vi.fn()
			const handleBlur = vi.fn()
			const user = userEvent.setup()

			render(
				<AdaptiveInput
					placeholder="Focus test"
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>,
			)

			const input = screen.getByPlaceholderText('Focus test')

			await user.click(input)
			expect(handleFocus).toHaveBeenCalledOnce()

			await user.tab()
			expect(handleBlur).toHaveBeenCalledOnce()
		})
	})

	describe('Accessibility', () => {
		it('has proper input role', () => {
			render(<AdaptiveInput placeholder="Accessible input" />)

			const input = screen.getByRole('textbox')
			expect(input).toBeInTheDocument()
		})

		it('supports aria-label', () => {
			render(<AdaptiveInput placeholder="Search" aria-label="Search products" />)

			const input = screen.getByLabelText('Search products')
			expect(input).toBeInTheDocument()
		})

		it('supports aria-describedby', () => {
			render(
				<div>
					<AdaptiveInput placeholder="Password" aria-describedby="password-help" />
					<div id="password-help">Password must be at least 8 characters</div>
				</div>,
			)

			const input = screen.getByPlaceholderText('Password')
			expect(input).toHaveAttribute('aria-describedby', 'password-help')
		})

		it('supports disabled state', () => {
			render(<AdaptiveInput placeholder="Disabled input" disabled />)

			const input = screen.getByPlaceholderText('Disabled input')
			expect(input).toBeDisabled()
		})

		it('supports required attribute', () => {
			render(<AdaptiveInput placeholder="Required input" required />)

			const input = screen.getByPlaceholderText('Required input')
			expect(input).toBeRequired()
		})
	})

	describe('Input Props Forwarding', () => {
		it('forwards standard input props', () => {
			render(
				<AdaptiveInput
					placeholder="Test input"
					type="email"
					name="email"
					id="email-input"
					maxLength={50}
					autoComplete="email"
				/>,
			)

			const input = screen.getByPlaceholderText('Test input')
			expect(input).toHaveAttribute('type', 'email')
			expect(input).toHaveAttribute('name', 'email')
			expect(input).toHaveAttribute('id', 'email-input')
			expect(input).toHaveAttribute('maxLength', '50')
			expect(input).toHaveAttribute('autoComplete', 'email')
		})

		it('forwards value prop', () => {
			render(
				<AdaptiveInput
					placeholder="Controlled input"
					value="controlled value"
					readOnly
				/>,
			)

			const input = screen.getByPlaceholderText('Controlled input')
			expect(input).toHaveValue('controlled value')
		})
	})

	describe('Edge Cases', () => {
		it('handles empty mask gracefully', async () => {
			const user = userEvent.setup()
			render(<AdaptiveInput placeholder="Empty mask" mask="" />)

			const input = screen.getByPlaceholderText('Empty mask')
			await user.type(input, '123')

			expect(input).toHaveValue('123')
		})

		it('handles mask longer than input', async () => {
			const user = userEvent.setup()
			render(<AdaptiveInput placeholder="Short input" mask="(000) 000-0000" />)

			const input = screen.getByPlaceholderText('Short input')
			await user.type(input, '12')

			expect(input).toHaveValue('(12')
		})

		it('handles input longer than mask', async () => {
			const user = userEvent.setup()
			render(<AdaptiveInput placeholder="Long input" mask="000-000" />)

			const input = screen.getByPlaceholderText('Long input')
			await user.type(input, '1234567890')

			expect(input).toHaveValue('123-456')
		})
	})
})
