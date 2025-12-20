import React, { useEffect, useState } from 'react'

interface Release {
	version: string
	date: string
	url: string
	content: string[]
}

export const ChangelogViewer: React.FC = () => {
	const [releases, setReleases] = useState<Release[]>([])
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string>('')

	useEffect(() => {
		const fetchChangelog = async () => {
			try {
				// Try different paths to account for baseUrl and development vs production
				const possiblePaths = [
					'/buildgrid-ui/CHANGELOG.md', // Production with baseUrl
					'/CHANGELOG.md', // Development or direct access
					'./CHANGELOG.md', // Relative path
				]

				let response: Response | null = null

				for (const path of possiblePaths) {
					try {
						console.log(`Trying to fetch changelog from: ${path}`)
						response = await fetch(path)
						if (response.ok) {
							break
						} else {
							console.log(`Failed to fetch from ${path}: ${response.status}`)
						}
					} catch (err) {
						console.log(`Error fetching from ${path}:`, err)
						continue
					}
				}

				if (!response || !response.ok) {
					throw new Error(`HTTP error! status: ${response?.status || 'Network error'}`)
				}

				const content = await response.text()
				console.log(`Changelog content length: ${content.length}`)

				const parsedReleases = parseChangelogReleases(content)
				setReleases(parsedReleases)
				setError('')
			} catch (err) {
				console.error('Error loading changelog:', err)
				setError(
					'Failed to load changelog. Please check your connection or visit our GitHub releases page.',
				)
			} finally {
				setIsLoading(false)
			}
		}

		fetchChangelog()
	}, [])

	const parseChangelogReleases = (content: string): Release[] => {
		if (!content.trim()) {
			return []
		}

		const lines = content.split('\n')
		const releases: Release[] = []

		let currentRelease: Partial<Release> | null = null
		let currentContent: string[] = []

		for (const line of lines) {
			const trimmedLine = line.trim()

			// Check for version headers (# [1.17.0] or ## [1.15.32])
			const versionMatch = trimmedLine.match(
				/^#{1,2} \[([^\]]+)\]\(([^)]+)\) \(([^)]+)\)/,
			)

			if (versionMatch) {
				// Save previous release if exists
				if (currentRelease && currentRelease.version) {
					releases.push({
						version: currentRelease.version,
						url: currentRelease.url || '',
						date: currentRelease.date || '',
						content: currentContent,
					})
				}

				// Start new release
				currentRelease = {
					version: versionMatch[1],
					url: versionMatch[2],
					date: versionMatch[3],
				}
				currentContent = []
			} else if (currentRelease && trimmedLine.length > 0) {
				// Add content to current release
				currentContent.push(line)
			}
		}

		// Add the last release
		if (currentRelease && currentRelease.version) {
			releases.push({
				version: currentRelease.version,
				url: currentRelease.url || '',
				date: currentRelease.date || '',
				content: currentContent,
			})
		}

		return releases
	}

	const formatReleaseContent = (contentLines: string[]) => {
		return contentLines
			.map((line) => {
				const trimmedLine = line.trim()

				// Section headers (### Features, ### Bug Fixes)
				if (trimmedLine.startsWith('### ')) {
					return `<h4 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-6 mb-3">${trimmedLine.replace('### ', '')}</h4>`
				}

				// List items with commit links
				if (trimmedLine.startsWith('* ')) {
					const processedLine = trimmedLine
						.replace('* ', '')
						// Handle commit links like ([abc123](url))
						.replace(/\((\[[^\]]+\]\([^)]+\))\)/g, ' $1')
						// Handle markdown links
						.replace(
							/\[([^\]]+)\]\(([^)]+)\)/g,
							'<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline text-sm">$1</a>',
						)

					return `<li class="text-gray-700 dark:text-gray-300 mb-2 ml-4 list-disc">${processedLine}</li>`
				}

				// Empty lines
				if (trimmedLine === '') {
					return '<div class="mb-2"></div>'
				}

				// Regular text (descriptions)
				if (trimmedLine.length > 0) {
					const processedLine = trimmedLine.replace(
						/\[([^\]]+)\]\(([^)]+)\)/g,
						'<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>',
					)

					return `<p class="text-gray-600 dark:text-gray-400 mb-2 text-sm">${processedLine}</p>`
				}

				return ''
			})
			.filter((line) => line.length > 0)
			.join('\n')
	}

	const filteredReleases = React.useMemo(() => {
		if (!searchTerm) {
			// Show only the latest 20 releases when not searching
			return releases.slice(0, 20)
		}

		// When searching, filter releases that contain the search term
		return releases
			.filter((release) => {
				const searchLower = searchTerm.toLowerCase()
				return (
					release.version.toLowerCase().includes(searchLower) ||
					release.content.some((line) => line.toLowerCase().includes(searchLower))
				)
			})
			.slice(0, 20) // Still limit to 20 even when searching
	}, [releases, searchTerm])

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
				<span className="ml-3 text-gray-600 dark:text-gray-300">
					Loading changelog...
				</span>
			</div>
		)
	}

	if (error) {
		return (
			<div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
				<div className="flex items-center">
					<svg
						className="w-5 h-5 text-red-500 mr-2"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zM9 14a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
							clipRule="evenodd"
						/>
					</svg>
					<p className="text-red-800 dark:text-red-200">{error}</p>
				</div>
			</div>
		)
	}

	return (
		<div>
			<div className="mb-6">
				<div className="relative">
					<input
						type="text"
						placeholder="Search changelog (e.g., 'button', 'fix', 'v1.15')..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
					<svg
						className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
				{searchTerm && (
					<div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						Showing results for "{searchTerm}" (limited to 20 releases)
					</div>
				)}
			</div>

			<div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
				<div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
							Latest Releases
						</h3>
						<div className="text-sm text-gray-500 dark:text-gray-400">
							Showing {filteredReleases.length} of {releases.length} releases
						</div>
					</div>
				</div>
				<div className="p-6">
					{filteredReleases.length === 0 ? (
						<p className="text-gray-500 dark:text-gray-400 text-center py-8">
							No releases found for your search.
						</p>
					) : (
						<div className="space-y-8">
							{filteredReleases.map((release) => (
								<div
									key={release.version}
									className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-8 last:pb-0"
								>
									<div className="flex items-center justify-between mb-4">
										<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
											<a
												href={release.url}
												target="_blank"
												rel="noopener noreferrer"
												className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
											>
												[{release.version}]
											</a>
										</h2>
										<span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
											{release.date}
										</span>
									</div>
									<div
										className="prose prose-sm max-w-none dark:prose-invert"
										dangerouslySetInnerHTML={{
											__html: formatReleaseContent(release.content),
										}}
									/>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			{/* View All Changelog Button */}
			<div className="mt-8 text-center">
				<a
					href="https://github.com/adrianomaringolo/buildgrid-ui/blob/main/CHANGELOG.md"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white! font-medium rounded-lg transition-colors duration-200 no-underline hover:no-underline"
				>
					<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
					</svg>
					View All Changelog on GitHub
				</a>
				<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
					See the complete changelog with all {releases.length} releases
				</p>
			</div>
		</div>
	)
}
