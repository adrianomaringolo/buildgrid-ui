# Blog Posts Automation

This document explains the automated blog posts system that keeps the homepage blog section synchronized with the latest blog posts.

## Overview

The blog posts automation system automatically scans the `website/blog/` directory, extracts metadata from blog post markdown files, and generates a static TypeScript data file that the homepage blog section uses to display the latest posts.

## How It Works

### 1. Blog Posts Scanner (`scripts/update-blog-posts.js`)

The script performs the following operations:

- **Scans Blog Directory**: Reads all `.md` files from `website/blog/`
- **Extracts Metadata**: Uses `gray-matter` to parse frontmatter from each blog post
- **Generates Data**: Creates a TypeScript file with blog post data
- **Sorts Posts**: Orders posts by date (most recent first)
- **Limits Display**: Provides the latest 3 posts for homepage display

### 2. Generated Data File (`website/src/data/blog-posts.ts`)

The script generates a TypeScript file containing:

```typescript
export interface BlogPost {
  id: string
  title: string
  description: string
  date: string
  permalink: string
  image: string | null
  tags: string[]
  author: {
    name: string
    imageURL: string
  }
}

export const LATEST_BLOG_POSTS: BlogPost[] = [...]
export const ALL_BLOG_POSTS: BlogPost[] = [...]
```

### 3. Homepage Integration

The blog section component (`website/src/components/home/blog-section.tsx`) imports and uses the generated data:

```typescript
import { LATEST_BLOG_POSTS } from '../../data/blog-posts'
```

## Automation Triggers

The blog posts data is automatically updated in the following scenarios:

### 1. Version Verification
- Runs during `npm run verify-docs-version`
- Runs during `npm run sync-docs-version`

### 2. Website Build Process
- Runs during `npm run start` (development)
- Runs during `npm run build` (production)
- Runs during `npm run deploy` (deployment)

### 3. Manual Execution
- Run `npm run update-blog-posts` from the root directory
- Run `npm run update-blog-posts` from the website directory

## Blog Post Requirements

For proper automation, blog posts must follow this structure:

### File Naming Convention
```
YYYY-MM-DD-slug.md
```

Example: `2025-12-29-contributing-to-open-source.md`

### Frontmatter Structure
```yaml
---
slug: post-slug
title: Post Title
authors: [author-key]
tags: [tag1, tag2, tag3]
image: /img/blog/post-image.jpg
date: YYYY-MM-DD
---
```

### Required Fields
- `title`: Post title (fallback: "Untitled Post")
- `slug`: URL slug (fallback: extracted from filename)
- `date`: Publication date (fallback: extracted from filename)

### Optional Fields
- `description`: Post description (fallback: extracted from content)
- `image`: Featured image URL
- `tags`: Array of tags
- `authors`: Array of author keys

## Author Configuration

Authors are automatically loaded from `website/blog/authors.yml`. The script reads author information including:

- `name`: Author's display name
- `image_url`: Author's avatar image URL
- `title`: Author's title/role
- `url`: Author's website URL
- `socials`: Social media links

### Authors.yml Structure
```yaml
author-key:
  name: Author Name
  title: Author Title
  url: https://author-website.com
  image_url: https://github.com/username.png
  page: true
  socials:
    github: username
    linkedin: https://linkedin.com/in/username
```

### Adding New Authors
1. Add the author entry to `website/blog/authors.yml`
2. Use the author key in blog post frontmatter: `authors: [author-key]`
3. The script will automatically use the author data from the YAML file

## Data Extraction Logic

### Description Extraction
If no `description` is provided in frontmatter, the script:
1. Removes frontmatter from content
2. Extracts the first paragraph
3. Removes markdown formatting
4. Truncates to 150 characters

### Date Extraction
Dates are extracted in this priority order:
1. `date` field from frontmatter
2. Date prefix from filename (`YYYY-MM-DD-`)
3. Current date (fallback)

**Timezone Handling**: Dates are processed using UTC methods to avoid timezone conversion issues, ensuring that dates display correctly regardless of the server's timezone.

### Slug Generation
Slugs are generated in this priority order:
1. `slug` field from frontmatter
2. Filename with date prefix and `.md` extension removed

## File Structure

```
scripts/
├── update-blog-posts.js     # Main automation script
└── verify-docs-version.js   # Includes blog posts update

website/
├── blog/                    # Blog posts directory
│   ├── 2025-12-20-post.md  # Blog post files
│   └── 2025-12-29-post.md
├── src/
│   ├── components/home/
│   │   └── blog-section.tsx # Homepage blog component
│   └── data/
│       └── blog-posts.ts    # Generated data file (auto-generated)
└── package.json             # Includes automation scripts
```

## Maintenance

### Adding New Blog Posts
1. Create a new markdown file in `website/blog/`
2. Follow the naming convention: `YYYY-MM-DD-slug.md`
3. Include proper frontmatter
4. The automation will handle the rest during the next build

### Updating Author Information
1. Edit the author data in `website/blog/authors.yml`
2. Run `npm run update-blog-posts` to regenerate data
3. The script automatically reads from the YAML file

### Troubleshooting
- **Missing posts**: Check file naming convention and frontmatter
- **Wrong order**: Ensure dates are properly formatted
- **Missing images**: Verify image paths are correct and files exist
- **Build errors**: Check the generated TypeScript file for syntax issues

## Integration with Other Systems

The blog automation integrates with:
- **Version verification system**: Updates blog data during version checks
- **Website build process**: Ensures fresh data on every build
- **Development workflow**: Updates data during development server start

This automation ensures the homepage always displays the most current blog posts without manual intervention.