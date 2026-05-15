'use client'

import * as React from 'react'
import { OneTimePasswordField, OneTimePasswordFieldInput } from '@radix-ui/react-one-time-password-field'
import { MinusIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InputOTPProps {
  length?: number
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
  className?: string
  validationType?: 'alpha' | 'numeric' | 'alphanumeric' | 'none'
  autoFocus?: boolean
  autoSubmit?: boolean
  onAutoSubmit?: (value: string) => void
  name?: string
  form?: string
}

interface InputOTPRootProps extends InputOTPProps {
  children?: React.ReactNode
}

function InputOTP({
  length = 6,
  value,
  onValueChange,
  disabled,
  placeholder = '○',
  className,
  validationType = 'numeric',
  autoFocus,
  autoSubmit,
  onAutoSubmit,
  name,
  form,
  children,
}: InputOTPRootProps) {
  return (
    <OneTimePasswordField
      data-slot="input-otp"
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      placeholder={placeholder}
      validationType={validationType}
      autoFocus={autoFocus}
      autoSubmit={autoSubmit}
      onAutoSubmit={onAutoSubmit}
      name={name}
      form={form}
      className={cn('flex items-center gap-2', className)}
    >
      {children ?? Array.from({ length }, (_, i) => (
        <InputOTPSlot key={i} index={i} />
      ))}
    </OneTimePasswordField>
  )
}

interface InputOTPSlotProps extends Omit<React.ComponentProps<typeof OneTimePasswordFieldInput>, 'index'> {
  index: number
  className?: string
}

function InputOTPSlot({ index, className, ...props }: InputOTPSlotProps) {
  return (
    <OneTimePasswordFieldInput
      data-slot="input-otp-slot"
      index={index}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-center text-sm font-medium shadow-sm transition-all',
        'placeholder:text-muted-foreground/40',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'dark:bg-background dark:border-input',
        className,
      )}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn('flex items-center', className)}
      {...props}
    />
  )
}

function InputOTPSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className={cn('flex items-center px-1', className)}
      {...props}
    >
      <MinusIcon className="size-4 text-muted-foreground" />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
export type { InputOTPProps, InputOTPSlotProps }
