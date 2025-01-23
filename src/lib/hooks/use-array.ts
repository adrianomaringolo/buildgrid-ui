import { useState } from 'react'

export const useArray = <T>() => {
	const [array, setArray] = useState<Array<T>>([])

	const addItem = (item: T) => {
		setArray([...array, item])
	}

	const removeItem = (index: number) => {
		const newArray = [...array]
		newArray.splice(index, 1)
		setArray(newArray)
	}

	const removeItemsByField = (field: keyof T, value: T[keyof T]) => {
		const newArray = [...array]
		newArray.filter((i) => i[field] !== value)
		setArray(newArray)
	}

	return [array, addItem, removeItem, removeItemsByField]
}
