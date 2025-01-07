import { cn } from '@/lib/utils'
import { ptBR } from 'date-fns/locale'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar(props: CalendarProps) {
	const { className, classNames, showOutsideDays = true, ...rest } = props
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn('p-3', className)}
			classNames={{ ...classNames }}
			locale={ptBR}
			{...rest}
		/>
	)
}
Calendar.displayName = 'Calendar'

export { Calendar }
