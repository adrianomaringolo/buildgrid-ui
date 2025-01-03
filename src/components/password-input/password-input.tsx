import { Eye, EyeOff } from 'lucide-react'
import React, { InputHTMLAttributes, useState } from 'react'
import { Button } from '../button'
import { Input } from '../input'
import { Progress } from '../progress'

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	showStrengthMeter?: boolean
	strengthLabels?: {
		veryWeak: string
		weak: string
		medium: string
		strong: string
		veryStrong: string
	}
	showPasswordLabel?: string
	hidePasswordLabel?: string
	strengthTitle?: string
}

export function PasswordInput(props: PasswordInputProps) {
	const {
		showStrengthMeter = true,
		className,
		strengthLabels = {
			veryWeak: 'Very weak',
			weak: 'Weak',
			medium: 'Medium',
			strong: 'Strong',
			veryStrong: 'Very strong',
		},
		showPasswordLabel = 'Show password',
		hidePasswordLabel = 'Hide password',
		strengthTitle = 'Password strength',
		...rest
	} = props

	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const calculateStrength = (password: string): number => {
		let strength = 0
		if (password.length >= 8) strength += 25
		if (password.match(/[a-z]/)) strength += 25
		if (password.match(/[A-Z]/)) strength += 25
		if (password.match(/[0-9]/)) strength += 25
		return strength
	}

	const getStrengthLabel = (strength: number): string => {
		if (strength === 0) return strengthLabels.veryWeak
		if (strength <= 25) return strengthLabels.weak
		if (strength <= 50) return strengthLabels.medium
		if (strength <= 75) return strengthLabels.strong
		return strengthLabels.veryStrong
	}

	const strength = calculateStrength(password)
	const strengthLabel = getStrengthLabel(strength)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
		props.onChange?.(e)
	}

	return (
		<div className="w-fit space-y-4">
			<div className="relative">
				<Input
					{...rest}
					type={showPassword ? 'text' : 'password'}
					value={password}
					onChange={handleChange}
					className={`pr-10 ${className || ''}`}
				/>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="absolute right-0 top-0 h-full"
					onClick={() => setShowPassword(!showPassword)}
					aria-label={showPassword ? hidePasswordLabel : showPasswordLabel}
				>
					{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
				</Button>
			</div>
			{showStrengthMeter && (
				<div className="space-y-2">
					<div className="flex justify-between text-sm">
						<span>{strengthTitle}:</span>
						<span>{strengthLabel}</span>
					</div>
					<Progress value={strength} className="h-2" />
				</div>
			)}
		</div>
	)
}
