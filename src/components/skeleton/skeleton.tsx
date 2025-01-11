import { cn } from '@/lib/utils/cn'

type SkeletonProps = {
	repeat?: number
} & React.ComponentProps<'div'>

export const Skeleton = ({ className, repeat = 1, ...props }: SkeletonProps) => {
	return (
		<>
			{Array.from({ length: repeat ?? 1 }).map((_, index) => (
				<div
					key={index}
					className={cn('animate-pulse rounded-md bg-gray-700/10', className)}
					{...props}
				/>
			))}
		</>
	)
}
