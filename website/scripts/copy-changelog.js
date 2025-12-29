#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

/**
 * Script to copy CHANGELOG.md from project root to website/static/
 * Runs automatically before Docusaurus build
 */

const rootDir = path.resolve(__dirname, '../..')
const websiteDir = path.resolve(__dirname, '..')

const sourceFile = path.join(rootDir, 'CHANGELOG.md')
const targetFile = path.join(websiteDir, 'static', 'CHANGELOG.md')

function copyChangelog() {
	try {
		// Check if source file exists
		if (!fs.existsSync(sourceFile)) {
			console.error('❌ CHANGELOG.md not found in the root directory:', sourceFile)
			process.exit(1)
		}

		// Create static directory if it doesn't exist
		const staticDir = path.dirname(targetFile)
		if (!fs.existsSync(staticDir)) {
			fs.mkdirSync(staticDir, { recursive: true })
			console.log('📁 static folder created:', staticDir)
		}

		// Copy the file
		fs.copyFileSync(sourceFile, targetFile)

		// Verify if copy was successful
		const sourceStats = fs.statSync(sourceFile)
		const targetStats = fs.statSync(targetFile)

		if (sourceStats.size === targetStats.size) {
			console.log('✅ CHANGELOG.md successfully copied')
			console.log(`   Source: ${sourceFile}`)
			console.log(`   Destination: ${targetFile}`)
			console.log(`   Size: ${sourceStats.size} bytes`)
		} else {
			console.error('❌ Copy error: different sizes')
			process.exit(1)
		}
	} catch (error) {
		console.error('❌ Error copying CHANGELOG.md:', error.message)
		process.exit(1)
	}
}

// Execute only if called directly
if (require.main === module) {
	console.log('🔄 Copying CHANGELOG.md...')
	copyChangelog()
}

module.exports = { copyChangelog }
