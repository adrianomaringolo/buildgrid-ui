// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './slider'

const meta: Meta<typeof Slider> = {
	title: 'Components/Slider',
	component: Slider,
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Slider>

export const Uncontrolled: Story = {
	render: () => (
		<div className="w-1/2">
			<Slider defaultValue={[50]} max={100} step={1} />
		</div>
	),
}

export const Controlled: Story = {
	render: () => {
		const [value, setValue] = React.useState([10, 80])

		return (
			<div className="w-1/2">
				{value.join(' - ')}
				<Slider value={value} onValueChange={setValue} max={100} step={1} />
			</div>
		)
	},
}

export const Single: Story = {
	render: () => (
		<div className="w-1/2">
			<Slider defaultValue={[25]} max={100} step={1} />
		</div>
	),
}

export const Range: Story = {
	render: () => (
		<div className="w-1/2">
			<Slider defaultValue={[25, 75]} max={100} step={1} />
		</div>
	),
}
