import { Button } from '@/components'
import { enUS, Locale } from 'date-fns/locale'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
export type Mode = 'month' | 'year'

export interface MonthNavigatorProps {
	locale?: Locale
	currentMonth: Month
	currentYear: number
	onChangeMonthYear: (month: Month, year: number) => void
	mode?: Mode
}

export const MonthNavigator = (props: MonthNavigatorProps) => {
	const {
		currentMonth,
		currentYear,
		onChangeMonthYear,
		locale = enUS,
		mode = 'month',
	} = props

	const navigate = (direction: 'prev' | 'next') => {
		let newMonth = currentMonth
		let newYear = currentYear

		if (mode === 'month') {
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
		} else {
			newYear = direction === 'prev' ? newYear - 1 : newYear + 1
		}

		onChangeMonthYear(newMonth as Month, newYear)
	}

	return (
		<div className="flex items-center justify-between">
			<Button
				variant="ghost"
				size="icon"
				onClick={() => navigate('prev')}
				aria-label={`Previous ${mode}`}
			>
				<ArrowLeft className="!h-8 !w-8" />
			</Button>
			<div className="text-center">
				<h2 className="text-2xl font-bold capitalize">
					{mode === 'month'
						? locale.localize.month(currentMonth, { width: 'wide' })
						: currentYear}
				</h2>
				{mode === 'month' && (
					<p className="text-sm text-muted-foreground">{currentYear}</p>
				)}
			</div>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => navigate('next')}
				aria-label={`Next ${mode}`}
			>
				<ArrowRight className="!h-8 !w-8" />
			</Button>
		</div>
	)
}
