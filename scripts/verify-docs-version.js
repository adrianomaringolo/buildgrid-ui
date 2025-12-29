#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { updateStats } = require('./update-stats')
const { updateBlogPosts } = require('./update-blog-posts')

/**
 * Script to verify that the Docusaurus documentation website is updated
 * with the latest BuildGrid UI version and update library statistics
 */

const rootDir = path.resolve(__dirname, '..')
const websiteDir = path.resolve(__dirname, '../website')

const mainPackageFile = path.join(rootDir, 'package.json')
const websitePackageFile = path.join(websiteDir, 'package.json')

function verifyVersionSync() {
	try {
		// Update library statistics first
		console.log('📊 Updating library statistics...')
		updateStats()
		console.log('')

		// Update blog posts data
		console.log('📝 Updating blog posts data...')
		updateBlogPosts()
		console.log('')

		// Read main package.json
		if (!fs.existsSync(mainPackageFile)) {
			console.error('❌ Main package.json not found:', mainPackageFile)
			process.exit(1)
		}

		// Read website package.json
		if (!fs.existsSync(websitePackageFile)) {
			console.error('❌ Website package.json not found:', websitePackageFile)
			process.exit(1)
		}

		const mainPackage = JSON.parse(fs.readFileSync(mainPackageFile, 'utf8'))
		const websitePackage = JSON.parse(fs.readFileSync(websitePackageFile, 'utf8'))

		const mainVersion = mainPackage.version
		const websiteDependencyVersion = websitePackage.dependencies['buildgrid-ui']

		if (!mainVersion) {
			console.error('❌ Version not found in main package.json')
			process.exit(1)
		}

		if (!websiteDependencyVersion) {
			console.error('❌ buildgrid-ui dependency not found in website package.json')
			process.exit(1)
		}

		// Clean version strings (remove ^, ~, etc.)
		const cleanWebsiteVersion = websiteDependencyVersion.replace(/^[\^~>=<]/, '')

		console.log('🔍 Version Check:')
		console.log(`   Main package version: ${mainVersion}`)
		console.log(
			`   Website dependency version: ${websiteDependencyVersion} (${cleanWebsiteVersion})`,
		)

		if (mainVersion === cleanWebsiteVersion) {
			console.log(
				'✅ Documentation website is up to date with the latest BuildGrid UI version',
			)
			return true
		} else {
			console.error('❌ Version mismatch detected!')
			console.error(`   Main package: ${mainVersion}`)
			console.error(`   Website dependency: ${cleanWebsiteVersion}`)
			console.error('')
			console.error('🔧 To fix this issue:')
			console.error(
				`   1. Update website/package.json buildgrid-ui dependency to: ^${mainVersion}`,
			)
			console.error('   2. Run: cd website && npm install')
			console.error('   3. Commit the changes')
			console.error('')
			console.error('Or run the auto-fix script: npm run sync-docs-version')
			return false
		}
	} catch (error) {
		console.error('❌ Error verifying version sync:', error.message)
		process.exit(1)
	}
}

function syncVersions() {
	try {
		// Update library statistics first
		console.log('📊 Updating library statistics...')
		updateStats()
		console.log('')

		// Update blog posts data
		console.log('📝 Updating blog posts data...')
		updateBlogPosts()
		console.log('')

		const mainPackage = JSON.parse(fs.readFileSync(mainPackageFile, 'utf8'))
		const websitePackage = JSON.parse(fs.readFileSync(websitePackageFile, 'utf8'))

		const mainVersion = mainPackage.version

		// Update website package.json
		websitePackage.dependencies['buildgrid-ui'] = `^${mainVersion}`

		// Write updated website package.json
		fs.writeFileSync(
			websitePackageFile,
			JSON.stringify(websitePackage, null, '\t') + '\n',
		)

		console.log('🔄 Syncing documentation version...')
		console.log(
			`✅ Updated website/package.json buildgrid-ui dependency to: ^${mainVersion}`,
		)
		console.log('')
		console.log('📦 Next steps:')
		console.log('   1. Run: cd website && npm install')
		console.log('   2. Commit the changes')

		return true
	} catch (error) {
		console.error('❌ Error syncing versions:', error.message)
		process.exit(1)
	}
}

// Execute based on command line arguments
const command = process.argv[2]

if (command === 'sync') {
	syncVersions()
} else if (command === 'verify' || !command) {
	const isValid = verifyVersionSync()
	if (!isValid) {
		process.exit(1)
	}
} else {
	console.error('Usage: node verify-docs-version.js [verify|sync]')
	console.error('  verify (default): Check if versions are in sync')
	console.error('  sync: Automatically update website package.json to match main version')
	process.exit(1)
}
