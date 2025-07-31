// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Alert, AlertTitle, AlertDescription } from './alert'

const meta: Meta<typeof Alert> = {
	component: Alert,
}

export default meta
type Story = StoryObj<typeof Alert>

const Template = () => {
	return (
		<>
			<Alert variant="default">
				<AlertTitle>Heads up!</AlertTitle>
				<AlertDescription>
					You can add components and dependencies to your app using the cli.
				</AlertDescription>
			</Alert>
			<Alert variant="destructive">
				<AlertTitle>Heads up!</AlertTitle>
				<AlertDescription>
					You can add components and dependencies to your app using the cli.
				</AlertDescription>
			</Alert>
		</>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
