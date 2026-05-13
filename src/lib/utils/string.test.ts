import { describe, expect, it } from 'vitest'
import {
	capitalize,
	containSearchStrings,
	normalizeString,
	normalizeStringToCompare,
	replaceTemplateWithVariables,
	sortByField,
	sortByFieldDesc,
	sortByName,
	sortByNestedField,
	sortNormalize,
} from './string'

describe('normalizeString', () => {
	it('lowercases text', () => {
		expect(normalizeString('HELLO')).toBe('hello')
	})

	it('removes accents', () => {
		expect(normalizeString('Ação')).toBe('acao')
		expect(normalizeString('Ñoño')).toBe('nono')
	})

	it('returns empty string for falsy input', () => {
		expect(normalizeString('')).toBe('')
		expect(normalizeString(null as any)).toBe('')
		expect(normalizeString(undefined as any)).toBe('')
	})
})

describe('normalizeStringToCompare', () => {
	it('removes spaces', () => {
		expect(normalizeStringToCompare('hello world')).toBe('helloworld')
	})

	it('removes accents and lowercases', () => {
		expect(normalizeStringToCompare('São Paulo')).toBe('saopaulo')
	})

	it('returns empty string for falsy input', () => {
		expect(normalizeStringToCompare('')).toBe('')
	})
})

describe('containSearchStrings', () => {
	it('returns true when stringA contains stringB', () => {
		expect(containSearchStrings('Hello World', 'world')).toBe(true)
	})

	it('is accent-insensitive', () => {
		expect(containSearchStrings('São Paulo', 'sao paulo')).toBe(true)
	})

	it('is space-insensitive for comparison', () => {
		expect(containSearchStrings('hello world', 'helloworld')).toBe(true)
	})

	it('returns false when stringB is not in stringA', () => {
		expect(containSearchStrings('hello', 'xyz')).toBe(false)
	})

	it('handles empty search string (always matches)', () => {
		expect(containSearchStrings('anything', '')).toBe(true)
	})
})

describe('sortNormalize', () => {
	it('returns -1 when a comes before b', () => {
		expect(sortNormalize('apple', 'banana')).toBe(-1)
	})

	it('returns 1 when a comes after b', () => {
		expect(sortNormalize('zebra', 'apple')).toBe(1)
	})

	it('returns 0 for equal strings', () => {
		expect(sortNormalize('same', 'same')).toBe(0)
	})

	it('sorts accent-normalized strings correctly', () => {
		expect(sortNormalize('ação', 'acao')).toBe(0)
	})
})

describe('sortByName', () => {
	it('sorts objects by name ascending', () => {
		const items = [{ name: 'Zebra' }, { name: 'Apple' }, { name: 'Mango' }]
		items.sort(sortByName)
		expect(items.map((i) => i.name)).toEqual(['Apple', 'Mango', 'Zebra'])
	})

	it('handles accent-normalized names', () => {
		const a = { name: 'Ação' }
		const b = { name: 'Acao' }
		expect(sortByName(a, b)).toBe(0)
	})
})

describe('sortByField', () => {
	it('sorts ascending by given field', () => {
		expect(sortByField({ age: 10 }, { age: 20 }, 'age')).toBe(-1)
		expect(sortByField({ age: 20 }, { age: 10 }, 'age')).toBe(1)
		expect(sortByField({ age: 10 }, { age: 10 }, 'age')).toBe(0)
	})
})

describe('sortByFieldDesc', () => {
	it('sorts descending by given field', () => {
		expect(sortByFieldDesc({ age: 20 }, { age: 10 }, 'age')).toBe(-1)
		expect(sortByFieldDesc({ age: 10 }, { age: 20 }, 'age')).toBe(1)
		expect(sortByFieldDesc({ age: 10 }, { age: 10 }, 'age')).toBe(0)
	})
})

describe('sortByNestedField', () => {
	it('sorts by nested field using normalized strings', () => {
		const a = { address: { city: 'Rio' } }
		const b = { address: { city: 'São Paulo' } }
		expect(sortByNestedField(a, b, 'address', 'city')).toBe(-1)
		expect(sortByNestedField(b, a, 'address', 'city')).toBe(1)
		expect(sortByNestedField(a, a, 'address', 'city')).toBe(0)
	})
})

describe('capitalize', () => {
	it('uppercases first letter', () => {
		expect(capitalize('hello')).toBe('Hello')
	})

	it('leaves the rest unchanged', () => {
		expect(capitalize('hELLO')).toBe('HELLO')
	})

	it('handles single character', () => {
		expect(capitalize('a')).toBe('A')
	})

	it('handles empty string', () => {
		expect(capitalize('')).toBe('')
	})
})

describe('replaceTemplateWithVariables', () => {
	it('replaces single variable', () => {
		expect(replaceTemplateWithVariables('Hello {{ name }}', { name: 'World' })).toBe(
			'Hello World',
		)
	})

	it('replaces multiple variables', () => {
		const result = replaceTemplateWithVariables('{{a}} and {{b}}', { a: 'foo', b: 'bar' })
		expect(result).toBe('foo and bar')
	})

	it('replaces numeric values', () => {
		expect(replaceTemplateWithVariables('Count: {{n}}', { n: 42 })).toBe('Count: 42')
	})

	it('replaces missing keys with empty string', () => {
		expect(replaceTemplateWithVariables('{{missing}}', {})).toBe('')
	})

	it('handles template with no placeholders', () => {
		expect(replaceTemplateWithVariables('No placeholders', { a: 1 })).toBe('No placeholders')
	})

	it('handles templates matching DataTable pagination pattern', () => {
		const result = replaceTemplateWithVariables(
			'Showing {{startIndex}} to {{endIndex}} of {{totalItems}} results',
			{ startIndex: 1, endIndex: 10, totalItems: 100 },
		)
		expect(result).toBe('Showing 1 to 10 of 100 results')
	})
})
