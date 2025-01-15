// organize-imports-ignore
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './button'

describe('Button Component', () => {
	it('renders with default variant and size', () => {
		render(<Button>Click Me</Button>)
		const button = screen.getByRole('button', { name: /click me/i })

		expect(button).toBeInTheDocument()
		expect(button).toHaveClass('bg-primary text-primary-foreground h-9 px-4 py-2')
	})

	it('renders with a custom variant and size', () => {
		render(
			<Button variant="outline" size="lg">
				Outline Button
			</Button>,
		)
		const button = screen.getByRole('button', { name: /outline button/i })

		expect(button).toBeInTheDocument()
		expect(button).toHaveClass('border border-input bg-background h-10 rounded-md px-8')
	})

	// it('renders as a custom element when "asChild" is true', () => {
	// 	render(
	// 		<Button asChild className="text-blue-500">
	// 			<>
	// 				<a href="/test-link" data-testid="test-link">
	// 					Link Button
	// 				</a>
	// 			</>
	// 		</Button>,
	// 	)
	// 	const link = screen.getByTestId('test-link')

	// 	expect(link).toBeInTheDocument()
	// 	expect(link).toHaveAttribute('href', '/test-link')
	// 	expect(link).toHaveClass('text-blue-500')
	// })

	it('disables the button when "isLoading" is true', () => {
		render(<Button isLoading>Loading...</Button>)
		const button = screen.getByRole('button', { name: /loading.../i })

		expect(button).toBeDisabled()
	})

	it('displays a spinner when "isLoading" is true', () => {
		render(<Button isLoading>Loading...</Button>)
		const spinner = screen.getByTestId('loader-svg')

		expect(spinner).toBeInTheDocument()
		expect(spinner).toHaveClass('animate-spin')
	})

	it('calls the onClick handler when clicked', () => {
		const handleClick = vi.fn()
		render(<Button onClick={handleClick}>Click Me</Button>)
		const button = screen.getByRole('button', { name: /click me/i })

		fireEvent.click(button)

		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('applies additional class names provided through props', () => {
		render(<Button className="custom-class">Click Me</Button>)
		const button = screen.getByRole('button', { name: /click me/i })

		expect(button).toHaveClass('custom-class')
	})

	it('applies the "disabled" attribute correctly', () => {
		render(<Button disabled>Disabled Button</Button>)
		const button = screen.getByRole('button', { name: /disabled button/i })

		expect(button).toBeDisabled()
	})
})
