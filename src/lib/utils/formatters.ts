export const formatCurrency = (
	number: number,
	language = 'pt-BR',
	currency = 'BRL',
): string => {
	return new Intl.NumberFormat(language, {
		style: 'currency',
		currency,
		minimumFractionDigits: 2,
	}).format(number)
}

export const formatDateAndWeekday = (date: Date | string, language = 'pt-BR'): string =>
	new Intl.DateTimeFormat(language, {
		day: '2-digit',
		month: 'long',
		weekday: 'long',
	}).format(new Date(date))

export const formatDateAndWeekdayAndYear = (
	date: Date | string,
	language = 'pt-BR',
): string =>
	new Intl.DateTimeFormat(language, {
		day: '2-digit',
		month: 'long',
		weekday: 'long',
		year: 'numeric',
	}).format(new Date(date))

export const formatDateAndMonth = (date: Date | string, language = 'pt-BR'): string =>
	new Intl.DateTimeFormat(language, {
		day: '2-digit',
		month: 'long',
	}).format(new Date(date))

export const formatLongDate = (date: Date | string, language = 'pt-BR'): string =>
	new Intl.DateTimeFormat(language, { dateStyle: 'long' }).format(
		typeof date === 'string' ? new Date(date) : date,
	)

export const formatShortDate = (date: Date, language = 'pt-BR'): string =>
	new Intl.DateTimeFormat(language, { dateStyle: 'short' }).format(date)

export const getMonthYearFromISODate = (date: string): string => {
	return date.slice(0, 7)
}

export const formatWeekDayAndShortDate = (date: Date, language = 'pt-BR') => {
	return date.toLocaleDateString(language, {
		weekday: 'short',
		day: '2-digit',
		month: '2-digit',
	})
}
