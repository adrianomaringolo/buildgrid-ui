import { describe, expect, it } from 'vitest'
import { mergeObjects } from './merge-objects'

describe('mergeObjects', () => {
	it('returns obj2 properties when obj1 has none', () => {
		const result = mergeObjects({}, { a: 1, b: 2 })
		expect(result).toEqual({ a: 1, b: 2 })
	})

	it('obj1 properties override obj2', () => {
		const result = mergeObjects({ a: 10 }, { a: 1, b: 2 })
		expect(result).toEqual({ a: 10, b: 2 })
	})

	it('includes properties only in obj1', () => {
		const result = mergeObjects({ x: 99 }, { y: 1 })
		expect(result).toEqual({ x: 99, y: 1 })
	})

	it('recursively merges nested objects', () => {
		const result = mergeObjects({ nested: { a: 1 } }, { nested: { a: 99, b: 2 } })
		expect(result).toEqual({ nested: { a: 1, b: 2 } })
	})

	it('obj1 overrides entire nested object when obj2 has no corresponding nested', () => {
		const result = mergeObjects({ nested: { a: 1 } }, { nested: 'string' })
		expect(result).toEqual({ nested: { a: 1 } })
	})

	it('obj2 nested survives when obj1 has no corresponding key', () => {
		const result = mergeObjects({}, { nested: { a: 1 } })
		expect(result).toEqual({ nested: { a: 1 } })
	})

	it('does not recursively merge arrays — obj1 array wins', () => {
		const result = mergeObjects({ arr: [1, 2] }, { arr: [3, 4, 5] })
		expect(result).toEqual({ arr: [1, 2] })
	})

	it('obj2 array survives when obj1 has no corresponding key', () => {
		const result = mergeObjects({}, { arr: [3, 4, 5] })
		expect(result).toEqual({ arr: [3, 4, 5] })
	})

	it('handles null values in obj1 without recursing', () => {
		const result = mergeObjects({ a: null }, { a: { b: 1 } })
		expect(result).toEqual({ a: null })
	})

	it('handles null values in obj2 without recursing', () => {
		const result = mergeObjects({ a: { b: 1 } }, { a: null })
		expect(result).toEqual({ a: { b: 1 } })
	})

	it('works with deeply nested objects', () => {
		const obj1 = { a: { b: { c: 'from1' } } }
		const obj2 = { a: { b: { c: 'from2', d: 'extra' } } }
		const result = mergeObjects(obj1, obj2)
		expect(result).toEqual({ a: { b: { c: 'from1', d: 'extra' } } })
	})

	it('merging two empty objects returns empty', () => {
		expect(mergeObjects({}, {})).toEqual({})
	})

	it('does not mutate input objects', () => {
		const obj1 = { a: 1 }
		const obj2 = { b: 2 }
		mergeObjects(obj1, obj2)
		expect(obj1).toEqual({ a: 1 })
		expect(obj2).toEqual({ b: 2 })
	})
})
