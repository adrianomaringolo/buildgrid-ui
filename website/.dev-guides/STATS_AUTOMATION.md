# Statistics Automation Guide

This guide explains how the BuildGrid UI library statistics are automatically maintained and updated.

## Overview

The library statistics (components, blocks, and utilities counts) are automatically counted and updated through a script that runs as part of the version verification process. This ensures that all documentation displays accurate, up-to-date numbers without manual maintenance.

## How It Works

### 1. Automatic Counting Script

The `scripts/update-stats.js` script automatically counts:

- **Components**: Directories in `src/components/`
- **Blocks**: Directories in `src/blocks/`
- **Utilities**: Files in `src/lib/hooks/`, `src/lib/utils/`, and `src/lib/types/` (excluding index files and test/story files)

### 2. Stats JSON File

The script generates `website/static/stats.json` with the current counts:

```json
{
  "components": 41,
  "blocks": 13,
  "utilities": 19,
  "breakdown": {
    "hooks": 13,
    "utils": 5,
    "types": 1
  },
  "lastUpdated": "2025-12-29T18:05:20.501Z",
  "version": "1.17.1"
}
```

### 3. Integration with Pre-Push Workflow

The stats update is automatically triggered during:
- `npm run verify-docs-version` (part of pre-push hook)
- `npm run sync-docs-version`
- Manual execution: `npm run update-stats`

## Usage in Documentation

### React Hook

Use the `useStats` hook in React components:

```tsx
import { useStats } from '../hooks/useStats'

const MyComponent = () => {
  const { stats, loading, error } = useStats()
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      <p>{stats.components} components available</p>
      <p>{stats.blocks} blocks ready to use</p>
      <p>{stats.utilities} utility functions</p>
    </div>
  )
}
```

### Direct JSON Access

The stats are also available at `/buildgrid-ui/stats.json` for external access or API consumption.

## Files Updated Automatically

The following files are automatically updated with current statistics:

### Dynamic (React Components)
- `website/src/components/home/stats-section.tsx` - Homepage statistics display

### Static (Manual Updates Required)
- `website/blog/2025-12-20-introducing-buildgrid-ui.md` - Blog post
- `website/.dev-guides/BLOG_SETUP.md` - Blog setup guide
- `website/static/img/SOCIAL_CARD_README.md` - Social card documentation

## Workflow Integration

### Pre-Push Hook Sequence

1. **Version Verification**: Check if website dependency matches main package version
2. **Statistics Update**: Count and update library statistics
3. **Test Coverage**: Run full test suite with coverage
4. **Coverage Copy**: Copy coverage reports to website
5. **Storybook Build**: Build Storybook for deployment

### Manual Commands

```bash
# Update statistics only
npm run update-stats

# Update statistics + verify version
npm run verify-docs-version

# Update statistics + sync version
npm run sync-docs-version
```

## Maintenance

### Adding New Components/Blocks/Utilities

No manual action required! The statistics will be automatically updated on the next:
- Pre-push hook execution
- Manual stats update
- Version verification run

### Troubleshooting

If statistics appear incorrect:

1. **Check directory structure**: Ensure new items follow the expected structure
2. **Run manual update**: `npm run update-stats`
3. **Verify JSON file**: Check `website/static/stats.json` for accuracy
4. **Clear cache**: If using the website locally, clear browser cache

### Fallback Values

The `useStats` hook includes fallback values in case the JSON file is unavailable:
- Components: 41
- Blocks: 13
- Utilities: 19

These should be updated if the fallback becomes significantly outdated.

## Benefits

1. **Always Accurate**: Numbers are automatically counted from source code
2. **No Manual Maintenance**: Statistics update automatically with code changes
3. **Consistent Display**: All documentation uses the same data source
4. **Version Tracking**: Statistics are tied to specific library versions
5. **Performance**: JSON file is cached and loads quickly

## Future Enhancements

Potential improvements to consider:
- Add breakdown by category (form components, layout components, etc.)
- Include test coverage statistics
- Add component complexity metrics
- Track statistics history over versions