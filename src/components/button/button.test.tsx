import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from './button'

describe('Button', () => {
	describe('Rendering', () => {
		it('renders button with default variant and size', () => {
			render(<Button>Default Button</Button>)

			const button = screen.getByRole('button', { name: 'Default Button' })
			expect(button).toBeInTheDocument()
			expect(button).toHaveClass(
				'inline-flex',
				'items-center',
				'justify-center',
				'gap-2',
				'whitespace-nowrap',
				'rounded-md',
				'text-sm',
				'font-medium',
				'bg-primary',
				'text-primary-foreground',
				'h-9',
				'px-4',
				'py-2',
			)
		})

		it('renders button with text content', () => {
			render(<Button>Click Me</Button>)

			expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument()
		})

		it('renders button with custom className', () => {
			render(<Button className="custom-class">Button</Button>)

			const button = screen.getByRole('button')
			expect(button).toHaveClass('custom-class')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Button data-testid="test-button" id="button-id" title="Button title">
					Button
				</Button>,
			)

			const button = screen.getByTestId('test-button')
			expect(button).toHaveAttribute('id', 'button-id')
			expect(button).toHaveAttribute('title', 'Button title')
			expect(button).toHaveAttribute('data-slot', 'button')
		})
	})

	describe('Variants', () => {
		it('renders default variant correctly', () => {
			render(<Button variant="default">Default</Button>)

			const button = screen.getByRole('button')
			expect(button).toHaveClass('bg-primary', 'text-primary-foreground', 'shadow-xs')
		})

		it('renders destructive variant correctly', () => {
			render(<Button variant="destructive">Destructive</Button>)

			const button = screen.getByRole('button')
			expect(button).toHaveClass('bg-destructive', 'text-white', 'shadow-xs')
		})

		it('renders outline variant correctly', () => {
			render(<Button variant="outline">Outline</Button>)

			const button = screen.getByRole('button')
			expect(button).toHaveClass('border', 'bg-background', 'shadow-xs')
		})

		it('renders secondary variant correctly', () => {
			render(<Button variant="secondary">Secondary</Button>)

			const button = screen.getByRole('button')
			expect(button).toHaveClass('bg-secondary', 'shadow-xs')
		})

		it('renders ghost variant correctly', () => {
			render(<Button variant="ghost">Ghost</Button>)

			const button = screen.getByRole('button')
			expect(button).not.toHaveClass('bg-primary', 'border', 'shadow-xs')
		})

		it('renders link variant correctly', () => {
			render(<Button variant="link">Link</Button>)

			const button = screen.getByRole('button')
			expect(button).toHaveClass('text-primary', 'underline-offset-4')
		})
	})

	describe('Sizes', () => {
		it('renders medium size correctly (default)', () => {
			render(<Button size="md">Medium</Button>)

			const button = screen.getByRole('button')
			expect(button).toHaveClass('h-9', 'px-4', 'py-2')
		})

		it('renders small size correctly', () => {
			render(<Button size="sm">Small</Button>)

			const button = screen.getByRole('button')
			expect(button).toHaveClass('h-8', 'rounded-md', 'gap-1.5', 'px-3')
		})

		it('renders large size correctly', () => {
			render(<Button size="lg">Large</Button>)

			const button = screen.getByRole('button')
			expect(button).toHaveClass('h-10', 'rounded-md', 'px-6')
		})

		it('renders extra large size correctly', () => {
			render(<Button size="xl">Extra Large</Button>)

			const button = screen.getByRole('button')
			expect(button).toHaveClass('h-12', 'px-10', 'text-xl')
		})

		it('renders icon size correctly', () => {
			render(<Button size="icon">🔥</Button>)

			const button = screen.getByRole('button')
			expect(button).toHaveClass('size-9')
		})
	})

	describe('Loading State', () => {
		it('shows loading spinner when isLoading is true', () => {
			render(<Button isLoading>Loading Button</Button>)

			const button = screen.getByRole('button')
			const spinner = button.querySelector('.animate-spin')
			expect(spinner).toBeInTheDocument()
			expect(screen.getByText('Loading Button')).toBeInTheDocument()
		})

		it('does not show loading spinner when isLoading is false', () => {
			render(<Button isLoading={false}>Normal Button</Button>)

			const button = screen.getByRole('button')
			const spinner = button.querySelector('.animate-spin')
			expect(spinner).not.toBeInTheDocument()
		})

		it('does not show loading spinner by default', () => {
			render(<Button>Normal Button</Button>)

			const button = screen.getByRole('button')
			const spinner = button.querySelector('.animate-spin')
			expect(spinner).not.toBeInTheDocument()
		})
	})

	describe('AsChild Prop', () => {
		it('renders as Slot when asChild is true', () => {
			render(
				<Button asChild>
					<a href="/test">Link Button</a>
				</Button>,
			)

			const link = screen.getByRole('link', { name: 'Link Button' })
			expect(link).toBeInTheDocument()
			expect(link).toHaveAttribute('href', '/test')
			expect(link).toHaveAttribute('data-slot', 'button')
		})

		it('ignores isLoading when asChild is true', () => {
			// Mock console.warn to test the warning
			const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

			render(
				<Button asChild isLoading>
					<a href="/test">Link Button</a>
				</Button>,
			)

			const link = screen.getByRole('link')
			const spinner = link.querySelector('.animate-spin')
			expect(spinner).not.toBeInTheDocument()

			// Check if warning was logged in development
			if (process.env.NODE_ENV === 'development') {
				expect(consoleSpy).toHaveBeenCalledWith(
					'Button: isLoading prop is ignored when asChild is true. The loading state should be handled by the child component.',
				)
			}

			consoleSpy.mockRestore()
		})

		it('applies button classes to child element when asChild is true', () => {
			render(
				<Button asChild variant="destructive" size="lg">
					<a href="/test">Styled Link</a>
				</Button>,
			)

			const link = screen.getByRole('link')
			expect(link).toHaveClass('bg-destructive', 'h-10', 'px-6')
		})
	})

	describe('Interactions', () => {
		it('calls onClick when clicked', async () => {
			const handleClick = vi.fn()
			const user = userEvent.setup()

			render(<Button onClick={handleClick}>Clickable</Button>)

			const button = screen.getByRole('button')
			await user.click(button)

			expect(handleClick).toHaveBeenCalledOnce()
		})

		it('does not call onClick when disabled', async () => {
			const handleClick = vi.fn()
			const user = userEvent.setup()

			render(
				<Button onClick={handleClick} disabled>
					Disabled
				</Button>,
			)

			const button = screen.getByRole('button')
			await user.click(button)

			expect(handleClick).not.toHaveBeenCalled()
		})

		it('supports keyboard navigation', async () => {
			const handleClick = vi.fn()
			const user = userEvent.setup()

			render(<Button onClick={handleClick}>Keyboard</Button>)

			const button = screen.getByRole('button')
			button.focus()
			await user.keyboard('{Enter}')

			expect(handleClick).toHaveBeenCalledOnce()
		})

		it('supports space key activation', async () => {
			const handleClick = vi.fn()
			const user = userEvent.setup()

			render(<Button onClick={handleClick}>Space Key</Button>)

			const button = screen.getByRole('button')
			button.focus()
			await user.keyboard(' ')

			expect(handleClick).toHaveBeenCalledOnce()
		})
	})

	describe('Disabled State', () => {
		it('applies disabled styles when disabled', () => {
			render(<Button disabled>Disabled Button</Button>)

			const button = screen.getByRole('button')
			expect(button).toBeDisabled()
			expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50')
		})

		it('is not clickable when disabled', async () => {
			const handleClick = vi.fn()
			const user = userEvent.setup()

			render(
				<Button onClick={handleClick} disabled>
					Disabled
				</Button>,
			)

			const button = screen.getByRole('button')
			await user.click(button)

			expect(handleClick).not.toHaveBeenCalled()
		})
	})

	describe('Accessibility', () => {
		it('has proper focus styles', () => {
			render(<Button>Focusable</Button>)

			const button = screen.getByRole('button')
			expect(button).toHaveClass(
				'outline-none',
				'focus-visible:border-ring',
				'focus-visible:ring-ring/50',
				'focus-visible:ring-[3px]',
			)
		})

		it('supports aria-label', () => {
			render(<Button aria-label="Close dialog">×</Button>)

			const button = screen.getByLabelText('Close dialog')
			expect(button).toBeInTheDocument()
		})

		it('supports aria-describedby', () => {
			render(
				<div>
					<Button aria-describedby="help-text">Submit</Button>
					<div id="help-text">This will submit the form</div>
				</div>,
			)

			const button = screen.getByRole('button', { name: 'Submit' })
			expect(button).toHaveAttribute('aria-describedby', 'help-text')
		})

		it('supports aria-invalid styling', () => {
			render(<Button aria-invalid="true">Invalid</Button>)

			const button = screen.getByRole('button')
			expect(button).toHaveClass(
				'aria-invalid:ring-destructive/20',
				'aria-invalid:border-destructive',
			)
		})
	})

	describe('Content Types', () => {
		it('renders with text content', () => {
			render(<Button>Text Button</Button>)

			expect(screen.getByText('Text Button')).toBeInTheDocument()
		})

		it('renders with icon content', () => {
			const TestIcon = () => <svg data-testid="test-icon" />
			render(
				<Button>
					<TestIcon /> With Icon
				</Button>,
			)

			expect(screen.getByTestId('test-icon')).toBeInTheDocument()
			expect(screen.getByText('With Icon')).toBeInTheDocument()
		})

		it('renders icon-only button', () => {
			const TestIcon = () => <svg data-testid="test-icon" />
			render(
				<Button size="icon" aria-label="Icon button">
					<TestIcon />
				</Button>,
			)

			expect(screen.getByTestId('test-icon')).toBeInTheDocument()
			expect(screen.getByLabelText('Icon button')).toBeInTheDocument()
		})

		it('renders with complex JSX content', () => {
			render(
				<Button>
					<span>Complex</span> <strong>Content</strong>
				</Button>,
			)

			expect(screen.getByText('Complex')).toBeInTheDocument()
			expect(screen.getByText('Content')).toBeInTheDocument()
		})
	})

	describe('Edge Cases', () => {
		it('handles undefined variant and size gracefully', () => {
			render(
				<Button variant={undefined} size={undefined}>
					Button
				</Button>,
			)

			const button = screen.getByRole('button')
			expect(button).toHaveClass('bg-primary', 'h-9') // Should use defaults
		})

		it('renders empty button', () => {
			render(<Button></Button>)

			const button = screen.getByRole('button')
			expect(button).toBeInTheDocument()
		})

		it('handles very long text', () => {
			const longText = 'This is a very long button text that might cause layout issues'
			render(<Button>{longText}</Button>)

			expect(screen.getByText(longText)).toBeInTheDocument()
		})

		it('handles special characters', () => {
			render(<Button>Special @#$%^&*() Characters</Button>)

			expect(screen.getByText('Special @#$%^&*() Characters')).toBeInTheDocument()
		})
	})

	describe('Form Integration', () => {
		it('supports type attribute', () => {
			render(<Button type="submit">Submit</Button>)

			const button = screen.getByRole('button')
			expect(button).toHaveAttribute('type', 'submit')
		})

		it('supports form attribute', () => {
			render(<Button form="my-form">Submit</Button>)

			const button = screen.getByRole('button')
			expect(button).toHaveAttribute('form', 'my-form')
		})

		it('works in form context', async () => {
			const handleSubmit = vi.fn((e) => e.preventDefault())
			const user = userEvent.setup()

			render(
				<form onSubmit={handleSubmit}>
					<Button type="submit">Submit Form</Button>
				</form>,
			)

			const button = screen.getByRole('button')
			await user.click(button)

			expect(handleSubmit).toHaveBeenCalledOnce()
		})
	})

	describe('Loading State with Different Variants', () => {
		it('shows loading state with different variants', () => {
			const variants = [
				'default',
				'destructive',
				'outline',
				'secondary',
				'ghost',
				'link',
			] as const

			variants.forEach((variant) => {
				const { unmount } = render(
					<Button variant={variant} isLoading>
						Loading {variant}
					</Button>,
				)

				const button = screen.getByRole('button')
				const spinner = button.querySelector('.animate-spin')
				expect(spinner).toBeInTheDocument()

				unmount()
			})
		})
	})
})
