import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Toaster, toast } from '.'
import { Button } from '../../components'

const ToasterExample: React.FC = () => {
	return (
		<div className="flex flex-col gap-2">
			<Button onClick={() => toast.success('This is a success toast')}>
				Open success toast
			</Button>
			<Button onClick={() => toast.error('This is an error toast')}>
				Open error toast
			</Button>
			<Button onClick={() => toast.warning('This is a warning toast')}>
				Open warning toast
			</Button>
			<Button onClick={() => toast.info('This is an info toast')}>Open info toast</Button>
		</div>
	)
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
