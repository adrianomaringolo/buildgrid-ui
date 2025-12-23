# Contributing to BuildGrid UI

Thank you for your interest in contributing to BuildGrid UI! We welcome contributions from the community and are excited to see what you'll bring to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Component Development](#component-development)
- [Documentation](#documentation)
- [Testing](#testing)
- [Style Guide](#style-guide)
- [Release Process](#release-process)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [adrianomaringolo@gmail.com](mailto:adrianomaringolo@gmail.com).

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork the repo on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/buildgrid-ui.git
   cd buildgrid-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development**
   ```bash
   # Start Storybook for component development
   npm run storybook
   
   # Start the documentation website
   cd website
   npm install
   npm start
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

## Project Structure

```
buildgrid-ui/
├── src/
│   ├── components/          # Reusable UI components
│   ├── blocks/             # Complex component compositions
│   ├── lib/                # Utility functions and helpers
│   ├── styles/             # Global styles and themes
│   └── index.ts            # Main export file
├── website/                # Documentation website (Docusaurus)
├── .storybook/            # Storybook configuration
├── stories/               # Component stories
└── docs/                  # Additional documentation
```

## Contributing Guidelines

### Types of Contributions

We welcome several types of contributions:

- 🐛 **Bug fixes**
- ✨ **New components**
- 📚 **Documentation improvements**
- 🎨 **Design enhancements**
- ⚡ **Performance improvements**
- 🧪 **Tests**
- 💡 **Feature requests**

### Before You Start

1. **Check existing issues** - Look for existing issues or discussions
2. **Create an issue** - For new features or significant changes, create an issue first
3. **Discuss your approach** - Get feedback before starting work

## Pull Request Process

### 1. Preparation

- Ensure your fork is up to date with the main branch
- Create a descriptive branch name
- Make sure your changes are focused and atomic

### 2. Development

- Follow our [coding standards](#style-guide)
- Add tests for new functionality
- Update documentation as needed
- Ensure all existing tests pass

### 3. Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Build the project
npm run build

# Test Storybook
npm run storybook
```

### 4. Documentation

- Update component documentation
- Add or update Storybook stories
- Update the website documentation if needed

### 5. Submission

1. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new Button variant"
   ```

2. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request**
   - Use a clear, descriptive title
   - Fill out the PR template completely
   - Link related issues
   - Add screenshots for UI changes

### PR Requirements

- ✅ All tests pass
- ✅ Code follows style guidelines
- ✅ Documentation is updated
- ✅ Storybook stories are added/updated
- ✅ No breaking changes (unless discussed)
- ✅ Commit messages follow conventional commits

## Component Development

### Creating a New Component

1. **Create the component file**
   ```bash
   # For simple components
   src/components/your-component/your-component.tsx
   
   # For complex blocks
   src/blocks/your-block/your-block.tsx
   ```

2. **Component structure**
   ```typescript
   import React from 'react'
   import { cn } from '../../lib/utils'
   
   interface YourComponentProps {
     className?: string
     children?: React.ReactNode
     // Add your props here
   }
   
   export const YourComponent = React.forwardRef<
     HTMLDivElement,
     YourComponentProps
   >(({ className, children, ...props }, ref) => {
     return (
       <div
         ref={ref}
         className={cn("your-component-classes", className)}
         {...props}
       >
         {children}
       </div>
     )
   })
   
   YourComponent.displayName = "YourComponent"
   ```

3. **Export the component**
   ```typescript
   // Add to src/index.ts
   export { YourComponent } from './components/your-component/your-component'
   ```

4. **Create a Storybook story**
   ```typescript
   // src/stories/YourComponent.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react'
   import { YourComponent } from '../components/your-component/your-component'
   
   const meta: Meta<typeof YourComponent> = {
     title: 'Components/YourComponent',
     component: YourComponent,
     parameters: {
       layout: 'centered',
     },
     tags: ['autodocs'],
   }
   
   export default meta
   type Story = StoryObj<typeof meta>
   
   export const Default: Story = {
     args: {
       children: 'Your Component',
     },
   }
   ```

### Component Guidelines

- **Accessibility First**: All components must be accessible (WCAG 2.1 AA)
- **TypeScript**: Use TypeScript for all components
- **Responsive**: Components should work on all screen sizes
- **Themeable**: Support light/dark modes
- **Composable**: Design for composition and reusability
- **Performance**: Optimize for performance

## Documentation

### Component Documentation

Each component should have:

- **Props documentation** - Clear prop descriptions
- **Usage examples** - Multiple use cases
- **Accessibility notes** - ARIA attributes, keyboard navigation
- **Storybook stories** - Interactive examples

### Website Documentation

Update the documentation website when:

- Adding new components
- Changing APIs
- Adding new features
- Updating installation/usage instructions

## Testing

### Test Requirements

- **Unit tests** for utility functions
- **Component tests** for React components
- **Accessibility tests** using @testing-library
- **Visual regression tests** via Storybook

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Style Guide

### Code Style

- **ESLint + Prettier** - Automated formatting
- **TypeScript** - Strict mode enabled
- **Conventional Commits** - Structured commit messages

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new Button component
fix: resolve accessibility issue in Modal
docs: update installation guide
style: format code with prettier
refactor: simplify utility functions
test: add tests for Input component
chore: update dependencies
```

### CSS/Styling

- **Tailwind CSS** - Utility-first approach
- **CSS Variables** - For theming
- **Mobile-first** - Responsive design
- **BEM methodology** - For custom CSS classes

## Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** - Breaking changes
- **MINOR** - New features (backward compatible)
- **PATCH** - Bug fixes (backward compatible)

### Release Steps

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create a release PR
4. Merge to main
5. Create a GitHub release
6. Publish to npm

## Getting Help

### Resources

- 📖 [Documentation](https://adrianomaringolo.github.io/buildgrid-ui/)
- 🎨 [Storybook](https://main--6944355833ad98d1ee729cd0.chromatic.com/)
- 💬 [GitHub Discussions](https://github.com/adrianomaringolo/buildgrid-ui/discussions)
- 🐛 [Issues](https://github.com/adrianomaringolo/buildgrid-ui/issues)

### Questions?

- Create a [GitHub Discussion](https://github.com/adrianomaringolo/buildgrid-ui/discussions)
- Open an [Issue](https://github.com/adrianomaringolo/buildgrid-ui/issues)
- Email: [adrianomaringolo@gmail.com](mailto:adrianomaringolo@gmail.com)

## Recognition

Contributors will be recognized in:

- 🏆 **README.md** - Contributors section
- 📝 **CHANGELOG.md** - Release notes
- 🎉 **GitHub Releases** - Special mentions
- 🌟 **Website** - Contributors page

---

Thank you for contributing to BuildGrid UI! Your efforts help make this library better for everyone. 🚀

## License

By contributing to BuildGrid UI, you agree that your contributions will be licensed under the same license as the project.