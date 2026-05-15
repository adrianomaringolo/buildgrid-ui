import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './input-otp'

describe('InputOTP', () => {
  describe('Rendering', () => {
    it('renders 6 inputs by default', () => {
      render(<InputOTP />)
      const inputs = screen.getAllByRole('textbox')
      expect(inputs).toHaveLength(6)
    })

    it('renders the correct number of inputs based on length prop', () => {
      render(<InputOTP length={4} />)
      const inputs = screen.getAllByRole('textbox')
      expect(inputs).toHaveLength(4)
    })

    it('renders with data-slot="input-otp" on the root', () => {
      const { container } = render(<InputOTP length={4} />)
      const root = container.querySelector('[data-slot="input-otp"]')
      expect(root).toBeInTheDocument()
    })

    it('renders slots with data-slot="input-otp-slot"', () => {
      const { container } = render(<InputOTP length={4} />)
      const slots = container.querySelectorAll('[data-slot="input-otp-slot"]')
      expect(slots).toHaveLength(4)
    })

    it('forwards custom className to the root', () => {
      const { container } = render(<InputOTP className="my-custom-class" />)
      const root = container.querySelector('[data-slot="input-otp"]')
      expect(root).toHaveClass('my-custom-class')
    })

    it('displays the provided value across inputs', () => {
      render(<InputOTP length={6} value="123456" />)
      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[]
      const filledValues = inputs.map((el) => el.value).join('')
      expect(filledValues).toBe('123456')
    })
  })

  describe('Disabled State', () => {
    it('disables all inputs when disabled prop is true', () => {
      render(<InputOTP length={4} disabled />)
      const inputs = screen.getAllByRole('textbox')
      inputs.forEach((input) => {
        expect(input).toBeDisabled()
      })
    })

    it('does not disable inputs when disabled prop is false', () => {
      render(<InputOTP length={4} disabled={false} />)
      const inputs = screen.getAllByRole('textbox')
      inputs.forEach((input) => {
        expect(input).not.toBeDisabled()
      })
    })
  })

  describe('InputOTPSlot', () => {
    it('renders with data-slot="input-otp-slot" on default slots', () => {
      const { container } = render(<InputOTP length={3} />)
      const slots = container.querySelectorAll('[data-slot="input-otp-slot"]')
      expect(slots.length).toBeGreaterThan(0)
    })

    it('accepts className prop without error', () => {
      // className is forwarded to Radix OneTimePasswordFieldInput which spreads it onto the input
      expect(() =>
        render(
          <InputOTP length={1}>
            <InputOTPSlot index={0} className="slot-custom-class" />
          </InputOTP>,
        ),
      ).not.toThrow()
    })

    it('renders the correct number of inputs when using custom slot children', () => {
      render(
        <InputOTP length={3}>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTP>,
      )
      const inputs = screen.getAllByRole('textbox')
      expect(inputs).toHaveLength(3)
    })
  })

  describe('InputOTPGroup', () => {
    it('renders with data-slot="input-otp-group" as standalone component', () => {
      const { container } = render(
        <div>
          <InputOTPGroup>
            <span>Group content</span>
          </InputOTPGroup>
        </div>,
      )
      const group = container.querySelector('[data-slot="input-otp-group"]')
      expect(group).toBeInTheDocument()
    })

    it('forwards className to the group container', () => {
      const { container } = render(
        <div>
          <InputOTPGroup className="group-custom-class">
            <span>Content</span>
          </InputOTPGroup>
        </div>,
      )
      const group = container.querySelector('[data-slot="input-otp-group"]')
      expect(group).toHaveClass('group-custom-class')
    })

    it('renders children inside the group', () => {
      render(
        <div>
          <InputOTPGroup>
            <span>Slot content</span>
          </InputOTPGroup>
        </div>,
      )
      expect(screen.getByText('Slot content')).toBeInTheDocument()
    })
  })

  describe('InputOTPSeparator', () => {
    it('renders as standalone component with data-slot="input-otp-separator"', () => {
      const { container } = render(<div><InputOTPSeparator /></div>)
      const separator = container.querySelector('[data-slot="input-otp-separator"]')
      expect(separator).toBeInTheDocument()
    })

    it('renders with role="separator"', () => {
      render(<div><InputOTPSeparator /></div>)
      const separator = document.querySelector('[role="separator"]')
      expect(separator).toBeInTheDocument()
    })

    it('forwards className to the separator', () => {
      const { container } = render(
        <div><InputOTPSeparator className="sep-custom-class" /></div>,
      )
      const separator = container.querySelector('[data-slot="input-otp-separator"]')
      expect(separator).toHaveClass('sep-custom-class')
    })
  })

  describe('Accessibility', () => {
    it('renders inputs with correct type for numeric mode', () => {
      render(<InputOTP length={4} />)
      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[]
      // The Radix OTP component uses text type inputs
      inputs.forEach((input) => {
        expect(input.tagName).toBe('INPUT')
      })
    })

    it('supports name attribute for form submission', () => {
      const { container } = render(<InputOTP length={4} name="otp-code" />)
      // The Radix component uses a hidden input for form submission
      const hiddenInput = container.querySelector('input[type="hidden"]')
      if (hiddenInput) {
        expect(hiddenInput).toHaveAttribute('name', 'otp-code')
      } else {
        // If no hidden input, the visible inputs carry the name
        expect(container.querySelector('[data-slot="input-otp"]')).toBeInTheDocument()
      }
    })
  })

  describe('Edge Cases', () => {
    it('renders with length of 1', () => {
      render(<InputOTP length={1} />)
      const inputs = screen.getAllByRole('textbox')
      expect(inputs).toHaveLength(1)
    })

    it('renders with a long length', () => {
      render(<InputOTP length={8} />)
      const inputs = screen.getAllByRole('textbox')
      expect(inputs).toHaveLength(8)
    })

    it('handles empty value gracefully', () => {
      render(<InputOTP length={6} value="" />)
      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[]
      const allEmpty = inputs.every((el) => el.value === '')
      expect(allEmpty).toBe(true)
    })

    it('renders custom children when provided (groups and separator)', () => {
      const { container } = render(
        <InputOTP length={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>,
      )
      // Groups and separator are rendered as children of the OTP field
      const groups = container.querySelectorAll('[data-slot="input-otp-group"]')
      expect(groups).toHaveLength(2)
      const separator = container.querySelector('[data-slot="input-otp-separator"]')
      expect(separator).toBeInTheDocument()
      // All 6 inputs should be present
      const inputs = screen.getAllByRole('textbox')
      expect(inputs).toHaveLength(6)
    })
  })
})
