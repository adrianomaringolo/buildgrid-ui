import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import { Skeleton } from './skeleton'

describe('Skeleton', () => {
	describe('Rendering', () => {
		it('renders skeleton with default props', () => {
			render(<Skeleton data-testid="skeleton" />)

			const skeleton = screen.getByTestId('skeleton')
			expect(skeleton).toBeInTheDocument()
			expect(skeleton).toHaveClass(
				'animate-shimmer',
				'bg-gradient-to-r',
				'from-gray-300',
				'via-gray-100',
				'to-gray-300',
				'bg-[length:200%_100%]',
				'rounded-md',
				'h-5',
			)
		})

		it('renders with custom className', () => {
			render(<Skeleton className="custom-skeleton" data-testid="skeleton" />)

			const skeleton = screen.getByTestId('skeleton')
			expect(skeleton).toHaveClass('custom-skeleton')
			expect(skeleton).toHaveClass('animate-shimmer') // Should still have default classes
		})

		it('forwards HTML attributes correctly', () => {
			render(<Skeleton data-testid="test-skeleton" id="skeleton-id" />)

			const skeleton = screen.getByTestId('test-skeleton')
			expect(skeleton).toHaveAttribute('id', 'skeleton-id')
		})

		it('renders as div element by default', () => {
			render(<Skeleton data-testid="skeleton" />)

			const skeleton = screen.getByTestId('skeleton')
			expect(skeleton.tagName).toBe('DIV')
		})
	})

	describe('Repeat Functionality', () => {
		it('renders single skeleton by default', () => {
			render(<Skeleton data-testid="skeleton" />)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(1)
		})

		it('renders single skeleton when repeat is 1', () => {
			render(<Skeleton repeat={1} data-testid="skeleton" />)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(1)
		})

		it('renders multiple skeletons when repeat is greater than 1', () => {
			render(<Skeleton repeat={3} data-testid="skeleton" />)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(3)
		})

		it('renders many skeletons for large repeat values', () => {
			render(<Skeleton repeat={10} data-testid="skeleton" />)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(10)
		})

		it('handles repeat value of 0', () => {
			render(<Skeleton repeat={0} data-testid="skeleton" />)

			const skeletons = screen.queryAllByTestId('skeleton')
			expect(skeletons).toHaveLength(0)
		})

		it('handles undefined repeat value', () => {
			render(<Skeleton repeat={undefined} data-testid="skeleton" />)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(1) // Should default to 1
		})

		it('handles null repeat value', () => {
			render(<Skeleton repeat={null as any} data-testid="skeleton" />)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(1) // Should default to 1
		})

		it('each repeated skeleton has unique key', () => {
			render(<Skeleton repeat={3} data-testid="skeleton" />)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(3)

			// Each skeleton should be a separate DOM element
			skeletons.forEach((skeleton, index) => {
				expect(skeleton).toBeInTheDocument()
				expect(skeleton).toHaveClass('animate-shimmer')
			})
		})
	})

	describe('Styling and CSS Classes', () => {
		it('applies default styling classes', () => {
			render(<Skeleton data-testid="skeleton" />)

			const skeleton = screen.getByTestId('skeleton')
			expect(skeleton).toHaveClass(
				'animate-shimmer',
				'bg-gradient-to-r',
				'from-gray-300',
				'via-gray-100',
				'to-gray-300',
				'bg-[length:200%_100%]',
				'rounded-md',
				'h-5',
			)
		})

		it('combines custom className with default classes', () => {
			render(<Skeleton className="h-10 w-full bg-red-200" data-testid="skeleton" />)

			const skeleton = screen.getByTestId('skeleton')
			expect(skeleton).toHaveClass('h-10', 'w-full', 'bg-red-200')
			expect(skeleton).toHaveClass('animate-shimmer', 'rounded-md') // Should still have defaults
		})

		it('handles undefined className gracefully', () => {
			render(<Skeleton className={undefined} data-testid="skeleton" />)

			const skeleton = screen.getByTestId('skeleton')
			expect(skeleton).toHaveClass('animate-shimmer', 'h-5') // Should still have default classes
		})

		it('applies className to all repeated skeletons', () => {
			render(<Skeleton repeat={3} className="custom-class" data-testid="skeleton" />)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(3)

			skeletons.forEach((skeleton) => {
				expect(skeleton).toHaveClass('custom-class')
				expect(skeleton).toHaveClass('animate-shimmer') // Should also have defaults
			})
		})

		it('supports different height classes', () => {
			const heights = ['h-4', 'h-6', 'h-8', 'h-12']

			heights.forEach((height) => {
				const { unmount } = render(<Skeleton className={height} data-testid="skeleton" />)

				const skeleton = screen.getByTestId('skeleton')
				expect(skeleton).toHaveClass(height)

				unmount()
			})
		})

		it('supports different width classes', () => {
			const widths = ['w-full', 'w-1/2', 'w-32', 'w-64']

			widths.forEach((width) => {
				const { unmount } = render(<Skeleton className={width} data-testid="skeleton" />)

				const skeleton = screen.getByTestId('skeleton')
				expect(skeleton).toHaveClass(width)

				unmount()
			})
		})

		it('supports different shape classes', () => {
			const shapes = ['rounded-none', 'rounded-full', 'rounded-lg']

			shapes.forEach((shape) => {
				const { unmount } = render(<Skeleton className={shape} data-testid="skeleton" />)

				const skeleton = screen.getByTestId('skeleton')
				expect(skeleton).toHaveClass(shape)

				unmount()
			})
		})
	})

	describe('Animation', () => {
		it('has shimmer animation class', () => {
			render(<Skeleton data-testid="skeleton" />)

			const skeleton = screen.getByTestId('skeleton')
			expect(skeleton).toHaveClass('animate-shimmer')
		})

		it('has gradient background for shimmer effect', () => {
			render(<Skeleton data-testid="skeleton" />)

			const skeleton = screen.getByTestId('skeleton')
			expect(skeleton).toHaveClass(
				'bg-gradient-to-r',
				'from-gray-300',
				'via-gray-100',
				'to-gray-300',
			)
		})

		it('has background size for animation', () => {
			render(<Skeleton data-testid="skeleton" />)

			const skeleton = screen.getByTestId('skeleton')
			expect(skeleton).toHaveClass('bg-[length:200%_100%]')
		})

		it('maintains animation across repeated skeletons', () => {
			render(<Skeleton repeat={3} data-testid="skeleton" />)

			const skeletons = screen.getAllByTestId('skeleton')
			skeletons.forEach((skeleton) => {
				expect(skeleton).toHaveClass('animate-shimmer')
			})
		})
	})

	describe('HTML Attributes', () => {
		it('forwards all HTML div attributes', () => {
			render(
				<Skeleton
					data-testid="skeleton"
					id="skeleton-id"
					role="presentation"
					aria-label="Loading content"
					style={{ margin: '10px' }}
					onClick={() => {}}
					onMouseEnter={() => {}}
				/>,
			)

			const skeleton = screen.getByTestId('skeleton')
			expect(skeleton).toHaveAttribute('id', 'skeleton-id')
			expect(skeleton).toHaveAttribute('role', 'presentation')
			expect(skeleton).toHaveAttribute('aria-label', 'Loading content')
			expect(skeleton).toHaveStyle('margin: 10px')
		})

		it('forwards attributes to all repeated skeletons', () => {
			render(
				<Skeleton
					repeat={2}
					data-testid="skeleton"
					role="presentation"
					aria-label="Loading"
				/>,
			)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(2)

			skeletons.forEach((skeleton) => {
				expect(skeleton).toHaveAttribute('role', 'presentation')
				expect(skeleton).toHaveAttribute('aria-label', 'Loading')
			})
		})

		it('supports custom data attributes', () => {
			render(
				<Skeleton data-testid="skeleton" data-loading="true" data-component="skeleton" />,
			)

			const skeleton = screen.getByTestId('skeleton')
			expect(skeleton).toHaveAttribute('data-loading', 'true')
			expect(skeleton).toHaveAttribute('data-component', 'skeleton')
		})
	})

	describe('Accessibility', () => {
		it('supports aria-label for screen readers', () => {
			render(<Skeleton aria-label="Loading content" data-testid="skeleton" />)

			const skeleton = screen.getByLabelText('Loading content')
			expect(skeleton).toBeInTheDocument()
		})

		it('supports role attribute', () => {
			render(<Skeleton role="presentation" data-testid="skeleton" />)

			const skeleton = screen.getByTestId('skeleton')
			expect(skeleton).toHaveAttribute('role', 'presentation')
		})

		it('supports aria-hidden for decorative skeletons', () => {
			render(<Skeleton aria-hidden="true" data-testid="skeleton" />)

			const skeleton = screen.getByTestId('skeleton')
			expect(skeleton).toHaveAttribute('aria-hidden', 'true')
		})

		it('supports aria-describedby', () => {
			render(
				<div>
					<Skeleton aria-describedby="loading-description" data-testid="skeleton" />
					<div id="loading-description">Content is loading</div>
				</div>,
			)

			const skeleton = screen.getByTestId('skeleton')
			expect(skeleton).toHaveAttribute('aria-describedby', 'loading-description')
		})

		it('supports aria-live for dynamic content', () => {
			render(<Skeleton aria-live="polite" data-testid="skeleton" />)

			const skeleton = screen.getByTestId('skeleton')
			expect(skeleton).toHaveAttribute('aria-live', 'polite')
		})
	})

	describe('Edge Cases', () => {
		it('handles negative repeat values', () => {
			render(<Skeleton repeat={-1} data-testid="skeleton" />)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(1) // Should default to 1 for negative values
		})

		it('handles very large repeat values', () => {
			render(<Skeleton repeat={100} data-testid="skeleton" />)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(100)
		})

		it('handles decimal repeat values', () => {
			render(<Skeleton repeat={2.5} data-testid="skeleton" />)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(2) // Should floor the value
		})

		it('handles string repeat values', () => {
			render(<Skeleton repeat={'3' as any} data-testid="skeleton" />)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(3) // Should coerce to number
		})

		it('handles NaN repeat values', () => {
			render(<Skeleton repeat={NaN} data-testid="skeleton" />)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(1) // Should default to 1
		})

		it('handles empty content gracefully', () => {
			render(<Skeleton data-testid="skeleton" />)

			const skeleton = screen.getByTestId('skeleton')
			expect(skeleton).toBeInTheDocument()
			expect(skeleton).toBeEmptyDOMElement()
		})

		it('handles boolean props correctly', () => {
			render(<Skeleton repeat={3} data-testid="skeleton" hidden={true} />)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(3)

			skeletons.forEach((skeleton) => {
				expect(skeleton).toHaveAttribute('hidden')
			})
		})
	})

	describe('Usage Patterns', () => {
		it('works as text placeholder', () => {
			render(
				<div>
					<Skeleton className="h-4 w-full mb-2" data-testid="title-skeleton" />
					<Skeleton className="h-3 w-3/4 mb-1" data-testid="line1-skeleton" />
					<Skeleton className="h-3 w-1/2" data-testid="line2-skeleton" />
				</div>,
			)

			expect(screen.getByTestId('title-skeleton')).toHaveClass('h-4', 'w-full')
			expect(screen.getByTestId('line1-skeleton')).toHaveClass('h-3', 'w-3/4')
			expect(screen.getByTestId('line2-skeleton')).toHaveClass('h-3', 'w-1/2')
		})

		it('works as image placeholder', () => {
			render(
				<Skeleton
					className="h-48 w-full rounded-lg"
					data-testid="image-skeleton"
					aria-label="Loading image"
				/>,
			)

			const skeleton = screen.getByTestId('image-skeleton')
			expect(skeleton).toHaveClass('h-48', 'w-full', 'rounded-lg')
			expect(skeleton).toHaveAttribute('aria-label', 'Loading image')
		})

		it('works as avatar placeholder', () => {
			render(
				<Skeleton
					className="h-12 w-12 rounded-full"
					data-testid="avatar-skeleton"
					aria-label="Loading avatar"
				/>,
			)

			const skeleton = screen.getByTestId('avatar-skeleton')
			expect(skeleton).toHaveClass('h-12', 'w-12', 'rounded-full')
		})

		it('works as card placeholder', () => {
			render(
				<div className="card">
					<Skeleton className="h-32 w-full rounded-t-lg" data-testid="card-image" />
					<div className="p-4">
						<Skeleton className="h-6 w-3/4 mb-2" data-testid="card-title" />
						<Skeleton repeat={3} className="h-4 w-full mb-1" data-testid="card-content" />
					</div>
				</div>,
			)

			expect(screen.getByTestId('card-image')).toBeInTheDocument()
			expect(screen.getByTestId('card-title')).toBeInTheDocument()
			expect(screen.getAllByTestId('card-content')).toHaveLength(3)
		})

		it('works as list placeholder', () => {
			render(
				<div>
					{Array.from({ length: 5 }, (_, i) => (
						<div key={i} className="flex items-center space-x-4 mb-4">
							<Skeleton className="h-10 w-10 rounded-full" data-testid={`avatar-${i}`} />
							<div className="flex-1">
								<Skeleton className="h-4 w-1/4 mb-1" data-testid={`name-${i}`} />
								<Skeleton className="h-3 w-1/2" data-testid={`description-${i}`} />
							</div>
						</div>
					))}
				</div>,
			)

			// Check that all list items are rendered
			for (let i = 0; i < 5; i++) {
				expect(screen.getByTestId(`avatar-${i}`)).toBeInTheDocument()
				expect(screen.getByTestId(`name-${i}`)).toBeInTheDocument()
				expect(screen.getByTestId(`description-${i}`)).toBeInTheDocument()
			}
		})
	})

	describe('Performance', () => {
		it('renders efficiently with many skeletons', () => {
			render(<Skeleton repeat={50} data-testid="skeleton" />)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(50)

			// All should have the same classes
			skeletons.forEach((skeleton) => {
				expect(skeleton).toHaveClass('animate-shimmer')
			})
		})

		it('handles rapid prop changes efficiently', () => {
			const { rerender } = render(<Skeleton repeat={1} data-testid="skeleton" />)

			// Rapidly change repeat value
			for (let i = 1; i <= 10; i++) {
				rerender(<Skeleton repeat={i} data-testid="skeleton" />)
				const skeletons = screen.getAllByTestId('skeleton')
				expect(skeletons).toHaveLength(i)
			}
		})

		it('handles className changes efficiently', () => {
			const { rerender } = render(<Skeleton className="h-4" data-testid="skeleton" />)

			const classes = ['h-6', 'h-8', 'h-10', 'h-12']
			classes.forEach((className) => {
				rerender(<Skeleton className={className} data-testid="skeleton" />)
				const skeleton = screen.getByTestId('skeleton')
				expect(skeleton).toHaveClass(className)
			})
		})
	})

	describe('Component Structure', () => {
		it('renders as React Fragment with multiple skeletons', () => {
			render(<Skeleton repeat={3} data-testid="skeleton" />)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(3)

			// Each should be a separate div element
			skeletons.forEach((skeleton) => {
				expect(skeleton.tagName).toBe('DIV')
			})
		})

		it('maintains consistent structure across different repeat values', () => {
			const { rerender } = render(<Skeleton repeat={1} data-testid="skeleton" />)

			let skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(1)
			expect(skeletons[0].tagName).toBe('DIV')

			rerender(<Skeleton repeat={5} data-testid="skeleton" />)

			skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(5)
			skeletons.forEach((skeleton) => {
				expect(skeleton.tagName).toBe('DIV')
			})
		})

		it('applies props consistently across all repeated elements', () => {
			render(
				<Skeleton
					repeat={3}
					data-testid="skeleton"
					className="custom-class"
					role="presentation"
					aria-hidden="true"
				/>,
			)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(3)

			skeletons.forEach((skeleton) => {
				expect(skeleton).toHaveClass('custom-class')
				expect(skeleton).toHaveAttribute('role', 'presentation')
				expect(skeleton).toHaveAttribute('aria-hidden', 'true')
			})
		})
	})

	describe('TypeScript Integration', () => {
		it('accepts all valid HTML div attributes', () => {
			render(
				<Skeleton
					data-testid="skeleton"
					id="skeleton"
					className="test"
					style={{ margin: '10px' }}
					role="presentation"
					aria-label="test"
					onClick={() => {}}
					onMouseEnter={() => {}}
					hidden={false}
					tabIndex={-1}
				/>,
			)

			const skeleton = screen.getByTestId('skeleton')
			expect(skeleton).toBeInTheDocument()
		})

		it('accepts repeat prop with number type', () => {
			render(<Skeleton repeat={5} data-testid="skeleton" />)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(5)
		})

		it('handles optional repeat prop', () => {
			render(<Skeleton data-testid="skeleton" />)

			const skeletons = screen.getAllByTestId('skeleton')
			expect(skeletons).toHaveLength(1)
		})
	})

	describe('Integration with Loading States', () => {
		it('works with conditional rendering', () => {
			const LoadingComponent = ({ isLoading }: { isLoading: boolean }) => (
				<div>
					{isLoading ? (
						<Skeleton
							repeat={3}
							className="h-4 w-full mb-2"
							data-testid="loading-skeleton"
						/>
					) : (
						<div data-testid="actual-content">Actual Content</div>
					)}
				</div>
			)

			const { rerender } = render(<LoadingComponent isLoading={true} />)

			expect(screen.getAllByTestId('loading-skeleton')).toHaveLength(3)
			expect(screen.queryByTestId('actual-content')).not.toBeInTheDocument()

			rerender(<LoadingComponent isLoading={false} />)

			expect(screen.queryAllByTestId('loading-skeleton')).toHaveLength(0)
			expect(screen.getByTestId('actual-content')).toBeInTheDocument()
		})

		it('works with loading state transitions', () => {
			const TransitionComponent = () => {
				const [loading, setLoading] = React.useState(true)

				React.useEffect(() => {
					const timer = setTimeout(() => setLoading(false), 100)
					return () => clearTimeout(timer)
				}, [])

				return (
					<div>
						{loading ? (
							<Skeleton className="h-8 w-full" data-testid="transition-skeleton" />
						) : (
							<div data-testid="loaded-content">Content Loaded</div>
						)}
					</div>
				)
			}

			render(<TransitionComponent />)

			// Initially should show skeleton
			expect(screen.getByTestId('transition-skeleton')).toBeInTheDocument()
		})
	})
})
