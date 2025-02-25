// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Month, MonthNavigator } from './month-navigator'

const meta: Meta<typeof MonthNavigator> = {
	component: MonthNavigator,
}

export default meta
type Story = StoryObj<typeof MonthNavigator>

const Template = () => {
	const [month, setMonth] = React.useState(new Date().getMonth() as Month)
	const [year, setYear] = React.useState(new Date().getFullYear())

	return (
		<div className="w-96 border rounded-md p-4">
			<MonthNavigator
				currentMonth={month}
				currentYear={year}
				onChangeMonthYear={(month, year) => {
					setMonth(month)
					setYear(year)
				}}
			/>
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}

const YearModeTemplate = () => {
	const [month, setMonth] = React.useState(new Date().getMonth() as Month)
	const [year, setYear] = React.useState(new Date().getFullYear())

	return (
		<div className="w-96 border rounded-md p-4">
			<MonthNavigator
				currentMonth={month}
				currentYear={year}
				mode="year"
				onChangeMonthYear={(month, year) => {
					setMonth(month)
					setYear(year)
				}}
			/>
		</div>
	)
}

export const YearMode: Story = {
	render: YearModeTemplate.bind({}),
	args: {},
}
