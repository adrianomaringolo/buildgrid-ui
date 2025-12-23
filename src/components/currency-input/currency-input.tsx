import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { AdaptiveInput, AdaptiveInputProps } from '../adaptive-input'

export interface CurrencyInputProps extends AdaptiveInputProps {
	currencySymbol?: string
	decimalSeparator?: string
	thousandSeparator?: string
	onValueChange: (value: number) => void
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
	(props, ref) => {
		const {
			currencySymbol = '$',
			decimalSeparator = '.',
			thousandSeparator = ',',
			onValueChange,
			className,
			value = 0,
			...rest
		} = props

		const inputRef = useRef<HTMLInputElement>(null)

		useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

		const [inputValue, setInputValue] = useState<string>('') // String to show in input

		// Function to format the numeric value into a currency format
		const formatNumber = (numericValue: number): string => {
			const parts = numericValue.toFixed(2).split('.') // Ensure two decimal places
			const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator) // Add thousand separators
			return `${currencySymbol} ${integerPart}${decimalSeparator}${parts[1]}`
		}

		// Handle input change
		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const rawValue = e.target.value
			const digitsOnly = rawValue.replace(/\D/g, '')

			// Handle empty input
			if (digitsOnly === '') {
				setInputValue(formatNumber(0))
				onValueChange(0)
				return
			}

			const numericValue = parseFloat(digitsOnly) / 100

			// Update the input with formatted value
			setInputValue(formatNumber(numericValue))

			// Send the numeric value (without formatting) to the parent component
			onValueChange(numericValue)

			// Move the cursor to the end of the input value
			if (inputRef.current) {
				window.requestAnimationFrame(() => {
					inputRef.current?.setSelectionRange(
						inputRef.current.value.length,
						inputRef.current.value.length,
					)
				})
			}
		}

		// Prevent cursor from being set elsewhere except at the end
		const handleFocus = () => {
			if (inputRef.current) {
				inputRef.current.setSelectionRange(
					inputRef.current.value.length,
					inputRef.current.value.length,
				)
			}
		}

		// Set the initial formatted value when the component mounts or the value prop changes
		useEffect(() => {
			setInputValue(formatNumber(+value))
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [value])

		return (
			<AdaptiveInput
				type="text"
				inputMode="numeric"
				value={inputValue}
				ref={inputRef}
				onChange={handleInputChange}
				onFocus={handleFocus}
				onClick={handleFocus} // Ensures that even if the user clicks, the cursor is forced to the end
				placeholder={`${currencySymbol} 0${decimalSeparator}00`}
				className={className}
				{...rest}
			/>
		)
	},
)

CurrencyInput.displayName = 'CurrencyInput'

export { CurrencyInput }
