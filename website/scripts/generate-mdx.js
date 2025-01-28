import fs from 'fs'
import path from 'path'

// Template for the MDX file
const mdxTemplate = (componentName, description) => `

import { ${componentName} } from 'buildgrid-ui';
import { CodeBox } from '../../src/components/docs/code-box'

# ${componentName.replace(/-/g, ' ')}

${description}

:::warning

This documentation is under **construction** 🚧👷‍♂️

Check again later please.

:::

<CodeBox code={\`<${componentName} />\`}>
	<${componentName} />
</CodeBox>

## Example

\`\`\`tsx
import { ${componentName} } from 'buildgrid-ui';

export default function App() {
  return (
    <${componentName} />
  );
}
\`\`\`

## Features

- Feature 1
- Feature 2
- Feature 3

## Props

| Name    | Type    | Default | Description     |
|---------|---------|---------|-----------------|
| example | string  | "test"  | Example prop.   |

## Use cases

:::info

Describe important use cases here...

:::

## Customize theme

:::info

Describe how to customize the theme here...

:::

## Accessibility

:::info

Describe accessibility requirements here...

:::
`

// Function to create an MDX file
const createMdxFile = async (folderPath, fileName, componentName, description) => {
	try {
		// Ensure the folder exists
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath, { recursive: true })
		}

		const filePath = path.join(folderPath, `${fileName}.mdx`)
		const content = mdxTemplate(componentName, description)

		// Write the file
		fs.writeFileSync(filePath, content, 'utf-8')

		console.log(`MDX file created at: ${filePath}`)
	} catch (error) {
		console.error('Error creating MDX file:', error)
	}
}

// Read arguments from the command line
const args = process.argv.slice(2)

if (args.length < 4) {
	console.error(
		'Usage: npm run generate-mdx <folderPath> <fileName> <componentName> <description>',
	)
	process.exit(1)
}

const [folderPath, fileName, componentName, description] = args

createMdxFile(folderPath, fileName, componentName, description)
