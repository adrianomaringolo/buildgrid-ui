import { cn } from '@/lib/utils'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'

interface SidebarProps {
	fixed: boolean
	isOpen?: boolean
	onToggle?: (open: boolean) => void
	children: React.ReactNode
}

export const Sidebar: React.FC<SidebarProps> = ({
	fixed,
	isOpen: externalOpen,
	onToggle,
	children,
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
			!fixed
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
	}, [fixed])

	return (
		<aside
			ref={sidebarRef}
			className={cn(
				'bg-white h-full shadow-md flex flex-col fixed top-0 left-0 transition-all duration-300 ease-in-out overflow-auto',
				{ 'w-72': fixed || isOpen },
				{ 'w-0': !isOpen && !fixed },
				{ 'translate-x-0': isOpen },
				{ '-translate-x-full': !isOpen && !fixed },
			)}
			aria-hidden={!isOpen}
		>
			{children}
		</aside>
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
	return <ul className={cn('flex flex-col gap-2 mt-4 px-4', className)}>{children}</ul>
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
