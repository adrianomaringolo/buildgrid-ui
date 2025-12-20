# Changelog Maintenance Guide

## Overview

The BuildGrid UI changelog is automatically generated using semantic-release and conventional commits. However, the website displays a copy of the changelog that needs to be kept in sync.

## File Locations

- **Source**: `/CHANGELOG.md` (root of project)
- **Website Copy**: `/website/static/CHANGELOG.md`
- **Display Page**: `/website/src/pages/changelog.mdx`

## How It Works

1. **Automatic Generation**: The main `CHANGELOG.md` is generated automatically by semantic-release based on conventional commits
2. **Website Copy**: A copy is placed in `website/static/` to be served by Docusaurus
3. **Dynamic Loading**: The changelog page fetches and displays the content dynamically with search functionality

## Updating the Website Changelog

When a new release is made, update the website copy:

```bash
# From the website directory
cp ../CHANGELOG.md static/CHANGELOG.md
```

Or from the root directory:
```bash
cp CHANGELOG.md website/static/CHANGELOG.md
```

## Changelog Page Features

The `/changelog` page includes:

- **Dynamic Loading**: Fetches changelog content from `/static/CHANGELOG.md`
- **Search Functionality**: Filter changelog entries by keywords
- **Loading States**: Shows spinner while loading content
- **Error Handling**: Graceful fallback if changelog fails to load
- **External Links**: Direct links to NPM and GitHub releases
- **Responsive Design**: Works on all device sizes
- **Dark Mode Support**: Adapts to user's theme preference

## Navigation Links

The changelog is accessible via:
- **Navbar**: "Changelog" link in the left navigation
- **Footer**: "Changelog" link in the "More" section
- **Direct URL**: `/changelog`

## Automation Opportunities

Consider automating the changelog sync:

1. **GitHub Actions**: Copy changelog during website build
2. **Build Script**: Add to website build process
3. **Git Hooks**: Update on commit/push
4. **CI/CD Pipeline**: Include in deployment workflow

## Troubleshooting

### Changelog Not Loading
- Check if `website/static/CHANGELOG.md` exists
- Verify file permissions
- Check browser console for fetch errors

### Search Not Working
- Ensure JavaScript is enabled
- Check for console errors in browser
- Verify React hooks are functioning

### Styling Issues
- Check Tailwind CSS classes
- Verify dark mode styles
- Test responsive breakpoints

## Content Guidelines

The changelog follows conventional commit format:
- **feat**: New features
- **fix**: Bug fixes
- **docs**: Documentation changes
- **style**: Code style changes
- **refactor**: Code refactoring
- **test**: Test additions/changes
- **chore**: Build process or auxiliary tool changes

## Future Enhancements

Potential improvements:
- **Markdown Rendering**: Parse and render markdown instead of plain text
- **Version Filtering**: Filter by version ranges
- **Category Filtering**: Filter by change type (feat, fix, etc.)
- **RSS Feed**: Provide RSS feed for changelog updates
- **Email Notifications**: Notify users of new releases