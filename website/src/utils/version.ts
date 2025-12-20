// This file exports the current version of buildgrid-ui from package.json
// Automatically reads the version from dependencies, no manual updates needed!
import packageJson from '../../package.json'

// Extract buildgrid-ui version from dependencies
// Handles different version formats: ^1.15.32, ~1.15.32, 1.15.32, etc.
const rawVersion = packageJson.dependencies['buildgrid-ui'] || '1.15.32'
const cleanVersion = rawVersion.replace(/^[\^~>=<]/, '') // Remove version prefixes

export const BUILDGRID_UI_VERSION = cleanVersion
