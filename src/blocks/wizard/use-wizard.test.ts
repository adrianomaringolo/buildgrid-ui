import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useWizard } from './use-wizard'

describe('useWizard', () => {
	describe('Initial state', () => {
		it('starts at step 1 by default', () => {
			const { result } = renderHook(() => useWizard({ totalSteps: 4 }))
			expect(result.current.currentStep).toBe(1)
		})

		it('starts at the specified initial step', () => {
			const { result } = renderHook(() => useWizard({ totalSteps: 4, initial: 3 }))
			expect(result.current.currentStep).toBe(3)
		})

		it('canGoPrevious is false on the first step', () => {
			const { result } = renderHook(() => useWizard({ totalSteps: 4 }))
			expect(result.current.canGoPrevious).toBe(false)
		})

		it('canGoNext is false on the last step', () => {
			const { result } = renderHook(() => useWizard({ totalSteps: 4, initial: 4 }))
			expect(result.current.canGoNext).toBe(false)
		})
	})

	describe('Navigation', () => {
		it('goNext advances to the next step', () => {
			const { result } = renderHook(() => useWizard({ totalSteps: 4 }))
			act(() => result.current.goNext())
			expect(result.current.currentStep).toBe(2)
		})

		it('goPrevious goes back one step', () => {
			const { result } = renderHook(() => useWizard({ totalSteps: 4, initial: 3 }))
			act(() => result.current.goPrevious())
			expect(result.current.currentStep).toBe(2)
		})

		it('goNext does nothing on the last step', () => {
			const { result } = renderHook(() => useWizard({ totalSteps: 3, initial: 3 }))
			act(() => result.current.goNext())
			expect(result.current.currentStep).toBe(3)
		})

		it('goPrevious does nothing on the first step', () => {
			const { result } = renderHook(() => useWizard({ totalSteps: 3 }))
			act(() => result.current.goPrevious())
			expect(result.current.currentStep).toBe(1)
		})

		it('goToStep navigates to the specified step', () => {
			const { result } = renderHook(() => useWizard({ totalSteps: 4 }))
			act(() => result.current.goToStep(3))
			expect(result.current.currentStep).toBe(3)
		})

		it('goToStep ignores out-of-range steps', () => {
			const { result } = renderHook(() => useWizard({ totalSteps: 4 }))
			act(() => result.current.goToStep(99))
			expect(result.current.currentStep).toBe(1)
		})
	})

	describe('Disabled steps', () => {
		it('goNext skips a disabled step', () => {
			const { result } = renderHook(() => useWizard({ totalSteps: 4, disabled: [2] }))
			act(() => result.current.goNext())
			expect(result.current.currentStep).toBe(3)
		})

		it('goPrevious skips a disabled step', () => {
			const { result } = renderHook(() => useWizard({ totalSteps: 4, initial: 4, disabled: [3] }))
			act(() => result.current.goPrevious())
			expect(result.current.currentStep).toBe(2)
		})

		it('goNext skips multiple consecutive disabled steps', () => {
			const { result } = renderHook(() => useWizard({ totalSteps: 5, disabled: [2, 3] }))
			act(() => result.current.goNext())
			expect(result.current.currentStep).toBe(4)
		})

		it('canGoNext is false when all remaining steps are disabled', () => {
			const { result } = renderHook(() =>
				useWizard({ totalSteps: 3, initial: 1, disabled: [2, 3] }),
			)
			expect(result.current.canGoNext).toBe(false)
		})

		it('canGoPrevious is false when all previous steps are disabled', () => {
			const { result } = renderHook(() =>
				useWizard({ totalSteps: 3, initial: 3, disabled: [1, 2] }),
			)
			expect(result.current.canGoPrevious).toBe(false)
		})

		it('goToStep does not navigate to a disabled step', () => {
			const { result } = renderHook(() => useWizard({ totalSteps: 4, disabled: [2] }))
			act(() => result.current.goToStep(2))
			expect(result.current.currentStep).toBe(1)
		})

		it('goToStep navigates normally to a non-disabled step', () => {
			const { result } = renderHook(() => useWizard({ totalSteps: 4, disabled: [2] }))
			act(() => result.current.goToStep(3))
			expect(result.current.currentStep).toBe(3)
		})

		it('goNext does nothing when all remaining steps are disabled', () => {
			const { result } = renderHook(() =>
				useWizard({ totalSteps: 3, initial: 1, disabled: [2, 3] }),
			)
			act(() => result.current.goNext())
			expect(result.current.currentStep).toBe(1)
		})
	})
})
