import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Toaster, toast } from '.'
import { Button } from '../../components'

const ToasterExample: React.FC = () => {
	const handleOpenToast = () => {
		toast.success('This is a success toast')
	}

	return <Button onClick={handleOpenToast}>Open Dialog</Button>
}

const meta: Meta<typeof ToasterExample> = {
	title: 'Components/toast',
	component: ToasterExample,
}

const Template = () => {
	return (
		<>
			<Toaster />
			<ToasterExample />
		</>
	)
}

export default meta
type Story = StoryObj<typeof ToasterExample>

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
