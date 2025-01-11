// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupItem } from './radio-group'
import { Label } from '../label'

const meta: Meta<typeof RadioGroup> = {
	component: RadioGroup,
}

export default meta
type Story = StoryObj<typeof RadioGroup>

const Template = () => {
	return (
		<RadioGroup defaultValue="comfortable">
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="default" id="r1" />
				<Label htmlFor="r1">Default</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="comfortable" id="r2" />
				<Label htmlFor="r2">Comfortable</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="compact" id="r3" />
				<Label htmlFor="r3">Compact</Label>
			</div>
		</RadioGroup>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
