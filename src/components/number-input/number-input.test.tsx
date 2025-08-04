
import { render, fireEvent, screen } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import { NumberInput } from './number-input';

describe('NumberInput', () => {
  it('renders with default value', () => {
    render(<NumberInput defaultValue={5} />);
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(input.value).toBe('5');
  });

  it('increments value on plus button click', () => {
    const handleChange = vi.fn();
    render(<NumberInput defaultValue={5} onChange={handleChange} />);
    const incrementButton = screen.getByLabelText('Increase value');
    fireEvent.click(incrementButton);
    expect(handleChange).toHaveBeenCalledWith(6);
  });

  it('decrements value on minus button click', () => {
    const handleChange = vi.fn();
    render(<NumberInput defaultValue={5} onChange={handleChange} />);
    const decrementButton = screen.getByLabelText('Decrease value');
    fireEvent.click(decrementButton);
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it('respects the max limit', () => {
    const handleChange = vi.fn();
    render(<NumberInput defaultValue={10} max={10} onChange={handleChange} />);
    const incrementButton = screen.getByLabelText('Increase value');
    fireEvent.click(incrementButton);
    expect(handleChange).not.toHaveBeenCalled();
    expect(incrementButton).toBeDisabled();
  });

  it('respects the min limit', () => {
    const handleChange = vi.fn();
    render(<NumberInput defaultValue={0} min={0} onChange={handleChange} />);
    const decrementButton = screen.getByLabelText('Decrease value');
    fireEvent.click(decrementButton);
    expect(handleChange).not.toHaveBeenCalled();
    expect(decrementButton).toBeDisabled();
  });

  it('handles input change', () => {
    const handleChange = vi.fn();
    render(<NumberInput defaultValue={5} onChange={handleChange} />);
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '8' } });
    expect(handleChange).toHaveBeenCalledWith(8);
  });

  it('clamps value to max if input is over', () => {
    const handleChange = vi.fn();
    render(<NumberInput defaultValue={5} max={10} onChange={handleChange} />);
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '15' } });
    expect(handleChange).toHaveBeenCalledWith(10);
  });

  it('clamps value to min if input is under', () => {
    const handleChange = vi.fn();
    render(<NumberInput defaultValue={5} min={0} onChange={handleChange} />);
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '-5' } });
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('is disabled when disabled prop is true', () => {
    render(<NumberInput defaultValue={5} disabled />);
    const incrementButton = screen.getByLabelText('Increase value');
    const decrementButton = screen.getByLabelText('Decrease value');
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(incrementButton).toBeDisabled();
    expect(decrementButton).toBeDisabled();
    expect(input).toBeDisabled();
  });

  it('renders with left and right symbols', () => {
    render(<NumberInput leftSymbol="$" rightSymbol="%" />);
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
  });
});
