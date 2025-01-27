// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonProps } from './button'
import { ButtonTheme, ButtonThemeProps } from './button.types'

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

const TemplateCustomTheme = () => {
	const customTheme: ButtonThemeProps = {
		base: 'border-2 shadow-lg rounded p-3',
		variants: {
			variant: {
				default: 'bg-black text-white hover:bg-gray-600',
				secondary: 'bg-gray-600 text-white hover:bg-gray-800',
				destructive: 'bg-orange-600 text-white hover:bg-orange-800',
				outline: 'bg-transparent text-black hover:bg-gray-200',
				ghost: 'bg-gray-100 text-black hover:bg-gray-200',
				link: 'text-blue-600 border-none',
			},
			size: {
				md: 'h-auto py-2 px-4',
			},
		},
	}

	return (
		<div className="flex gap-2 flex-wrap">
			{Object.values(variants).map((variant) => (
				<Button
					theme={customTheme}
					variant={variant as ButtonProps['variant']}
					className="capitalize"
				>
					{variant}
				</Button>
			))}
		</div>
	)
}

export const CustomTheme: Story = {
	render: TemplateCustomTheme.bind({}),
	args: {},
}
