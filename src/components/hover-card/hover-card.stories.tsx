// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CalendarDays, ExternalLink, Link } from 'lucide-react'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '.'
import { Button } from '../button/button'

const meta: Meta<typeof HoverCard> = {
	component: HoverCard,
}

export default meta
type Story = StoryObj<typeof HoverCard>

export const UserProfile: Story = {
	render: () => (
		<div className="max-w-2xl p-6 space-y-4 flex items-start gap-4">
			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant="link" className="p-0 h-auto font-medium">
						@adriano_dev
					</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-72">
					<div className="flex gap-3">
						<div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
							A
						</div>
						<div className="flex flex-col gap-1">
							<p className="text-sm font-semibold leading-none">Adriano Maringolo</p>
							<p className="text-xs text-muted-foreground">@adriano_dev</p>
							<p className="text-sm text-muted-foreground mt-1">
								Frontend engineer building open-source component libraries.
							</p>
							<div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
								<CalendarDays className="size-3" />
								<span>Joined January 2021</span>
							</div>
						</div>
					</div>
				</HoverCardContent>
			</HoverCard>
		</div>
	),
}

export const LinkPreview: Story = {
	render: () => (
		<div className="max-w-2xl p-6 space-y-4">
			<p className="text-sm text-muted-foreground">
				Check out{' '}
				<HoverCard>
					<HoverCardTrigger asChild>
						<a
							href="https://radix-ui.com"
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4 hover:no-underline"
						>
							Radix UI
							<ExternalLink className="size-3" />
						</a>
					</HoverCardTrigger>
					<HoverCardContent align="start">
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<div className="h-8 w-8 rounded bg-black flex items-center justify-center">
									<Link className="size-4 text-white" />
								</div>
								<div>
									<p className="text-sm font-semibold">Radix UI</p>
									<p className="text-xs text-muted-foreground">radix-ui.com</p>
								</div>
							</div>
							<p className="text-sm text-muted-foreground">
								Unstyled, accessible components for building high-quality design systems
								and web apps in React.
							</p>
							<div className="flex gap-2 text-xs text-muted-foreground">
								<span>⭐ 14.2k stars</span>
								<span>·</span>
								<span>MIT License</span>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>{' '}
				for accessible primitives.
			</p>
		</div>
	),
}

export const DateRange: Story = {
	render: () => (
		<div className="max-w-2xl p-6 space-y-4">
			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						<CalendarDays className="size-4" />
						Q2 2026
					</Button>
				</HoverCardTrigger>
				<HoverCardContent align="start" className="w-72">
					<div className="space-y-3">
						<div>
							<p className="text-sm font-semibold">Q2 2026 — Sprint Overview</p>
							<p className="text-xs text-muted-foreground mt-0.5">
								April 1 – June 30, 2026
							</p>
						</div>
						<div className="grid grid-cols-2 gap-2 text-xs">
							<div className="rounded-md bg-muted p-2">
								<p className="font-medium text-muted-foreground">Start</p>
								<p className="font-semibold mt-0.5">Apr 1, 2026</p>
							</div>
							<div className="rounded-md bg-muted p-2">
								<p className="font-medium text-muted-foreground">End</p>
								<p className="font-semibold mt-0.5">Jun 30, 2026</p>
							</div>
							<div className="rounded-md bg-muted p-2">
								<p className="font-medium text-muted-foreground">Duration</p>
								<p className="font-semibold mt-0.5">91 days</p>
							</div>
							<div className="rounded-md bg-muted p-2">
								<p className="font-medium text-muted-foreground">Progress</p>
								<p className="font-semibold mt-0.5 text-green-600">On track</p>
							</div>
						</div>
					</div>
				</HoverCardContent>
			</HoverCard>
		</div>
	),
}

export const Default: Story = {
	render: () => (
		<div className="max-w-2xl p-6 space-y-8">
			<div>
				<p className="text-sm font-medium text-muted-foreground mb-4">User Profile</p>
				<HoverCard>
					<HoverCardTrigger asChild>
						<Button variant="link" className="p-0 h-auto font-medium">
							@adriano_dev
						</Button>
					</HoverCardTrigger>
					<HoverCardContent className="w-72">
						<div className="flex gap-3">
							<div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
								A
							</div>
							<div className="flex flex-col gap-1">
								<p className="text-sm font-semibold leading-none">Adriano Maringolo</p>
								<p className="text-xs text-muted-foreground">@adriano_dev</p>
								<p className="text-sm text-muted-foreground mt-1">
									Frontend engineer building open-source component libraries.
								</p>
								<div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
									<CalendarDays className="size-3" />
									<span>Joined January 2021</span>
								</div>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>
			</div>

			<div>
				<p className="text-sm font-medium text-muted-foreground mb-4">Date Range</p>
				<HoverCard>
					<HoverCardTrigger asChild>
						<Button variant="outline" size="sm" className="gap-2">
							<CalendarDays className="size-4" />
							Q2 2026
						</Button>
					</HoverCardTrigger>
					<HoverCardContent align="start" className="w-72">
						<div className="space-y-2">
							<p className="text-sm font-semibold">Q2 2026 — Sprint Overview</p>
							<p className="text-xs text-muted-foreground">April 1 – June 30, 2026</p>
							<div className="flex gap-2 text-xs">
								<span className="rounded bg-muted px-2 py-1">91 days</span>
								<span className="rounded bg-green-100 text-green-700 px-2 py-1">
									On track
								</span>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>
			</div>

			<div>
				<p className="text-sm font-medium text-muted-foreground mb-4">Link Preview</p>
				<p className="text-sm">
					Visit{' '}
					<HoverCard>
						<HoverCardTrigger asChild>
							<a
								href="#"
								className="font-medium text-primary underline underline-offset-4 hover:no-underline"
							>
								Radix UI
							</a>
						</HoverCardTrigger>
						<HoverCardContent align="start">
							<div className="space-y-1.5">
								<p className="text-sm font-semibold">Radix UI</p>
								<p className="text-xs text-muted-foreground">radix-ui.com</p>
								<p className="text-sm text-muted-foreground">
									Unstyled, accessible UI primitives for React.
								</p>
							</div>
						</HoverCardContent>
					</HoverCard>{' '}
					for more information.
				</p>
			</div>
		</div>
	),
}
