type AnyObject = Record<string, any>

/**
 * Recursively merges two objects. The first object has priority to override properties.
 * @param obj1 - The object with higher priority.
 * @param obj2 - The object to merge into the first object.
 * @returns The merged object.
 */
export function mergeObjects<T extends AnyObject, U extends AnyObject>(
	obj1: T,
	obj2: U,
): T & U {
	const result: AnyObject = { ...obj2 } // Start with obj2 to allow obj1 to override it.

	for (const key in obj1) {
		if (obj1.hasOwnProperty(key)) {
			if (
				typeof obj1[key] === 'object' &&
				obj1[key] !== null &&
				!Array.isArray(obj1[key]) &&
				typeof obj2[key] === 'object' &&
				obj2[key] !== null &&
				!Array.isArray(obj2[key])
			) {
				// Recursively merge nested objects.
				result[key] = mergeObjects(obj1[key], obj2[key])
			} else {
				// Override with obj1's value.
				result[key] = obj1[key]
			}
		}
	}

	return result as T & U
}
