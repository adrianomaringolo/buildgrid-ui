import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'

export type TSpinnerColors = NonNullable<VariantProps<typeof spinnerVariants>['color']>
export const spinnerColors: TSpinnerColors[] = [
	'primary',
	'secondary',
	'success',
	'error',
	'warning',
	'info',
	'white',
	'neutral',
]

export type TSpinnerSizes = NonNullable<VariantProps<typeof spinnerVariants>['size']>
export const spinnerSizes: TSpinnerSizes[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']

const spinnerVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			color: {
				primary: 'text-primary',
				secondary: 'text-secondary',
				success: 'text-green-700',
				error: 'text-red-700',
				warning: 'text-yellow-700',
				info: 'text-blue-700',
				white: 'text-white',
				neutral: 'text-gray-700',
			},
			size: {
				xs: 'h-4 w-4',
				sm: 'h-6 w-6',
				md: 'h-8 w-8',
				lg: 'h-10 w-10',
				xl: 'h-14 w-14',
				'2xl': 'h-20 w-20',
			},
		},
		defaultVariants: {
			color: 'primary',
			size: 'md',
		},
	},
)

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
	label?: string
	className?: string
}

export const Spinner = (props: SpinnerProps) => {
	const { label, size, color, className } = props

	return (
		<div className={cn('flex flex-col justify-center items-center', className)}>
			<LoaderCircle className={cn(spinnerVariants({ color, size }), 'animate-spin')} />
			{label && <p className={cn('italic', spinnerVariants({ color }))}>{label}</p>}
		</div>
	)
}
