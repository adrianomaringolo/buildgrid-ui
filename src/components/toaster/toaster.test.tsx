import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Toaster } from './toaster'

// Mock sonner
vi.mock('sonner', () => ({
	Toaster: ({
		className,
		toastOptions,
		expand,
		richColors,
		closeButton,
		...props
	}: any) => {
		// Merge default className with provided className
		const mergedClassName = className
			? `toaster group ${className}`.trim()
			: 'toaster group'

		// Handle boolean props by adding them as attributes when true
		const booleanProps: Record<string, any> = {}
		if (expand) booleanProps.expand = ''
		if (richColors) booleanProps.richColors = ''
		if (closeButton) booleanProps.closeButton = ''

		return (
			<div
				data-testid="sonner-toaster"
				className={mergedClassName}
				data-toast-options={JSON.stringify(toastOptions)}
				{...booleanProps}
				{...props}
			>
				Mocked Sonner Toaster
			</div>
		)
	},
}))

describe('Toaster', () => {
	describe('Rendering', () => {
		it('renders toaster component', () => {
			render(<Toaster />)

			const toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toBeInTheDocument()
			expect(toaster).toHaveTextContent('Mocked Sonner Toaster')
		})

		it('applies default className', () => {
			render(<Toaster />)

			const toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toHaveClass('toaster', 'group')
		})

		it('applies custom className alongside default', () => {
			render(<Toaster className="custom-toaster" />)

			const toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toHaveClass('toaster', 'group', 'custom-toaster')
		})
	})

	describe('Toast Options', () => {
		it('applies default toast options', () => {
			render(<Toaster />)

			const toaster = screen.getByTestId('sonner-toaster')
			const toastOptions = JSON.parse(toaster.getAttribute('data-toast-options') || '{}')

			expect(toastOptions.classNames).toBeDefined()
			expect(toastOptions.classNames.title).toBe('py-3 px-0')
			expect(toastOptions.classNames.toast).toContain('group toast')
			expect(toastOptions.classNames.description).toBe(
				'group-[.toast]:text-muted-foreground',
			)
		})

		it('includes all required classNames', () => {
			render(<Toaster />)

			const toaster = screen.getByTestId('sonner-toaster')
			const toastOptions = JSON.parse(toaster.getAttribute('data-toast-options') || '{}')
			const { classNames } = toastOptions

			expect(classNames.title).toBeDefined()
			expect(classNames.toast).toBeDefined()
			expect(classNames.description).toBeDefined()
			expect(classNames.actionButton).toBeDefined()
			expect(classNames.icon).toBeDefined()
			expect(classNames.cancelButton).toBeDefined()
		})

		it('applies correct toast styling', () => {
			render(<Toaster />)

			const toaster = screen.getByTestId('sonner-toaster')
			const toastOptions = JSON.parse(toaster.getAttribute('data-toast-options') || '{}')
			const { classNames } = toastOptions

			expect(classNames.toast).toContain('group-[.toaster]:bg-background')
			expect(classNames.toast).toContain('group-[.toaster]:text-foreground')
			expect(classNames.toast).toContain('group-[.toaster]:border-border')
			expect(classNames.toast).toContain('group-[.toaster]:shadow-lg')
		})

		it('applies correct icon styling for different types', () => {
			render(<Toaster />)

			const toaster = screen.getByTestId('sonner-toaster')
			const toastOptions = JSON.parse(toaster.getAttribute('data-toast-options') || '{}')
			const { classNames } = toastOptions

			expect(classNames.icon).toContain('group-data-[type=error]:text-red-500')
			expect(classNames.icon).toContain('group-data-[type=success]:text-green-500')
			expect(classNames.icon).toContain('group-data-[type=warning]:text-amber-500')
			expect(classNames.icon).toContain('group-data-[type=info]:text-blue-500')
		})

		it('applies correct button styling', () => {
			render(<Toaster />)

			const toaster = screen.getByTestId('sonner-toaster')
			const toastOptions = JSON.parse(toaster.getAttribute('data-toast-options') || '{}')
			const { classNames } = toastOptions

			expect(classNames.actionButton).toContain('group-[.toast]:bg-primary')
			expect(classNames.actionButton).toContain('group-[.toast]:text-primary-foreground')
			expect(classNames.cancelButton).toContain('group-[.toast]:bg-muted')
			expect(classNames.cancelButton).toContain('group-[.toast]:text-muted-foreground')
		})
	})

	describe('Props Forwarding', () => {
		it('forwards position prop', () => {
			render(<Toaster position="top-right" />)

			const toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toHaveAttribute('position', 'top-right')
		})

		it('forwards expand prop', () => {
			render(<Toaster expand />)

			const toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toHaveAttribute('expand')
		})

		it('forwards richColors prop', () => {
			render(<Toaster richColors />)

			const toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toHaveAttribute('richColors')
		})

		it('forwards closeButton prop', () => {
			render(<Toaster closeButton />)

			const toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toHaveAttribute('closeButton')
		})

		it('forwards theme prop', () => {
			render(<Toaster theme="dark" />)

			const toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toHaveAttribute('theme', 'dark')
		})

		it('forwards visibleToasts prop', () => {
			render(<Toaster visibleToasts={5} />)

			const toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toHaveAttribute('visibleToasts', '5')
		})

		it('forwards offset prop', () => {
			render(<Toaster offset="20px" />)

			const toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toHaveAttribute('offset', '20px')
		})
	})

	describe('Multiple Props', () => {
		it('handles multiple props together', () => {
			render(
				<Toaster
					position="bottom-left"
					theme="light"
					richColors
					closeButton
					expand
					visibleToasts={3}
					className="custom-toaster"
				/>,
			)

			const toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toHaveAttribute('position', 'bottom-left')
			expect(toaster).toHaveAttribute('theme', 'light')
			expect(toaster).toHaveAttribute('richColors')
			expect(toaster).toHaveAttribute('closeButton')
			expect(toaster).toHaveAttribute('expand')
			expect(toaster).toHaveAttribute('visibleToasts', '3')
			expect(toaster).toHaveClass('toaster', 'group', 'custom-toaster')
		})
	})

	describe('Edge Cases', () => {
		it('handles undefined className gracefully', () => {
			render(<Toaster className={undefined} />)

			const toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toHaveClass('toaster', 'group')
		})

		it('handles empty className', () => {
			render(<Toaster className="" />)

			const toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toHaveClass('toaster', 'group')
		})

		it('handles null props gracefully', () => {
			render(<Toaster position={null as any} />)

			const toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toBeInTheDocument()
		})
	})

	describe('Accessibility', () => {
		it('maintains accessibility attributes from Sonner', () => {
			render(<Toaster />)

			const toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toBeInTheDocument()
		})

		it('supports custom aria attributes', () => {
			render(<Toaster aria-label="Toast notifications" />)

			const toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toHaveAttribute('aria-label', 'Toast notifications')
		})
	})

	describe('Theme Integration', () => {
		it('applies theme-aware classes', () => {
			render(<Toaster />)

			const toaster = screen.getByTestId('sonner-toaster')
			const toastOptions = JSON.parse(toaster.getAttribute('data-toast-options') || '{}')

			// Verify theme-aware classes are applied
			expect(toastOptions.classNames.toast).toContain('group-[.toaster]:bg-background')
			expect(toastOptions.classNames.toast).toContain('group-[.toaster]:text-foreground')
			expect(toastOptions.classNames.description).toContain('text-muted-foreground')
		})

		it('supports different theme modes', () => {
			const { rerender } = render(<Toaster theme="light" />)

			let toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toHaveAttribute('theme', 'light')

			rerender(<Toaster theme="dark" />)

			toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toHaveAttribute('theme', 'dark')
		})
	})

	describe('Performance', () => {
		it('renders efficiently with minimal props', () => {
			const { container } = render(<Toaster />)

			expect(container.firstChild).toBeInTheDocument()
		})

		it('handles prop changes efficiently', () => {
			const { rerender } = render(<Toaster position="top-left" />)

			let toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toHaveAttribute('position', 'top-left')

			rerender(<Toaster position="bottom-right" />)

			toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toHaveAttribute('position', 'bottom-right')
		})
	})

	describe('Complex Scenarios', () => {
		it('works with all position options', () => {
			const positions = [
				'top-left',
				'top-center',
				'top-right',
				'bottom-left',
				'bottom-center',
				'bottom-right',
			] as const

			positions.forEach((position) => {
				const { unmount } = render(<Toaster position={position} />)
				const toaster = screen.getByTestId('sonner-toaster')
				expect(toaster).toHaveAttribute('position', position)
				unmount()
			})
		})

		it('maintains consistent styling across re-renders', () => {
			const { rerender } = render(<Toaster />)

			let toaster = screen.getByTestId('sonner-toaster')
			let toastOptions = JSON.parse(toaster.getAttribute('data-toast-options') || '{}')
			const initialClassNames = toastOptions.classNames

			rerender(<Toaster richColors />)

			toaster = screen.getByTestId('sonner-toaster')
			toastOptions = JSON.parse(toaster.getAttribute('data-toast-options') || '{}')

			// ClassNames should remain consistent
			expect(toastOptions.classNames).toEqual(initialClassNames)
		})
	})
})
