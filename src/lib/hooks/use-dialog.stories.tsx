import type { Meta, StoryObj } from '@storybook/react'
import { Send } from 'lucide-react'
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

	const handleOpenInfoDialog = () => {
		dialog.open({
			title: 'Example Dialog',
			message: 'This is an example dialog using useDialog hook.',
			type: 'info',
		})
	}

	const handleOpenCustomDialog = () => {
		dialog.open({
			title: 'Custom Dialog',
			message: 'This is an example dialog using useDialog hook.',
			type: 'custom',
			icon: Send,
		})
	}

	const handleOpenErrorDialog = () => {
		dialog.open({
			title: 'Error Dialog',
			message: 'This is an example dialog using useDialog hook.',
			type: 'error',
		})
	}

	const handleOpenSuccessDialog = () => {
		dialog.open({
			title: 'Success Dialog',
			message: 'This is an example dialog using useDialog hook.',
			type: 'success',
		})
	}

	const handleOpenWarningDialog = () => {
		dialog.open({
			title: 'Warning Dialog',
			message: 'This is an example dialog using useDialog hook.',
			type: 'warning',
		})
	}

	const handleOpenConfirmDialog = () => {
		dialog.open({
			title: 'Confirmation Dialog',
			message: 'This is an example dialog using useDialog hook.',
			type: 'confirm',
			onConfirm: () => alert('Confirmation ok'),
			displayCancel: true,
		})
	}

	const handleOpenConfirmPromiseDialog = () => {
		dialog.open({
			title: 'Confirmation Dialog',
			message:
				'This is an example dialog using useDialog hook. The confirmation Promise takes 5s to resolve',
			type: 'confirm',
			onConfirm: () => {
				return new Promise((resolve) => setTimeout(resolve, 5000))
			},
			confirmLabel: 'Yes, execute the promise',
			displayCancel: true,
		})
	}

	return (
		<div className="flex flex-col gap-2 max-w-sm">
			<Button onClick={handleOpenInfoDialog}>Open Info Dialog</Button>
			<Button onClick={handleOpenErrorDialog}>Open Error Dialog</Button>
			<Button onClick={handleOpenSuccessDialog}>Open Success Dialog</Button>
			<Button onClick={handleOpenWarningDialog}>Open Warning Dialog</Button>
			<Button onClick={handleOpenCustomDialog}>Open Custom Dialog</Button>
			<Button onClick={handleOpenConfirmDialog}>Open Confirm Dialog</Button>
			<Button onClick={handleOpenConfirmPromiseDialog}>
				Open Confirm Dialog + Promise
			</Button>
		</div>
	)
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
