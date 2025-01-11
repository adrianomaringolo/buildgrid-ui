import { addMonths, format, getDaysInMonth, startOfMonth, subMonths } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

type CalendarProps = {
	selectedDate?: Date
	onChange?: (date: Date) => void
	language?: 'enUS' | 'ptBR'
}

export const Calendar: React.FC<CalendarProps> = ({
	selectedDate,
	onChange,
	language = 'enUS',
}) => {
	const [currentDate, setCurrentDate] = useState<Date>(selectedDate || new Date())

	const locales = { ptBR, enUS }
	const locale = locales[language]

	const handlePrevMonth = () => {
		setCurrentDate((prev) => subMonths(prev, 1))
	}

	const handleNextMonth = () => {
		setCurrentDate((prev) => addMonths(prev, 1))
	}

	const handleDayClick = (date: Date) => {
		if (onChange) {
			onChange(date)
		}
	}

	const daysInMonth = Array.from({
		length: getDaysInMonth(currentDate),
	}).map((_, i) => new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1))

	const startDay = startOfMonth(currentDate).getDay()
	const weekdays = Array.from({ length: 7 }).map((_, i) =>
		format(new Date(2021, 0, i + 3), 'EEEEEE', { locale }),
	)

	return (
		<div
			className="max-w-sm mx-auto p-4 border rounded shadow"
			role="application"
			aria-label="Calendar"
		>
			<div className="flex justify-between items-center mb-4">
				<button
					className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
					onClick={handlePrevMonth}
					aria-label="Previous Month"
				>
					<ChevronLeft />
				</button>
				<h2 className="text-lg font-bold" aria-live="polite">
					{format(currentDate, 'MMMM yyyy', { locale })}
				</h2>
				<button
					className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
					onClick={handleNextMonth}
					aria-label="Next Month"
				>
					<ChevronRight />
				</button>
			</div>

			<div className="grid grid-cols-7 gap-2">
				{weekdays.map((day, index) => (
					<div key={index} className="text-center font-medium" aria-hidden="true">
						{day}
					</div>
				))}

				{Array.from({ length: startDay }).map((_, i) => (
					<div key={`empty-${i}`} className="" aria-hidden="true"></div>
				))}

				{daysInMonth.map((date) => (
					<button
						key={date.toISOString()}
						className={`p-2 rounded hover:bg-blue-100 ${
							selectedDate &&
							date.toDateString() === selectedDate.toDateString() &&
							'bg-blue-200'
						}`}
						onClick={() => handleDayClick(date)}
						aria-label={format(date, 'MMMM do yyyy', { locale })}
						aria-pressed={
							selectedDate && date.toDateString() === selectedDate.toDateString()
								? 'true'
								: 'false'
						}
					>
						{date.getDate()}
					</button>
				))}
			</div>
		</div>
	)
}
