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

export const containSearchStrings = (stringA: string, stringB: string) => {
	return normalizeStringToCompare(stringA).includes(normalizeStringToCompare(stringB))
}

export const sortNormalize = (a: string, b: string) => {
	if (normalizeString(a) < normalizeString(b)) {
		return -1
	}
	if (normalizeString(a) > normalizeString(b)) {
		return 1
	}
	return 0
}

export const sortByName = (a: any, b: any) => {
	if (normalizeString(a.name) < normalizeString(b.name)) {
		return -1
	}
	if (normalizeString(a.name) > normalizeString(b.name)) {
		return 1
	}
	return 0
}

export const sortByField = (a: any, b: any, field: string) => {
	if (a[field] < b[field]) {
		return -1
	}
	if (a[field] > b[field]) {
		return 1
	}
	return 0
}

export const sortByFieldDesc = (a: any, b: any, field: string) => {
	if (a[field] > b[field]) {
		return -1
	}
	if (a[field] < b[field]) {
		return 1
	}
	return 0
}

export const sortByNestedField = (
	a: any,
	b: any,
	field1: string | number,
	field2: string,
) => {
	if (normalizeString(a[field1][field2]) < normalizeString(b[field1][field2])) {
		return -1
	}
	if (normalizeString(a[field1][field2]) > normalizeString(b[field1][field2])) {
		return 1
	}
	return 0
}

// gets a string and returns the same string with the first letter uppercased
export const capitalize = (text: string): string => {
	return text.charAt(0).toUpperCase() + text.slice(1)
}
