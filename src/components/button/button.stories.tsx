// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonProps } from './button'

const meta: Meta<typeof Button> = {
	component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

const variants: Array<ButtonProps['variant']> = [
	'default',
	'secondary',
	'destructive',
	'outline',
	'ghost',
	'link',
]

const Template = (args: ButtonProps) => {
	return (
		<div className="flex gap-2 flex-wrap">
			{Object.values(variants).map((variant) => (
				<Button
					{...args}
					variant={variant as ButtonProps['variant']}
					className="capitalize"
				>
					{variant}
				</Button>
			))}
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}

const TemplateIsLoading = () => {
	return (
		<div className="flex gap-2 flex-wrap">
			{Object.values(variants).map((variant) => (
				<Button
					isLoading
					variant={variant as ButtonProps['variant']}
					className="capitalize"
				>
					{variant}
				</Button>
			))}
		</div>
	)
}

export const Loading: Story = {
	render: TemplateIsLoading.bind({}),
	args: {},
}
