import { Button } from '@/components'
import { enUS, Locale } from 'date-fns/locale'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export interface MonthNavigatorProps {
	locale?: Locale
	currentMonth: Month
	currentYear: number
	onChangeMonthYear: (month: Month, year: number) => void
}

export const MonthNavigator = (props: MonthNavigatorProps) => {
	const { currentMonth, currentYear, onChangeMonthYear, locale = enUS } = props

	const navigateMonth = (direction: 'prev' | 'next') => {
		let newMonth = currentMonth
		let newYear = currentYear

		if (direction === 'prev') {
			if (newMonth === 0) {
				newMonth = 11
				newYear--
			} else {
				newMonth--
			}
		} else {
			if (newMonth === 11) {
				newMonth = 0
				newYear++
			} else {
				newMonth++
			}
		}

		onChangeMonthYear(newMonth as Month, newYear)
	}

	return (
		<div className="flex items-center justify-between">
			<Button
				variant="ghost"
				size="icon"
				onClick={() => navigateMonth('prev')}
				aria-label="Previous month"
			>
				<ArrowLeft className="!h-8 !w-8" />
			</Button>
			<div className="text-center">
				<h2 className="text-2xl font-bold capitalize">
					{locale.localize.month(currentMonth, { width: 'wide' })}
				</h2>
				<p className="text-sm text-muted-foreground">{currentYear}</p>
			</div>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => navigateMonth('next')}
				aria-label="Next month"
			>
				<ArrowRight className="!h-8 !w-8" />
			</Button>
		</div>
	)
}
