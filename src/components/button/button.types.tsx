import { DeepPartial } from '@/lib/types/ts-utilities'
import { cva } from 'cva-extended'

export const buttonThemeDefaults = {
	base: [
		'inline-flex items-center justify-center gap-2 whitespace-nowrap hover:cursor-pointer',
		'rounded-md text-sm font-medium transition-colors focus-visible:outline-none',
		'focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none',
		'disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
		'rounded-md',
	],
	variants: {
		variant: {
			default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
			destructive:
				'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
			outline:
				'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
			secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
			ghost: 'hover:bg-accent hover:text-accent-foreground',
			link: 'text-primary underline-offset-4 hover:underline',
		},
		size: {
			sm: 'h-8 px-3 text-xs',
			md: 'h-9 px-4 py-2',
			lg: 'h-10 px-8',
			xl: 'h-12 px-10 text-xl',
			icon: 'h-9 w-9',
		},
		rounded: {
			true: 'rounded-full',
		},
	},
	defaultVariants: {
		variant: 'default' as const,
		size: 'md' as const,
		rounded: false,
	},
}

export const buttonVariants = cva(buttonThemeDefaults)

export interface ButtonThemeVariants {
	size?: (typeof buttonVariants)['variants']['size'][0]
	rounded?: boolean
	variant?: (typeof buttonVariants)['variants']['variant'][0]
}

export interface ButtonTheme {
	base: string | string[]
	variants: {
		size: { [key in (typeof buttonVariants)['variants']['size'][0]]: string }
		rounded: { true: string }
		variant: { [key in (typeof buttonVariants)['variants']['variant'][0]]: string }
	}
}

export type ButtonThemeProps = DeepPartial<ButtonTheme>
