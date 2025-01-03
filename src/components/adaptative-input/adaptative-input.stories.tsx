// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { AdaptiveInput } from './adaptative-input'
import { HelpCircle, Phone, User } from 'lucide-react'

const meta: Meta<typeof AdaptiveInput> = {
	title: 'Components/Input/AdaptiveInput',
	component: AdaptiveInput,
}

export default meta
type Story = StoryObj<typeof AdaptiveInput>

const Template = () => {
	return (
		<AdaptiveInput
			className="w-64"
			leftIcon={<Phone className="w-4 h-4" />}
			rightIcon={<HelpCircle className="w-4 h-4" />}
			mask="+00 0000-0000"
		/>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
