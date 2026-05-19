'use client'

import { useState } from 'react'

export interface UseWizardOptions {
	totalSteps: number
	/** 1-based step numbers that are disabled and must be skipped during navigation */
	disabled?: number[]
	initial?: number
}

export interface UseWizardReturn {
	currentStep: number
	goToStep: (step: number) => void
	goNext: () => void
	goPrevious: () => void
	canGoNext: boolean
	canGoPrevious: boolean
}

export function useWizard({
	totalSteps,
	disabled = [],
	initial = 1,
}: UseWizardOptions): UseWizardReturn {
	const [currentStep, setCurrentStep] = useState(initial)

	const isDisabled = (step: number) => disabled.includes(step)

	const nextStep = (() => {
		for (let s = currentStep + 1; s <= totalSteps; s++) {
			if (!isDisabled(s)) return s
		}
		return null
	})()

	const previousStep = (() => {
		for (let s = currentStep - 1; s >= 1; s--) {
			if (!isDisabled(s)) return s
		}
		return null
	})()

	return {
		currentStep,
		goToStep: (step) => {
			if (!isDisabled(step) && step >= 1 && step <= totalSteps) {
				setCurrentStep(step)
			}
		},
		goNext: () => { if (nextStep !== null) setCurrentStep(nextStep) },
		goPrevious: () => { if (previousStep !== null) setCurrentStep(previousStep) },
		canGoNext: nextStep !== null,
		canGoPrevious: previousStep !== null,
	}
}
