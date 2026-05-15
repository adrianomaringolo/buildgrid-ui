// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ScrollArea, ScrollBar } from '.'

const meta: Meta<typeof ScrollArea> = {
	component: ScrollArea,
}

export default meta
type Story = StoryObj<typeof ScrollArea>

const tags = [
	'React',
	'TypeScript',
	'Tailwind CSS',
	'Radix UI',
	'Storybook',
	'Vitest',
	'Vite',
	'shadcn/ui',
	'Node.js',
	'GraphQL',
	'REST API',
	'PostgreSQL',
	'Docker',
	'CI/CD',
	'GitHub Actions',
]

const frameworks = [
	{ name: 'React', version: '19.x', type: 'UI Library' },
	{ name: 'Next.js', version: '15.x', type: 'Framework' },
	{ name: 'Remix', version: '2.x', type: 'Framework' },
	{ name: 'Vite', version: '7.x', type: 'Build Tool' },
	{ name: 'Astro', version: '5.x', type: 'Framework' },
	{ name: 'SvelteKit', version: '2.x', type: 'Framework' },
	{ name: 'Nuxt', version: '3.x', type: 'Framework' },
	{ name: 'Angular', version: '19.x', type: 'Framework' },
	{ name: 'Ember', version: '6.x', type: 'Framework' },
	{ name: 'Backbone', version: '1.x', type: 'Library' },
	{ name: 'Preact', version: '10.x', type: 'UI Library' },
	{ name: 'Solid', version: '1.x', type: 'UI Library' },
]

export const VerticalList: Story = {
	render: () => (
		<div className="max-w-2xl p-6 space-y-4">
			<p className="text-sm text-muted-foreground">Scroll vertically through the list</p>
			<ScrollArea className="h-72 w-48 rounded-md border">
				<div className="p-4">
					<h4 className="mb-4 text-sm font-medium leading-none">Frameworks</h4>
					{frameworks.map((fw) => (
						<React.Fragment key={fw.name}>
							<div className="text-sm py-2">
								<span className="font-medium">{fw.name}</span>
								<span className="text-muted-foreground ml-1 text-xs">({fw.version})</span>
							</div>
							<hr className="my-1" />
						</React.Fragment>
					))}
				</div>
			</ScrollArea>
		</div>
	),
}

export const HorizontalScroll: Story = {
	render: () => (
		<div className="max-w-2xl p-6 space-y-4">
			<p className="text-sm text-muted-foreground">Scroll horizontally through the content</p>
			<ScrollArea className="w-96 whitespace-nowrap rounded-md border">
				<div className="flex w-max space-x-4 p-4">
					{Array.from({ length: 20 }, (_, i) => (
						<figure key={i} className="shrink-0">
							<div className="overflow-hidden rounded-md">
								<div
									className="h-24 w-32 rounded-md bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg"
								>
									{i + 1}
								</div>
							</div>
							<figcaption className="pt-2 text-xs text-muted-foreground">
								Image {i + 1}
							</figcaption>
						</figure>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	),
}

export const BothAxes: Story = {
	render: () => (
		<div className="max-w-2xl p-6 space-y-4">
			<p className="text-sm text-muted-foreground">Scroll both vertically and horizontally</p>
			<ScrollArea className="h-64 w-96 rounded-md border">
				<div className="p-4" style={{ width: '600px' }}>
					<table className="text-sm w-full">
						<thead>
							<tr className="border-b">
								<th className="text-left py-2 pr-4 font-medium">Name</th>
								<th className="text-left py-2 pr-4 font-medium">Version</th>
								<th className="text-left py-2 pr-4 font-medium">Type</th>
								<th className="text-left py-2 pr-4 font-medium">Status</th>
								<th className="text-left py-2 pr-4 font-medium">License</th>
							</tr>
						</thead>
						<tbody>
							{frameworks.map((fw) => (
								<tr key={fw.name} className="border-b last:border-0">
									<td className="py-2 pr-4">{fw.name}</td>
									<td className="py-2 pr-4 text-muted-foreground">{fw.version}</td>
									<td className="py-2 pr-4">{fw.type}</td>
									<td className="py-2 pr-4 text-green-600">Stable</td>
									<td className="py-2 pr-4">MIT</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	),
}

export const Tags: Story = {
	render: () => (
		<div className="max-w-2xl p-6 space-y-4">
			<p className="text-sm text-muted-foreground">Horizontal tag list with scroll</p>
			<ScrollArea className="w-80 whitespace-nowrap rounded-md border px-3 py-2">
				<div className="flex gap-2">
					{tags.map((tag) => (
						<span
							key={tag}
							className="inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors"
						>
							{tag}
						</span>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	),
}

export const Default: Story = {
	render: () => (
		<div className="max-w-2xl p-6 space-y-8">
			<div>
				<p className="text-sm font-medium mb-3">Vertical List</p>
				<ScrollArea className="h-48 w-48 rounded-md border">
					<div className="p-4">
						{frameworks.map((fw) => (
							<React.Fragment key={fw.name}>
								<div className="text-sm py-1.5">{fw.name}</div>
								<hr />
							</React.Fragment>
						))}
					</div>
				</ScrollArea>
			</div>

			<div>
				<p className="text-sm font-medium mb-3">Horizontal Tags</p>
				<ScrollArea className="w-80 whitespace-nowrap rounded-md border px-3 py-2">
					<div className="flex gap-2">
						{tags.map((tag) => (
							<span
								key={tag}
								className="inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
							>
								{tag}
							</span>
						))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
		</div>
	),
}
