import { useEffect, useState } from 'react'

export interface Stats {
	components: number
	blocks: number
	utilities: number
	breakdown: {
		hooks: number
		utils: number
		types: number
	}
	lastUpdated: string
	version: string
}

const defaultStats: Stats = {
	components: 41,
	blocks: 13,
	utilities: 19,
	breakdown: { hooks: 13, utils: 5, types: 1 },
	lastUpdated: new Date().toISOString(),
	version: '1.17.1',
}

export const useStats = () => {
	const [stats, setStats] = useState<Stats>(defaultStats)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		// Load stats from JSON file
		fetch('/buildgrid-ui/stats.json')
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				return response.json()
			})
			.then((data) => {
				setStats(data)
				setError(null)
			})
			.catch((err) => {
				console.error('Failed to load stats:', err)
				setError(err.message)
				// Keep default stats as fallback
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])

	return { stats, loading, error }
}
