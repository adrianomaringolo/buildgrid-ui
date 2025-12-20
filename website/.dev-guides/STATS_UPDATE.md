# Stats Section Update Guide

## Current Numbers (Updated: December 2024)

The stats section displays the following numbers:

- **Components**: 44 (ready to use)
- **Blocks**: 12 (complex layouts)  
- **Utilities**: 6 (hooks & formatters)

## How to Update

When adding new components, blocks, or utilities, update the numbers in:

**File**: `website/src/components/home/stats-section.tsx`

```typescript
const stats = [
  {
    title: 'Components',
    value: '44', // ← Update this number
    subtitle: 'ready to use',
  },
  {
    title: 'Blocks',
    value: '12', // ← Update this number
    subtitle: 'complex layouts',
  },
  {
    title: 'Utilities',
    value: '6', // ← Update this number
    subtitle: 'hooks & formatters',
  },
]
```

## Counting Guidelines

### Components
Count all items in the "Components" section of `website/sidebars.ts`

### Blocks  
Count all items in the "Blocks" section of `website/sidebars.ts`

### Utilities
Count items in the "Utilities" section of `website/sidebars.ts`:
- Formatters (currency, date-formatters)
- Hooks (use-copy-to-clipboard, use-debounce, use-local-storage)
- Types (typescript-utilities)

**Note**: Only count utilities that are documented in the website, not all utilities in the source code.

## Verification

After updating:
1. Check that numbers match the sidebar items
2. Ensure the stats section displays correctly
3. Test both light and dark modes
4. Verify animations still work properly

## Automation Consideration

For future versions, consider creating an automated script that:
1. Reads the sidebar configuration
2. Counts items automatically
3. Updates the stats section
4. Runs as part of the build process

This would eliminate manual updates and ensure accuracy.