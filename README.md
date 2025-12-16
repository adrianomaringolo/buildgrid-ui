# buildgrid-ui

### This lib is under construction, take a look again soon 🚧

A React component library built using [Vite](https://vitejs.dev) and [shadcn](https://ui.shadcn.com/) as the foundation. This library is designed to integrate seamlessly with React and Next.js applications and includes support for [TailwindCSS](https://tailwindcss.com). It also provides a Storybook setup to display and document the components.

## Features

- **Built with Vite** for a fast development experience.
- **TailwindCSS Integration** for utility-first styling.
- **shadcn Components** as a robust base.
- **Storybook** for component documentation and testing.
- **Semantic Versioning** with automated releases using [semantic-release](https://semantic-release.gitbook.io/semantic-release/).

---

## Getting Started

### Installation

To install the library, run:

```bash
npm install buildgrid-ui
# or
yarn add buildgrid-ui
```

### Usage

1.  **Import Components**: Import components directly into your React project:

    ```jsx
    import { Button } from "buildgrid-ui";

    const App = () => <Button variant="primary">Click Me</Button>;

    export default App;
    ```

2.  **Import Theme Styles**: Import the library's theme styles. This should be done once in your application's entry point (e.g., `src/main.tsx`, `src/index.tsx`, or `pages/_app.tsx` for Next.js):

    ```javascript
    // For JavaScript/TypeScript files
    import 'buildgrid-ui/theme';
    ```

    If you are using a CSS file for global imports, you can add:

    ```css
    /* For CSS files */
    @import 'buildgrid-ui/theme';
    ```

3.  **Configure TailwindCSS (for v3)**: Ensure TailwindCSS is configured in your project. Add the following content paths to your `tailwind.config.js` to include `buildgrid-ui`'s classes:

    ```javascript
    module.exports = {
      content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/buildgrid-ui/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    };
    ```

---

## Development

### Setting Up the Project

Clone the repository and install dependencies:

```bash
git clone https://github.com/adrianomaringolo/buildgrid-ui.git
cd buildgrid-ui
npm install
```

### Storybook

Run Storybook locally to preview and develop components:

```bash
npm run storybook
```

---

### Build the Library

To build the library for production:

```bash
npm run build
```

The output will be in the `dist/` directory, ready for publishing or integration.

---

## Semantic Releases

This project uses [semantic-release](https://semantic-release.gitbook.io/) for automated versioning and releases.

### Steps to Create a Pre-release

1.  Push changes to the designated pre-release branch (e.g., `alpha`):
    ```bash
    git checkout -b alpha
    git push origin alpha
    ```
2.  Pre-release versions (e.g., `1.0.0-alpha.1`) will be automatically created.

---

## Contributing

We welcome contributions from the community! BuildGrid UI is an open-source project and we're excited to see what you'll bring to it.

### Quick Start for Contributors

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Install dependencies**: `npm install`
4. **Start Storybook**: `npm run storybook`
5. **Make your changes** and test them
6. **Submit a pull request**

### Contribution Guidelines

Please read our [Contributing Guide](CONTRIBUTING.md) for detailed information on:

- 🚀 Setting up the development environment
- 📝 Code style and conventions
- 🧪 Testing requirements
- 📚 Documentation standards
- 🔄 Pull request process

### Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

### Ways to Contribute

- 🐛 **Report bugs** - [Create an issue](https://github.com/adrianomaringolo/buildgrid-ui/issues)
- ✨ **Request features** - [Start a discussion](https://github.com/adrianomaringolo/buildgrid-ui/discussions)
- 🔧 **Submit pull requests** - Fix bugs or add features
- 📖 **Improve documentation** - Help others understand the library
- 🎨 **Design components** - Contribute new UI components

### Development Resources

- 📚 [Documentation](https://adrianomaringolo.github.io/buildgrid-ui/)
- 🎨 [Storybook](https://buildgrid-ui-storybook.netlify.app/)
- 💬 [Discussions](https://github.com/adrianomaringolo/buildgrid-ui/discussions)
- 🐛 [Issues](https://github.com/adrianomaringolo/buildgrid-ui/issues)

---

## License

This project is licensed under the [MIT License](LICENSE).