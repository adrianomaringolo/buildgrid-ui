import { cn } from '@/lib/utils'
import * as React from 'react'
import { Input, InputProps } from '../input'

export interface AdaptiveInputProps extends InputProps {
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	mask?: string // New prop for the mask
}

const applyMask = (value: string, mask: string): string => {
	const cleanValue = value.replace(/\D/g, '')
	let maskedValue = ''
	let maskIndex = 0
	let valueIndex = 0

	while (maskIndex < mask.length && valueIndex < cleanValue.length) {
		if (mask[maskIndex] === '0') {
			maskedValue += cleanValue[valueIndex]
			valueIndex++
		} else {
			maskedValue += mask[maskIndex]
		}
		maskIndex++
	}

	return maskedValue
}

const AdaptiveInput = React.forwardRef<HTMLInputElement, AdaptiveInputProps>(
	({ className, leftIcon, rightIcon, mask, onChange, ...props }, ref) => {
		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const input = e.target
			if (mask) {
				const maskedValue = applyMask(input.value, mask)
				input.value = maskedValue
			}
			onChange?.(e) // Call the original onChange if provided
		}

		return (
			<div className="relative w-full">
				{leftIcon && (
					<div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
						{leftIcon}
					</div>
				)}
				<Input
					className={cn(leftIcon && 'pl-8', rightIcon && 'pr-8', className)}
					ref={ref}
					onInput={handleInputChange} // Attach the input handler
					{...props}
				/>
				{rightIcon && (
					<div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
						{rightIcon}
					</div>
				)}
			</div>
		)
	},
)

AdaptiveInput.displayName = 'AdaptiveInput'

export { AdaptiveInput }
