import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './card'

describe('Card', () => {
	describe('Card Component', () => {
		it('renders card with default props', () => {
			render(<Card>Card content</Card>)

			const card = screen.getByText('Card content')
			expect(card).toBeInTheDocument()
			expect(card).toHaveAttribute('data-slot', 'card')
			expect(card).toHaveAttribute('data-size', 'default')
			expect(card).toHaveClass(
				'bg-card',
				'text-card-foreground',
				'flex',
				'flex-col',
				'gap-4',
				'rounded-xl',
				'py-4',
			)
		})

		it('renders card with custom className', () => {
			render(<Card className="custom-class">Card content</Card>)

			const card = screen.getByText('Card content')
			expect(card).toHaveClass('custom-class')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Card data-testid="test-card" id="card-id" title="Card title">
					Card content
				</Card>,
			)

			const card = screen.getByTestId('test-card')
			expect(card).toHaveAttribute('id', 'card-id')
			expect(card).toHaveAttribute('title', 'Card title')
		})

		it('renders as div element', () => {
			render(<Card>Card content</Card>)

			const card = screen.getByText('Card content')
			expect(card.tagName).toBe('DIV')
		})

		it('renders card with small size variant', () => {
			render(<Card size="sm">Card content</Card>)

			const card = screen.getByText('Card content')
			expect(card).toHaveAttribute('data-size', 'sm')
		})
	})

	describe('CardHeader Component', () => {
		it('renders card header with default props', () => {
			render(<CardHeader>Header content</CardHeader>)

			const header = screen.getByText('Header content')
			expect(header).toBeInTheDocument()
			expect(header).toHaveAttribute('data-slot', 'card-header')
			expect(header).toHaveClass(
				'@container/card-header',
				'grid',
				'auto-rows-min',
				'items-start',
				'gap-1',
				'px-4',
			)
		})

		it('renders card header with custom className', () => {
			render(<CardHeader className="custom-header">Header content</CardHeader>)

			const header = screen.getByText('Header content')
			expect(header).toHaveClass('custom-header')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<CardHeader data-testid="test-header" id="header-id">
					Header content
				</CardHeader>,
			)

			const header = screen.getByTestId('test-header')
			expect(header).toHaveAttribute('id', 'header-id')
		})
	})

	describe('CardTitle Component', () => {
		it('renders card title with default props', () => {
			render(<CardTitle>Title content</CardTitle>)

			const title = screen.getByText('Title content')
			expect(title).toBeInTheDocument()
			expect(title).toHaveAttribute('data-slot', 'card-title')
			expect(title).toHaveClass('text-base', 'leading-snug', 'font-medium')
		})

		it('renders card title with custom className', () => {
			render(<CardTitle className="custom-title">Title content</CardTitle>)

			const title = screen.getByText('Title content')
			expect(title).toHaveClass('custom-title')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<CardTitle data-testid="test-title" id="title-id">
					Title content
				</CardTitle>,
			)

			const title = screen.getByTestId('test-title')
			expect(title).toHaveAttribute('id', 'title-id')
		})
	})

	describe('CardDescription Component', () => {
		it('renders card description with default props', () => {
			render(<CardDescription>Description content</CardDescription>)

			const description = screen.getByText('Description content')
			expect(description).toBeInTheDocument()
			expect(description).toHaveAttribute('data-slot', 'card-description')
			expect(description).toHaveClass('text-muted-foreground', 'text-sm')
		})

		it('renders card description with custom className', () => {
			render(
				<CardDescription className="custom-description">
					Description content
				</CardDescription>,
			)

			const description = screen.getByText('Description content')
			expect(description).toHaveClass('custom-description')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<CardDescription data-testid="test-description" id="description-id">
					Description content
				</CardDescription>,
			)

			const description = screen.getByTestId('test-description')
			expect(description).toHaveAttribute('id', 'description-id')
		})
	})

	describe('CardAction Component', () => {
		it('renders card action with default props', () => {
			render(<CardAction>Action content</CardAction>)

			const action = screen.getByText('Action content')
			expect(action).toBeInTheDocument()
			expect(action).toHaveAttribute('data-slot', 'card-action')
			expect(action).toHaveClass(
				'col-start-2',
				'row-span-2',
				'row-start-1',
				'self-start',
				'justify-self-end',
			)
		})

		it('renders card action with custom className', () => {
			render(<CardAction className="custom-action">Action content</CardAction>)

			const action = screen.getByText('Action content')
			expect(action).toHaveClass('custom-action')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<CardAction data-testid="test-action" id="action-id">
					Action content
				</CardAction>,
			)

			const action = screen.getByTestId('test-action')
			expect(action).toHaveAttribute('id', 'action-id')
		})
	})

	describe('CardContent Component', () => {
		it('renders card content with default props', () => {
			render(<CardContent>Content text</CardContent>)

			const content = screen.getByText('Content text')
			expect(content).toBeInTheDocument()
			expect(content).toHaveAttribute('data-slot', 'card-content')
			expect(content).toHaveClass('px-4')
		})

		it('renders card content with custom className', () => {
			render(<CardContent className="custom-content">Content text</CardContent>)

			const content = screen.getByText('Content text')
			expect(content).toHaveClass('custom-content')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<CardContent data-testid="test-content" id="content-id">
					Content text
				</CardContent>,
			)

			const content = screen.getByTestId('test-content')
			expect(content).toHaveAttribute('id', 'content-id')
		})
	})

	describe('CardFooter Component', () => {
		it('renders card footer with default props', () => {
			render(<CardFooter>Footer content</CardFooter>)

			const footer = screen.getByText('Footer content')
			expect(footer).toBeInTheDocument()
			expect(footer).toHaveAttribute('data-slot', 'card-footer')
			expect(footer).toHaveClass('flex', 'items-center', 'p-4', 'border-t')
		})

		it('renders card footer with custom className', () => {
			render(<CardFooter className="custom-footer">Footer content</CardFooter>)

			const footer = screen.getByText('Footer content')
			expect(footer).toHaveClass('custom-footer')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<CardFooter data-testid="test-footer" id="footer-id">
					Footer content
				</CardFooter>,
			)

			const footer = screen.getByTestId('test-footer')
			expect(footer).toHaveAttribute('id', 'footer-id')
		})
	})

	describe('Complete Card Structure', () => {
		it('renders complete card with all components', () => {
			render(
				<Card>
					<CardHeader>
						<CardTitle>Card Title</CardTitle>
						<CardDescription>Card Description</CardDescription>
						<CardAction>Action</CardAction>
					</CardHeader>
					<CardContent>Card Content</CardContent>
					<CardFooter>Card Footer</CardFooter>
				</Card>,
			)

			expect(screen.getByText('Card Title')).toBeInTheDocument()
			expect(screen.getByText('Card Description')).toBeInTheDocument()
			expect(screen.getByText('Action')).toBeInTheDocument()
			expect(screen.getByText('Card Content')).toBeInTheDocument()
			expect(screen.getByText('Card Footer')).toBeInTheDocument()
		})

		it('renders card with only header and content', () => {
			render(
				<Card>
					<CardHeader>
						<CardTitle>Simple Title</CardTitle>
					</CardHeader>
					<CardContent>Simple Content</CardContent>
				</Card>,
			)

			expect(screen.getByText('Simple Title')).toBeInTheDocument()
			expect(screen.getByText('Simple Content')).toBeInTheDocument()
		})

		it('renders minimal card with just content', () => {
			render(
				<Card>
					<CardContent>Just content</CardContent>
				</Card>,
			)

			expect(screen.getByText('Just content')).toBeInTheDocument()
		})
	})

	describe('Content Types', () => {
		it('renders card with text content', () => {
			render(<Card>Simple text content</Card>)

			expect(screen.getByText('Simple text content')).toBeInTheDocument()
		})

		it('renders card with JSX content', () => {
			render(
				<Card>
					<span>Complex</span> <strong>JSX</strong> content
				</Card>,
			)

			expect(screen.getByText('Complex')).toBeInTheDocument()
			expect(screen.getByText('JSX')).toBeInTheDocument()
			expect(screen.getByText('content')).toBeInTheDocument()
		})

		it('renders card with nested components', () => {
			render(
				<Card>
					<div>
						<p>Nested paragraph</p>
						<button>Nested button</button>
					</div>
				</Card>,
			)

			expect(screen.getByText('Nested paragraph')).toBeInTheDocument()
			expect(screen.getByRole('button', { name: 'Nested button' })).toBeInTheDocument()
		})
	})

	describe('Accessibility', () => {
		it('supports aria-label', () => {
			render(<Card aria-label="Product card">Card content</Card>)

			const card = screen.getByLabelText('Product card')
			expect(card).toBeInTheDocument()
		})

		it('supports role attribute', () => {
			render(<Card role="article">Card content</Card>)

			const card = screen.getByRole('article')
			expect(card).toBeInTheDocument()
		})

		it('supports aria-describedby', () => {
			render(
				<div>
					<Card aria-describedby="card-description">Card content</Card>
					<div id="card-description">This is a product card</div>
				</div>,
			)

			const card = screen.getByText('Card content')
			expect(card).toHaveAttribute('aria-describedby', 'card-description')
		})
	})

	describe('Edge Cases', () => {
		it('renders empty card', () => {
			render(<Card></Card>)

			const card = document.querySelector('[data-slot="card"]')
			expect(card).toBeInTheDocument()
		})

		it('handles very long content', () => {
			const longContent =
				'This is a very long card content that might cause layout issues '.repeat(10)
			render(<Card>{longContent}</Card>)

			// Just check that the card element exists with the content
			const card = document.querySelector('[data-slot="card"]')
			expect(card).toBeInTheDocument()
			expect(card?.textContent).toBe(longContent)
		})

		it('handles special characters', () => {
			render(<Card>Special @#$%^&*() Characters</Card>)

			expect(screen.getByText('Special @#$%^&*() Characters')).toBeInTheDocument()
		})

		it('handles undefined className gracefully', () => {
			render(<Card className={undefined}>Card content</Card>)

			const card = screen.getByText('Card content')
			expect(card).toHaveClass('bg-card') // Should still have default classes
		})
	})

	describe('Multiple Cards', () => {
		it('renders multiple cards independently', () => {
			render(
				<div>
					<Card>First card</Card>
					<Card>Second card</Card>
					<Card>Third card</Card>
				</div>,
			)

			expect(screen.getByText('First card')).toBeInTheDocument()
			expect(screen.getByText('Second card')).toBeInTheDocument()
			expect(screen.getByText('Third card')).toBeInTheDocument()
		})
	})

	describe('Custom Styling', () => {
		it('merges custom classes with default classes', () => {
			render(<Card className="bg-red-500 p-8">Styled card</Card>)

			const card = screen.getByText('Styled card')
			expect(card).toHaveClass('bg-red-500', 'p-8')
			expect(card).toHaveClass('flex', 'flex-col') // Default classes should still be present
		})

		it('supports custom padding on components', () => {
			render(
				<Card>
					<CardContent className="px-8 py-4">Custom padding content</CardContent>
				</Card>,
			)

			const content = screen.getByText('Custom padding content')
			expect(content).toHaveClass('px-8', 'py-4')
		})
	})
})
