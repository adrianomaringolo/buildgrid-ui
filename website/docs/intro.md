---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting Started

Welcome to **BuildGrid UI**! This guide will help you quickly set up the library in your project and start using the components.

---

## Installation

BuildGrid UI is available as an npm package. You can install it using your package manager of choice.

<Tabs>
  <TabItem value="npm" label="npm" default>
    ```bash
    npm install buildgrid-ui
    ```
  </TabItem>
  <TabItem value="yarn" label="yarn">
    ```bash
    yarn add buildgrid-ui
    ```
  </TabItem> 
  <TabItem value="pnpm" label="pnpm">
    ```bash
    pnpm add buildgrid-ui
    ```
  </TabItem>
</Tabs>

## Peer Dependencies

Ensure the following dependencies are installed in your project for BuildGrid UI to work correctly:

- **React**: ^19.0.0
- **React DOM**: ^19.0.0
- **Tailwind CSS**: ^3.0.0

If you're new to **Tailwind CSS**, [click here](https://tailwindcss.com/docs/installation) to learn how to set it up in your project.

## Usage

After installation, you can start using BuildGrid UI components in your project.

### Import the Components

All components are tree-shakable, meaning you only import what you use. Here's an example of importing and using a button:

```jsx
import { Button } from 'buildgrid-ui';

export default function Example() {
  return <Button variant="primary">Click Me</Button>;
}
```

### Customizing Tailwind Configuration

BuildGrid UI is designed to integrate seamlessly with your Tailwind CSS configuration. You can extend your Tailwind theme to match your project's design system.

Add this to your `tailwind.config.js` file:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Customize your primary color
      },
    },
  },
};
```

### Explore the Components

Check out the full list of components and their usage in our comprehensive documentation.

## Next Steps

- [View the Components](./components/button) - Start with our Button component
- [Browse All Components](./components/accordion) - Explore the full component library
- [Visit our GitHub](https://github.com/adrianomaringolo/buildgrid-ui) - Contribute to the project
