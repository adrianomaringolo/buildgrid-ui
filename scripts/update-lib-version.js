#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

/**
 * Script to update buildgrid-ui library version in website/package.json
 * to the latest available version from npm registry
 * Also fetches and returns the release date
 */

const rootDir = path.resolve(__dirname, '..')
const websitePackageJsonPath = path.join(rootDir, 'website', 'package.json')

function getLatestVersion() {
	try {
		console.log('🔍 Checking latest buildgrid-ui version from npm...')

		// Get latest version
		const versionResult = execSync('npm view buildgrid-ui version', {
			encoding: 'utf-8',
			stdio: ['pipe', 'pipe', 'pipe'],
		})
		const latestVersion = versionResult.trim()

		// Get time info for all versions
		const timeResult = execSync('npm view buildgrid-ui time --json', {
			encoding: 'utf-8',
			stdio: ['pipe', 'pipe', 'pipe'],
		})
		const timeData = JSON.parse(timeResult)
		const releaseDate = timeData[latestVersion]

		console.log(`   Latest version on npm: ${latestVersion}`)
		if (releaseDate) {
			console.log(`   Release date: ${new Date(releaseDate).toLocaleDateString()}`)
		}

		return { version: latestVersion, releaseDate }
	} catch (error) {
		console.warn('⚠️  Could not fetch latest version from npm registry')
		console.warn('   Using local package.json version instead')

		// Fallback to local package.json version
		const rootPackageJson = require(path.join(rootDir, 'package.json'))
		return { version: rootPackageJson.version, releaseDate: null }
	}
}

function updateWebsitePackageJson(versionInfo) {
	try {
		const { version: latestVersion, releaseDate } = versionInfo

		// Read website package.json
		const websitePackageJson = JSON.parse(
			fs.readFileSync(websitePackageJsonPath, 'utf-8'),
		)

		const currentVersion = websitePackageJson.dependencies['buildgrid-ui']

		// Remove ^ or ~ prefix if present
		const cleanCurrentVersion = currentVersion.replace(/^[\^~]/, '')

		console.log(`   Current version in website: ${currentVersion}`)

		// Check if update is needed
		if (cleanCurrentVersion === latestVersion) {
			console.log('✅ Website is already using the latest version')
			return { updated: false, version: latestVersion, releaseDate }
		}

		// Update version with ^ prefix
		websitePackageJson.dependencies['buildgrid-ui'] = `^${latestVersion}`

		// Write updated package.json
		fs.writeFileSync(
			websitePackageJsonPath,
			JSON.stringify(websitePackageJson, null, '\t') + '\n',
		)

		console.log(`✅ Updated buildgrid-ui version: ${currentVersion} → ^${latestVersion}`)
		console.log(`   File: ${websitePackageJsonPath}`)

		return { updated: true, version: latestVersion, releaseDate }
	} catch (error) {
		console.error('❌ Error updating website package.json:', error.message)
		process.exit(1)
	}
}

function updateLibVersion() {
	try {
		console.log('📦 Updating buildgrid-ui library version...')

		const versionInfo = getLatestVersion()
		const result = updateWebsitePackageJson(versionInfo)

		if (result.updated) {
			console.log('')
			console.log(
				'⚠️  Remember to run "npm install" in the website directory to install the updated version',
			)
		}

		return result
	} catch (error) {
		console.error('❌ Error updating library version:', error.message)
		process.exit(1)
	}
}

// Execute only if called directly
if (require.main === module) {
	updateLibVersion()
}

module.exports = { updateLibVersion }
