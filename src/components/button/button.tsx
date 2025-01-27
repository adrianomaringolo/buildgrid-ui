import { cn, mergeObjects } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'cva-extended'
import * as React from 'react'
import {
	ButtonTheme,
	buttonThemeDefaults,
	ButtonThemeVariants,
	buttonVariants,
} from './button.types'

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		ButtonThemeVariants,
		Partial<{ theme: ButtonTheme }> {
	isLoading?: boolean
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant = 'default',
			size = 'md',
			isLoading = false,
			asChild = false,
			theme = buttonThemeDefaults,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button'

		const t = mergeObjects<ButtonTheme, ButtonTheme>(
			theme as ButtonTheme,
			buttonThemeDefaults as ButtonTheme,
		)

		const buttonThemeCVA = cva(t)

		return (
			<Comp
				className={cn(buttonThemeCVA({ variant, size, className }))}
				ref={ref}
				{...props}
				disabled={isLoading || props.disabled}
			>
				{isLoading && (
					<svg
						className="animate-spin -ml-1 h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						data-testid="loader-svg"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				)}
				{props.children}
			</Comp>
		)
	},
)
Button.displayName = 'Button'

export { Button, buttonVariants }
