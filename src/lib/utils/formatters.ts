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

export const padString = (num: number | string, size: number = 2) => {
	num = num.toString()
	while (num.length < size) num = '0' + num
	return num
}
