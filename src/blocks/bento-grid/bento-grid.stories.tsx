// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BentoCard, BentoGrid } from './bento-grid'

const meta: Meta<typeof BentoGrid> = {
	component: BentoGrid,
}

export default meta
type Story = StoryObj<typeof BentoGrid>

const features = [
	{
		className: 'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3 bg-red-200',
		element: <>Item 1</>,
	},
	{
		element: <>Item 2</>,
		className: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 bg-blue-200',
	},
	{
		element: <>Item 3</>,
		className: 'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4 bg-green-200',
	},
	{
		element: <>Item 4</>,
		className: 'lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2 bg-purle-200',
	},
	{
		element: <>Item 5</>,
		className: 'lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4 bg-yellow-200',
	},
	{
		element: <>Item 6</>,
		className: 'lg:col-start-1 lg:col-end-3 lg:row-start-4 lg:row-end-6 bg-orange-200',
	},
	{
		element: <>Item 7</>,
		className: 'lg:col-start-3 lg:col-end-4 lg:row-start-4 lg:row-end-5 bg-teal-200',
	},
	{
		element: <>Item 8</>,
		className: 'lg:col-start-3 lg:col-end-4 lg:row-start-5 lg:row-end-6 bg-emerald-200',
	},
]

const Template = () => (
	<BentoGrid className="lg:grid-rows-5">
		{features.map(({ className, element }, index) => (
			<BentoCard
				key={index}
				className={`${className} p-4 hover:scale-105 transition-transform hover:z-50`}
			>
				{element}
			</BentoCard>
		))}
	</BentoGrid>
)

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
