# Social Card Setup

## Current Status

The social card is currently configured as `buildgrid-ui-social-card.png` in `docusaurus.config.ts`, but we have created an SVG version.

## Required Action

Convert `buildgrid-ui-social-card.svg` to `buildgrid-ui-social-card.png` for optimal social media compatibility.

### Recommended Conversion

1. **Size**: 1200x630px (Facebook/Twitter optimal)
2. **Format**: PNG for best compatibility
3. **Quality**: High resolution for crisp display

### Tools for Conversion

- **Online**: Use tools like CloudConvert, Convertio, or similar
- **Design Software**: Figma, Adobe Illustrator, Inkscape
- **Command Line**: ImageMagick, rsvg-convert

### Command Line Example (if available)

```bash
# Using rsvg-convert (if installed)
rsvg-convert -w 1200 -h 630 buildgrid-ui-social-card.svg > buildgrid-ui-social-card.png

# Using ImageMagick (if installed)
convert -background none -size 1200x630 buildgrid-ui-social-card.svg buildgrid-ui-social-card.png
```

## Social Card Features

The social card includes:
- BuildGrid UI branding with logo
- Component visualizations (cards, buttons, tables, forms)
- Modern gradient background
- Key statistics (44 Components, 12 Blocks)
- Technology stack information
- Professional design optimized for social sharing

## Usage

Once converted to PNG, the social card will automatically be used for:
- Open Graph meta tags (Facebook, LinkedIn)
- Twitter Card previews
- Discord link previews
- Other social media platforms

The card is configured in `website/docusaurus.config.ts` under `themeConfig.image`.