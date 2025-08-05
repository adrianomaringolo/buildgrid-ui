import { cn } from '@/lib/utils'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'

interface SidebarProps {
	fixed: boolean
	isOpen?: boolean
	onToggle?: (open: boolean) => void
	children: React.ReactNode
	className?: string
	direction?: 'top' | 'bottom' | 'left' | 'right' | 'full'
	blockClickOutSide?: boolean
}

export const Sidebar: React.FC<SidebarProps> = ({
	fixed,
	isOpen: externalOpen,
	onToggle,
	children,
	className,
	direction = 'left',
	blockClickOutSide = false,
}) => {
	const [internalOpen, setInternalOpen] = useState(true)
	const sidebarRef = useRef<HTMLDivElement>(null)
	const toggleButtonRef = useRef<HTMLButtonElement>(null)

	const isOpen = externalOpen !== undefined ? externalOpen : internalOpen

	const toggleSidebar = () => {
		if (!fixed) {
			const newState = !isOpen
			onToggle ? onToggle(newState) : setInternalOpen(newState)
		}
	}

	const closeSidebar = () => {
		if (!fixed) {
			onToggle ? onToggle(false) : setInternalOpen(false)
			toggleButtonRef.current?.focus()
		}
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (
			sidebarRef.current &&
			!sidebarRef.current.contains(event.target as Node) &&
			!fixed &&
			!blockClickOutSide
		) {
			closeSidebar()
		}
	}

	useEffect(() => {
		if (!fixed) {
			document.addEventListener('mousedown', handleClickOutside)
			return () => {
				document.removeEventListener('mousedown', handleClickOutside)
			}
		}
	}, [fixed, blockClickOutSide])

	const baseClasses =
		'bg-white z-50 shadow-md flex flex-col fixed transition-all duration-300 ease-in-out overflow-auto'

	const directionClasses = {
		left: 'h-full top-0 left-0',
		right: 'h-full top-0 right-0',
		top: 'w-full top-0 left-0',
		bottom: 'w-full bottom-0 left-0',
		full: 'w-screen h-screen top-0 left-0',
	}

	const sizeClasses = {
		left: { open: 'w-72', closed: 'w-0' },
		right: { open: 'w-72', closed: 'w-0' },
		top: { open: 'h-72', closed: 'h-0' },
		bottom: { open: 'h-72', closed: 'h-0' },
		full: { open: 'w-screen h-screen', closed: 'w-0 h-0' },
	}

	const transformClasses = {
		left: {
			open: 'translate-x-0',
			closed: '-translate-x-full',
		},
		right: {
			open: 'translate-x-0',
			closed: 'translate-x-full',
		},
		top: {
			open: 'translate-y-0',
			closed: '-translate-y-full',
		},
		bottom: {
			open: 'translate-y-0',
			closed: 'translate-y-full',
		},
		full: {
			open: 'translate-x-0 translate-y-0',
			closed: '-translate-x-full -translate-y-full',
		},
	}

	return (
		<>
			<aside
				ref={sidebarRef}
				className={cn(
					baseClasses,
					directionClasses[direction],
					{
						[sizeClasses[direction].open]: fixed || isOpen,
						[sizeClasses[direction].closed]: !isOpen && !fixed,
						[transformClasses[direction].open]: isOpen,
						[transformClasses[direction].closed]: !isOpen && !fixed,
					},
					className,
				)}
				aria-hidden={!isOpen}
			>
				{children}
			</aside>
			{fixed && <div className="min-w-72 relative" />}
		</>
	)
}

export const SidebarHeader = ({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) => {
	return (
		<header
			className={cn('p-4 flex justify-between items-center border-b', className)}
			aria-label="Sidebar header"
		>
			{children}
		</header>
	)
}

export const SidebarBody = ({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) => {
	return (
		<div className={cn('p-4', className)} aria-label="Sidebar body">
			{children}
		</div>
	)
}

export const SidebarNav = ({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) => {
	return (
		<nav aria-label="Sidebar navigation" className={className}>
			{children}
		</nav>
	)
}

export const SidebarList = ({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) => {
	return <ul className={cn('flex flex-col gap-2 my-4 px-4', className)}>{children}</ul>
}

export const SidebarListItem = ({
	children,
	className,
	onClick,
}: PropsWithChildren<{ className?: string; onClick?: () => void }>) => {
	return (
		<li
			className={cn(
				'flex items-center gap-2 hover:bg-gray-100 rounded transition-colors',
				className,
			)}
			onClick={onClick}
		>
			{children}
		</li>
	)
}

export const SidebarFooter = ({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) => {
	return (
		<footer className={cn('mt-auto p-4 text-sm', className)} aria-label="Sidebar footer">
			{children}
		</footer>
	)
}
