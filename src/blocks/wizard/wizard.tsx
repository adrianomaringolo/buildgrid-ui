'use client'

import { Check } from 'lucide-react'
import { Fragment } from 'react'
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface WizardProgressStepProps {
	label: string
	icon: React.ComponentType<{ className?: string }>
	disabled?: boolean
	children?: React.ReactNode
}

export function WizardProgressStep(_props: WizardProgressStepProps): null {
	return null
}

export interface WizardProgressProps {
	children: React.ReactNode
	/** 1-based index of the current step */
	currentStep: number
	onGoToStep?: (step: number) => void
	/** Allow clicking any step, not just completed ones */
	freeNavigation?: boolean
	/** Hide step labels, showing only icons */
	showLabels?: boolean
	className?: string
}

export function WizardProgress({
	children,
	currentStep,
	onGoToStep,
	freeNavigation = false,
	showLabels = true,
	className,
}: WizardProgressProps) {
	const steps = React.Children.toArray(children).filter(
		(child): child is React.ReactElement<WizardProgressStepProps> =>
			React.isValidElement(child) && child.type === WizardProgressStep,
	)

	const activeContent = steps[currentStep - 1]?.props.children

	return (
		<div data-slot="wizard-progress" className={cn('w-full', className)}>
			<div className="flex items-center justify-between w-full px-1 py-2">
				{steps.map((stepEl, index) => {
					const stepNumber = index + 1
					const { label, icon: Icon, disabled: stepDisabled } = stepEl.props
					const isCompleted = currentStep > stepNumber
					const isActive = currentStep === stepNumber
					const canNavigate =
						!isActive &&
						!stepDisabled &&
						!!onGoToStep &&
						(freeNavigation || isCompleted)

					return (
						<Fragment key={stepNumber}>
							<div className="flex flex-col items-center gap-1.5 shrink-0">
								<button
									type="button"
									onClick={() => canNavigate && onGoToStep(stepNumber)}
									disabled={!canNavigate}
									aria-label={label}
									aria-disabled={stepDisabled}
									title={label}
									className={cn(
										'w-10 h-10 rounded-full flex items-center justify-center transition-all',
										isCompleted && 'bg-secondary text-secondary-foreground',
										isCompleted && !stepDisabled && 'hover:bg-secondary/80 cursor-pointer',
										isActive && 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2',
										!isCompleted && !isActive && 'bg-muted text-muted-foreground',
										!isCompleted && !isActive && canNavigate && 'hover:bg-muted/70 cursor-pointer',
										!isCompleted && !isActive && !canNavigate && 'cursor-default',
										stepDisabled && 'opacity-40',
									)}
								>
									{isCompleted && !freeNavigation ? (
										<Check className="w-5 h-5" />
									) : (
										<Icon className="w-5 h-5" />
									)}
								</button>
								{showLabels && (
									<span
										className={cn(
											'text-xs font-medium text-muted-foreground',
											!stepDisabled && isActive && 'text-primary',
											!stepDisabled && isCompleted && 'text-secondary-foreground',
											stepDisabled && 'opacity-40',
										)}
									>
										{label}
									</span>
								)}
							</div>

							{index < steps.length - 1 && (
								<div
									className={cn(
										'flex-1 h-0.5 mx-2 transition-colors',
										showLabels && 'mb-5',
										currentStep > stepNumber
											? 'bg-secondary'
											: 'bg-border',
									)}
								/>
							)}
						</Fragment>
					)
				})}
			</div>

			{activeContent != null && (
				<div data-slot="wizard-step-content">{activeContent}</div>
			)}
		</div>
	)
}
