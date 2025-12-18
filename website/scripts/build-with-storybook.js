#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 Starting build process with Storybook integration...')

// Paths
const rootDir = path.resolve(__dirname, '../..')
const websiteDir = path.resolve(__dirname, '..')
const storybookStaticDir = path.join(rootDir, 'storybook-static')
const websiteBuildDir = path.join(websiteDir, 'build')
const storybookDestDir = path.join(websiteBuildDir, 'storybook')

try {
	// Step 1: Build Storybook from root directory with correct base URL
	console.log('📚 Building Storybook...')
	process.chdir(rootDir)
	execSync('npm run build:storybook', {
		stdio: 'inherit',
		env: { ...process.env, STORYBOOK_BASE_URL: '/buildgrid-ui/storybook/' },
	})
	console.log('✅ Storybook build completed')

	// Step 2: Build Docusaurus
	console.log('📖 Building Docusaurus...')
	process.chdir(websiteDir)
	execSync('docusaurus build', { stdio: 'inherit' })
	console.log('✅ Docusaurus build completed')

	// Step 3: Move Storybook to website build directory
	console.log('📦 Moving Storybook to website build directory...')

	// Check if storybook-static exists
	if (!fs.existsSync(storybookStaticDir)) {
		throw new Error('Storybook build directory not found')
	}

	// Remove existing storybook directory if it exists
	if (fs.existsSync(storybookDestDir)) {
		fs.rmSync(storybookDestDir, { recursive: true, force: true })
	}

	// Move storybook-static to website/build/storybook
	fs.renameSync(storybookStaticDir, storybookDestDir)
	console.log('✅ Storybook moved to website/build/storybook')

	// Step 4: Create redirect file for storybook
	console.log('🔗 Creating Storybook redirect...')
	const redirectHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>BuildGrid UI Storybook</title>
    <meta http-equiv="refresh" content="0; url=./storybook/">
    <link rel="canonical" href="./storybook/">
</head>
<body>
    <p>Redirecting to <a href="./storybook/">Storybook</a>...</p>
</body>
</html>`

	fs.writeFileSync(path.join(websiteBuildDir, 'storybook.html'), redirectHtml)
	console.log('✅ Storybook redirect created')

	console.log('🎉 Build process completed successfully!')
	console.log('📁 Website build: website/build/')
	console.log('📚 Storybook: website/build/storybook/')
} catch (error) {
	console.error('❌ Build process failed:', error.message)
	process.exit(1)
}
