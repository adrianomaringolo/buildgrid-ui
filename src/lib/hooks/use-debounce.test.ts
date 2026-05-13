import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDebounce } from './use-debounce'

describe('useDebounce', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('returns the initial value immediately', () => {
		const { result } = renderHook(() => useDebounce('hello', 300))
		expect(result.current).toBe('hello')
	})

	it('does not update before the delay elapses', () => {
		const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
			initialProps: { value: 'initial' },
		})

		rerender({ value: 'updated' })
		act(() => {
			vi.advanceTimersByTime(200)
		})
		expect(result.current).toBe('initial')
	})

	it('updates after the delay elapses', () => {
		const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
			initialProps: { value: 'initial' },
		})

		rerender({ value: 'updated' })
		act(() => {
			vi.advanceTimersByTime(300)
		})
		expect(result.current).toBe('updated')
	})

	it('resets the timer when value changes before delay', () => {
		const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
			initialProps: { value: 'initial' },
		})

		rerender({ value: 'first' })
		act(() => {
			vi.advanceTimersByTime(200)
		})
		rerender({ value: 'second' })
		act(() => {
			vi.advanceTimersByTime(200)
		})
		// Only 200ms have passed since the last change
		expect(result.current).toBe('initial')

		act(() => {
			vi.advanceTimersByTime(100)
		})
		expect(result.current).toBe('second')
	})

	it('uses default delay of 250ms', () => {
		const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
			initialProps: { value: 'a' },
		})

		rerender({ value: 'b' })
		act(() => {
			vi.advanceTimersByTime(249)
		})
		expect(result.current).toBe('a')

		act(() => {
			vi.advanceTimersByTime(1)
		})
		expect(result.current).toBe('b')
	})

	it('works with non-string types', () => {
		const { result, rerender } = renderHook(({ value }) => useDebounce(value, 100), {
			initialProps: { value: 0 },
		})

		rerender({ value: 42 })
		act(() => {
			vi.advanceTimersByTime(100)
		})
		expect(result.current).toBe(42)
	})
})
