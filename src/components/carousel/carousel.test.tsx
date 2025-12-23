import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from './carousel'

// Mock embla-carousel-react
const mockScrollPrev = vi.fn()
const mockScrollNext = vi.fn()
const mockCanScrollPrev = vi.fn(() => true)
const mockCanScrollNext = vi.fn(() => true)
const mockOn = vi.fn()
const mockOff = vi.fn()

const mockApi = {
	scrollPrev: mockScrollPrev,
	scrollNext: mockScrollNext,
	canScrollPrev: mockCanScrollPrev,
	canScrollNext: mockCanScrollNext,
	on: mockOn,
	off: mockOff,
}

const mockCarouselRef = vi.fn()

vi.mock('embla-carousel-react', () => ({
	default: vi.fn(() => [mockCarouselRef, mockApi]),
}))

describe('Carousel', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		mockCanScrollPrev.mockReturnValue(true)
		mockCanScrollNext.mockReturnValue(true)
	})

	describe('Carousel Component', () => {
		it('renders carousel with default props', () => {
			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
				</Carousel>,
			)

			const carousel = screen.getByRole('region')
			expect(carousel).toBeInTheDocument()
			expect(carousel).toHaveAttribute('aria-roledescription', 'carousel')
			expect(carousel).toHaveAttribute('data-slot', 'carousel')
			expect(carousel).toHaveClass('relative')
		})

		it('renders carousel with custom className', () => {
			render(
				<Carousel className="custom-carousel">
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
				</Carousel>,
			)

			const carousel = screen.getByRole('region')
			expect(carousel).toHaveClass('custom-carousel')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Carousel data-testid="test-carousel" id="carousel-id">
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
				</Carousel>,
			)

			const carousel = screen.getByTestId('test-carousel')
			expect(carousel).toHaveAttribute('id', 'carousel-id')
		})
	})

	describe('CarouselContent Component', () => {
		it('renders carousel content with default props', () => {
			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
				</Carousel>,
			)

			const content = document.querySelector('[data-slot="carousel-content"]')
			expect(content).toBeInTheDocument()
			expect(content).toHaveClass('overflow-hidden')
		})

		it('renders carousel content with horizontal layout', () => {
			render(
				<Carousel orientation="horizontal">
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
				</Carousel>,
			)

			const contentInner = document.querySelector('[data-slot="carousel-content"] > div')
			expect(contentInner).toHaveClass('flex', '-ml-4')
			expect(contentInner).not.toHaveClass('flex-col', '-mt-4')
		})

		it('renders carousel content with vertical layout', () => {
			render(
				<Carousel orientation="vertical">
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
				</Carousel>,
			)

			const contentInner = document.querySelector('[data-slot="carousel-content"] > div')
			expect(contentInner).toHaveClass('flex', '-mt-4', 'flex-col')
		})

		it('renders carousel content with custom className', () => {
			render(
				<Carousel>
					<CarouselContent className="custom-content">
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
				</Carousel>,
			)

			const contentInner = document.querySelector('[data-slot="carousel-content"] > div')
			expect(contentInner).toHaveClass('custom-content')
		})
	})

	describe('CarouselItem Component', () => {
		it('renders carousel item with default props', () => {
			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem>Slide content</CarouselItem>
					</CarouselContent>
				</Carousel>,
			)

			const item = screen.getByText('Slide content')
			expect(item).toBeInTheDocument()
			expect(item).toHaveAttribute('role', 'group')
			expect(item).toHaveAttribute('aria-roledescription', 'slide')
			expect(item).toHaveAttribute('data-slot', 'carousel-item')
			expect(item).toHaveClass('min-w-0', 'shrink-0', 'grow-0', 'basis-full')
		})

		it('renders carousel item with horizontal spacing', () => {
			render(
				<Carousel orientation="horizontal">
					<CarouselContent>
						<CarouselItem>Slide content</CarouselItem>
					</CarouselContent>
				</Carousel>,
			)

			const item = screen.getByText('Slide content')
			expect(item).toHaveClass('pl-4')
			expect(item).not.toHaveClass('pt-4')
		})

		it('renders carousel item with vertical spacing', () => {
			render(
				<Carousel orientation="vertical">
					<CarouselContent>
						<CarouselItem>Slide content</CarouselItem>
					</CarouselContent>
				</Carousel>,
			)

			const item = screen.getByText('Slide content')
			expect(item).toHaveClass('pt-4')
			expect(item).not.toHaveClass('pl-4')
		})

		it('renders carousel item with custom className', () => {
			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem className="custom-item">Slide content</CarouselItem>
					</CarouselContent>
				</Carousel>,
			)

			const item = screen.getByText('Slide content')
			expect(item).toHaveClass('custom-item')
		})
	})

	describe('CarouselPrevious Component', () => {
		it('renders previous button with default props', () => {
			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
					<CarouselPrevious />
				</Carousel>,
			)

			const prevButton = screen.getByRole('button', { name: /previous slide/i })
			expect(prevButton).toBeInTheDocument()
			expect(prevButton).toHaveAttribute('data-slot', 'carousel-previous')
			expect(prevButton).toHaveClass('absolute', 'size-8', 'rounded-full')
		})

		it('renders previous button with horizontal positioning', () => {
			render(
				<Carousel orientation="horizontal">
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
					<CarouselPrevious />
				</Carousel>,
			)

			const prevButton = screen.getByRole('button', { name: /previous slide/i })
			expect(prevButton).toHaveClass('top-1/2', '-left-12', '-translate-y-1/2')
			expect(prevButton).not.toHaveClass('rotate-90')
		})

		it('renders previous button with vertical positioning', () => {
			render(
				<Carousel orientation="vertical">
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
					<CarouselPrevious />
				</Carousel>,
			)

			const prevButton = screen.getByRole('button', { name: /previous slide/i })
			expect(prevButton).toHaveClass(
				'-top-12',
				'left-1/2',
				'-translate-x-1/2',
				'rotate-90',
			)
		})

		it('calls scrollPrev when clicked', async () => {
			const user = userEvent.setup()

			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
					<CarouselPrevious />
				</Carousel>,
			)

			const prevButton = screen.getByRole('button', { name: /previous slide/i })
			await user.click(prevButton)

			expect(mockScrollPrev).toHaveBeenCalledOnce()
		})

		it('is disabled when cannot scroll prev', () => {
			mockCanScrollPrev.mockReturnValue(false)

			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
					<CarouselPrevious />
				</Carousel>,
			)

			const prevButton = screen.getByRole('button', { name: /previous slide/i })
			expect(prevButton).toBeDisabled()
		})

		it('renders previous button with custom className', () => {
			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
					<CarouselPrevious className="custom-prev" />
				</Carousel>,
			)

			const prevButton = screen.getByRole('button', { name: /previous slide/i })
			expect(prevButton).toHaveClass('custom-prev')
		})
	})

	describe('CarouselNext Component', () => {
		it('renders next button with default props', () => {
			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
					<CarouselNext />
				</Carousel>,
			)

			const nextButton = screen.getByRole('button', { name: /next slide/i })
			expect(nextButton).toBeInTheDocument()
			expect(nextButton).toHaveAttribute('data-slot', 'carousel-next')
			expect(nextButton).toHaveClass('absolute', 'size-8', 'rounded-full')
		})

		it('renders next button with horizontal positioning', () => {
			render(
				<Carousel orientation="horizontal">
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
					<CarouselNext />
				</Carousel>,
			)

			const nextButton = screen.getByRole('button', { name: /next slide/i })
			expect(nextButton).toHaveClass('top-1/2', '-right-12', '-translate-y-1/2')
			expect(nextButton).not.toHaveClass('rotate-90')
		})

		it('renders next button with vertical positioning', () => {
			render(
				<Carousel orientation="vertical">
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
					<CarouselNext />
				</Carousel>,
			)

			const nextButton = screen.getByRole('button', { name: /next slide/i })
			expect(nextButton).toHaveClass(
				'-bottom-12',
				'left-1/2',
				'-translate-x-1/2',
				'rotate-90',
			)
		})

		it('calls scrollNext when clicked', async () => {
			const user = userEvent.setup()

			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
					<CarouselNext />
				</Carousel>,
			)

			const nextButton = screen.getByRole('button', { name: /next slide/i })
			await user.click(nextButton)

			expect(mockScrollNext).toHaveBeenCalledOnce()
		})

		it('is disabled when cannot scroll next', () => {
			mockCanScrollNext.mockReturnValue(false)

			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
					<CarouselNext />
				</Carousel>,
			)

			const nextButton = screen.getByRole('button', { name: /next slide/i })
			expect(nextButton).toBeDisabled()
		})

		it('renders next button with custom className', () => {
			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
					<CarouselNext className="custom-next" />
				</Carousel>,
			)

			const nextButton = screen.getByRole('button', { name: /next slide/i })
			expect(nextButton).toHaveClass('custom-next')
		})
	})

	describe('Complete Carousel Structure', () => {
		it('renders complete carousel with multiple slides', () => {
			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
						<CarouselItem>Slide 2</CarouselItem>
						<CarouselItem>Slide 3</CarouselItem>
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>,
			)

			expect(screen.getByText('Slide 1')).toBeInTheDocument()
			expect(screen.getByText('Slide 2')).toBeInTheDocument()
			expect(screen.getByText('Slide 3')).toBeInTheDocument()
			expect(screen.getByRole('button', { name: /previous slide/i })).toBeInTheDocument()
			expect(screen.getByRole('button', { name: /next slide/i })).toBeInTheDocument()
		})

		it('renders carousel without navigation buttons', () => {
			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
						<CarouselItem>Slide 2</CarouselItem>
					</CarouselContent>
				</Carousel>,
			)

			expect(screen.getByText('Slide 1')).toBeInTheDocument()
			expect(screen.getByText('Slide 2')).toBeInTheDocument()
			expect(
				screen.queryByRole('button', { name: /previous slide/i }),
			).not.toBeInTheDocument()
			expect(
				screen.queryByRole('button', { name: /next slide/i }),
			).not.toBeInTheDocument()
		})
	})

	describe('Content Types', () => {
		it('renders carousel with text content', () => {
			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem>Simple text slide</CarouselItem>
					</CarouselContent>
				</Carousel>,
			)

			expect(screen.getByText('Simple text slide')).toBeInTheDocument()
		})

		it('renders carousel with complex JSX content', () => {
			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem>
							<div>
								<h3>Slide Title</h3>
								<p>Slide description</p>
								<button>Action</button>
							</div>
						</CarouselItem>
					</CarouselContent>
				</Carousel>,
			)

			expect(screen.getByText('Slide Title')).toBeInTheDocument()
			expect(screen.getByText('Slide description')).toBeInTheDocument()
			expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
		})

		it('renders carousel with image content', () => {
			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem>
							<img src="/test.jpg" alt="Test image" />
						</CarouselItem>
					</CarouselContent>
				</Carousel>,
			)

			expect(screen.getByAltText('Test image')).toBeInTheDocument()
		})
	})

	describe('API Integration', () => {
		it('calls setApi when provided', () => {
			const setApi = vi.fn()

			render(
				<Carousel setApi={setApi}>
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
				</Carousel>,
			)

			expect(setApi).toHaveBeenCalledWith(mockApi)
		})

		it('sets up event listeners on api', () => {
			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
				</Carousel>,
			)

			expect(mockOn).toHaveBeenCalledWith('reInit', expect.any(Function))
			expect(mockOn).toHaveBeenCalledWith('select', expect.any(Function))
		})
	})

	describe('Edge Cases', () => {
		it('renders empty carousel', () => {
			render(
				<Carousel>
					<CarouselContent></CarouselContent>
				</Carousel>,
			)

			const carousel = screen.getByRole('region')
			expect(carousel).toBeInTheDocument()
		})

		it('handles single slide', () => {
			render(
				<Carousel>
					<CarouselContent>
						<CarouselItem>Only slide</CarouselItem>
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>,
			)

			expect(screen.getByText('Only slide')).toBeInTheDocument()
		})

		it('handles undefined className gracefully', () => {
			render(
				<Carousel className={undefined}>
					<CarouselContent>
						<CarouselItem>Slide 1</CarouselItem>
					</CarouselContent>
				</Carousel>,
			)

			const carousel = screen.getByRole('region')
			expect(carousel).toHaveClass('relative') // Should still have default classes
		})
	})

	describe('Error Handling', () => {
		it('throws error when useCarousel is used outside Carousel context', () => {
			// Mock console.error to avoid noise in test output
			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

			expect(() => {
				render(<CarouselContent>Content</CarouselContent>)
			}).toThrow('useCarousel must be used within a <Carousel />')

			consoleSpy.mockRestore()
		})
	})
})
