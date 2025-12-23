import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Avatar, AvatarFallback, AvatarImage } from './avatar'

describe('Avatar', () => {
	describe('Rendering', () => {
		it('renders avatar container correctly', () => {
			render(
				<Avatar>
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>,
			)

			const fallback = screen.getByText('JD')
			const avatar = fallback.parentElement
			expect(avatar).toBeInTheDocument()
			expect(avatar).toHaveClass(
				'relative',
				'flex',
				'h-10',
				'w-10',
				'shrink-0',
				'overflow-hidden',
				'rounded-full',
			)
		})

		it('applies custom className to avatar', () => {
			render(
				<Avatar className="custom-avatar">
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>,
			)

			const fallback = screen.getByText('JD')
			const avatar = fallback.parentElement
			expect(avatar).toHaveClass('custom-avatar')
		})

		it('forwards ref correctly', () => {
			const ref = { current: null }
			render(
				<Avatar ref={ref}>
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>,
			)

			expect(ref.current).toBeTruthy()
		})
	})

	describe('AvatarFallback', () => {
		it('renders fallback text', () => {
			render(
				<Avatar>
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>,
			)

			expect(screen.getByText('JD')).toBeInTheDocument()
		})

		it('applies correct classes to fallback', () => {
			render(
				<Avatar>
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>,
			)

			const fallback = screen.getByText('JD')
			expect(fallback).toHaveClass(
				'flex',
				'h-full',
				'w-full',
				'items-center',
				'justify-center',
				'rounded-full',
				'bg-muted',
			)
		})

		it('applies custom className to fallback', () => {
			render(
				<Avatar>
					<AvatarFallback className="custom-fallback">JD</AvatarFallback>
				</Avatar>,
			)

			const fallback = screen.getByText('JD')
			expect(fallback).toHaveClass('custom-fallback')
		})

		it('forwards ref correctly for fallback', () => {
			const ref = { current: null }
			render(
				<Avatar>
					<AvatarFallback ref={ref}>JD</AvatarFallback>
				</Avatar>,
			)

			expect(ref.current).toBeTruthy()
		})

		it('renders complex fallback content', () => {
			render(
				<Avatar>
					<AvatarFallback>
						<span>Complex</span> Content
					</AvatarFallback>
				</Avatar>,
			)

			expect(screen.getByText('Complex')).toBeInTheDocument()
			expect(screen.getByText('Content')).toBeInTheDocument()
		})
	})

	describe('Avatar with Image and Fallback', () => {
		it('renders fallback when image is provided (jsdom behavior)', () => {
			render(
				<Avatar>
					<AvatarImage src="https://example.com/avatar.jpg" alt="User Avatar" />
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>,
			)

			// In jsdom, images don't load, so fallback is shown
			expect(screen.getByText('JD')).toBeInTheDocument()
		})
	})

	describe('Avatar without Image', () => {
		it('renders only fallback when no image is provided', () => {
			render(
				<Avatar>
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>,
			)

			expect(screen.getByText('JD')).toBeInTheDocument()
		})
	})

	describe('Avatar Sizes', () => {
		it('renders with custom size classes', () => {
			render(
				<Avatar className="h-16 w-16">
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>,
			)

			const fallback = screen.getByText('JD')
			const avatar = fallback.parentElement
			expect(avatar).toHaveClass('h-16', 'w-16')
		})

		it('renders small avatar', () => {
			render(
				<Avatar className="h-8 w-8">
					<AvatarFallback className="text-xs">J</AvatarFallback>
				</Avatar>,
			)

			const fallback = screen.getByText('J')
			const avatar = fallback.parentElement
			expect(avatar).toHaveClass('h-8', 'w-8')

			expect(fallback).toHaveClass('text-xs')
		})

		it('renders large avatar', () => {
			render(
				<Avatar className="h-20 w-20">
					<AvatarFallback className="text-2xl">JD</AvatarFallback>
				</Avatar>,
			)

			const fallback = screen.getByText('JD')
			const avatar = fallback.parentElement
			expect(avatar).toHaveClass('h-20', 'w-20')

			expect(fallback).toHaveClass('text-2xl')
		})
	})

	describe('Accessibility', () => {
		it('fallback text is accessible', () => {
			render(
				<Avatar>
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>,
			)

			const fallback = screen.getByText('JD')
			expect(fallback).toBeInTheDocument()
		})

		it('supports aria-label on avatar container', () => {
			render(
				<Avatar aria-label="User profile picture">
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>,
			)

			const fallback = screen.getByText('JD')
			const avatar = fallback.parentElement
			expect(avatar).toHaveAttribute('aria-label', 'User profile picture')
		})

		it('image component behavior in jsdom', () => {
			render(
				<Avatar>
					<AvatarImage
						src="https://example.com/avatar.jpg"
						alt="John Doe's profile picture"
					/>
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>,
			)

			// In jsdom, images don't render, so we test that fallback is shown
			expect(screen.getByText('JD')).toBeInTheDocument()
		})
	})

	describe('Edge Cases', () => {
		it('handles empty fallback gracefully', () => {
			render(
				<Avatar>
					<AvatarFallback></AvatarFallback>
				</Avatar>,
			)

			// Empty fallback still renders the element
			const container = document.querySelector('[data-radix-avatar-fallback]')
			if (!container) {
				// If Radix doesn't add the attribute, check for the fallback element
				const avatarContainer = document.querySelector('.relative.flex')
				expect(avatarContainer).toBeInTheDocument()
			} else {
				expect(container).toBeInTheDocument()
			}
		})

		it('handles missing src attribute', () => {
			render(
				<Avatar>
					<AvatarImage alt="No source" />
					<AvatarFallback>NS</AvatarFallback>
				</Avatar>,
			)

			// Fallback should be shown when no src is provided
			expect(screen.getByText('NS')).toBeInTheDocument()
		})

		it('handles very long fallback text', () => {
			render(
				<Avatar>
					<AvatarFallback>Very Long Name</AvatarFallback>
				</Avatar>,
			)

			expect(screen.getByText('Very Long Name')).toBeInTheDocument()
		})

		it('handles special characters in fallback', () => {
			render(
				<Avatar>
					<AvatarFallback>@#</AvatarFallback>
				</Avatar>,
			)

			expect(screen.getByText('@#')).toBeInTheDocument()
		})
	})

	describe('Multiple Avatars', () => {
		it('renders multiple avatars independently', () => {
			render(
				<div>
					<Avatar>
						<AvatarImage src="https://example.com/user1.jpg" alt="User 1" />
						<AvatarFallback>U1</AvatarFallback>
					</Avatar>
					<Avatar>
						<AvatarImage src="https://example.com/user2.jpg" alt="User 2" />
						<AvatarFallback>U2</AvatarFallback>
					</Avatar>
				</div>,
			)

			expect(screen.getByText('U1')).toBeInTheDocument()
			expect(screen.getByText('U2')).toBeInTheDocument()
		})
	})

	describe('Custom Styling', () => {
		it('supports custom background colors', () => {
			render(
				<Avatar>
					<AvatarFallback className="bg-blue-500">JD</AvatarFallback>
				</Avatar>,
			)

			const fallback = screen.getByText('JD')
			expect(fallback).toHaveClass('bg-blue-500')
		})

		it('supports custom border styles', () => {
			render(
				<Avatar className="border-2 border-blue-500">
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>,
			)

			const fallback = screen.getByText('JD')
			const avatar = fallback.parentElement
			expect(avatar).toHaveClass('border-2', 'border-blue-500')
		})

		it('supports custom shapes', () => {
			render(
				<Avatar className="rounded-lg">
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>,
			)

			const fallback = screen.getByText('JD')
			const avatar = fallback.parentElement
			expect(avatar).toHaveClass('rounded-lg')
		})
	})
})
