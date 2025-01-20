// organize-imports-ignore
import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Spinner, spinnerColors, spinnerSizes, SpinnerProps } from '.'

const meta: Meta<typeof Spinner> = {
	title: 'Components/Spinner',
	component: Spinner,
	argTypes: {
		size: {
			control: 'select',
			options: spinnerSizes,
			description: 'Size of the spinner',
		},
		color: {
			control: 'select',
			options: spinnerColors,
			description: 'Color of the spinner',
		},
		label: {
			control: 'text',
			description: 'Optional label displayed below the spinner',
		},
		className: {
			control: 'text',
			description: 'Additional classes for custom styling',
		},
	},
	args: {
		size: 'md',
		color: 'primary',
		label: 'Loading...',
	},
}

export default meta

// Stories
export const Default: StoryObj<typeof Spinner> = {}

export const Sizes: StoryObj<SpinnerProps> = {
	render: (args) => (
		<div className="flex flex-wrap gap-10">
			{spinnerSizes.map((size) => (
				<Spinner key={size} {...args} size={size as SpinnerProps['size']} label={size} />
			))}
		</div>
	),
	args: {
		color: 'primary',
	},
}

export const Colors: StoryObj<SpinnerProps> = {
	render: (args) => (
		<div className="flex flex-wrap gap-10">
			{spinnerColors.map((color) => (
				<Spinner
					key={color}
					{...args}
					color={color as SpinnerProps['color']}
					label={color}
				/>
			))}
		</div>
	),
	args: {
		size: 'md',
	},
}
