#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

/**
 * Script to copy test coverage report to website static directory
 * Makes coverage report available at /coverage/ on the documentation website
 */

const rootDir = path.resolve(__dirname, '..')
const websiteDir = path.resolve(__dirname, '../website')

const sourceCoverageDir = path.join(rootDir, 'coverage')
const targetCoverageDir = path.join(websiteDir, 'static', 'coverage')

function copyDirectory(src, dest) {
	// Create destination directory if it doesn't exist
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest, { recursive: true })
	}

	// Read source directory
	const entries = fs.readdirSync(src, { withFileTypes: true })

	for (const entry of entries) {
		const srcPath = path.join(src, entry.name)
		const destPath = path.join(dest, entry.name)

		if (entry.isDirectory()) {
			copyDirectory(srcPath, destPath)
		} else {
			fs.copyFileSync(srcPath, destPath)
		}
	}
}

function copyCoverageReport() {
	try {
		// Check if coverage directory exists
		if (!fs.existsSync(sourceCoverageDir)) {
			console.error('❌ Coverage directory not found:', sourceCoverageDir)
			console.error('   Run "npm run test:coverage" first to generate coverage report')
			process.exit(1)
		}

		// Check if coverage/index.html exists
		const coverageIndexFile = path.join(sourceCoverageDir, 'index.html')
		if (!fs.existsSync(coverageIndexFile)) {
			console.error('❌ Coverage report index.html not found:', coverageIndexFile)
			console.error('   Run "npm run test:coverage" first to generate coverage report')
			process.exit(1)
		}

		// Remove existing coverage directory in website
		if (fs.existsSync(targetCoverageDir)) {
			fs.rmSync(targetCoverageDir, { recursive: true, force: true })
		}

		// Copy coverage directory
		copyDirectory(sourceCoverageDir, targetCoverageDir)

		// Verify copy was successful
		const targetIndexFile = path.join(targetCoverageDir, 'index.html')
		if (fs.existsSync(targetIndexFile)) {
			const sourceStats = fs.statSync(coverageIndexFile)
			const targetStats = fs.statSync(targetIndexFile)

			console.log('✅ Coverage report successfully copied')
			console.log(`   Source: ${sourceCoverageDir}`)
			console.log(`   Destination: ${targetCoverageDir}`)
			console.log(`   Files copied: ${fs.readdirSync(sourceCoverageDir).length}`)
			console.log(`   Index file size: ${targetStats.size} bytes`)
			console.log('')
			console.log('📊 Coverage report will be available at: /coverage/')
		} else {
			console.error('❌ Copy verification failed: index.html not found in destination')
			process.exit(1)
		}
	} catch (error) {
		console.error('❌ Error copying coverage report:', error.message)
		process.exit(1)
	}
}

// Execute only if called directly
if (require.main === module) {
	console.log('📊 Copying coverage report to website...')
	copyCoverageReport()
}

module.exports = { copyCoverageReport }
