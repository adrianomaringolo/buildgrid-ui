import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Badge } from './badge'

describe('Badge', () => {
	describe('Rendering', () => {
		it('renders badge with default variant', () => {
			render(<Badge>Default Badge</Badge>)

			const badge = screen.getByText('Default Badge')
			expect(badge).toBeInTheDocument()
			expect(badge).toHaveClass(
				'inline-flex',
				'items-center',
				'rounded-md',
				'border',
				'px-2.5',
				'py-0.5',
				'text-xs',
				'font-semibold',
				'transition-colors',
				'border-transparent',
				'bg-primary',
				'text-primary-foreground',
				'shadow',
			)
		})

		it('renders badge with text content', () => {
			render(<Badge>Test Badge</Badge>)

			expect(screen.getByText('Test Badge')).toBeInTheDocument()
		})

		it('renders badge with custom className', () => {
			render(<Badge className="custom-class">Badge</Badge>)

			const badge = screen.getByText('Badge')
			expect(badge).toHaveClass('custom-class')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Badge data-testid="test-badge" id="badge-id" title="Badge title">
					Badge
				</Badge>,
			)

			const badge = screen.getByTestId('test-badge')
			expect(badge).toHaveAttribute('id', 'badge-id')
			expect(badge).toHaveAttribute('title', 'Badge title')
		})
	})

	describe('Variants', () => {
		it('renders default variant correctly', () => {
			render(<Badge variant="default">Default</Badge>)

			const badge = screen.getByText('Default')
			expect(badge).toHaveClass(
				'border-transparent',
				'bg-primary',
				'text-primary-foreground',
				'shadow',
			)
		})

		it('renders secondary variant correctly', () => {
			render(<Badge variant="secondary">Secondary</Badge>)

			const badge = screen.getByText('Secondary')
			expect(badge).toHaveClass(
				'border-transparent',
				'bg-secondary',
				'text-secondary-foreground',
			)
		})

		it('renders destructive variant correctly', () => {
			render(<Badge variant="destructive">Destructive</Badge>)

			const badge = screen.getByText('Destructive')
			expect(badge).toHaveClass(
				'border-transparent',
				'bg-destructive',
				'text-destructive-foreground',
				'shadow',
			)
		})

		it('renders outline variant correctly', () => {
			render(<Badge variant="outline">Outline</Badge>)

			const badge = screen.getByText('Outline')
			expect(badge).toHaveClass('text-foreground')
			expect(badge).not.toHaveClass('border-transparent')
		})
	})

	describe('Content Types', () => {
		it('renders with text content', () => {
			render(<Badge>Simple Text</Badge>)

			expect(screen.getByText('Simple Text')).toBeInTheDocument()
		})

		it('renders with number content', () => {
			render(<Badge>42</Badge>)

			expect(screen.getByText('42')).toBeInTheDocument()
		})

		it('renders with JSX content', () => {
			render(
				<Badge>
					<span>Complex</span> Content
				</Badge>,
			)

			expect(screen.getByText('Complex')).toBeInTheDocument()
			expect(screen.getByText('Content')).toBeInTheDocument()
		})

		it('renders with icon content', () => {
			const TestIcon = () => <svg data-testid="test-icon" />
			render(
				<Badge>
					<TestIcon /> With Icon
				</Badge>,
			)

			expect(screen.getByTestId('test-icon')).toBeInTheDocument()
			expect(screen.getByText('With Icon')).toBeInTheDocument()
		})
	})

	describe('Accessibility', () => {
		it('has proper focus styles', () => {
			render(<Badge>Focusable Badge</Badge>)

			const badge = screen.getByText('Focusable Badge')
			expect(badge).toHaveClass(
				'focus:outline-none',
				'focus:ring-2',
				'focus:ring-ring',
				'focus:ring-offset-2',
			)
		})

		it('supports aria-label', () => {
			render(<Badge aria-label="Status indicator">New</Badge>)

			const badge = screen.getByLabelText('Status indicator')
			expect(badge).toBeInTheDocument()
		})

		it('supports role attribute', () => {
			render(<Badge role="status">Status</Badge>)

			const badge = screen.getByRole('status')
			expect(badge).toBeInTheDocument()
		})
	})

	describe('Styling', () => {
		it('applies base styles correctly', () => {
			render(<Badge>Styled Badge</Badge>)

			const badge = screen.getByText('Styled Badge')
			expect(badge).toHaveClass(
				'inline-flex',
				'items-center',
				'rounded-md',
				'border',
				'px-2.5',
				'py-0.5',
				'text-xs',
				'font-semibold',
				'transition-colors',
			)
		})

		it('merges custom classes with default classes', () => {
			render(<Badge className="bg-red-500 text-white">Custom Styled</Badge>)

			const badge = screen.getByText('Custom Styled')
			expect(badge).toHaveClass('bg-red-500', 'text-white')
			expect(badge).toHaveClass('inline-flex', 'items-center') // Base classes should still be present
		})
	})

	describe('Edge Cases', () => {
		it('renders empty badge', () => {
			render(<Badge></Badge>)

			const badge = document.querySelector('.inline-flex')
			expect(badge).toBeInTheDocument()
		})

		it('handles undefined variant gracefully', () => {
			render(<Badge variant={undefined}>Undefined Variant</Badge>)

			const badge = screen.getByText('Undefined Variant')
			expect(badge).toHaveClass('bg-primary') // Should use default variant
		})

		it('renders with very long text', () => {
			const longText = 'This is a very long badge text that might wrap or overflow'
			render(<Badge>{longText}</Badge>)

			expect(screen.getByText(longText)).toBeInTheDocument()
		})

		it('handles special characters', () => {
			render(<Badge>Special @#$%^&*() Characters</Badge>)

			expect(screen.getByText('Special @#$%^&*() Characters')).toBeInTheDocument()
		})
	})

	describe('Multiple Badges', () => {
		it('renders multiple badges independently', () => {
			render(
				<div>
					<Badge variant="default">Badge 1</Badge>
					<Badge variant="secondary">Badge 2</Badge>
					<Badge variant="destructive">Badge 3</Badge>
				</div>,
			)

			expect(screen.getByText('Badge 1')).toHaveClass('bg-primary')
			expect(screen.getByText('Badge 2')).toHaveClass('bg-secondary')
			expect(screen.getByText('Badge 3')).toHaveClass('bg-destructive')
		})
	})

	describe('Custom Styling Combinations', () => {
		it('supports custom padding', () => {
			render(<Badge className="px-4 py-2">Custom Padding</Badge>)

			const badge = screen.getByText('Custom Padding')
			expect(badge).toHaveClass('px-4', 'py-2')
		})

		it('supports custom border radius', () => {
			render(<Badge className="rounded-full">Rounded Badge</Badge>)

			const badge = screen.getByText('Rounded Badge')
			expect(badge).toHaveClass('rounded-full')
		})

		it('supports custom font size', () => {
			render(<Badge className="text-sm">Larger Text</Badge>)

			const badge = screen.getByText('Larger Text')
			expect(badge).toHaveClass('text-sm')
		})
	})
})
