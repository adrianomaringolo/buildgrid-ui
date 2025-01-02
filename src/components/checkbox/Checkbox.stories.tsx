// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
	component: Checkbox,
}

export default meta
type Story = StoryObj<typeof Checkbox>

const Template = () => {
	return (
		<div className="items-top flex space-x-2">
			<Checkbox id="terms1" />
			<div className="grid gap-1.5 leading-none">
				<label
					htmlFor="terms1"
					className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Accept terms and conditions
				</label>
				<p className="text-sm text-muted-foreground">
					You agree to our Terms of Service and Privacy Policy.
				</p>
			</div>
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
