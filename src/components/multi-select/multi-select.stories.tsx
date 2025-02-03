// organize-imports-ignore
import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { MultiSelect } from './multi-select'
import { Cat, Dog, Turtle } from 'lucide-react'

const meta: Meta<typeof MultiSelect> = {
	component: MultiSelect,
}

export default meta
type Story = StoryObj<typeof MultiSelect>

const frameworksList = [
	{ value: 'react', label: 'React', icon: Turtle },
	{ value: 'angular', label: 'Angular', icon: Cat },
	{ value: 'vue', label: 'Vue', icon: Dog },
	{ value: 'svelte', label: 'Svelte' },
	{ value: 'ember', label: 'Ember' },
]

const Template = () => {
	const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
		'react',
		'angular',
	])

	return (
		<div className="max-w-96">
			<MultiSelect
				options={frameworksList}
				onValueChange={setSelectedFrameworks}
				defaultValue={selectedFrameworks}
				placeholder="Select frameworks"
				variant="inverted"
				maxCount={3}
			/>
			Selected: {selectedFrameworks.join(', ')}
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
