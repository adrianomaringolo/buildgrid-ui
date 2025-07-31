// organize-imports-ignore
import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Alert } from './alert'

const meta: Meta<typeof Alert> = {
	component: Alert,
}

export default meta
type Story = StoryObj<typeof Alert>

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

		// Auto-remove after 5 seconds for demo
		setTimeout(() => {
			removeAlert(alertId)
		}, 5000)
	}

	const removeAlert = (alertId: string) => {
		setNewAlerts((prev) => prev.filter((id) => id !== alertId))
	}

	const resetAlerts = () => {
		setAlerts({
			info: true,
			warning: true,
			error: true,
			success: true,
		})
	}

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-4xl mx-auto space-y-8">
				<div className="text-center">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Alert Component Demo</h1>
					<p className="text-gray-600">
						Showcasing different alert variants with optional close and action buttons
					</p>
				</div>

				<div className="flex justify-center gap-4 flex-wrap">
					<button
						onClick={resetAlerts}
						className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
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
						<h2 className="text-xl font-semibold mb-4">
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
									warning:
										'This is a dynamically added warning alert with smooth animations.',
									error:
										'This error alert demonstrates the fade-out animation when dismissed.',
									success:
										'Success! This alert appeared with a smooth fade-in animation.',
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
						<h2 className="text-xl font-semibold mb-4">Basic Alerts</h2>
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
								This is a success alert. It confirms that an action was completed
								successfully.
							</Alert>
						</div>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-4">Alerts with Titles</h2>
						<div className="space-y-4">
							<Alert variant="info" title="Information">
								Your account settings have been updated. Changes will take effect
								immediately.
							</Alert>

							<Alert variant="warning" title="Storage Almost Full">
								{
									"You're using 95% of your storage space. Consider upgrading your plan or deleting unused files."
								}
							</Alert>

							<Alert variant="error" title="Payment Failed">
								Your payment could not be processed. Please check your payment method and
								try again.
							</Alert>

							<Alert variant="success" title="Profile Updated">
								Your profile information has been successfully updated and saved.
							</Alert>
						</div>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-4">Dismissible Alerts</h2>
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
									System maintenance is scheduled for tonight from 2-4 AM EST.
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

					<section>
						<h2 className="text-xl font-semibold mb-4">Alerts with Action Buttons</h2>
						<div className="space-y-4">
							<Alert
								variant="info"
								title="Update Available"
								actionButton={{
									label: 'Update Now',
									onClick: () => alert('Update started!'),
									variant: 'default',
								}}
							>
								A new version of the application is available with bug fixes and
								improvements.
							</Alert>

							<Alert
								variant="warning"
								title="Subscription Expiring"
								actionButton={{
									label: 'Renew Subscription',
									onClick: () => alert('Redirecting to billing...'),
									variant: 'outline',
								}}
								showCloseButton
								onClose={() => alert('Alert dismissed')}
							>
								Your subscription expires in 3 days. Renew now to avoid service
								interruption.
							</Alert>

							<Alert
								variant="error"
								title="Action Required"
								actionButton={{
									label: 'Verify Account',
									onClick: () => alert('Opening verification...'),
									variant: 'default',
								}}
							>
								Your account requires verification to continue using all features.
							</Alert>

							<Alert
								variant="success"
								title="Welcome!"
								actionButton={{
									label: 'Get Started',
									onClick: () => alert('Starting tour...'),
									variant: 'secondary',
								}}
							>
								{
									"Your account has been created successfully. Let's get you started with a quick tour."
								}
							</Alert>
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
