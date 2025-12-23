import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import { Separator } from './separator'

describe('Separator', () => {
	describe('Rendering', () => {
		it('renders separator with default props', () => {
			render(<Separator />)

			const separator = document.querySelector('[role="none"]')
			expect(separator).toBeInTheDocument()
			expect(separator).toHaveClass('shrink-0', 'bg-border', 'h-[1px]', 'w-full')
		})

		it('renders with custom className', () => {
			render(<Separator className="custom-separator" />)

			const separator = document.querySelector('[role="none"]')
			expect(separator).toHaveClass('custom-separator')
			expect(separator).toHaveClass('shrink-0', 'bg-border') // Should still have default classes
		})

		it('forwards HTML attributes correctly', () => {
			render(<Separator data-testid="test-separator" id="separator-id" />)

			const separator = screen.getByTestId('test-separator')
			expect(separator).toHaveAttribute('id', 'separator-id')
		})
	})

	describe('Orientation', () => {
		it('renders horizontal separator by default', () => {
			render(<Separator />)

			const separator = document.querySelector('[data-orientation="horizontal"]')
			expect(separator).toBeInTheDocument()
			expect(separator).toHaveClass('h-[1px]', 'w-full')
		})

		it('renders horizontal separator explicitly', () => {
			render(<Separator orientation="horizontal" />)

			const separator = document.querySelector('[data-orientation="horizontal"]')
			expect(separator).toBeInTheDocument()
			expect(separator).toHaveClass('h-[1px]', 'w-full')
		})

		it('renders vertical separator', () => {
			render(<Separator orientation="vertical" />)

			const separator = document.querySelector('[data-orientation="vertical"]')
			expect(separator).toBeInTheDocument()
			expect(separator).toHaveClass('h-full', 'w-[1px]')
		})

		it('applies correct classes for horizontal orientation', () => {
			render(<Separator orientation="horizontal" />)

			const separator = document.querySelector('[data-orientation="horizontal"]')
			expect(separator).toHaveClass('h-[1px]', 'w-full')
			expect(separator).not.toHaveClass('h-full', 'w-[1px]')
		})

		it('applies correct classes for vertical orientation', () => {
			render(<Separator orientation="vertical" />)

			const separator = document.querySelector('[data-orientation="vertical"]')
			expect(separator).toHaveClass('h-full', 'w-[1px]')
			expect(separator).not.toHaveClass('h-[1px]', 'w-full')
		})
	})

	describe('Decorative Property', () => {
		it('is decorative by default', () => {
			render(<Separator />)

			const separator = document.querySelector('[role="none"]')
			expect(separator).toBeInTheDocument()
		})

		it('supports decorative=true explicitly', () => {
			render(<Separator decorative={true} />)

			const separator = document.querySelector('[role="none"]')
			expect(separator).toBeInTheDocument()
		})

		it('supports decorative=false for semantic separators', () => {
			render(<Separator decorative={false} />)

			const separator = screen.getByRole('separator')
			expect(separator).toBeInTheDocument()
		})

		it('maintains role when not decorative', () => {
			render(<Separator decorative={false} />)

			const separator = screen.getByRole('separator')
			expect(separator).toHaveAttribute('role', 'separator')
		})
	})

	describe('Styling and CSS Classes', () => {
		it('applies default styling classes', () => {
			render(<Separator />)

			const separator = document.querySelector('[role="none"]')
			expect(separator).toHaveClass('shrink-0', 'bg-border')
		})

		it('combines custom className with default classes', () => {
			render(<Separator className="border-red-500 opacity-50" />)

			const separator = document.querySelector('[role="none"]')
			expect(separator).toHaveClass('border-red-500', 'opacity-50')
			expect(separator).toHaveClass('shrink-0', 'bg-border') // Should still have defaults
		})

		it('handles undefined className gracefully', () => {
			render(<Separator className={undefined} />)

			const separator = document.querySelector('[role="none"]')
			expect(separator).toHaveClass('shrink-0', 'bg-border') // Should still have default classes
		})

		it('applies orientation-specific classes correctly', () => {
			const { rerender } = render(<Separator orientation="horizontal" />)

			let separator = document.querySelector('[data-orientation="horizontal"]')
			expect(separator).toHaveClass('h-[1px]', 'w-full')

			rerender(<Separator orientation="vertical" />)

			separator = document.querySelector('[data-orientation="vertical"]')
			expect(separator).toHaveClass('h-full', 'w-[1px]')
		})
	})

	describe('Accessibility', () => {
		it('has proper role attribute', () => {
			render(<Separator decorative={false} />)

			const separator = screen.getByRole('separator')
			expect(separator).toHaveAttribute('role', 'separator')
		})

		it('has role="none" when decorative (default)', () => {
			render(<Separator />)

			const separator = document.querySelector('[role="none"]')
			expect(separator).toBeInTheDocument()
		})

		it('supports aria-label for semantic separators', () => {
			render(<Separator decorative={false} aria-label="Section divider" />)

			const separator = screen.getByLabelText('Section divider')
			expect(separator).toBeInTheDocument()
		})

		it('supports aria-labelledby', () => {
			render(
				<div>
					<h2 id="section-title">Section Title</h2>
					<Separator decorative={false} aria-labelledby="section-title" />
				</div>,
			)

			const separator = screen.getByRole('separator')
			expect(separator).toHaveAttribute('aria-labelledby', 'section-title')
		})

		it('supports aria-describedby', () => {
			render(
				<div>
					<Separator decorative={false} aria-describedby="separator-description" />
					<div id="separator-description">Divides content sections</div>
				</div>,
			)

			const separator = screen.getByRole('separator')
			expect(separator).toHaveAttribute('aria-describedby', 'separator-description')
		})

		it('supports custom aria-orientation', () => {
			render(<Separator orientation="vertical" aria-orientation="vertical" />)

			const separator = document.querySelector('[data-orientation="vertical"]')
			expect(separator).toHaveAttribute('aria-orientation', 'vertical')
		})
	})

	describe('Ref Forwarding', () => {
		it('forwards ref correctly', () => {
			const ref = React.createRef<HTMLDivElement>()

			render(<Separator ref={ref} decorative={false} />)

			expect(ref.current).toBeInstanceOf(HTMLDivElement)
			expect(ref.current).toHaveAttribute('role', 'separator')
		})

		it('allows ref access to DOM methods', () => {
			const ref = React.createRef<HTMLDivElement>()

			render(<Separator ref={ref} />)

			expect(ref.current?.focus).toBeDefined()
			expect(typeof ref.current?.focus).toBe('function')
		})

		it('allows ref access to element properties', () => {
			const ref = React.createRef<HTMLDivElement>()

			render(<Separator ref={ref} className="test-class" />)

			expect(ref.current?.className).toContain('test-class')
			expect(ref.current?.getAttribute('role')).toBe('none')
		})
	})

	describe('Usage in Different Contexts', () => {
		it('works as content divider', () => {
			render(
				<div>
					<div>Content Section 1</div>
					<Separator />
					<div>Content Section 2</div>
				</div>,
			)

			const separator = document.querySelector('[role="none"]')
			expect(separator).toBeInTheDocument()
			expect(screen.getByText('Content Section 1')).toBeInTheDocument()
			expect(screen.getByText('Content Section 2')).toBeInTheDocument()
		})

		it('works in navigation menus', () => {
			render(
				<nav>
					<a href="#home">Home</a>
					<Separator orientation="vertical" decorative={false} />
					<a href="#about">About</a>
					<Separator orientation="vertical" decorative={false} />
					<a href="#contact">Contact</a>
				</nav>,
			)

			const separators = screen.getAllByRole('separator')
			expect(separators).toHaveLength(2)
			separators.forEach((separator) => {
				expect(separator).toHaveAttribute('data-orientation', 'vertical')
			})
		})

		it('works in form sections', () => {
			render(
				<form>
					<fieldset>
						<legend>Personal Information</legend>
						<input type="text" placeholder="Name" />
					</fieldset>
					<Separator decorative={false} aria-label="Form section divider" />
					<fieldset>
						<legend>Contact Information</legend>
						<input type="email" placeholder="Email" />
					</fieldset>
				</form>,
			)

			const separator = screen.getByLabelText('Form section divider')
			expect(separator).toBeInTheDocument()
		})

		it('works in card layouts', () => {
			render(
				<div className="card">
					<div className="card-header">Header</div>
					<Separator />
					<div className="card-content">Content</div>
					<Separator />
					<div className="card-footer">Footer</div>
				</div>,
			)

			const separators = document.querySelectorAll('[role="none"]')
			expect(separators).toHaveLength(2)
		})
	})

	describe('Edge Cases', () => {
		it('handles multiple separators', () => {
			render(
				<div>
					<Separator />
					<Separator orientation="vertical" />
					<Separator decorative={false} />
				</div>,
			)

			// First two are decorative (role="none"), third is semantic (role="separator")
			const decorativeSeparators = document.querySelectorAll('[role="none"]')
			const semanticSeparators = screen.getAllByRole('separator')

			expect(decorativeSeparators).toHaveLength(2)
			expect(semanticSeparators).toHaveLength(1)

			expect(decorativeSeparators[0]).toHaveAttribute('data-orientation', 'horizontal')
			expect(decorativeSeparators[1]).toHaveAttribute('data-orientation', 'vertical')
		})

		it('handles empty content gracefully', () => {
			render(<Separator />)

			const separator = document.querySelector('[role="none"]')
			expect(separator).toBeInTheDocument()
			expect(separator).toBeEmptyDOMElement()
		})

		it('handles boolean props correctly', () => {
			const { rerender } = render(<Separator decorative={true} />)

			let separator = document.querySelector('[role="none"]')
			expect(separator).toBeInTheDocument()

			rerender(<Separator decorative={false} />)

			separator = screen.getByRole('separator')
			expect(separator).toBeInTheDocument()
		})

		it('handles string orientation values', () => {
			const { rerender } = render(
				<Separator orientation="horizontal" decorative={false} />,
			)

			let separator = screen.getByRole('separator')
			expect(separator).toHaveAttribute('data-orientation', 'horizontal')

			rerender(<Separator orientation="vertical" decorative={false} />)

			separator = screen.getByRole('separator')
			expect(separator).toHaveAttribute('data-orientation', 'vertical')
		})
	})

	describe('Radix UI Integration', () => {
		it('inherits Radix Separator functionality', () => {
			render(<Separator decorative={false} />)

			const separator = screen.getByRole('separator')
			expect(separator).toHaveAttribute('data-orientation')
		})

		it('supports Radix UI data attributes', () => {
			render(<Separator data-state="visible" decorative={false} />)

			const separator = screen.getByRole('separator')
			expect(separator).toHaveAttribute('data-state', 'visible')
		})

		it('maintains Radix UI behavior with custom props', () => {
			render(
				<Separator
					orientation="vertical"
					decorative={false}
					className="custom-class"
					data-custom="value"
				/>,
			)

			const separator = screen.getByRole('separator')
			expect(separator).toHaveAttribute('data-orientation', 'vertical')
			expect(separator).toHaveClass('custom-class')
			expect(separator).toHaveAttribute('data-custom', 'value')
		})
	})

	describe('Performance', () => {
		it('renders efficiently with multiple instances', () => {
			const separators = Array.from({ length: 50 }, (_, i) => (
				<Separator
					key={i}
					orientation={i % 2 === 0 ? 'horizontal' : 'vertical'}
					decorative={false}
				/>
			))

			render(<div>{separators}</div>)

			const renderedSeparators = screen.getAllByRole('separator')
			expect(renderedSeparators).toHaveLength(50)
		})

		it('handles rapid prop changes efficiently', () => {
			const { rerender } = render(
				<Separator orientation="horizontal" decorative={false} />,
			)

			// Rapidly change orientation
			for (let i = 0; i < 10; i++) {
				rerender(
					<Separator
						orientation={i % 2 === 0 ? 'horizontal' : 'vertical'}
						decorative={false}
					/>,
				)
			}

			const separator = screen.getByRole('separator')
			expect(separator).toBeInTheDocument()
		})
	})

	describe('Component Structure', () => {
		it('renders as a single element', () => {
			render(<Separator data-testid="separator" />)

			const separator = screen.getByTestId('separator')
			expect(separator).toBeInTheDocument()
			expect(separator.children).toHaveLength(0) // Should be empty
		})

		it('maintains consistent structure across orientations', () => {
			const { rerender } = render(
				<Separator orientation="horizontal" decorative={false} />,
			)

			let separator = screen.getByRole('separator')
			expect(separator.tagName).toBe('DIV')

			rerender(<Separator orientation="vertical" decorative={false} />)

			separator = screen.getByRole('separator')
			expect(separator.tagName).toBe('DIV')
		})

		it('applies classes in correct order', () => {
			render(
				<Separator className="custom-class" orientation="vertical" decorative={false} />,
			)

			const separator = screen.getByRole('separator')
			const classes = separator.className.split(' ')

			// Should contain both default and custom classes
			expect(classes).toContain('shrink-0')
			expect(classes).toContain('bg-border')
			expect(classes).toContain('h-full')
			expect(classes).toContain('w-[1px]')
			expect(classes).toContain('custom-class')
		})
	})

	describe('TypeScript Integration', () => {
		it('accepts all valid HTML div attributes', () => {
			render(
				<Separator
					id="separator"
					className="test"
					style={{ margin: '10px' }}
					data-testid="separator"
					role="separator"
					aria-label="test"
					onClick={() => {}}
					onMouseEnter={() => {}}
				/>,
			)

			const separator = screen.getByTestId('separator')
			expect(separator).toBeInTheDocument()
		})

		it('accepts Radix UI specific props', () => {
			render(<Separator orientation="vertical" decorative={false} asChild={false} />)

			const separator = screen.getByRole('separator')
			expect(separator).toBeInTheDocument()
		})
	})
})
