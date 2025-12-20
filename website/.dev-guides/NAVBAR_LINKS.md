# Navbar Links Configuration

## Current Links

The Docusaurus navbar includes the following links:

### Left Side
- **Documentation** - Internal link to docs sidebar
- **Blog** - Internal link to blog section

### Right Side  
- **GitHub** - External link to GitHub repository
- **NPM** - External link to NPM package page

## Footer Links

The footer includes the same external links in the "More" section:
- Blog (internal)
- GitHub (external)
- NPM (external)

## Configuration Location

Links are configured in `website/docusaurus.config.ts`:

```typescript
navbar: {
  items: [
    // ... left side items
    {
      href: 'https://github.com/adrianomaringolo/buildgrid-ui',
      label: 'GitHub',
      position: 'right',
    },
    {
      href: 'https://www.npmjs.com/package/buildgrid-ui',
      label: 'NPM', 
      position: 'right',
    },
  ]
}
```

## Adding New Links

To add new links:
1. Add to `navbar.items` array in docusaurus.config.ts
2. Optionally add to footer links for consistency
3. Use `position: 'right'` for external links
4. Use `position: 'left'` for internal navigation

## Link Types

- **Internal links**: Use `to: '/path'` 
- **External links**: Use `href: 'https://...'`
- **Sidebar links**: Use `type: 'docSidebar'` with `sidebarId`