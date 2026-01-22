#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

/**
 * Script to count and update BuildGrid UI library statistics
 * Counts components, blocks, and utilities and generates a stats.json file
 */

const rootDir = path.resolve(__dirname, '..')
const srcDir = path.join(rootDir, 'src')
const websiteDir = path.join(rootDir, 'website')

const componentsDir = path.join(srcDir, 'components')
const blocksDir = path.join(srcDir, 'blocks')
const hooksDir = path.join(srcDir, 'lib', 'hooks')
const utilsDir = path.join(srcDir, 'lib', 'utils')
const typesDir = path.join(srcDir, 'lib', 'types')

const statsFile = path.join(websiteDir, 'static', 'stats.json')

function getLibraryVersion() {
	try {
		// Try to get version from website's package.json (buildgrid-ui dependency)
		const websitePackageJson = require(path.join(websiteDir, 'package.json'))
		const buildgridVersion = websitePackageJson.dependencies['buildgrid-ui']

		// Remove ^ or ~ prefix if present
		return buildgridVersion.replace(/^[\^~]/, '')
	} catch (error) {
		// Fallback to root package.json version
		console.warn('⚠️  Could not read website package.json, using root version')
		return require(path.join(rootDir, 'package.json')).version
	}
}

function countDirectories(dir) {
	try {
		if (!fs.existsSync(dir)) {
			return 0
		}

		const entries = fs.readdirSync(dir, { withFileTypes: true })
		return entries.filter((entry) => entry.isDirectory()).length
	} catch (error) {
		console.error(`Error counting directories in ${dir}:`, error.message)
		return 0
	}
}

function countFiles(dir, extensions = ['.ts', '.tsx']) {
	try {
		if (!fs.existsSync(dir)) {
			return 0
		}

		const entries = fs.readdirSync(dir, { withFileTypes: true })
		return entries.filter((entry) => {
			if (entry.isFile()) {
				const ext = path.extname(entry.name)
				return (
					extensions.includes(ext) &&
					!entry.name.includes('.test.') &&
					!entry.name.includes('.stories.')
				)
			}
			return false
		}).length
	} catch (error) {
		console.error(`Error counting files in ${dir}:`, error.message)
		return 0
	}
}

function updateStats() {
	try {
		console.log('📊 Counting BuildGrid UI library statistics...')

		// Count components (directories in src/components)
		const componentsCount = countDirectories(componentsDir)
		console.log(`   Components: ${componentsCount}`)

		// Count blocks (directories in src/blocks)
		const blocksCount = countDirectories(blocksDir)
		console.log(`   Blocks: ${blocksCount}`)

		// Count utilities (hooks + utils + types files, excluding index files)
		const hooksCount = countFiles(hooksDir) - 1 // Exclude index.ts
		const utilsCount = countFiles(utilsDir) - 1 // Exclude index.ts
		const typesCount = countFiles(typesDir)
		const utilitiesCount = hooksCount + utilsCount + typesCount
		console.log(
			`   Utilities: ${utilitiesCount} (${hooksCount} hooks + ${utilsCount} utils + ${typesCount} types)`,
		)

		// Create stats object
		const stats = {
			components: componentsCount,
			blocks: blocksCount,
			utilities: utilitiesCount,
			breakdown: {
				hooks: hooksCount,
				utils: utilsCount,
				types: typesCount,
			},
			lastUpdated: new Date().toISOString(),
			version: getLibraryVersion(),
		}

		// Ensure website/static directory exists
		const staticDir = path.dirname(statsFile)
		if (!fs.existsSync(staticDir)) {
			fs.mkdirSync(staticDir, { recursive: true })
		}

		// Write stats file
		fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2) + '\n')

		console.log('✅ Statistics updated successfully')
		console.log(`   File: ${statsFile}`)
		console.log(
			`   Total: ${componentsCount} components, ${blocksCount} blocks, ${utilitiesCount} utilities`,
		)

		return stats
	} catch (error) {
		console.error('❌ Error updating statistics:', error.message)
		process.exit(1)
	}
}

// Execute only if called directly
if (require.main === module) {
	updateStats()
}

module.exports = { updateStats }
