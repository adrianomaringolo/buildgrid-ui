import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useKeyPress } from './use-key-press'

const fireKeyDown = (key: string) =>
	act(() => {
		window.dispatchEvent(new KeyboardEvent('keydown', { key }))
	})

const fireKeyUp = (key: string) =>
	act(() => {
		window.dispatchEvent(new KeyboardEvent('keyup', { key }))
	})

describe('useKeyPress', () => {
	it('returns false initially', () => {
		const { result } = renderHook(() => useKeyPress('Enter'))
		expect(result.current).toBe(false)
	})

	it('returns true when target key is pressed', () => {
		const { result } = renderHook(() => useKeyPress('Enter'))
		fireKeyDown('Enter')
		expect(result.current).toBe(true)
	})

	it('returns false after target key is released', () => {
		const { result } = renderHook(() => useKeyPress('Enter'))
		fireKeyDown('Enter')
		fireKeyUp('Enter')
		expect(result.current).toBe(false)
	})

	it('does not change state for a different key', () => {
		const { result } = renderHook(() => useKeyPress('Enter'))
		fireKeyDown('Escape')
		expect(result.current).toBe(false)
	})

	it('invokes callback when key is pressed', () => {
		const callback = vi.fn()
		renderHook(() => useKeyPress('Enter', callback))
		fireKeyDown('Enter')
		expect(callback).toHaveBeenCalledWith(true)
	})

	it('does not invoke callback for a different key', () => {
		const callback = vi.fn()
		renderHook(() => useKeyPress('Enter', callback))
		fireKeyDown('Escape')
		expect(callback).not.toHaveBeenCalled()
	})

	it('works without a callback', () => {
		const { result } = renderHook(() => useKeyPress('a'))
		expect(() => fireKeyDown('a')).not.toThrow()
		expect(result.current).toBe(true)
	})

	it('removes event listeners on unmount', () => {
		const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
		const { unmount } = renderHook(() => useKeyPress('Enter'))
		unmount()
		expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
		expect(removeEventListenerSpy).toHaveBeenCalledWith('keyup', expect.any(Function))
		removeEventListenerSpy.mockRestore()
	})
})
