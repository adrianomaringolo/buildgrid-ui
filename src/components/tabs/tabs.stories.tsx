// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BarChart3, Bell, CreditCard, FileText, Home, Lock, Settings, User } from 'lucide-react'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'
import type { TabsListVariantProps, TabsVariantProps } from './tabs'

const meta: Meta<typeof Tabs & TabsListVariantProps & TabsVariantProps> = {
	component: Tabs,
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg', 'xl'],
		},
		variant: {
			control: 'select',
			options: ['default', 'outline'],
		},
	},
	args: {
		size: 'md',
		variant: 'default',
	},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<div className="space-y-10 p-8 max-w-2xl">
			<Tabs defaultValue="overview">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="analytics">Analytics</TabsTrigger>
					<TabsTrigger value="reports">Reports</TabsTrigger>
				</TabsList>
				<TabsContent value="overview">
					<div className="rounded-lg border p-4 text-sm text-muted-foreground">
						Overview content
					</div>
				</TabsContent>
				<TabsContent value="analytics">
					<div className="rounded-lg border p-4 text-sm text-muted-foreground">
						Analytics content
					</div>
				</TabsContent>
				<TabsContent value="reports">
					<div className="rounded-lg border p-4 text-sm text-muted-foreground">
						Reports content
					</div>
				</TabsContent>
			</Tabs>
		</div>
	),
}

export const Sizes: Story = {
	render: () => (
		<div className="space-y-6 p-8 max-w-2xl">
			{(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
				<div key={size} className="space-y-2">
					<p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{size}</p>
					<Tabs defaultValue="tab1">
						<TabsList size={size}>
							<TabsTrigger value="tab1" size={size}>
								Profile
							</TabsTrigger>
							<TabsTrigger value="tab2" size={size}>
								Security
							</TabsTrigger>
							<TabsTrigger value="tab3" size={size}>
								Billing
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
			))}
		</div>
	),
}

export const WithIcons: Story = {
	render: () => (
		<div className="space-y-4 p-8 max-w-2xl">
			<Tabs defaultValue="profile">
				<TabsList>
					<TabsTrigger value="profile">
						<User />
						Profile
					</TabsTrigger>
					<TabsTrigger value="security">
						<Lock />
						Security
					</TabsTrigger>
					<TabsTrigger value="notifications">
						<Bell />
						Notifications
					</TabsTrigger>
					<TabsTrigger value="billing">
						<CreditCard />
						Billing
					</TabsTrigger>
				</TabsList>
				<TabsContent value="profile">
					<div className="rounded-lg border p-6 space-y-3">
						<h3 className="font-semibold">Public Profile</h3>
						<p className="text-sm text-muted-foreground">
							Update your photo and personal details visible to other users.
						</p>
					</div>
				</TabsContent>
				<TabsContent value="security">
					<div className="rounded-lg border p-6 space-y-3">
						<h3 className="font-semibold">Password & Authentication</h3>
						<p className="text-sm text-muted-foreground">
							Manage your password and two-factor authentication settings.
						</p>
					</div>
				</TabsContent>
				<TabsContent value="notifications">
					<div className="rounded-lg border p-6 space-y-3">
						<h3 className="font-semibold">Notification Preferences</h3>
						<p className="text-sm text-muted-foreground">
							Choose which emails and alerts you want to receive.
						</p>
					</div>
				</TabsContent>
				<TabsContent value="billing">
					<div className="rounded-lg border p-6 space-y-3">
						<h3 className="font-semibold">Billing & Plans</h3>
						<p className="text-sm text-muted-foreground">
							Manage your subscription, payment methods, and invoices.
						</p>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	),
}

export const WithBadge: Story = {
	render: () => (
		<div className="space-y-4 p-8 max-w-2xl">
			<Tabs defaultValue="inbox">
				<TabsList>
					<TabsTrigger value="inbox">
						Inbox
						<Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
							12
						</Badge>
					</TabsTrigger>
					<TabsTrigger value="sent">Sent</TabsTrigger>
					<TabsTrigger value="drafts">
						Drafts
						<Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
							3
						</Badge>
					</TabsTrigger>
					<TabsTrigger value="archive">Archive</TabsTrigger>
				</TabsList>
				<TabsContent value="inbox">
					<div className="rounded-lg border divide-y text-sm">
						{[
							'Feature request from Alice',
							'Invoice #1042 is ready',
							'Your trial ends in 3 days',
						].map((subject) => (
							<div key={subject} className="flex items-center justify-between px-4 py-3">
								<span>{subject}</span>
								<span className="text-xs text-muted-foreground">Today</span>
							</div>
						))}
					</div>
				</TabsContent>
				<TabsContent value="sent">
					<div className="rounded-lg border p-4 text-sm text-muted-foreground">
						No sent messages.
					</div>
				</TabsContent>
				<TabsContent value="drafts">
					<div className="rounded-lg border divide-y text-sm">
						{['Re: Partnership proposal', 'Q3 report draft', 'Onboarding checklist'].map(
							(subject) => (
								<div key={subject} className="px-4 py-3">
									{subject}
								</div>
							),
						)}
					</div>
				</TabsContent>
				<TabsContent value="archive">
					<div className="rounded-lg border p-4 text-sm text-muted-foreground">
						Archive is empty.
					</div>
				</TabsContent>
			</Tabs>
		</div>
	),
}

export const WithDisabled: Story = {
	render: () => (
		<div className="space-y-4 p-8 max-w-2xl">
			<Tabs defaultValue="active">
				<TabsList>
					<TabsTrigger value="active">Active</TabsTrigger>
					<TabsTrigger value="paused">Paused</TabsTrigger>
					<TabsTrigger value="archived" disabled>
						Archived
					</TabsTrigger>
				</TabsList>
				<TabsContent value="active">
					<div className="rounded-lg border p-4 text-sm text-muted-foreground">
						3 active campaigns running.
					</div>
				</TabsContent>
				<TabsContent value="paused">
					<div className="rounded-lg border p-4 text-sm text-muted-foreground">
						1 campaign paused.
					</div>
				</TabsContent>
			</Tabs>
		</div>
	),
}

export const Controlled: Story = {
	render: () => {
		const [tab, setTab] = React.useState('profile')
		return (
			<div className="space-y-4 p-8 max-w-2xl">
				<div className="flex items-center gap-2">
					<span className="text-sm text-muted-foreground">Active tab:</span>
					<Badge variant="outline">{tab}</Badge>
					<Button
						size="sm"
						variant="ghost"
						onClick={() => {
							const tabs = ['profile', 'settings', 'stats']
							setTab(tabs[(tabs.indexOf(tab) + 1) % tabs.length])
						}}
					>
						Next tab
					</Button>
				</div>
				<Tabs value={tab} onValueChange={setTab}>
					<TabsList>
						<TabsTrigger value="profile">
							<User />
							Profile
						</TabsTrigger>
						<TabsTrigger value="settings">
							<Settings />
							Settings
						</TabsTrigger>
						<TabsTrigger value="stats">
							<BarChart3 />
							Stats
						</TabsTrigger>
					</TabsList>
					<TabsContent value="profile">
						<div className="rounded-lg border p-4 text-sm text-muted-foreground">
							Profile panel
						</div>
					</TabsContent>
					<TabsContent value="settings">
						<div className="rounded-lg border p-4 text-sm text-muted-foreground">
							Settings panel
						</div>
					</TabsContent>
					<TabsContent value="stats">
						<div className="rounded-lg border p-4 text-sm text-muted-foreground">Stats panel</div>
					</TabsContent>
				</Tabs>
			</div>
		)
	},
}

export const Vertical: Story = {
	render: () => (
		<div className="p-8 max-w-2xl">
			<Tabs defaultValue="general" orientation="vertical" className="flex-row gap-4">
				<TabsList className="flex-col h-auto w-40">
					<TabsTrigger value="general" className="w-full justify-start">
						<Settings />
						General
					</TabsTrigger>
					<TabsTrigger value="security" className="w-full justify-start">
						<Lock />
						Security
					</TabsTrigger>
					<TabsTrigger value="notifications" className="w-full justify-start">
						<Bell />
						Notifications
					</TabsTrigger>
					<TabsTrigger value="billing" className="w-full justify-start">
						<CreditCard />
						Billing
					</TabsTrigger>
				</TabsList>
				<div className="flex-1">
					<TabsContent value="general">
						<div className="rounded-lg border p-6 space-y-2">
							<h3 className="font-semibold">General Settings</h3>
							<p className="text-sm text-muted-foreground">Manage your workspace preferences.</p>
						</div>
					</TabsContent>
					<TabsContent value="security">
						<div className="rounded-lg border p-6 space-y-2">
							<h3 className="font-semibold">Security</h3>
							<p className="text-sm text-muted-foreground">Manage passwords and access controls.</p>
						</div>
					</TabsContent>
					<TabsContent value="notifications">
						<div className="rounded-lg border p-6 space-y-2">
							<h3 className="font-semibold">Notifications</h3>
							<p className="text-sm text-muted-foreground">
								Configure how and when you're alerted.
							</p>
						</div>
					</TabsContent>
					<TabsContent value="billing">
						<div className="rounded-lg border p-6 space-y-2">
							<h3 className="font-semibold">Billing</h3>
							<p className="text-sm text-muted-foreground">Invoices, payment methods, and plans.</p>
						</div>
					</TabsContent>
				</div>
			</Tabs>
		</div>
	),
}

export const Outline: Story = {
	render: () => (
		<div className="space-y-4 p-8 max-w-2xl">
			<Tabs defaultValue="index" variant="outline">
				<TabsList>
					<TabsTrigger value="index">
						<FileText />
						index.ts
					</TabsTrigger>
					<TabsTrigger value="tabs">
						<FileText />
						tabs.tsx
					</TabsTrigger>
					<TabsTrigger value="stories">
						<FileText />
						tabs.stories.tsx
					</TabsTrigger>
					<TabsTrigger value="test">
						<FileText />
						tabs.test.tsx
					</TabsTrigger>
				</TabsList>
				<TabsContent value="index">
					<div className="rounded-b-lg border border-t-0 bg-muted/30 p-4 font-mono text-xs text-muted-foreground leading-relaxed">
						<div>
							<span className="text-blue-500">export</span> {'{'} Tabs, TabsList, TabsTrigger,
							TabsContent {'}'} <span className="text-blue-500">from</span>{' '}
							<span className="text-green-600">'./tabs'</span>
						</div>
					</div>
				</TabsContent>
				<TabsContent value="tabs">
					<div className="rounded-b-lg border border-t-0 bg-muted/30 p-4 font-mono text-xs text-muted-foreground leading-relaxed">
						<div>
							<span className="text-blue-500">'use client'</span>
						</div>
						<div>
							<span className="text-blue-500">import</span> {'{'} cn {'}'}{' '}
							<span className="text-blue-500">from</span>{' '}
							<span className="text-green-600">'@/lib/utils'</span>
						</div>
						<div>
							<span className="text-blue-500">import</span> {'{'} cva {'}'}{' '}
							<span className="text-blue-500">from</span>{' '}
							<span className="text-green-600">'class-variance-authority'</span>
						</div>
					</div>
				</TabsContent>
				<TabsContent value="stories">
					<div className="rounded-b-lg border border-t-0 bg-muted/30 p-4 font-mono text-xs text-muted-foreground leading-relaxed">
						<div>
							<span className="text-slate-400">// organize-imports-ignore</span>
						</div>
						<div>
							<span className="text-blue-500">import</span> React{' '}
							<span className="text-blue-500">from</span>{' '}
							<span className="text-green-600">'react'</span>
						</div>
					</div>
				</TabsContent>
				<TabsContent value="test">
					<div className="rounded-b-lg border border-t-0 bg-muted/30 p-4 font-mono text-xs text-muted-foreground leading-relaxed">
						<div>
							<span className="text-blue-500">import</span> {'{'} render, screen {'}'}{' '}
							<span className="text-blue-500">from</span>{' '}
							<span className="text-green-600">'@testing-library/react'</span>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	),
}

export const CollapseLabel: Story = {
	render: () => (
		<div className="space-y-8 p-8 max-w-2xl">
			<div className="space-y-2">
				<p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
					Default variant
				</p>
				<Tabs defaultValue="overview">
					<TabsList>
						<TabsTrigger value="overview" collapseLabel>
							<Home />
							Overview
						</TabsTrigger>
						<TabsTrigger value="analytics" collapseLabel>
							<BarChart3 />
							Analytics
						</TabsTrigger>
						<TabsTrigger value="settings" collapseLabel>
							<Settings />
							Settings
						</TabsTrigger>
						<TabsTrigger value="profile" collapseLabel>
							<User />
							Profile
						</TabsTrigger>
					</TabsList>
					<TabsContent value="overview">
						<div className="rounded-lg border p-4 text-sm text-muted-foreground">Overview</div>
					</TabsContent>
					<TabsContent value="analytics">
						<div className="rounded-lg border p-4 text-sm text-muted-foreground">Analytics</div>
					</TabsContent>
					<TabsContent value="settings">
						<div className="rounded-lg border p-4 text-sm text-muted-foreground">Settings</div>
					</TabsContent>
					<TabsContent value="profile">
						<div className="rounded-lg border p-4 text-sm text-muted-foreground">Profile</div>
					</TabsContent>
				</Tabs>
			</div>

			<div className="space-y-2">
				<p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
					Outline variant
				</p>
				<Tabs defaultValue="overview" variant="outline">
					<TabsList>
						<TabsTrigger value="overview" collapseLabel>
							<Home />
							Overview
						</TabsTrigger>
						<TabsTrigger value="analytics" collapseLabel>
							<BarChart3 />
							Analytics
						</TabsTrigger>
						<TabsTrigger value="settings" collapseLabel>
							<Settings />
							Settings
						</TabsTrigger>
						<TabsTrigger value="profile" collapseLabel>
							<User />
							Profile
						</TabsTrigger>
					</TabsList>
					<TabsContent value="overview">
						<div className="border border-t-0 rounded-b-lg p-4 text-sm text-muted-foreground">
							Overview
						</div>
					</TabsContent>
					<TabsContent value="analytics">
						<div className="border border-t-0 rounded-b-lg p-4 text-sm text-muted-foreground">
							Analytics
						</div>
					</TabsContent>
					<TabsContent value="settings">
						<div className="border border-t-0 rounded-b-lg p-4 text-sm text-muted-foreground">
							Settings
						</div>
					</TabsContent>
					<TabsContent value="profile">
						<div className="border border-t-0 rounded-b-lg p-4 text-sm text-muted-foreground">
							Profile
						</div>
					</TabsContent>
				</Tabs>
			</div>

			<div className="space-y-2">
				<p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
					Mixed — only some tabs collapse
				</p>
				<Tabs defaultValue="notifications">
					<TabsList>
						<TabsTrigger value="notifications">
							<Bell />
							Notifications
						</TabsTrigger>
						<TabsTrigger value="security" collapseLabel>
							<Lock />
							Security
						</TabsTrigger>
						<TabsTrigger value="billing" collapseLabel>
							<CreditCard />
							Billing
						</TabsTrigger>
					</TabsList>
					<TabsContent value="notifications">
						<div className="rounded-lg border p-4 text-sm text-muted-foreground">
							Notifications
						</div>
					</TabsContent>
					<TabsContent value="security">
						<div className="rounded-lg border p-4 text-sm text-muted-foreground">Security</div>
					</TabsContent>
					<TabsContent value="billing">
						<div className="rounded-lg border p-4 text-sm text-muted-foreground">Billing</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	),
}

export const OutlineSizes: Story = {
	render: () => (
		<div className="space-y-8 p-8 max-w-2xl">
			{(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
				<div key={size} className="space-y-2">
					<p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{size}</p>
					<Tabs defaultValue="tab1" variant="outline">
						<TabsList size={size}>
							<TabsTrigger value="tab1" size={size}>
								Overview
							</TabsTrigger>
							<TabsTrigger value="tab2" size={size}>
								Analytics
							</TabsTrigger>
							<TabsTrigger value="tab3" size={size}>
								Settings
							</TabsTrigger>
						</TabsList>
						<TabsContent value="tab1">
							<div className="border border-t-0 rounded-b-lg p-3 text-xs text-muted-foreground">
								Overview panel
							</div>
						</TabsContent>
						<TabsContent value="tab2">
							<div className="border border-t-0 rounded-b-lg p-3 text-xs text-muted-foreground">
								Analytics panel
							</div>
						</TabsContent>
						<TabsContent value="tab3">
							<div className="border border-t-0 rounded-b-lg p-3 text-xs text-muted-foreground">
								Settings panel
							</div>
						</TabsContent>
					</Tabs>
				</div>
			))}
		</div>
	),
}
