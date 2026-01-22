// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './date-picker'
import { addDays, subDays } from 'date-fns'

const meta: Meta<typeof DatePicker> = {
	title: 'Components/DatePicker',
	component: DatePicker,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		date: {
			control: 'date',
			description: 'The selected date',
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder text when no date is selected',
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the date picker is disabled',
		},
		language: {
			control: 'select',
			options: ['enUS', 'ptBR'],
			description: 'Language for date formatting',
		},
		buttonVariant: {
			control: 'select',
			options: ['default', 'outline', 'ghost', 'link', 'destructive', 'secondary'],
			description: 'Button variant style',
		},
	},
}

export default meta
type Story = StoryObj<typeof DatePicker>

/**
 * Default date picker with no date selected.
 */
export const Default: Story = {
	render: (args) => {
		const [date, setDate] = React.useState<Date | undefined>(args.date)

		return <DatePicker {...args} date={date} onDateChange={setDate} />
	},
	args: {
		placeholder: 'Pick a date',
	},
}

/**
 * Date picker with a pre-selected date.
 */
export const WithSelectedDate: Story = {
	render: (args) => {
		const [date, setDate] = React.useState<Date | undefined>(new Date())

		return <DatePicker {...args} date={date} onDateChange={setDate} />
	},
	args: {
		placeholder: 'Pick a date',
	},
}

/**
 * Date picker with custom placeholder text.
 */
export const CustomPlaceholder: Story = {
	render: (args) => {
		const [date, setDate] = React.useState<Date | undefined>()

		return <DatePicker {...args} date={date} onDateChange={setDate} />
	},
	args: {
		placeholder: 'Select your birthday',
	},
}

/**
 * Disabled date picker that cannot be interacted with.
 */
export const Disabled: Story = {
	render: (args) => {
		const [date, setDate] = React.useState<Date | undefined>(new Date())

		return <DatePicker {...args} date={date} onDateChange={setDate} />
	},
	args: {
		disabled: true,
		placeholder: 'Pick a date',
	},
}

/**
 * Date picker with Portuguese (Brazil) language.
 */
export const PortugueseLanguage: Story = {
	render: (args) => {
		const [date, setDate] = React.useState<Date | undefined>(new Date())

		return <DatePicker {...args} date={date} onDateChange={setDate} />
	},
	args: {
		language: 'ptBR',
		placeholder: 'Escolha uma data',
	},
}

/**
 * Date picker with different button variants.
 */
export const ButtonVariants: Story = {
	render: () => {
		const [date1, setDate1] = React.useState<Date | undefined>()
		const [date2, setDate2] = React.useState<Date | undefined>()
		const [date3, setDate3] = React.useState<Date | undefined>()
		const [date4, setDate4] = React.useState<Date | undefined>()

		return (
			<div className="space-y-4">
				<div>
					<p className="text-sm text-muted-foreground mb-2">Outline (default)</p>
					<DatePicker date={date1} onDateChange={setDate1} buttonVariant="outline" />
				</div>
				<div>
					<p className="text-sm text-muted-foreground mb-2">Default</p>
					<DatePicker date={date2} onDateChange={setDate2} buttonVariant="default" />
				</div>
				<div>
					<p className="text-sm text-muted-foreground mb-2">Ghost</p>
					<DatePicker date={date3} onDateChange={setDate3} buttonVariant="ghost" />
				</div>
				<div>
					<p className="text-sm text-muted-foreground mb-2">Secondary</p>
					<DatePicker date={date4} onDateChange={setDate4} buttonVariant="secondary" />
				</div>
			</div>
		)
	},
}

/**
 * Date picker with custom width.
 */
export const CustomWidth: Story = {
	render: (args) => {
		const [date, setDate] = React.useState<Date | undefined>()

		return (
			<DatePicker {...args} date={date} onDateChange={setDate} className="w-[400px]" />
		)
	},
	args: {
		placeholder: 'Pick a date',
	},
}

/**
 * Form example with date picker for event scheduling.
 */
export const FormExample: Story = {
	render: () => {
		const [startDate, setStartDate] = React.useState<Date | undefined>()
		const [endDate, setEndDate] = React.useState<Date | undefined>()

		return (
			<div className="space-y-4 w-[400px]">
				<div>
					<label className="text-sm font-medium mb-2 block">Event Start Date</label>
					<DatePicker
						date={startDate}
						onDateChange={setStartDate}
						placeholder="Select start date"
					/>
				</div>
				<div>
					<label className="text-sm font-medium mb-2 block">Event End Date</label>
					<DatePicker
						date={endDate}
						onDateChange={setEndDate}
						placeholder="Select end date"
					/>
				</div>
				{startDate && endDate && (
					<div className="p-4 bg-muted rounded-lg">
						<p className="text-sm">
							<strong>Duration:</strong>{' '}
							{Math.ceil(
								(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
							)}{' '}
							days
						</p>
					</div>
				)}
			</div>
		)
	},
}

/**
 * Date picker with controlled state and callback.
 */
export const ControlledState: Story = {
	render: () => {
		const [date, setDate] = React.useState<Date | undefined>()
		const [log, setLog] = React.useState<string[]>([])

		const handleDateChange = (newDate: Date | undefined) => {
			setDate(newDate)
			const message = newDate
				? `Date selected: ${newDate.toLocaleDateString()}`
				: 'Date cleared'
			setLog((prev) => [...prev, message])
		}

		return (
			<div className="space-y-4">
				<DatePicker
					date={date}
					onDateChange={handleDateChange}
					placeholder="Pick a date"
				/>
				<div className="p-4 bg-muted rounded-lg max-w-md">
					<p className="text-sm font-medium mb-2">Event Log:</p>
					<div className="space-y-1 max-h-40 overflow-y-auto">
						{log.length === 0 ? (
							<p className="text-sm text-muted-foreground">No events yet</p>
						) : (
							log.map((entry, index) => (
								<p key={index} className="text-xs">
									{entry}
								</p>
							))
						)}
					</div>
				</div>
			</div>
		)
	},
}

/**
 * Date picker with preset date options.
 */
export const WithPresets: Story = {
	render: () => {
		const [date, setDate] = React.useState<Date | undefined>()

		const presets = [
			{ label: 'Today', date: new Date() },
			{ label: 'Tomorrow', date: addDays(new Date(), 1) },
			{ label: 'In 3 days', date: addDays(new Date(), 3) },
			{ label: 'In 1 week', date: addDays(new Date(), 7) },
			{ label: 'Yesterday', date: subDays(new Date(), 1) },
		]

		return (
			<div className="space-y-4">
				<DatePicker date={date} onDateChange={setDate} placeholder="Pick a date" />
				<div className="flex flex-wrap gap-2">
					{presets.map((preset) => (
						<button
							key={preset.label}
							onClick={() => setDate(preset.date)}
							className="px-3 py-1 text-sm border rounded hover:bg-muted"
						>
							{preset.label}
						</button>
					))}
				</div>
			</div>
		)
	},
}
