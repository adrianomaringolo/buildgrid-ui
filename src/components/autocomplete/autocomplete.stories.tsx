// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Autocomplete } from './autocomplete'

const meta: Meta<typeof Autocomplete> = {
	title: 'Components/input/autocomplete',
	component: Autocomplete,
}

export default meta
type Story = StoryObj<typeof Autocomplete>

// list of 50 names of countries
const options = [
	'United States',
	'Canada',
	'Argentina',
	'Brazil',
	'Chile',
	'Colombia',
	'Ecuador',
	'Peru',
	'Uruguay',
	'Venezuela',
	'Australia',
	'China',
	'India',
	'Indonesia',
	'Japan',
	'Korea',
	'Malaysia',
	'Philippines',
	'Singapore',
	'Thailand',
	'Vietnam',
	'Austria',
	'Belgium',
	'Croatia',
	'Denmark',
	'Finland',
	'France',
	'Germany',
	'Greece',
	'Hungary',
	'Ireland',
	'Italy',
	'Netherlands',
	'Norway',
	'Poland',
	'Portugal',
	'Romania',
	'Russia',
	'Spain',
	'Sweden',
	'Switzerland',
	'Turkey',
	'Ukraine',
	'United Kingdom',
	'Egypt',
	'Nigeria',
	'South Africa',
	'Kenya',
]

const Template = () => {
	const [value, setValue] = React.useState('')
	return (
		<div className="w-80">
			<Autocomplete
				value={value}
				onChange={(value) => setValue(value)}
				options={options.map((option) => ({ value: option, label: option }))}
			/>
			<p className="mt-4">Selected value: {value}</p>
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}