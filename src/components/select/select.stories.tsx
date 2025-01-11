// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

const meta: Meta<typeof Select> = {
	component: Select,
}

export default meta
type Story = StoryObj<typeof Select>

const Template = () => {
	return (
		<div className="w-96">
			<Select>
				<SelectTrigger>
					<SelectValue placeholder="Select" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="1">
						<div>Option 1</div>
					</SelectItem>
					<SelectItem value="2">
						<div>Option 2</div>
					</SelectItem>
					<SelectItem value="3">
						<div>Option 3</div>
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
