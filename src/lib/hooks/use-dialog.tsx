'use client'

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components'
import { AlertCircle, CheckCircle, HelpCircle, Info, XCircle } from 'lucide-react'
import * as React from 'react'
import { cn } from '../utils'

type DialogType = 'info' | 'success' | 'error' | 'warning' | 'custom' | 'confirm'
type DialogSize = 'sm' | 'md' | 'lg' | 'xl'

interface DialogOptions {
	title?: string
	message: string | React.ReactNode
	icon?: React.ElementType
	className?: string
	type?: DialogType
	size?: DialogSize
	confirmButton?: {
		label: string
		className?: string
		disabled?: boolean
		loading?: boolean
		onClick?: () => void | Promise<void>
	}
	cancelButton?: {
		label: string
		className?: string
		disabled?: boolean
		loading?: boolean
		onClick?: () => void
	}
}

interface DialogContextType {
	open: (options: DialogOptions) => void
	close: () => void
	info: (options: Omit<DialogOptions, 'type'>) => void
	success: (options: Omit<DialogOptions, 'type'>) => void
	error: (options: Omit<DialogOptions, 'type'>) => void
	warning: (options: Omit<DialogOptions, 'type'>) => void
	custom: (options: DialogOptions) => void
	confirm: (options: Omit<DialogOptions, 'type'>) => void
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined)

const sizeClasses: Record<DialogSize, string> = {
	sm: 'sm:max-w-[425px]',
	md: 'sm:max-w-[550px]',
	lg: 'sm:max-w-[700px]',
	xl: 'sm:max-w-[900px]',
}

const iconClasses: Record<DialogType, { icon: React.ElementType; className: string }> = {
	info: { icon: Info, className: 'text-blue-500' },
	success: { icon: CheckCircle, className: 'text-green-500' },
	error: { icon: XCircle, className: 'text-red-500' },
	warning: { icon: AlertCircle, className: 'text-yellow-500' },
	confirm: { icon: HelpCircle, className: 'text-blue-500' },
	custom: { icon: HelpCircle, className: 'text-gray-500' },
}

export function DialogProvider({ children }: { children: React.ReactNode }) {
	const [dialogState, setDialogState] = React.useState<{
		isOpen: boolean
		options: DialogOptions | null
	}>({
		isOpen: false,
		options: null,
	})

	const open = React.useCallback((options: DialogOptions) => {
		setDialogState({ isOpen: true, options })
	}, [])

	const close = React.useCallback(() => {
		setDialogState((prev) => ({ ...prev, isOpen: false }))
	}, [])

	const info = React.useCallback(
		(options: Omit<DialogOptions, 'type'>) => {
			open({ ...options, type: 'info' })
		},
		[open],
	)

	const success = React.useCallback(
		(options: Omit<DialogOptions, 'type'>) => {
			open({ ...options, type: 'success' })
		},
		[open],
	)

	const error = React.useCallback(
		(options: Omit<DialogOptions, 'type'>) => {
			open({ ...options, type: 'error' })
		},
		[open],
	)

	const warning = React.useCallback(
		(options: Omit<DialogOptions, 'type'>) => {
			open({ ...options, type: 'warning' })
		},
		[open],
	)

	const custom = React.useCallback(
		(options: DialogOptions) => {
			open({ ...options, type: 'custom' })
		},
		[open],
	)

	const confirm = React.useCallback(
		(options: Omit<DialogOptions, 'type'>) => {
			open({ ...options, type: 'confirm' })
		},
		[open],
	)

	const getIcon = (type?: DialogType, customIcon?: React.ElementType) => {
		let Icon = iconClasses[type as DialogType].icon

		if (customIcon) {
			Icon = customIcon
		}

		return <Icon className={cn('h-24 w-24', iconClasses[type as DialogType].className)} />
	}

	const contextValue = React.useMemo(
		() => ({
			open,
			close,
			info,
			success,
			error,
			warning,
			custom,
			confirm,
		}),
		[open, close, info, success, error, warning, custom, confirm],
	)

	const [isProcessing, setIsProcessing] = React.useState(false)

	return (
		<DialogContext.Provider value={contextValue}>
			{children}
			<Dialog open={dialogState.isOpen} onOpenChange={(open) => !open && close()} modal>
				<DialogContent
					className={cn(
						dialogState.options?.size
							? sizeClasses[dialogState.options.size]
							: sizeClasses.sm,
						dialogState.options?.className,
					)}
				>
					{dialogState.options && (
						<DialogHeader>
							<div className="mx-auto mb-6">
								{getIcon(dialogState.options.type, dialogState.options.icon)}
							</div>
							{dialogState.options.title && (
								<DialogTitle className="text-center">
									{dialogState.options.title}
								</DialogTitle>
							)}
							<DialogDescription className="text-center">
								{dialogState.options.message}
							</DialogDescription>
						</DialogHeader>
					)}
					{dialogState.options?.type === 'confirm' && (
						<div className="flex justify-center gap-4 mt-4">
							<Button
								isLoading={isProcessing ?? dialogState.options?.confirmButton?.loading}
								disabled={dialogState.options?.confirmButton?.disabled}
								className={dialogState.options.confirmButton?.className}
								onClick={() => {
									if (!dialogState.options?.confirmButton?.onClick) {
										throw new Error(
											'Confirmation type dialog needs to implement the onConfirm function',
										)
									}

									const returned = dialogState.options?.confirmButton?.onClick()

									if (returned instanceof Promise) {
										setIsProcessing(true)
										returned
											.then(() => {
												setIsProcessing(false)
												close()
											})
											.finally(() => setIsProcessing(false))
									} else {
										close()
									}
								}}
							>
								{dialogState.options.confirmButton?.label ?? 'Confirm'}
							</Button>
							{dialogState.options.cancelButton?.label && (
								<Button
									variant="outline"
									onClick={close}
									className={dialogState.options.cancelButton.className}
									isLoading={dialogState.options.cancelButton?.loading}
									disabled={isProcessing || dialogState.options.cancelButton?.disabled}
								>
									{dialogState.options.cancelButton?.label}
								</Button>
							)}
						</div>
					)}
				</DialogContent>
			</Dialog>
		</DialogContext.Provider>
	)
}

export function useDialog() {
	const context = React.useContext(DialogContext)
	if (context === undefined) {
		throw new Error('useDialog must be used within a DialogProvider')
	}
	return context
}
