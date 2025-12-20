# Version Update Guide

## Updating BuildGrid UI Version

When releasing a new version of BuildGrid UI, the version will be automatically updated on the website when you update the dependency in the website's package.json.

### 1. Root package.json
Update the version in `/package.json`:
```json
{
  "version": "1.16.0"
}
```

### 2. Website Dependency (Automatic)
Update the buildgrid-ui dependency in `/website/package.json`:
```json
{
  "dependencies": {
    "buildgrid-ui": "^1.16.0"
  }
}
```

The website will automatically read this version and display it on the homepage.

### 3. Automated Update Script
You can use this command to update both files at once:

```bash
# Update version in both files
NEW_VERSION="1.16.0"
sed -i "s/\"version\": \".*\"/\"version\": \"$NEW_VERSION\"/" package.json
sed -i "s/\"buildgrid-ui\": \".*\"/\"buildgrid-ui\": \"^$NEW_VERSION\"/" website/package.json
```

### 4. How It Works
The version display system:
- Reads the `buildgrid-ui` version from `website/package.json`
- Automatically strips the `^` prefix for clean display
- Falls back to a default version if not found
- No manual updates needed in the version.ts file

### 5. Verification
After updating, verify the changes:
- Check that the version appears correctly on the homepage
- Ensure the package.json version matches the display version
- Test the build process to ensure no errors

## Current Version Display Location
The version badge appears on the homepage intro section as a **clickable link** that takes users directly to the NPM package page. The badge automatically shows the current BuildGrid UI version from the website's package.json dependencies with:
- Checkmark icon indicating stable version
- Purple styling that matches the overall design theme
- Hover effects with scale animation and shadow
- External link arrow icon that appears on hover
- Tooltip showing "View buildgrid-ui on NPM"

## Benefits of This Approach
- **Automatic Updates**: Version updates when you update the dependency
- **Single Source of Truth**: Uses the actual installed version
- **No Manual Sync**: Eliminates the need to update multiple files
- **Fallback Safety**: Has a default version if dependency is not found
- **User-Friendly**: Clickable badge provides direct access to NPM package
- **Visual Feedback**: Clear hover states indicate it's interactive