import { toZonedTime } from 'date-fns-tz'
import { padString } from './formatters'

export const formatDateUTC = (date: any): string => {
	if (!date) return ''
	const newDate = toZonedTime(
		new Date(date.seconds ? date.seconds * 1000 : date),
		'America/Sao_Paulo',
	)

	return [
		padString(newDate.getUTCDate(), 2),
		padString(newDate.getUTCMonth() + 1, 2),
		newDate.getUTCFullYear(),
	].join('/')
}

export const formatDateMonthYear = (date: Date): string =>
	new Intl.DateTimeFormat('pt-BR', {
		year: '2-digit',
		month: 'short',
	}).format(date)

export const formatDateDayMonth = (date: Date): string =>
	new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: '2-digit',
	}).format(date)

export const formatDateAndTime = (date: Date | string): string =>
	new Intl.DateTimeFormat('pt-BR', {
		year: '2-digit',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	}).format(new Date(date))

export const getMonthName = (date: Date): string =>
	new Intl.DateTimeFormat('pt-BR', {
		month: 'long',
	}).format(date)

export const getLongDate = (date: Date): string =>
	new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(date)

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
