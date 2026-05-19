// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
	BadgeCheck,
	Building2,
	CreditCard,
	Eye,
	FileText,
	ListChecks,
	MapPin,
	Paperclip,
	PlusCircle,
	User,
} from 'lucide-react'
import { useWizard } from './use-wizard'
import { WizardProgress, WizardProgressStep } from './wizard'

const meta: Meta<typeof WizardProgress> = {
	component: WizardProgress,
}
export default meta
type Story = StoryObj<typeof WizardProgress>

// Shared step definitions for stories without per-step content
const paymentSteps = [
	{ label: 'Payment', icon: CreditCard },
	{ label: 'Pending', icon: ListChecks },
	{ label: 'Extras', icon: PlusCircle },
	{ label: 'Details', icon: FileText },
	{ label: 'Receipt', icon: Paperclip },
	{ label: 'Review', icon: Eye },
]

export const Step1: Story = {
	render: () => (
		<div className="p-8 max-w-2xl">
			<WizardProgress currentStep={1}>
				{paymentSteps.map((s) => (
					<WizardProgressStep key={s.label} label={s.label} icon={s.icon} />
				))}
			</WizardProgress>
		</div>
	),
}

export const Step3: Story = {
	render: () => (
		<div className="p-8 max-w-2xl">
			<WizardProgress currentStep={3}>
				{paymentSteps.map((s) => (
					<WizardProgressStep key={s.label} label={s.label} icon={s.icon} />
				))}
			</WizardProgress>
		</div>
	),
}

export const LastStep: Story = {
	render: () => (
		<div className="p-8 max-w-2xl">
			<WizardProgress currentStep={6}>
				{paymentSteps.map((s) => (
					<WizardProgressStep key={s.label} label={s.label} icon={s.icon} />
				))}
			</WizardProgress>
		</div>
	),
}

export const FourSteps: Story = {
	render: () => (
		<div className="p-8 max-w-xl">
			<WizardProgress currentStep={2}>
				<WizardProgressStep label="Profile" icon={User} />
				<WizardProgressStep label="Address" icon={MapPin} />
				<WizardProgressStep label="Documents" icon={FileText} />
				<WizardProgressStep label="Review" icon={BadgeCheck} />
			</WizardProgress>
		</div>
	),
}

export const Interactive: Story = {
	render: () => {
		const wizard = useWizard({ totalSteps: paymentSteps.length, initial: 3 })
		return (
			<div className="p-8 max-w-2xl space-y-6">
				<WizardProgress currentStep={wizard.currentStep} onGoToStep={wizard.goToStep}>
					{paymentSteps.map((s) => (
						<WizardProgressStep key={s.label} label={s.label} icon={s.icon} />
					))}
				</WizardProgress>
				<div className="flex gap-2 justify-center">
					<button
						className="px-4 py-2 rounded bg-muted text-sm disabled:opacity-40"
						onClick={wizard.goPrevious}
						disabled={!wizard.canGoPrevious}
					>
						Back
					</button>
					<button
						className="px-4 py-2 rounded bg-primary text-primary-foreground text-sm disabled:opacity-40"
						onClick={wizard.goNext}
						disabled={!wizard.canGoNext}
					>
						Next
					</button>
				</div>
			</div>
		)
	},
}

export const WithStepContent: Story = {
	render: () => {
		const wizard = useWizard({ totalSteps: 4 })

		return (
			<div className="p-8 max-w-xl space-y-6">
				<WizardProgress currentStep={wizard.currentStep} onGoToStep={wizard.goToStep}>
					<WizardProgressStep label="Profile" icon={User}>
						<div className="rounded-lg border p-6 space-y-4">
							<h2 className="text-lg font-semibold">Personal information</h2>
							<p className="text-sm text-muted-foreground">
								Tell us a bit about yourself so we can personalise your experience.
							</p>
							<div className="grid grid-cols-2 gap-3">
								<div className="space-y-1">
									<label className="text-sm font-medium">First name</label>
									<input
										className="w-full rounded-md border px-3 py-2 text-sm bg-background"
										placeholder="Jane"
									/>
								</div>
								<div className="space-y-1">
									<label className="text-sm font-medium">Last name</label>
									<input
										className="w-full rounded-md border px-3 py-2 text-sm bg-background"
										placeholder="Smith"
									/>
								</div>
							</div>
							<div className="space-y-1">
								<label className="text-sm font-medium">Email</label>
								<input
									className="w-full rounded-md border px-3 py-2 text-sm bg-background"
									placeholder="jane@acme.com"
								/>
							</div>
						</div>
					</WizardProgressStep>

					<WizardProgressStep label="Company" icon={Building2}>
						<div className="rounded-lg border p-6 space-y-4">
							<h2 className="text-lg font-semibold">Company details</h2>
							<p className="text-sm text-muted-foreground">
								Let us know where you work so we can tailor billing and team features.
							</p>
							<div className="space-y-1">
								<label className="text-sm font-medium">Company name</label>
								<input
									className="w-full rounded-md border px-3 py-2 text-sm bg-background"
									placeholder="Acme Corp"
								/>
							</div>
							<div className="space-y-1">
								<label className="text-sm font-medium">Industry</label>
								<select className="w-full rounded-md border px-3 py-2 text-sm bg-background">
									<option>Software & Technology</option>
									<option>Finance</option>
									<option>Healthcare</option>
									<option>Other</option>
								</select>
							</div>
						</div>
					</WizardProgressStep>

					<WizardProgressStep label="Address" icon={MapPin}>
						<div className="rounded-lg border p-6 space-y-4">
							<h2 className="text-lg font-semibold">Billing address</h2>
							<p className="text-sm text-muted-foreground">
								Used for invoices and tax purposes only.
							</p>
							<div className="space-y-1">
								<label className="text-sm font-medium">Street</label>
								<input
									className="w-full rounded-md border px-3 py-2 text-sm bg-background"
									placeholder="123 Main St"
								/>
							</div>
							<div className="grid grid-cols-2 gap-3">
								<div className="space-y-1">
									<label className="text-sm font-medium">City</label>
									<input
										className="w-full rounded-md border px-3 py-2 text-sm bg-background"
										placeholder="New York"
									/>
								</div>
								<div className="space-y-1">
									<label className="text-sm font-medium">Postal code</label>
									<input
										className="w-full rounded-md border px-3 py-2 text-sm bg-background"
										placeholder="10001"
									/>
								</div>
							</div>
						</div>
					</WizardProgressStep>

					<WizardProgressStep label="Review" icon={BadgeCheck}>
						<div className="rounded-lg border p-6 space-y-4">
							<h2 className="text-lg font-semibold">Review & confirm</h2>
							<p className="text-sm text-muted-foreground">
								Everything looks good? Submit to create your account.
							</p>
							<div className="rounded-lg border divide-y text-sm">
								<div className="flex justify-between px-4 py-2">
									<span className="text-muted-foreground">Name</span>
									<span className="font-medium">Jane Smith</span>
								</div>
								<div className="flex justify-between px-4 py-2">
									<span className="text-muted-foreground">Email</span>
									<span className="font-medium">jane@acme.com</span>
								</div>
								<div className="flex justify-between px-4 py-2">
									<span className="text-muted-foreground">Company</span>
									<span className="font-medium">Acme Corp</span>
								</div>
								<div className="flex justify-between px-4 py-2">
									<span className="text-muted-foreground">Address</span>
									<span className="font-medium">123 Main St, New York</span>
								</div>
							</div>
						</div>
					</WizardProgressStep>
				</WizardProgress>

				<div className="flex justify-between">
					<button
						className="px-4 py-2 rounded-md border text-sm disabled:opacity-40"
						onClick={wizard.goPrevious}
						disabled={!wizard.canGoPrevious}
					>
						Back
					</button>
					<button
						className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm disabled:opacity-40"
						onClick={wizard.goNext}
						disabled={!wizard.canGoNext}
					>
						{wizard.currentStep === 4 ? 'Submit' : 'Next'}
					</button>
				</div>
			</div>
		)
	},
}

export const FreeNavigation: Story = {
	render: () => {
		const wizard = useWizard({ totalSteps: 4 })

		return (
			<div className="p-8 max-w-xl space-y-6">
				<p className="text-xs text-muted-foreground">
					Click any step circle to jump directly to it.
				</p>
				<WizardProgress currentStep={wizard.currentStep} onGoToStep={wizard.goToStep} freeNavigation>
					<WizardProgressStep label="Profile" icon={User}>
						<div className="rounded-lg border p-6 space-y-4">
							<h2 className="text-lg font-semibold">Personal information</h2>
							<div className="grid grid-cols-2 gap-3">
								<div className="space-y-1">
									<label className="text-sm font-medium">First name</label>
									<input
										className="w-full rounded-md border px-3 py-2 text-sm bg-background"
										placeholder="Jane"
									/>
								</div>
								<div className="space-y-1">
									<label className="text-sm font-medium">Last name</label>
									<input
										className="w-full rounded-md border px-3 py-2 text-sm bg-background"
										placeholder="Smith"
									/>
								</div>
							</div>
						</div>
					</WizardProgressStep>

					<WizardProgressStep label="Company" icon={Building2}>
						<div className="rounded-lg border p-6 space-y-4">
							<h2 className="text-lg font-semibold">Company details</h2>
							<div className="space-y-1">
								<label className="text-sm font-medium">Company name</label>
								<input
									className="w-full rounded-md border px-3 py-2 text-sm bg-background"
									placeholder="Acme Corp"
								/>
							</div>
						</div>
					</WizardProgressStep>

					<WizardProgressStep label="Address" icon={MapPin}>
						<div className="rounded-lg border p-6 space-y-4">
							<h2 className="text-lg font-semibold">Billing address</h2>
							<div className="space-y-1">
								<label className="text-sm font-medium">Street</label>
								<input
									className="w-full rounded-md border px-3 py-2 text-sm bg-background"
									placeholder="123 Main St"
								/>
							</div>
						</div>
					</WizardProgressStep>

					<WizardProgressStep label="Review" icon={BadgeCheck}>
						<div className="rounded-lg border p-6 space-y-4">
							<h2 className="text-lg font-semibold">Review & confirm</h2>
							<div className="rounded-lg border divide-y text-sm">
								<div className="flex justify-between px-4 py-2">
									<span className="text-muted-foreground">Name</span>
									<span className="font-medium">Jane Smith</span>
								</div>
								<div className="flex justify-between px-4 py-2">
									<span className="text-muted-foreground">Company</span>
									<span className="font-medium">Acme Corp</span>
								</div>
							</div>
						</div>
					</WizardProgressStep>
				</WizardProgress>

				<div className="flex justify-between">
					<button
						className="px-4 py-2 rounded-md border text-sm disabled:opacity-40"
						onClick={wizard.goPrevious}
						disabled={!wizard.canGoPrevious}
					>
						Back
					</button>
					<button
						className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm disabled:opacity-40"
						onClick={wizard.goNext}
						disabled={!wizard.canGoNext}
					>
						{wizard.currentStep === 4 ? 'Submit' : 'Next'}
					</button>
				</div>
			</div>
		)
	},
}

export const WithDisabledSteps: Story = {
	render: () => {
		const wizard = useWizard({ totalSteps: 6, disabled: [3, 5] })
		return (
			<div className="p-8 max-w-2xl space-y-6">
				<p className="text-xs text-muted-foreground">
					Steps 3 and 5 are disabled — Next/Back skip them automatically.
				</p>
				<WizardProgress currentStep={wizard.currentStep} onGoToStep={wizard.goToStep} freeNavigation>
					<WizardProgressStep label="Payment" icon={CreditCard} />
					<WizardProgressStep label="Pending" icon={ListChecks} />
					<WizardProgressStep label="Extras" icon={PlusCircle} disabled />
					<WizardProgressStep label="Details" icon={FileText} />
					<WizardProgressStep label="Receipt" icon={Paperclip} disabled />
					<WizardProgressStep label="Review" icon={Eye} />
				</WizardProgress>
				<div className="flex gap-2 justify-center">
					<button
						className="px-4 py-2 rounded bg-muted text-sm disabled:opacity-40"
						onClick={wizard.goPrevious}
						disabled={!wizard.canGoPrevious}
					>
						Back
					</button>
					<button
						className="px-4 py-2 rounded bg-primary text-primary-foreground text-sm disabled:opacity-40"
						onClick={wizard.goNext}
						disabled={!wizard.canGoNext}
					>
						Next
					</button>
				</div>
			</div>
		)
	},
}

export const IconsOnly: Story = {
	render: () => (
		<div className="p-8 max-w-2xl space-y-8">
			<div className="space-y-1">
				<p className="text-sm text-muted-foreground font-medium">Step 1 of 6</p>
				<WizardProgress currentStep={1} showLabels={false}>
					{paymentSteps.map((s) => (
						<WizardProgressStep key={s.label} label={s.label} icon={s.icon} />
					))}
				</WizardProgress>
			</div>
			<div className="space-y-1">
				<p className="text-sm text-muted-foreground font-medium">Step 3 of 6</p>
				<WizardProgress currentStep={3} showLabels={false}>
					{paymentSteps.map((s) => (
						<WizardProgressStep key={s.label} label={s.label} icon={s.icon} />
					))}
				</WizardProgress>
			</div>
			<div className="space-y-1">
				<p className="text-sm text-muted-foreground font-medium">With disabled steps</p>
				<WizardProgress currentStep={2} showLabels={false}>
					<WizardProgressStep label="Payment" icon={CreditCard} />
					<WizardProgressStep label="Pending" icon={ListChecks} />
					<WizardProgressStep label="Extras" icon={PlusCircle} disabled />
					<WizardProgressStep label="Details" icon={FileText} />
				</WizardProgress>
			</div>
		</div>
	),
}

export const Default: Story = {
	render: () => (
		<div className="p-8 space-y-10 max-w-2xl">
			<div className="space-y-1">
				<p className="text-sm text-muted-foreground font-medium">Step 1 of 6</p>
				<WizardProgress currentStep={1}>
					{paymentSteps.map((s) => (
						<WizardProgressStep key={s.label} label={s.label} icon={s.icon} />
					))}
				</WizardProgress>
			</div>
			<div className="space-y-1">
				<p className="text-sm text-muted-foreground font-medium">Step 3 of 6</p>
				<WizardProgress currentStep={3}>
					{paymentSteps.map((s) => (
						<WizardProgressStep key={s.label} label={s.label} icon={s.icon} />
					))}
				</WizardProgress>
			</div>
			<div className="space-y-1">
				<p className="text-sm text-muted-foreground font-medium">Step 6 of 6</p>
				<WizardProgress currentStep={6}>
					{paymentSteps.map((s) => (
						<WizardProgressStep key={s.label} label={s.label} icon={s.icon} />
					))}
				</WizardProgress>
			</div>
			<div className="space-y-1">
				<p className="text-sm text-muted-foreground font-medium">4-step onboarding</p>
				<WizardProgress currentStep={2}>
					<WizardProgressStep label="Profile" icon={User} />
					<WizardProgressStep label="Address" icon={MapPin} />
					<WizardProgressStep label="Documents" icon={FileText} />
					<WizardProgressStep label="Review" icon={BadgeCheck} />
				</WizardProgress>
			</div>
		</div>
	),
}
