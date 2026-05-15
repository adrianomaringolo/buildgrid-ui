import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from './breadcrumb'

describe('Breadcrumb', () => {
	describe('Rendering', () => {
		it('renders a nav element', () => {
			render(
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbPage>Home</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>,
			)

			const nav = screen.getByRole('navigation')
			expect(nav).toBeInTheDocument()
		})

		it('renders BreadcrumbList as an ordered list', () => {
			render(
				<Breadcrumb>
					<BreadcrumbList data-testid="list">
						<BreadcrumbItem>
							<BreadcrumbPage>Item</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>,
			)

			const list = screen.getByTestId('list')
			expect(list.tagName).toBe('OL')
		})

		it('renders BreadcrumbItem as a list item', () => {
			render(
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem data-testid="item">
							<BreadcrumbPage>Item</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>,
			)

			const item = screen.getByTestId('item')
			expect(item.tagName).toBe('LI')
		})

		it('renders BreadcrumbLink as an anchor element', () => {
			render(
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/home">Home</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>,
			)

			const link = screen.getByRole('link', { name: 'Home' })
			expect(link).toBeInTheDocument()
			expect(link).toHaveAttribute('href', '/home')
		})

		it('renders BreadcrumbPage as a span element', () => {
			render(
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbPage data-testid="page">Current Page</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>,
			)

			const page = screen.getByTestId('page')
			expect(page.tagName).toBe('SPAN')
			expect(page).toHaveTextContent('Current Page')
		})

		it('applies custom className to BreadcrumbList', () => {
			render(
				<Breadcrumb>
					<BreadcrumbList className="custom-list" data-testid="list">
						<BreadcrumbItem>
							<BreadcrumbPage>Item</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>,
			)

			expect(screen.getByTestId('list')).toHaveClass('custom-list')
		})

		it('applies custom className to BreadcrumbItem', () => {
			render(
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem className="custom-item" data-testid="item">
							<BreadcrumbPage>Item</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>,
			)

			expect(screen.getByTestId('item')).toHaveClass('custom-item')
		})
	})

	describe('Accessibility', () => {
		it('sets aria-label="breadcrumb" on nav element', () => {
			render(
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbPage>Page</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>,
			)

			const nav = screen.getByRole('navigation')
			expect(nav).toHaveAttribute('aria-label', 'breadcrumb')
		})

		it('sets aria-current="page" on BreadcrumbPage', () => {
			render(
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbPage data-testid="page">Current</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>,
			)

			const page = screen.getByTestId('page')
			expect(page).toHaveAttribute('aria-current', 'page')
		})

		it('sets aria-disabled="true" on BreadcrumbPage', () => {
			render(
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbPage data-testid="page">Current</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>,
			)

			const page = screen.getByTestId('page')
			expect(page).toHaveAttribute('aria-disabled', 'true')
		})

		it('sets aria-hidden="true" on BreadcrumbSeparator', () => {
			render(
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator data-testid="sep" />
						<BreadcrumbItem>
							<BreadcrumbPage>Page</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>,
			)

			const sep = screen.getByTestId('sep')
			expect(sep).toHaveAttribute('aria-hidden', 'true')
		})

		it('sets aria-hidden="true" on BreadcrumbEllipsis', () => {
			render(
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbEllipsis data-testid="ellipsis" />
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>,
			)

			const ellipsis = screen.getByTestId('ellipsis')
			expect(ellipsis).toHaveAttribute('aria-hidden', 'true')
		})
	})

	describe('Variants', () => {
		it('renders BreadcrumbLink href correctly', () => {
			render(
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/products">Products</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>,
			)

			const link = screen.getByRole('link', { name: 'Products' })
			expect(link).toHaveAttribute('href', '/products')
		})

		it('renders custom separator children', () => {
			render(
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator>/</BreadcrumbSeparator>
						<BreadcrumbItem>
							<BreadcrumbPage>Page</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>,
			)

			expect(screen.getByText('/')).toBeInTheDocument()
		})

		it('renders default ChevronRight separator when no children given', () => {
			render(
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator data-testid="sep" />
						<BreadcrumbItem>
							<BreadcrumbPage>Page</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>,
			)

			const sep = screen.getByTestId('sep')
			// ChevronRight renders an SVG
			const svg = sep.querySelector('svg')
			expect(svg).toBeInTheDocument()
		})

		it('renders ellipsis with MoreHorizontal icon and sr-only text', () => {
			render(
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbEllipsis data-testid="ellipsis" />
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>,
			)

			const ellipsis = screen.getByTestId('ellipsis')
			expect(ellipsis.querySelector('svg')).toBeInTheDocument()
			expect(screen.getByText('More')).toBeInTheDocument()
		})

		it('renders BreadcrumbLink with asChild prop using slot', () => {
			render(
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<button>Home</button>
							</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>,
			)

			const btn = screen.getByRole('button', { name: 'Home' })
			expect(btn).toBeInTheDocument()
		})
	})

	describe('data-slot attributes', () => {
		it('sets data-slot on Breadcrumb nav', () => {
			render(<Breadcrumb data-testid="nav" />)
			expect(screen.getByTestId('nav')).toHaveAttribute('data-slot', 'breadcrumb')
		})

		it('sets data-slot on BreadcrumbList', () => {
			render(
				<ol data-testid="wrap">
					<BreadcrumbList data-testid="list" />
				</ol>,
			)
			expect(screen.getByTestId('list')).toHaveAttribute('data-slot', 'breadcrumb-list')
		})

		it('sets data-slot on BreadcrumbItem', () => {
			render(
				<ol>
					<BreadcrumbItem data-testid="item" />
				</ol>,
			)
			expect(screen.getByTestId('item')).toHaveAttribute('data-slot', 'breadcrumb-item')
		})

		it('sets data-slot on BreadcrumbPage', () => {
			render(<BreadcrumbPage data-testid="page">Current</BreadcrumbPage>)
			expect(screen.getByTestId('page')).toHaveAttribute('data-slot', 'breadcrumb-page')
		})

		it('sets data-slot on BreadcrumbSeparator', () => {
			render(
				<ol>
					<BreadcrumbSeparator data-testid="sep" />
				</ol>,
			)
			expect(screen.getByTestId('sep')).toHaveAttribute('data-slot', 'breadcrumb-separator')
		})

		it('sets data-slot on BreadcrumbEllipsis', () => {
			render(<BreadcrumbEllipsis data-testid="ellipsis" />)
			expect(screen.getByTestId('ellipsis')).toHaveAttribute(
				'data-slot',
				'breadcrumb-ellipsis',
			)
		})
	})

	describe('Edge Cases', () => {
		it('renders full breadcrumb trail correctly', () => {
			render(
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/products">Products</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Detail</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>,
			)

			expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
			expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument()
			expect(screen.getByText('Detail')).toBeInTheDocument()
		})

		it('forwards extra props to nav', () => {
			render(<Breadcrumb data-testid="breadcrumb" id="main-breadcrumb" />)
			const nav = screen.getByTestId('breadcrumb')
			expect(nav).toHaveAttribute('id', 'main-breadcrumb')
		})
	})
})
