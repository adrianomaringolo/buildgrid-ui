// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Month, MonthNavigatorComponent } from './month-navigator'

const meta: Meta<typeof MonthNavigatorComponent> = {
	component: MonthNavigatorComponent,
}

export default meta
type Story = StoryObj<typeof MonthNavigatorComponent>

const Template = () => {
	const [month, setMonth] = React.useState(new Date().getMonth() as Month)
	const [year, setYear] = React.useState(new Date().getFullYear())

	return (
		<div className="w-96 border rounded-md p-4">
			<MonthNavigatorComponent
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
