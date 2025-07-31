'use client'

import { cn } from '@/lib/utils'
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react'
import type React from 'react'
import { useEffect, useState } from 'react'
import { Button } from '../button'

export interface AlertProps {
	variant?: 'info' | 'warning' | 'error' | 'success'
	title?: string
	children: React.ReactNode
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
		container: 'bg-blue-50 border-blue-200 text-blue-800',
		icon: Info,
		iconColor: 'text-blue-600',
	},
	warning: {
		container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
		icon: AlertTriangle,
		iconColor: 'text-yellow-600',
	},
	error: {
		container: 'bg-red-50 border-red-200 text-red-800',
		icon: AlertCircle,
		iconColor: 'text-red-600',
	},
	success: {
		container: 'bg-green-50 border-green-200 text-green-800',
		icon: CheckCircle,
		iconColor: 'text-green-600',
	},
}

export function Alert({
	variant = 'info',
	title,
	children,
	showCloseButton = false,
	onClose,
	actionButton,
	className,
}: AlertProps) {
	const [isVisible, setIsVisible] = useState(false)
	const [isClosing, setIsClosing] = useState(false)
	const variantStyles = alertVariants[variant]
	const IconComponent = variantStyles.icon

	// Fade in on mount
	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 10)
		return () => clearTimeout(timer)
	}, [])

	const handleClose = () => {
		if (onClose) {
			setIsClosing(true)
			// Wait for animation to complete before calling onClose
			setTimeout(() => {
				onClose()
			}, 300) // Match the transition duration
		}
	}

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
					<div className="text-sm">{children}</div>

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
							variant === 'info' && 'text-blue-500 hover:bg-blue-100 focus:ring-blue-600',
							variant === 'warning' &&
								'text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600',
							variant === 'error' && 'text-red-500 hover:bg-red-100 focus:ring-red-600',
							variant === 'success' &&
								'text-green-500 hover:bg-green-100 focus:ring-green-600',
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
