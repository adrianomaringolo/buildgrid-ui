import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { NumberStepper } from './number-stepper'

describe('NumberStepper', () => {
	it('renders with default value', () => {
		render(<NumberStepper defaultValue={5} />)
		const input = screen.getByRole('spinbutton') as HTMLInputElement
		expect(input.value).toBe('5')
	})

	it('increments value on plus button click', () => {
		const handleChange = vi.fn()
		render(<NumberStepper defaultValue={5} onChange={handleChange} />)
		const incrementButton = screen.getByLabelText('Increase value')
		fireEvent.click(incrementButton)
		expect(handleChange).toHaveBeenCalledWith(6)
	})

	it('decrements value on minus button click', () => {
		const handleChange = vi.fn()
		render(<NumberStepper defaultValue={5} onChange={handleChange} />)
		const decrementButton = screen.getByLabelText('Decrease value')
		fireEvent.click(decrementButton)
		expect(handleChange).toHaveBeenCalledWith(4)
	})

	it('respects the max limit', () => {
		const handleChange = vi.fn()
		render(<NumberStepper defaultValue={10} max={10} onChange={handleChange} />)
		const incrementButton = screen.getByLabelText('Increase value')
		fireEvent.click(incrementButton)
		expect(handleChange).not.toHaveBeenCalled()
		expect(incrementButton).toBeDisabled()
	})

	it('respects the min limit', () => {
		const handleChange = vi.fn()
		render(<NumberStepper defaultValue={0} min={0} onChange={handleChange} />)
		const decrementButton = screen.getByLabelText('Decrease value')
		fireEvent.click(decrementButton)
		expect(handleChange).not.toHaveBeenCalled()
		expect(decrementButton).toBeDisabled()
	})

	it('handles input change', () => {
		const handleChange = vi.fn()
		render(<NumberStepper defaultValue={5} onChange={handleChange} />)
		const input = screen.getByRole('spinbutton') as HTMLInputElement
		fireEvent.change(input, { target: { value: '8' } })
		expect(handleChange).toHaveBeenCalledWith(8)
	})

	it('clamps value to max if input is over', () => {
		const handleChange = vi.fn()
		render(<NumberStepper defaultValue={5} max={10} onChange={handleChange} />)
		const input = screen.getByRole('spinbutton') as HTMLInputElement
		fireEvent.change(input, { target: { value: '15' } })
		expect(handleChange).toHaveBeenCalledWith(10)
	})

	it('clamps value to min if input is under', () => {
		const handleChange = vi.fn()
		render(<NumberStepper defaultValue={5} min={0} onChange={handleChange} />)
		const input = screen.getByRole('spinbutton') as HTMLInputElement
		fireEvent.change(input, { target: { value: '-5' } })
		expect(handleChange).toHaveBeenCalledWith(0)
	})

	it('is disabled when disabled prop is true', () => {
		render(<NumberStepper defaultValue={5} disabled />)
		const incrementButton = screen.getByLabelText('Increase value')
		const decrementButton = screen.getByLabelText('Decrease value')
		const input = screen.getByRole('spinbutton') as HTMLInputElement
		expect(incrementButton).toBeDisabled()
		expect(decrementButton).toBeDisabled()
		expect(input).toBeDisabled()
	})

	it('renders with left and right symbols', () => {
		render(<NumberStepper leftSymbol="$" rightSymbol="%" />)
		expect(screen.getByText('$')).toBeInTheDocument()
		expect(screen.getByText('%')).toBeInTheDocument()
	})
})
