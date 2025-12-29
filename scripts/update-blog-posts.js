#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const yaml = require('js-yaml')

/**
 * Script to automatically update blog posts data for the homepage
 * Scans the blog directory and generates a static data file with the latest posts
 */

const rootDir = path.resolve(__dirname, '..')
const blogDir = path.join(rootDir, 'website', 'blog')
const outputFile = path.join(rootDir, 'website', 'src', 'data', 'blog-posts.ts')
const authorsFile = path.join(blogDir, 'authors.yml')

let authorsData = null

function loadAuthorsData() {
	try {
		if (!fs.existsSync(authorsFile)) {
			console.warn('⚠️  Authors file not found:', authorsFile)
			return {}
		}

		const authorsContent = fs.readFileSync(authorsFile, 'utf8')
		authorsData = yaml.load(authorsContent) || {}
		return authorsData
	} catch (error) {
		console.error('❌ Error loading authors data:', error.message)
		return {}
	}
}

function extractBlogPosts() {
	try {
		console.log('📝 Scanning blog posts...')

		if (!fs.existsSync(blogDir)) {
			console.error('❌ Blog directory not found:', blogDir)
			process.exit(1)
		}

		// Get all markdown files from blog directory
		const files = fs
			.readdirSync(blogDir)
			.filter((file) => file.endsWith('.md') && !file.startsWith('_'))
			.sort()
			.reverse() // Most recent first

		const blogPosts = []

		for (const file of files) {
			const filePath = path.join(blogDir, file)
			const content = fs.readFileSync(filePath, 'utf8')
			const { data: frontMatter } = matter(content)

			// Extract slug from filename (remove date prefix and .md extension)
			const slug =
				frontMatter.slug || file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace('.md', '')

			// Create blog post object
			const blogPost = {
				id: slug,
				title: frontMatter.title || 'Untitled Post',
				description: frontMatter.description || extractDescription(content),
				date: formatDateForStorage(frontMatter.date) || extractDateFromFilename(file),
				permalink: `/blog/${slug}`,
				image: frontMatter.image ? `/buildgrid-ui${frontMatter.image}` : null,
				tags: frontMatter.tags || [],
				author: {
					name: getAuthorName(frontMatter.authors),
					imageURL: getAuthorImageURL(frontMatter.authors),
				},
			}

			blogPosts.push(blogPost)
			console.log(`   ✓ ${blogPost.title}`)
		}

		return blogPosts
	} catch (error) {
		console.error('❌ Error extracting blog posts:', error.message)
		process.exit(1)
	}
}

function extractDescription(content) {
	// Remove frontmatter and get first paragraph
	const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---/, '').trim()
	const firstParagraph = contentWithoutFrontmatter.split('\n\n')[0]

	// Remove markdown formatting and truncate
	const cleanText = firstParagraph
		.replace(/^#+\s+/, '') // Remove headers
		.replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
		.replace(/\*([^*]+)\*/g, '$1') // Remove italic
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
		.replace(/!\[[^\]]*\]\([^)]+\)/g, '') // Remove images
		.trim()

	return cleanText.length > 150 ? cleanText.substring(0, 150) + '...' : cleanText
}

function extractDateFromFilename(filename) {
	const match = filename.match(/^(\d{4}-\d{2}-\d{2})/)
	if (match) {
		return match[1]
	}

	// Fallback to current date in YYYY-MM-DD format
	const now = new Date()
	const year = now.getFullYear()
	const month = String(now.getMonth() + 1).padStart(2, '0')
	const day = String(now.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}

function formatDateForStorage(date) {
	if (!date) return null

	// If it's already a string in YYYY-MM-DD format, return as is
	if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
		return date
	}

	// If it's a Date object, extract date components in UTC to avoid timezone issues
	if (date instanceof Date) {
		const year = date.getUTCFullYear()
		const month = String(date.getUTCMonth() + 1).padStart(2, '0')
		const day = String(date.getUTCDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	// Try to parse as date and convert using UTC
	try {
		const parsedDate = new Date(date)
		if (!isNaN(parsedDate.getTime())) {
			const year = parsedDate.getUTCFullYear()
			const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0')
			const day = String(parsedDate.getUTCDate()).padStart(2, '0')
			return `${year}-${month}-${day}`
		}
	} catch (error) {
		// Ignore parsing errors
	}

	return null
}

function getAuthorName(authors) {
	if (!authors || authors.length === 0) return 'BuildGrid UI Team'

	// Ensure authors data is loaded
	if (!authorsData) {
		loadAuthorsData()
	}

	// If it's an array, get the first author
	const firstAuthor = Array.isArray(authors) ? authors[0] : authors

	// Get author data from authors.yml
	const authorData = authorsData[firstAuthor]
	if (authorData && authorData.name) {
		return authorData.name
	}

	// Fallback to author key or default
	return firstAuthor || 'BuildGrid UI Team'
}

function getAuthorImageURL(authors) {
	if (!authors || authors.length === 0) return '/buildgrid-ui/img/buildgrid-ui-logo.png'

	// Ensure authors data is loaded
	if (!authorsData) {
		loadAuthorsData()
	}

	const firstAuthor = Array.isArray(authors) ? authors[0] : authors

	// Get author data from authors.yml
	const authorData = authorsData[firstAuthor]
	if (authorData && authorData.image_url) {
		return authorData.image_url
	}

	// Fallback to default image
	return '/buildgrid-ui/img/buildgrid-ui-logo.png'
}

function generateTypeScriptFile(blogPosts) {
	const latestPosts = blogPosts.slice(0, 3) // Get latest 3 posts

	const tsContent = `// Auto-generated file - DO NOT EDIT MANUALLY
// Generated by scripts/update-blog-posts.js
// Last updated: ${new Date().toISOString()}

export interface BlogPost {
	id: string
	title: string
	description: string
	date: string
	permalink: string
	image: string | null
	tags: string[]
	author: {
		name: string
		imageURL: string
	}
}

export const LATEST_BLOG_POSTS: BlogPost[] = ${JSON.stringify(latestPosts, null, 2)}

export const ALL_BLOG_POSTS: BlogPost[] = ${JSON.stringify(blogPosts, null, 2)}
`

	return tsContent
}

function updateBlogPosts() {
	try {
		console.log('🔄 Updating blog posts data...')

		// Load authors data first
		loadAuthorsData()

		// Extract blog posts
		const blogPosts = extractBlogPosts()

		if (blogPosts.length === 0) {
			console.log('⚠️  No blog posts found')
			return
		}

		// Generate TypeScript file content
		const tsContent = generateTypeScriptFile(blogPosts)

		// Ensure output directory exists
		const outputDir = path.dirname(outputFile)
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir, { recursive: true })
		}

		// Write the file
		fs.writeFileSync(outputFile, tsContent)

		console.log('✅ Blog posts data updated successfully')
		console.log(`   File: ${outputFile}`)
		console.log(`   Total posts: ${blogPosts.length}`)
		console.log(`   Latest posts: ${Math.min(3, blogPosts.length)}`)

		return blogPosts
	} catch (error) {
		console.error('❌ Error updating blog posts:', error.message)
		process.exit(1)
	}
}

// Execute only if called directly
if (require.main === module) {
	updateBlogPosts()
}

module.exports = { updateBlogPosts }
