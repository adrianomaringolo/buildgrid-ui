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
					className={cn(
						'animate-shimmer bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 bg-[length:200%_100%] rounded-md h-5',
						className,
					)}
					{...props}
				/>
			))}
		</>
	)
}
