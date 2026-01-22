'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button } from '../button'
import { Calendar } from '../calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'

export interface DatePickerProps {
	date?: Date
	onDateChange?: (date: Date | undefined) => void
	placeholder?: string
	disabled?: boolean
	className?: string
	language?: 'enUS' | 'ptBR'
	buttonVariant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary'
}

export function DatePicker({
	date,
	onDateChange,
	placeholder = 'Pick a date',
	disabled = false,
	className,
	language = 'enUS',
	buttonVariant = 'outline',
}: DatePickerProps) {
	const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date)

	React.useEffect(() => {
		setSelectedDate(date)
	}, [date])

	const handleDateSelect = (newDate: Date | undefined) => {
		setSelectedDate(newDate)
		onDateChange?.(newDate)
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={buttonVariant}
					disabled={disabled}
					data-empty={!selectedDate}
					className={cn(
						'data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal',
						className,
					)}
				>
					<CalendarIcon />
					{selectedDate ? format(selectedDate, 'PPP') : <span>{placeholder}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					selectedDate={selectedDate}
					onChange={handleDateSelect}
					language={language}
				/>
			</PopoverContent>
		</Popover>
	)
}

// Legacy component for backward compatibility
export function DatePickerDemo() {
	const [date, setDate] = React.useState<Date>()

	return <DatePicker date={date} onDateChange={setDate} />
}
