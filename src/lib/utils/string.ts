export const normalizeString = (text: string): string =>
	text
		? text
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.toLowerCase()
		: ''

export const normalizeStringToCompare = (text: string): string =>
	text
		? text
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.replaceAll(' ', '')
				.toLowerCase()
		: ''
