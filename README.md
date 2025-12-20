<div align="center">
  <h1>BuildGrid UI</h1>
  <p><strong>A modern React component library built for real-world projects</strong></p>
  
  <img src="https://adrianomaringolo.github.io/buildgrid-ui/assets/images/buildgrid-ui-launch-0df921f6559272569468298e74d3d7b8.png" alt="BuildGrid UI - Modern React Component Library" width="100%" style="max-width: 800px; border-radius: 12px; margin: 20px 0;" />
  
  <p>
    <a href="https://www.npmjs.com/package/buildgrid-ui"><img src="https://img.shields.io/npm/v/buildgrid-ui.svg" alt="npm version"></a>
    <a href="https://www.npmjs.com/package/buildgrid-ui"><img src="https://img.shields.io/npm/dm/buildgrid-ui.svg" alt="npm downloads"></a>
    <a href="https://github.com/adrianomaringolo/buildgrid-ui/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/buildgrid-ui.svg" alt="license"></a>
    <a href="https://github.com/adrianomaringolo/buildgrid-ui"><img src="https://img.shields.io/github/stars/adrianomaringolo/buildgrid-ui.svg" alt="github stars"></a>
  </p>

  <p>
    <a href="https://adrianomaringolo.github.io/buildgrid-ui/">📖 Documentation</a> •
    <a href="https://adrianomaringolo.github.io/buildgrid-ui/">🎨 Storybook</a> •
    <a href="https://adrianomaringolo.github.io/buildgrid-ui/changelog">📋 Changelog</a> •
    <a href="https://github.com/adrianomaringolo/buildgrid-ui/discussions">💬 Discussions</a>
  </p>
</div>

---

## ✨ Features

BuildGrid UI is a comprehensive React component library featuring **44+ components** and **12 specialized blocks**, all built with production use in mind.

- 🎯 **Battle-Tested** - Components refined through real-world usage
- 🎨 **Modern Stack** - Built with React 19, TypeScript, and Tailwind CSS
- ♿ **Accessible** - WCAG compliant with full keyboard navigation
- 📱 **Responsive** - Mobile-first design approach
- 🎭 **Customizable** - Flexible theming and styling options
- 📚 **Well Documented** - Comprehensive docs with interactive examples
- 🔧 **Developer Friendly** - Full TypeScript support with IntelliSense
- 🚀 **Production Ready** - Used in real applications

## 🚀 Quick Start

### Installation

```bash
npm install buildgrid-ui
# or
yarn add buildgrid-ui
# or
pnpm add buildgrid-ui
```

### Setup

1. **Import the theme styles** in your app's entry point:

```tsx
// src/main.tsx or src/index.tsx
import 'buildgrid-ui/theme'
```

2. **Configure Tailwind CSS** (v3):

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/buildgrid-ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Usage

```tsx
import { Button, Card, Input } from 'buildgrid-ui'

function App() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Welcome to BuildGrid UI</Card.Title>
      </Card.Header>
      <Card.Content>
        <Input placeholder="Enter your name" />
      </Card.Content>
      <Card.Footer>
        <Button>Get Started</Button>
      </Card.Footer>
    </Card>
  )
}
```

## 📦 What's Included

### Components (44)

**Form Elements**
- Input, Textarea, Select, Checkbox, Radio Group
- Autocomplete, Multi-Select, Tag Input
- Currency Input, Password Input, Adaptive Input
- Number Stepper, Slider, Switch

**Navigation**
- Button, Navigation Menu, Tabs
- Pagination, Dropdown Menu, Command

**Feedback**
- Alert, Alert Dialog, Toast/Toaster
- Progress, Spinner, Skeleton

**Layout**
- Card, Separator, Sheet, Dialog
- Popover, Tooltip, Collapsible, Accordion

**Display**
- Avatar, Badge, Calendar, Carousel
- Table, Toggle, Toggle Group

### Blocks (12)

**Complex Components**
- Data Table - Feature-rich table with sorting, filtering, and pagination
- HTML Text Editor - Rich text editor with formatting toolbar
- File Upload Dropzone - Drag-and-drop file upload with progress
- Lazy Image Gallery - Performance-optimized image gallery
- Month Navigator - Calendar navigation component
- Bento Grid - Flexible grid layout system
- Help Carousel - Interactive help/tutorial carousel
- Empty Message - Elegant empty state component
- Navigable List - Keyboard-navigable list component
- Paginated Items - Pagination wrapper for any content
- Pagination Controls - Customizable pagination UI
- Sidebar - Flexible sidebar with multiple directions

### Utilities

**Hooks**
- `useLocalStorage` - Persistent state management
- `useDebounce` - Debounced values
- `useCopyToClipboard` - Copy to clipboard functionality
- `useSanitizedHtml` - Safe HTML rendering with DOMPurify

**Formatters**
- Currency formatting utilities
- Date formatting utilities

**Types**
- TypeScript utility types for better DX

## 📖 Documentation

Visit our [comprehensive documentation](https://adrianomaringolo.github.io/buildgrid-ui/) for:

- 📘 **Component API** - Detailed props and usage examples
- 🎨 **Interactive Examples** - Live component demos
- ♿ **Accessibility Guidelines** - WCAG compliance information
- 💡 **Best Practices** - Recommended usage patterns
- 🎭 **Storybook Integration** - Visual component explorer

## 🛠 Development

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/adrianomaringolo/buildgrid-ui.git
cd buildgrid-ui

# Install dependencies
npm install

# Start Storybook
npm run storybook

# Build the library
npm run build

# Run tests
npm test
```

### Project Structure

```
buildgrid-ui/
├── src/
│   ├── components/     # Basic UI components
│   ├── blocks/         # Complex composed components
│   ├── lib/
│   │   ├── hooks/      # Custom React hooks
│   │   ├── utils/      # Utility functions
│   │   └── types/      # TypeScript types
│   └── styles/         # Global styles
├── website/            # Documentation site
└── .storybook/         # Storybook configuration
```

## 🤝 Contributing

We welcome contributions from the community! This is my first open-source project, and I'm excited to see what we can build together.

### Ways to Contribute

- 🐛 **Report bugs** - [Create an issue](https://github.com/adrianomaringolo/buildgrid-ui/issues/new?template=bug_report.yml)
- ✨ **Request features** - [Create a feature request](https://github.com/adrianomaringolo/buildgrid-ui/issues/new?template=feature_request.yml)
- 📖 **Improve docs** - [Create a documentation issue](https://github.com/adrianomaringolo/buildgrid-ui/issues/new?template=documentation.yml)
- 🔧 **Submit PRs** - Fix bugs or add features
- 💬 **Join discussions** - [GitHub Discussions](https://github.com/adrianomaringolo/buildgrid-ui/discussions)

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test them
4. Commit using conventional commits: `git commit -m 'feat: add amazing feature'`
5. Push to your fork: `git push origin feature/amazing-feature`
6. Open a Pull Request

Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## 📋 Roadmap

- [ ] Additional form components
- [ ] Enhanced theming system
- [ ] Dark mode improvements
- [ ] More specialized blocks
- [ ] Performance optimizations
- [ ] Accessibility improvements
- [ ] Additional utility hooks

## 🙏 Acknowledgments

BuildGrid UI is built on the shoulders of giants:

- [React](https://react.dev/) - The foundation
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) - Design inspiration
- [Vite](https://vitejs.dev/) - Build tool
- [Storybook](https://storybook.js.org/) - Component development
- [Docusaurus](https://docusaurus.io/) - Documentation platform

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Documentation**: https://adrianomaringolo.github.io/buildgrid-ui/
- **NPM Package**: https://www.npmjs.com/package/buildgrid-ui
- **GitHub**: https://github.com/adrianomaringolo/buildgrid-ui
- **Storybook**: https://adrianomaringolo.github.io/buildgrid-ui/
- **Changelog**: https://adrianomaringolo.github.io/buildgrid-ui/changelog

## 💬 Community & Support

- 🐛 [Report Issues](https://github.com/adrianomaringolo/buildgrid-ui/issues)
- 💡 [Feature Requests](https://github.com/adrianomaringolo/buildgrid-ui/issues/new?template=feature_request.yml)
- 💬 [Discussions](https://github.com/adrianomaringolo/buildgrid-ui/discussions)
- 📧 Contact: [adrianomaringolo](https://github.com/adrianomaringolo)

---

<div align="center">
  <p>Built with ❤️ by <a href="https://adrianomaringolo.dev">Adriano Maringolo</a></p>
  <p>If you find this project useful, please consider giving it a ⭐️</p>
</div>
