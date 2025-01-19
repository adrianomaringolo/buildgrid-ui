import { cn } from '@/lib/utils'
import { CircleOff } from 'lucide-react'
import { ReactElement, ReactNode } from 'react'

type EmptyItemsProps = {
	notFoundText: string
	notFoundAction?: ReactElement
	icon?: ReactNode
	className?: string
}

export const EmptyItems = (props: EmptyItemsProps) => {
	const { notFoundText, notFoundAction, icon, className } = props

	return (
		<div
			className={cn(
				'flex flex-col gap-4 items-center bg-gray-200 rounded-lg p-6 justify-center',
				className,
			)}
		>
			{icon ? icon : <CircleOff size={45} />}
			<div className="text-lg font-medium m-0">
				{notFoundText}
				{notFoundAction ? notFoundAction : null}
			</div>
		</div>
	)
}
