# BuildGrid UI Documentation Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator. It serves as the comprehensive documentation hub for BuildGrid UI components, blocks, and utilities.

## Quick Start

### Prerequisites

- Node.js 18+
- npm (recommended) or yarn/pnpm

### Installation

```bash
npm install
```

### Local Development

```bash
npm start
```

This command:
- Copies the latest changelog from the root project
- Updates blog post metadata automatically
- Starts a local development server on port 3001
- Opens a browser window with live reload enabled

Most changes are reflected live without restarting the server.

## Available Scripts

### Development Scripts

```bash
# Start development server with all preprocessing
npm start

# Start Docusaurus only (without preprocessing)
npm run docusaurus start

# Clear Docusaurus cache
npm run clear

# Serve built website locally
npm run serve
```

### Build Scripts

```bash
# Full production build with all assets
npm run build

# Build Docusaurus only (without preprocessing)
npm run build:docusaurus
```

The full build process includes:
1. Copying changelog from root project
2. Copying test coverage reports
3. Updating blog post metadata
4. Building the Docusaurus site

### Content Management Scripts

```bash
# Copy changelog from root project
npm run copy-changelog

# Copy test coverage reports from root project
npm run copy-coverage

# Update blog post metadata and statistics
npm run update-blog-posts

# Generate MDX files for components (if needed)
npm run generate-mdx
```

### Deployment

```bash
# Deploy to GitHub Pages
npm run deploy

# Deploy with SSH
USE_SSH=true npm run deploy

# Deploy with specific GitHub user
GIT_USER=<Your GitHub username> npm run deploy
```

The deployment process automatically:
- Runs the full build process
- Pushes to the `gh-pages` branch
- Updates the live documentation site

## Project Structure

```
website/
├── docs/                    # Documentation content
│   ├── components/         # Component documentation
│   ├── blocks/            # Block documentation
│   └── utilities/         # Utility documentation
├── blog/                   # Blog posts
├── src/
│   ├── components/        # React components for the site
│   ├── pages/            # Custom pages
│   ├── css/              # Custom styles
│   └── data/             # Site data and examples
├── static/               # Static assets
│   ├── img/              # Images
│   ├── CHANGELOG.md      # Copied from root project
│   └── stats.json        # Auto-generated library statistics
├── .dev-guides/          # Development guides
├── scripts/              # Build and maintenance scripts
├── docusaurus.config.ts  # Docusaurus configuration
└── sidebars.ts          # Documentation sidebar structure
```

## Development Guidelines

### Content Creation

#### Adding Component Documentation

1. Create a new MDX file in `docs/components/`
2. Follow the existing component documentation structure
3. Include interactive examples using the component library
4. Add proper metadata and sidebar positioning

#### Writing Blog Posts

1. Create a new file in `blog/` with format: `YYYY-MM-DD-title.md`
2. Include proper frontmatter with author, tags, and description
3. Blog metadata is automatically updated via `npm run update-blog-posts`

#### Adding Images

- Place images in `static/img/`
- Use descriptive filenames
- Optimize images for web (WebP preferred)
- Include alt text for accessibility

### Automation Features

#### Changelog Synchronization

The website automatically syncs with the main project's changelog:
- Source: `/CHANGELOG.md` (root project)
- Destination: `/website/static/CHANGELOG.md`
- Triggered: During build and start scripts

#### Statistics Updates

Library statistics are automatically maintained:
- Components, blocks, and utilities are counted from source code
- Statistics are stored in `static/stats.json`
- Updated during the build process
- Used throughout the documentation site

#### Blog Post Management

Blog posts are automatically processed to:
- Extract and update metadata
- Generate reading time estimates
- Update author information
- Maintain consistent formatting

### Styling and Theming

#### CSS Architecture

- **Tailwind CSS**: Primary styling framework
- **Custom CSS**: Located in `src/css/`
- **Component Styles**: Co-located with components
- **Dark Mode**: Automatic theme switching support

#### Design System

- Consistent with BuildGrid UI component library
- Responsive design (mobile-first)
- Accessibility-compliant (WCAG 2.1 AA)
- Performance-optimized

### Configuration

#### Docusaurus Configuration

Key configuration files:
- `docusaurus.config.ts`: Main site configuration
- `sidebars.ts`: Documentation navigation structure
- `package.json`: Dependencies and scripts

#### Search Configuration

The site uses `@easyops-cn/docusaurus-search-local` for:
- Local search functionality
- Indexing of all documentation content
- Fast, client-side search experience

## Quality Assurance

### Content Guidelines

- **English Only**: All content must be in English (see language guidelines)
- **Accessibility**: All content must be accessible
- **SEO Optimized**: Proper meta tags and structured data
- **Performance**: Optimized images and code splitting

### Build Verification

The build process includes:
- TypeScript compilation
- ESLint and Prettier checks
- Link validation
- Asset optimization
- Bundle analysis

### Testing

While the website doesn't have unit tests, it includes:
- Build verification in CI/CD
- Link checking
- Accessibility testing
- Performance monitoring

## Deployment Process

### Automatic Deployment

The website is automatically deployed when:
- Changes are pushed to the main branch
- GitHub Actions workflow completes successfully
- All quality checks pass

### Manual Deployment

For manual deployments:

```bash
# Ensure you're on the main branch
git checkout main
git pull origin main

# Run the deployment
npm run deploy
```

### Environment Variables

For deployment, you may need:
- `GIT_USER`: Your GitHub username
- `USE_SSH`: Set to `true` for SSH deployment

## Troubleshooting

### Common Issues

#### Build Failures

1. **Missing Dependencies**: Run `npm install`
2. **Cache Issues**: Run `npm run clear`
3. **TypeScript Errors**: Check `docusaurus.config.ts` and component files
4. **Asset Issues**: Verify file paths in `static/` directory

#### Development Server Issues

1. **Port Conflicts**: The server runs on port 3001 by default
2. **Hot Reload Not Working**: Clear cache and restart
3. **Missing Content**: Ensure preprocessing scripts ran successfully

#### Deployment Issues

1. **Authentication**: Verify GitHub credentials
2. **Branch Issues**: Ensure `gh-pages` branch exists
3. **Build Errors**: Check the build logs for specific errors

### Getting Help

- Check the [Docusaurus documentation](https://docusaurus.io/docs)
- Review the `.dev-guides/` directory for specific workflows
- Create an issue in the main repository
- Join the project discussions on GitHub

## Contributing

When contributing to the documentation:

1. **Follow the Style Guide**: Consistent formatting and structure
2. **Test Locally**: Always test changes locally before submitting
3. **Update Navigation**: Add new pages to `sidebars.ts`
4. **Optimize Assets**: Compress images and optimize performance
5. **Accessibility**: Ensure all content is accessible

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the build locally
5. Submit a pull request with a clear description

## Resources

- **Live Site**: https://adrianomaringolo.github.io/buildgrid-ui/
- **Docusaurus Docs**: https://docusaurus.io/docs
- **Main Repository**: https://github.com/adrianomaringolo/buildgrid-ui
- **Component Library**: https://www.npmjs.com/package/buildgrid-ui

---

Built with ❤️ using Docusaurus and deployed on GitHub Pages.
