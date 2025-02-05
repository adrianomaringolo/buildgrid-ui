import { X } from 'lucide-react'
import React from 'react'
import { ExternalToast, toast as SoonerToast } from 'sonner'
import { Button } from '../button'

const ToastCloseButton = ({ onClick }: { onClick: () => void }) => (
	<Button onClick={() => onClick()} variant="ghost" size="xl" className="ml-auto px-3">
		<X className="!h-6 !w-6" />
	</Button>
)

export const toast = {
	...SoonerToast,
	success: (message: string | React.ReactNode, data?: ExternalToast) => {
		const toastId = SoonerToast.success(message, {
			...data,
			cancel: <ToastCloseButton onClick={() => SoonerToast.dismiss(toastId)} />,
		})
		return toastId
	},
	error: (message: string | React.ReactNode, data?: ExternalToast) => {
		const toastId = SoonerToast.error(message, {
			...data,
			cancel: <ToastCloseButton onClick={() => SoonerToast.dismiss(toastId)} />,
		})
		return toastId
	},
	warning: (message: string | React.ReactNode, data?: ExternalToast) => {
		const toastId = SoonerToast.warning(message, {
			...data,
			cancel: <ToastCloseButton onClick={() => SoonerToast.dismiss(toastId)} />,
		})
		return toastId
	},
	info: (message: string | React.ReactNode, data?: ExternalToast) => {
		const toastId = SoonerToast.info(message, {
			...data,
			cancel: <ToastCloseButton onClick={() => SoonerToast.dismiss(toastId)} />,
		})
		return toastId
	},
}
