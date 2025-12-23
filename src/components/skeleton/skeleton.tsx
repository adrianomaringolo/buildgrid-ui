import { cn } from '@/lib/utils/cn'

type SkeletonProps = {
	repeat?: number
} & React.ComponentProps<'div'>

export const Skeleton = ({ className, repeat = 1, ...props }: SkeletonProps) => {
	// Handle invalid repeat values
	const validRepeat =
		repeat == null || Number.isNaN(repeat) || repeat < 0 ? 1 : Math.floor(repeat)

	// Handle zero repeat
	if (validRepeat === 0) {
		return null
	}

	return (
		<>
			{Array.from({ length: validRepeat }).map((_, index) => (
				<div
					key={index}
					className={cn(
						'animate-shimmer bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300',
						'bg-[length:200%_100%] rounded-md h-5',
						className,
					)}
					{...props}
				/>
			))}
		</>
	)
}
