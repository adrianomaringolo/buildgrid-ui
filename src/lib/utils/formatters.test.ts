import { describe, expect, it } from 'vitest'
import { formatCurrency, padString } from './formatters'

describe('formatCurrency', () => {
	it('formats BRL by default', () => {
		const result = formatCurrency(1234.56)
		expect(result).toContain('1.234,56')
	})

	it('formats USD with en-US locale', () => {
		const result = formatCurrency(1234.56, 'en-US', 'USD')
		expect(result).toContain('1,234.56')
	})

	it('formats zero', () => {
		const result = formatCurrency(0)
		expect(result).toContain('0,00')
	})

	it('formats negative values', () => {
		const result = formatCurrency(-50.5)
		expect(result).toContain('50,50')
	})

	it('always shows 2 decimal places', () => {
		const result = formatCurrency(10, 'en-US', 'USD')
		expect(result).toContain('.00')
	})

	it('includes currency symbol', () => {
		const result = formatCurrency(100, 'en-US', 'USD')
		expect(result).toContain('$')
	})
})

describe('padString', () => {
	it('pads a number shorter than size', () => {
		expect(padString(5)).toBe('05')
	})

	it('does not pad a string already at size', () => {
		expect(padString(12)).toBe('12')
	})

	it('does not pad a string longer than size', () => {
		expect(padString(123)).toBe('123')
	})

	it('pads to a custom size', () => {
		expect(padString(7, 4)).toBe('0007')
	})

	it('accepts a string input', () => {
		expect(padString('3', 3)).toBe('003')
	})

	it('handles zero', () => {
		expect(padString(0)).toBe('00')
	})
})
