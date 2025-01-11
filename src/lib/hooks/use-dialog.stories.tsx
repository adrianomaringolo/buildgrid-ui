import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Button } from '../../components'
import { DialogProvider, useDialog } from '../hooks/use-dialog'

/**
 * A simple example of using the useDialog hook.
 *
 * This example shows how to open a dialog with a title, message, and type.
 *
 * The dialog is opened when the button is clicked.
 */
const DialogExample: React.FC = () => {
	const dialog = useDialog()

	const handleOpenDialog = () => {
		dialog.open({
			title: 'Example Dialog',
			message: 'This is an example dialog using useDialog hook.',
			type: 'info',
		})
	}

	return <Button onClick={handleOpenDialog}>Open Dialog</Button>
}

const meta: Meta<typeof DialogExample> = {
	title: 'Hooks/useDialog',
	component: DialogExample,
}

const Template = () => {
	return (
		<DialogProvider>
			<DialogExample />
		</DialogProvider>
	)
}

export default meta
type Story = StoryObj<typeof DialogExample>

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
