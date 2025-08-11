'use client'

import { cn } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import { Button } from '../../components/button'
import { Input } from '../../components/input'

interface NumberStepperProps {
	value?: number
	defaultValue?: number
	onChange?: (value: number) => void
	min?: number
	max?: number
	step?: number
	size?: 'sm' | 'md' | 'lg' | 'xl'
	disabled?: boolean
	className?: string
	leftSymbol?: string
	rightSymbol?: string
}

const sizeVariants = {
	sm: {
		button: 'h-8 w-8 p-0',
		input: 'h-8 text-sm px-2',
		container: 'gap-1',
		text: 'text-sm',
		symbol: 'text-sm',
	},
	md: {
		button: 'h-10 w-10 p-0',
		input: 'h-10 px-3',
		container: 'gap-2',
		text: 'text-base',
		symbol: 'text-base',
	},
	lg: {
		button: 'h-12 w-12 p-0',
		input: 'h-12 text-lg px-4',
		container: 'gap-2',
		text: 'text-lg',
		symbol: 'text-lg',
	},
	xl: {
		button: 'h-14 w-14 p-0',
		input: 'h-14 text-xl px-5',
		container: 'gap-3',
		text: 'text-xl',
		symbol: 'text-xl',
	},
}

const iconSizes = {
	sm: 'h-3 w-3',
	md: 'h-4 w-4',
	lg: 'h-5 w-5',
	xl: 'h-6 w-6',
}

const symbolPadding = {
	sm: { left: 'pl-6', right: 'pr-6' },
	md: { left: 'pl-8', right: 'pr-8' },
	lg: { left: 'pl-10', right: 'pr-10' },
	xl: { left: 'pl-12', right: 'pr-12' },
}

export function NumberStepper({
	value,
	defaultValue = 0,
	onChange,
	min = Number.NEGATIVE_INFINITY,
	max = Number.POSITIVE_INFINITY,
	step = 1,
	size = 'md',
	disabled = false,
	className,
	leftSymbol,
	rightSymbol,
}: NumberStepperProps) {
	const [internalValue, setInternalValue] = useState(defaultValue)

	const currentValue = value !== undefined ? value : internalValue
	const variant = sizeVariants[size]

	const handleValueChange = (newValue: number) => {
		const clampedValue = Math.min(Math.max(newValue, min), max)

		if (value === undefined) {
			setInternalValue(clampedValue)
		}

		onChange?.(clampedValue)
	}

	const increment = () => {
		const newValue = currentValue + step
		if (newValue <= max) {
			handleValueChange(newValue)
		}
	}

	const decrement = () => {
		const newValue = currentValue - step
		if (newValue >= min) {
			handleValueChange(newValue)
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value
		if (inputValue === '' || inputValue === '-') {
			return
		}

		const numValue = Number.parseFloat(inputValue)
		if (!isNaN(numValue)) {
			handleValueChange(numValue)
		}
	}

	const canDecrement = currentValue > min && !disabled
	const canIncrement = currentValue < max && !disabled

	// Calculate input padding based on symbols
	const getInputPadding = () => {
		const basePadding = variant.input.includes('px-2')
			? 'px-2'
			: variant.input.includes('px-3')
				? 'px-3'
				: variant.input.includes('px-4')
					? 'px-4'
					: 'px-5'

		let leftPadding = basePadding
		let rightPadding = basePadding

		if (leftSymbol) {
			leftPadding = symbolPadding[size].left
		}
		if (rightSymbol) {
			rightPadding = symbolPadding[size].right
		}

		return cn(leftPadding, rightPadding)
	}

	return (
		<div className={cn('flex items-center', variant.container, className)}>
			<Button
				variant="outline"
				size="icon"
				className={variant.button}
				onClick={decrement}
				disabled={!canDecrement}
				aria-label="Decrease value"
			>
				<Minus className={iconSizes[size]} />
			</Button>

			<div className="relative flex items-center">
				{leftSymbol && (
					<span
						className={cn(
							'absolute left-3 text-muted-foreground pointer-events-none z-10',
							variant.symbol,
						)}
					>
						{leftSymbol}
					</span>
				)}

				<Input
					type="number"
					value={currentValue}
					onChange={handleInputChange}
					min={min}
					max={max}
					step={step}
					disabled={disabled}
					className={cn(
						'text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
						variant.input.replace(/px-\d+/, ''), // Remove default padding
						variant.text,
						getInputPadding(),
					)}
				/>

				{rightSymbol && (
					<span
						className={cn(
							'absolute right-3 text-muted-foreground pointer-events-none z-10',
							variant.symbol,
						)}
					>
						{rightSymbol}
					</span>
				)}
			</div>

			<Button
				variant="outline"
				size="icon"
				className={variant.button}
				onClick={increment}
				disabled={!canIncrement}
				aria-label="Increase value"
			>
				<Plus className={iconSizes[size]} />
			</Button>
		</div>
	)
}
