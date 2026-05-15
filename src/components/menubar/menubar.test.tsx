import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from './menubar'

describe('Menubar', () => {
	describe('Rendering', () => {
		it('renders the Menubar with correct data-slot', () => {
			render(
				<Menubar data-testid="menubar">
					<MenubarMenu>
						<MenubarTrigger>File</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>Open</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>,
			)

			const menubar = screen.getByTestId('menubar')
			expect(menubar).toBeInTheDocument()
			expect(menubar).toHaveAttribute('data-slot', 'menubar')
		})

		it('renders Menubar with correct base classes', () => {
			render(
				<Menubar data-testid="menubar">
					<MenubarMenu>
						<MenubarTrigger>File</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>Open</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>,
			)

			const menubar = screen.getByTestId('menubar')
			expect(menubar).toHaveClass('flex', 'h-9', 'items-center', 'rounded-md', 'border', 'bg-background')
		})

		it('renders trigger with correct text', () => {
			render(
				<Menubar>
					<MenubarMenu>
						<MenubarTrigger>File</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>Open</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>Edit</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>Undo</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>View</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>Zoom In</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>,
			)

			expect(screen.getByText('File')).toBeInTheDocument()
			expect(screen.getByText('Edit')).toBeInTheDocument()
			expect(screen.getByText('View')).toBeInTheDocument()
		})

		it('renders MenubarTrigger with correct data-slot', () => {
			render(
				<Menubar>
					<MenubarMenu>
						<MenubarTrigger data-testid="trigger">File</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>Open</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>,
			)

			const trigger = screen.getByTestId('trigger')
			expect(trigger).toHaveAttribute('data-slot', 'menubar-trigger')
		})

		it('renders MenubarSeparator with correct classes', () => {
			render(
				<MenubarSeparator data-testid="separator" />,
			)

			const separator = screen.getByTestId('separator')
			expect(separator).toBeInTheDocument()
			expect(separator).toHaveClass('-mx-1', 'my-1', 'h-px', 'bg-muted')
			expect(separator).toHaveAttribute('data-slot', 'menubar-separator')
		})

		it('renders MenubarShortcut with correct classes', () => {
			render(
				<MenubarShortcut data-testid="shortcut">⌘S</MenubarShortcut>,
			)

			const shortcut = screen.getByTestId('shortcut')
			expect(shortcut).toBeInTheDocument()
			expect(shortcut).toHaveClass('ml-auto', 'text-xs', 'tracking-widest', 'text-muted-foreground')
			expect(shortcut).toHaveAttribute('data-slot', 'menubar-shortcut')
		})

		it('renders MenubarLabel with correct classes', () => {
			render(
				<MenubarLabel data-testid="label">Edit Options</MenubarLabel>,
			)

			const label = screen.getByTestId('label')
			expect(label).toBeInTheDocument()
			expect(label).toHaveClass('px-2', 'py-1.5', 'text-xs', 'font-semibold', 'text-muted-foreground')
			expect(label).toHaveAttribute('data-slot', 'menubar-label')
		})
	})

	describe('Accessibility', () => {
		it('renders Menubar as a menubar role element', () => {
			render(
				<Menubar>
					<MenubarMenu>
						<MenubarTrigger>File</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>Open</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>,
			)

			const menubar = screen.getByRole('menubar')
			expect(menubar).toBeInTheDocument()
		})

		it('renders MenubarTrigger as a menuitem role', () => {
			render(
				<Menubar>
					<MenubarMenu>
						<MenubarTrigger>File</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>Open</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>,
			)

			const trigger = screen.getByRole('menuitem', { name: 'File' })
			expect(trigger).toBeInTheDocument()
		})

		it('MenubarSeparator has correct data-slot', () => {
			render(<MenubarSeparator data-testid="sep" />)
			expect(screen.getByTestId('sep')).toHaveAttribute('data-slot', 'menubar-separator')
		})

		it('MenubarShortcut has correct data-slot', () => {
			render(<MenubarShortcut data-testid="sc">⌘Z</MenubarShortcut>)
			expect(screen.getByTestId('sc')).toHaveAttribute('data-slot', 'menubar-shortcut')
		})
	})

	describe('Edge Cases', () => {
		it('applies custom className to Menubar', () => {
			render(
				<Menubar className="custom-menubar" data-testid="menubar">
					<MenubarMenu>
						<MenubarTrigger>File</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>Open</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>,
			)

			const menubar = screen.getByTestId('menubar')
			expect(menubar).toHaveClass('custom-menubar')
			expect(menubar).toHaveClass('flex', 'h-9')
		})

		it('applies custom className to MenubarSeparator', () => {
			render(
				<MenubarSeparator className="custom-sep" data-testid="sep" />,
			)

			const sep = screen.getByTestId('sep')
			expect(sep).toHaveClass('custom-sep')
			expect(sep).toHaveClass('-mx-1', 'my-1', 'h-px', 'bg-muted')
		})

		it('applies custom className to MenubarShortcut', () => {
			render(
				<MenubarShortcut className="custom-sc" data-testid="sc">⌘K</MenubarShortcut>,
			)

			const sc = screen.getByTestId('sc')
			expect(sc).toHaveClass('custom-sc')
			expect(sc).toHaveClass('ml-auto', 'text-xs', 'tracking-widest')
		})

		it('applies inset padding to MenubarLabel', () => {
			render(
				<>
					<MenubarLabel data-testid="no-inset">Normal Label</MenubarLabel>
					<MenubarLabel inset data-testid="with-inset">Inset Label</MenubarLabel>
				</>,
			)

			expect(screen.getByTestId('no-inset')).not.toHaveClass('pl-8')
			expect(screen.getByTestId('with-inset')).toHaveClass('pl-8')
		})

		it('renders multiple menus side by side', () => {
			render(
				<Menubar>
					<MenubarMenu>
						<MenubarTrigger>File</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>Open</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>Edit</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>Undo</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>,
			)

			const triggers = screen.getAllByRole('menuitem')
			expect(triggers).toHaveLength(2)
			expect(triggers[0]).toHaveTextContent('File')
			expect(triggers[1]).toHaveTextContent('Edit')
		})

		it('renders MenubarShortcut with no children', () => {
			render(<MenubarShortcut data-testid="empty-sc" />)
			expect(screen.getByTestId('empty-sc')).toBeInTheDocument()
		})
	})
})
