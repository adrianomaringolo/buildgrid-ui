// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { EmptyItems } from './empty-message'

const meta: Meta<typeof EmptyItems> = {
	component: EmptyItems,
}

export default meta
type Story = StoryObj<typeof EmptyItems>

const Template = () => (
	<EmptyItems
		notFoundText="No item found!"
		notFoundAction={
			<p className="text-sm italic text-gray-600 text-center">Try again later</p>
		}
	/>
)

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
