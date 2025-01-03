// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { AdaptiveInput } from './adaptative-input'
import { HelpCircle, Phone, User } from 'lucide-react'

const meta: Meta<typeof AdaptiveInput> = {
	title: 'Components/input/adaptiveInput',
	component: AdaptiveInput,
}

export default meta
type Story = StoryObj<typeof AdaptiveInput>

const Template = () => {
	return (
		<div className="w-64">
			<AdaptiveInput
				leftIcon={<Phone className="w-4 h-4" />}
				rightIcon={<HelpCircle className="w-4 h-4" />}
				mask="+00 0000-0000"
			/>
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
