'use client'

import { cn } from '@/lib/utils'
import {
	AlertCircle,
	AlertTriangle,
	CheckCircle,
	ChevronLeft,
	ChevronRight,
	Info,
	Lightbulb,
	X,
} from 'lucide-react'
import type React from 'react'
import { useEffect, useState } from 'react'
import { Button } from '../button'

export interface AlertProps {
	variant?: 'info' | 'warning' | 'error' | 'success' | 'tip'
	title?: string
	children?: React.ReactNode
	messages?: string[]
	showCloseButton?: boolean
	onClose?: () => void
	actionButton?: {
		label: string
		onClick: () => void
		variant?: 'default' | 'outline' | 'secondary'
	}
	className?: string
}

const alertVariants = {
	info: {
		container:
			'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200',
		icon: Info,
		iconColor: 'text-blue-600 dark:text-blue-400',
		navColor: 'text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900',
		closeColor:
			'text-blue-500 hover:bg-blue-100 focus:ring-blue-600 dark:text-blue-400 dark:hover:bg-blue-900 dark:focus:ring-blue-400',
	},
	warning: {
		container:
			'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200',
		icon: AlertTriangle,
		iconColor: 'text-yellow-600 dark:text-yellow-400',
		navColor: 'text-yellow-600 hover:bg-yellow-100 dark:text-yellow-400 dark:hover:bg-yellow-900',
		closeColor:
			'text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 dark:text-yellow-400 dark:hover:bg-yellow-900 dark:focus:ring-yellow-400',
	},
	error: {
		container:
			'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200',
		icon: AlertCircle,
		iconColor: 'text-red-600 dark:text-red-400',
		navColor: 'text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900',
		closeColor:
			'text-red-500 hover:bg-red-100 focus:ring-red-600 dark:text-red-400 dark:hover:bg-red-900 dark:focus:ring-red-400',
	},
	success: {
		container:
			'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200',
		icon: CheckCircle,
		iconColor: 'text-green-600 dark:text-green-400',
		navColor: 'text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900',
		closeColor:
			'text-green-500 hover:bg-green-100 focus:ring-green-600 dark:text-green-400 dark:hover:bg-green-900 dark:focus:ring-green-400',
	},
	tip: {
		container:
			'bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-950 dark:border-purple-800 dark:text-purple-200',
		icon: Lightbulb,
		iconColor: 'text-purple-600 dark:text-purple-400',
		navColor: 'text-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-900',
		closeColor:
			'text-purple-500 hover:bg-purple-100 focus:ring-purple-600 dark:text-purple-400 dark:hover:bg-purple-900 dark:focus:ring-purple-400',
	},
}

export function Alert({
	variant = 'info',
	title,
	children,
	messages,
	showCloseButton = false,
	onClose,
	actionButton,
	className,
}: AlertProps) {
	const [isVisible, setIsVisible] = useState(false)
	const [isClosing, setIsClosing] = useState(false)
	const [messageIndex, setMessageIndex] = useState(0)
	const variantStyles = alertVariants[variant]
	const IconComponent = variantStyles.icon

	const hasMultipleMessages = messages && messages.length > 1

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 10)
		return () => clearTimeout(timer)
	}, [])

	const handleClose = () => {
		if (onClose) {
			setIsClosing(true)
			setTimeout(() => {
				onClose()
			}, 300)
		}
	}

	const handlePrev = () => {
		setMessageIndex((i) => (i > 0 ? i - 1 : (messages?.length ?? 1) - 1))
	}

	const handleNext = () => {
		setMessageIndex((i) => (i < (messages?.length ?? 1) - 1 ? i + 1 : 0))
	}

	const content = messages && messages.length > 0 ? messages[messageIndex] : children

	return (
		<div
			className={cn(
				'relative rounded-lg border p-4 transition-all duration-300 ease-in-out transform',
				variantStyles.container,
				isVisible && !isClosing
					? 'opacity-100 translate-y-0 scale-100'
					: 'opacity-0 -translate-y-2 scale-95',
				className,
			)}
			role="alert"
		>
			<div className="flex items-start gap-3">
				<IconComponent
					className={cn('h-5 w-5 flex-shrink-0 mt-0.5', variantStyles.iconColor)}
					aria-hidden="true"
				/>

				<div className="flex-1 min-w-0">
					{title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
					<div className="text-sm">{content}</div>

					{hasMultipleMessages && (
						<div className="flex items-center gap-1 mt-2">
							<button
								type="button"
								onClick={handlePrev}
								className={cn(
									'rounded p-0.5 transition-colors',
									variantStyles.navColor,
								)}
								aria-label="Previous message"
							>
								<ChevronLeft className="h-3.5 w-3.5" />
							</button>
							<span className="text-xs opacity-70">
								{messageIndex + 1}/{messages.length}
							</span>
							<button
								type="button"
								onClick={handleNext}
								className={cn(
									'rounded p-0.5 transition-colors',
									variantStyles.navColor,
								)}
								aria-label="Next message"
							>
								<ChevronRight className="h-3.5 w-3.5" />
							</button>
						</div>
					)}

					{actionButton && (
						<div className="mt-3">
							<Button
								size="sm"
								variant={actionButton.variant || 'default'}
								onClick={actionButton.onClick}
								className="h-8"
							>
								{actionButton.label}
							</Button>
						</div>
					)}
				</div>

				{showCloseButton && onClose && (
					<button
						type="button"
						className={cn(
							'flex-shrink-0 rounded-md p-1.5 inline-flex focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200',
							variantStyles.closeColor,
						)}
						onClick={handleClose}
						aria-label="Close alert"
					>
						<X className="h-4 w-4" />
					</button>
				)}
			</div>
		</div>
	)
}
