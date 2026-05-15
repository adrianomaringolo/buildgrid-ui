// organize-imports-ignore
import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './input-otp'
import { Label } from '../label'

const meta: Meta<typeof InputOTP> = {
  component: InputOTP,
}

export default meta
type Story = StoryObj<typeof InputOTP>

export const Default6Digit: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="flex flex-col gap-4">
        <Label>Verification Code</Label>
        <InputOTP length={6} value={value} onValueChange={setValue} />
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to your phone.
        </p>
        {value.length === 6 && (
          <p className="text-sm text-green-600 dark:text-green-400">
            Code entered: <strong>{value}</strong>
          </p>
        )}
      </div>
    )
  },
}

export const FourDigitPin: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="flex flex-col gap-4">
        <Label>4-Digit PIN</Label>
        <InputOTP length={4} value={value} onValueChange={setValue} />
        <p className="text-sm text-muted-foreground">
          Enter your 4-digit PIN to confirm the transaction.
        </p>
      </div>
    )
  },
}

export const Grouped: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="flex flex-col gap-4">
        <Label>Phone Verification — 3+3 Format</Label>
        <InputOTP length={6} value={value} onValueChange={setValue}>
          <InputOTPGroup>
            <InputOTPSlot
              index={0}
              className="first:rounded-l-md first:border-l last:rounded-r-none last:border-r-0"
            />
            <InputOTPSlot
              index={1}
              className="rounded-none border-r-0"
            />
            <InputOTPSlot
              index={2}
              className="rounded-l-none rounded-r-md"
            />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot
              index={3}
              className="first:rounded-l-md first:border-l last:rounded-r-none last:border-r-0"
            />
            <InputOTPSlot
              index={4}
              className="rounded-none border-r-0"
            />
            <InputOTPSlot
              index={5}
              className="rounded-l-none rounded-r-md"
            />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-sm text-muted-foreground">
          Grouped format, like phone verification codes (e.g., 123-456).
        </p>
      </div>
    )
  },
}

export const Default: Story = {
  render: () => {
    const [code6, setCode6] = useState('')
    const [pin4, setPin4] = useState('')
    const [grouped, setGrouped] = useState('')

    return (
      <div className="flex flex-col gap-8 p-6 max-w-md">
        <div className="flex flex-col gap-3">
          <Label className="font-semibold">6-Digit Email Verification</Label>
          <InputOTP length={6} value={code6} onValueChange={setCode6} />
          <p className="text-xs text-muted-foreground">
            Most common use case for email or SMS verification.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Label className="font-semibold">4-Digit PIN</Label>
          <InputOTP length={4} value={pin4} onValueChange={setPin4} />
          <p className="text-xs text-muted-foreground">
            Used for ATM PINs, app lock codes, etc.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Label className="font-semibold">Grouped 3+3 Code</Label>
          <InputOTP length={6} value={grouped} onValueChange={setGrouped}>
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
          </InputOTP>
          <p className="text-xs text-muted-foreground">
            Split into two groups for readability — often used in recovery codes.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Label className="font-semibold">Disabled State</Label>
          <InputOTP length={6} value="123456" disabled />
          <p className="text-xs text-muted-foreground">
            Disabled input with pre-filled value.
          </p>
        </div>
      </div>
    )
  },
}
