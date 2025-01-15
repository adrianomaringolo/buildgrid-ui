// organize-imports-ignore
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Autocomplete } from './autocomplete'
import React from 'react'

const options = [
	{ value: 'apple', label: 'Apple' },
	{ value: 'banana', label: 'Banana' },
	{ value: 'orange', label: 'Orange' },
]

describe('Autocomplete Component', () => {
	it('renders the input field with a placeholder', () => {
		render(<Autocomplete options={options} placeholder="Search fruits..." />)
		const input = screen.getByPlaceholderText(/search fruits.../i)
		expect(input).toBeInTheDocument()
	})

	it('renders all suggestions initially when the input is focused', () => {
		render(<Autocomplete options={options} />)
		const input = screen.getByPlaceholderText(/search.../i)
		fireEvent.focus(input)

		const suggestionList = screen.getAllByRole('option')
		expect(suggestionList).toHaveLength(options.length)
		expect(suggestionList[0]).toHaveTextContent('Apple')
		expect(suggestionList[1]).toHaveTextContent('Banana')
		expect(suggestionList[2]).toHaveTextContent('Orange')
	})

	// it('filters suggestions based on input', () => {
	// 	render(<Autocomplete options={options} />)
	// 	const input = screen.getByPlaceholderText(/search.../i)

	// 	fireEvent.focus(input, { target: { value: 'ap' } })

	// 	const suggestionList = screen.getAllByRole('option')
	// 	expect(suggestionList).toHaveLength(1)
	// 	expect(suggestionList[0]).toHaveTextContent('Apple')
	// })

	// it('displays "Nothing found" when no suggestions match', () => {
	// 	render(<Autocomplete options={options} emptyMessage="No fruits found" />)
	// 	const input = screen.getByPlaceholderText(/search.../i)
	// 	fireEvent.change(input, { target: { value: 'xyz' } })

	// 	const emptyMessage = screen.getByText(/no fruits found/i)
	// 	expect(emptyMessage).toBeInTheDocument()
	// })

	it('calls onChange with the selected value when a suggestion is clicked', () => {
		const handleChange = vi.fn()
		render(<Autocomplete options={options} onChange={handleChange} />)
		const input = screen.getByPlaceholderText(/search.../i)
		fireEvent.focus(input)

		const suggestion = screen.getByText(/banana/i)
		fireEvent.click(suggestion)

		expect(handleChange).toHaveBeenCalledWith('banana')
	})

	it('updates the input value when a suggestion is clicked', () => {
		render(<Autocomplete options={options} />)
		const input = screen.getByPlaceholderText(/search.../i)
		fireEvent.focus(input)

		const suggestion = screen.getByText(/orange/i)
		fireEvent.click(suggestion)

		expect(input).toHaveValue('Orange')
	})

	it('navigates suggestions with keyboard (ArrowDown, ArrowUp, Enter)', () => {
		const handleChange = vi.fn()
		render(<Autocomplete options={options} onChange={handleChange} />)
		const input = screen.getByPlaceholderText(/search.../i)
		fireEvent.focus(input)

		fireEvent.keyDown(input, { key: 'ArrowDown' })
		fireEvent.keyDown(input, { key: 'ArrowDown' })
		fireEvent.keyDown(input, { key: 'Enter' })

		expect(handleChange).toHaveBeenCalledWith('banana')
		expect(input).toHaveValue('Banana')
	})

	it('closes suggestions when Escape is pressed', () => {
		render(<Autocomplete options={options} />)
		const input = screen.getByPlaceholderText(/search.../i)
		fireEvent.focus(input)

		fireEvent.keyDown(input, { key: 'Escape' })
		const suggestions = screen.queryAllByRole('option')
		expect(suggestions).toHaveLength(0)
	})
})
