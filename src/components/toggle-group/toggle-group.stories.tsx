// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ToggleGroup, ToggleGroupItem } from './toggle-group'
import { Label } from '../label'

const meta: Meta<typeof ToggleGroup> = {
	component: ToggleGroup,
}

export default meta
type Story = StoryObj<typeof ToggleGroup>

const Template = () => {
	return (
		<div className="flex gap-4 items-center mt-5">
			<Label>Define the type:</Label>
			<ToggleGroup type="single">
				<ToggleGroupItem value="monthly">Primary</ToggleGroupItem>
				<ToggleGroupItem value="weekly">Seconday</ToggleGroupItem>
				<ToggleGroupItem value="daily">Tertiary</ToggleGroupItem>
			</ToggleGroup>
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
