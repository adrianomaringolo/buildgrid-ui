// organize-imports-ignore
import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './alert'

const meta: Meta<typeof Alert> = {
	component: Alert,
}

export default meta
type Story = StoryObj<typeof Alert>

export const Info: Story = {
	render: () => (
		<div className="space-y-4 p-6 max-w-2xl">
			<Alert variant="info">
				Your session will expire in 30 minutes. Save your work to avoid losing changes.
			</Alert>
			<Alert variant="info" title="Scheduled Maintenance">
				System maintenance is planned for Sunday, May 19 from 2–4 AM EST. No action required.
			</Alert>
			<Alert
				variant="info"
				title="New Feature Available"
				actionButton={{ label: 'Explore', onClick: () => {}, variant: 'outline' }}
			>
				We've launched a new analytics dashboard. Explore insights about your usage patterns.
			</Alert>
			<Alert
				variant="info"
				title="System Notices"
				messages={[
					'Scheduled maintenance on Sunday from 2–4 AM EST.',
					'New analytics dashboard is now available for all users.',
					'Email notifications have been updated with a new template.',
				]}
			/>
		</div>
	),
}

export const Warning: Story = {
	render: () => {
		const [show, setShow] = useState(true)
		return (
			<div className="space-y-4 p-6 max-w-2xl">
				<Alert variant="warning">Your API key expires in 7 days. Rotate it before it lapses.</Alert>
				<Alert variant="warning" title="Storage Almost Full">
					{"You're using 95% of your storage. Upgrade your plan or delete unused files."}
				</Alert>
				<Alert
					variant="warning"
					title="Subscription Expiring"
					actionButton={{
						label: 'Renew Now',
						onClick: () => {},
						variant: 'outline',
					}}
				>
					Your subscription expires in 3 days. Renew to avoid service interruption.
				</Alert>
				{show && (
					<Alert
						variant="warning"
						title="Unverified Email"
						showCloseButton
						onClose={() => setShow(false)}
					>
						Please verify your email address to unlock all features.
					</Alert>
				)}
				<Alert
					variant="warning"
					title="Account Warnings"
					messages={[
						'Your storage is at 90% capacity.',
						'3 API integrations will expire in the next 7 days.',
						'Two-factor authentication is not enabled on your account.',
					]}
				/>
			</div>
		)
	},
}

export const Error: Story = {
	render: () => (
		<div className="space-y-4 p-6 max-w-2xl">
			<Alert variant="error">
				Unable to connect to the server. Please check your internet connection and try again.
			</Alert>
			<Alert variant="error" title="Payment Failed">
				Your payment could not be processed. Please check your card details and billing address.
			</Alert>
			<Alert
				variant="error"
				title="Action Required"
				actionButton={{ label: 'Verify Account', onClick: () => {}, variant: 'default' }}
			>
				Your account requires identity verification to continue using all features.
			</Alert>
			<Alert
				variant="error"
				title="Validation Errors"
				messages={[
					'Email address is already in use.',
					'Password must be at least 8 characters long.',
					'Phone number format is invalid.',
				]}
			/>
		</div>
	),
}

export const Success: Story = {
	render: () => {
		const [show, setShow] = useState(true)
		return (
			<div className="space-y-4 p-6 max-w-2xl">
				<Alert variant="success">Your changes have been saved successfully.</Alert>
				<Alert variant="success" title="Profile Updated">
					Your profile information has been updated and is now visible to your team.
				</Alert>
				{show && (
					<Alert
						variant="success"
						title="Backup Complete"
						showCloseButton
						onClose={() => setShow(false)}
					>
						Your data has been successfully backed up to the cloud.
					</Alert>
				)}
				<Alert
					variant="success"
					title="Welcome!"
					actionButton={{ label: 'Get Started', onClick: () => {}, variant: 'secondary' }}
				>
					{"Your account has been created successfully. Let's get you started with a quick tour."}
				</Alert>
			</div>
		)
	},
}

export const Tip: Story = {
	render: () => (
		<div className="space-y-4 p-6 max-w-2xl">
			<Alert variant="tip">
				Press <kbd className="font-mono font-semibold">Ctrl+K</kbd> to open the command palette and
				navigate faster.
			</Alert>
			<Alert variant="tip" title="Did You Know?">
				You can drag and drop files directly into the editor to attach them to your project.
			</Alert>
			<Alert
				variant="tip"
				title="Productivity Tip"
				actionButton={{ label: 'Learn More', onClick: () => {}, variant: 'outline' }}
			>
				Use saved filters to quickly switch between your most common data views.
			</Alert>
			<Alert
				variant="tip"
				title="Daily Tips"
				messages={[
					'You can use keyboard shortcuts to navigate faster. Press Ctrl+K to open the command palette.',
					'Dark mode is available in your profile settings under Appearance.',
					'Export your data anytime from the Settings → Data Export section.',
					'Pin your most-used reports to the dashboard for quick access.',
				]}
			/>
		</div>
	),
}

function AlertDemo() {
	const [alerts, setAlerts] = useState({
		info: true,
		warning: true,
		error: true,
		success: true,
	})

	const [newAlerts, setNewAlerts] = useState<string[]>([])

	const closeAlert = (variant: keyof typeof alerts) => {
		setAlerts((prev) => ({ ...prev, [variant]: false }))
	}

	const addAlert = (variant: string) => {
		const alertId = `${variant}-${Date.now()}`
		setNewAlerts((prev) => [...prev, alertId])
		setTimeout(() => removeAlert(alertId), 5000)
	}

	const removeAlert = (alertId: string) => {
		setNewAlerts((prev) => prev.filter((id) => id !== alertId))
	}

	const resetAlerts = () => {
		setAlerts({ info: true, warning: true, error: true, success: true })
	}

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
			<div className="max-w-4xl mx-auto space-y-8">
				<div className="text-center">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
						Alert Component Demo
					</h1>
					<p className="text-gray-600 dark:text-gray-400">
						Showcasing different alert variants with optional close and action buttons
					</p>
				</div>

				<div className="flex justify-center gap-4 flex-wrap">
					<button
						onClick={resetAlerts}
						className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
					>
						Reset All Alerts
					</button>
					<button
						onClick={() => addAlert('info')}
						className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
					>
						Add Info Alert
					</button>
					<button
						onClick={() => addAlert('success')}
						className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
					>
						Add Success Alert
					</button>
					<button
						onClick={() => addAlert('warning')}
						className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
					>
						Add Warning Alert
					</button>
					<button
						onClick={() => addAlert('error')}
						className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
					>
						Add Error Alert
					</button>
				</div>

				{newAlerts.length > 0 && (
					<section>
						<h2 className="text-xl font-semibold dark:text-gray-100 mb-4">
							Dynamic Alerts (Auto-dismiss in 5s)
						</h2>
						<div className="space-y-4">
							{newAlerts.map((alertId) => {
								const variant = alertId.split('-')[0] as
									| 'info'
									| 'warning'
									| 'error'
									| 'success'
								const titles = {
									info: 'New Information',
									warning: 'Attention Required',
									error: 'Something Went Wrong',
									success: 'Action Completed',
								}
								const messages = {
									info: 'This alert will automatically disappear in 5 seconds.',
									warning: 'This is a dynamically added warning alert with smooth animations.',
									error: 'This error alert demonstrates the fade-out animation when dismissed.',
									success: 'Success! This alert appeared with a smooth fade-in animation.',
								}
								return (
									<Alert
										key={alertId}
										variant={variant}
										title={titles[variant]}
										showCloseButton
										onClose={() => removeAlert(alertId)}
									>
										{messages[variant]}
									</Alert>
								)
							})}
						</div>
					</section>
				)}

				<div className="space-y-6">
					<section>
						<h2 className="text-xl font-semibold dark:text-gray-100 mb-4">All Variants</h2>
						<div className="space-y-4">
							<Alert variant="info">
								This is an informational alert. It provides helpful context or additional
								information.
							</Alert>
							<Alert variant="warning">
								This is a warning alert. It indicates something that needs attention.
							</Alert>
							<Alert variant="error">
								This is an error alert. It indicates something went wrong.
							</Alert>
							<Alert variant="success">
								This is a success alert. It confirms that an action was completed successfully.
							</Alert>
							<Alert variant="tip">
								This is a tip alert. Use it to provide helpful hints or suggestions.
							</Alert>
						</div>
					</section>

					<section>
						<h2 className="text-xl font-semibold dark:text-gray-100 mb-4">
							Dismissible Alerts
						</h2>
						<div className="space-y-4">
							{alerts.info && (
								<Alert
									variant="info"
									title="New Feature Available"
									showCloseButton
									onClose={() => closeAlert('info')}
								>
									Check out our new dashboard analytics feature in the sidebar.
								</Alert>
							)}
							{alerts.warning && (
								<Alert
									variant="warning"
									title="Maintenance Scheduled"
									showCloseButton
									onClose={() => closeAlert('warning')}
								>
									System maintenance is scheduled for tonight from 2–4 AM EST.
								</Alert>
							)}
							{alerts.error && (
								<Alert
									variant="error"
									title="Connection Error"
									showCloseButton
									onClose={() => closeAlert('error')}
								>
									Unable to connect to the server. Please check your internet connection.
								</Alert>
							)}
							{alerts.success && (
								<Alert
									variant="success"
									title="Backup Complete"
									showCloseButton
									onClose={() => closeAlert('success')}
								>
									Your data has been successfully backed up to the cloud.
								</Alert>
							)}
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}

export const Default: Story = {
	render: AlertDemo.bind({}),
	args: {},
}
