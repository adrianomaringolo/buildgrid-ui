import { Badge, Button, HtmlTextArea, HtmlTextEditor, Switch } from 'buildgrid-ui'
import React from 'react'

export interface CodeExample {
	title: string
	description: string
	code: string
	preview: React.ReactNode
}

export const codeExamples: CodeExample[] = [
	{
		title: 'Button Component',
		description: 'Beautiful, accessible buttons with multiple variants',
		code: `import { Button } from 'buildgrid-ui'

export function Example() {
  return (
    <div className="flex gap-4">
      <Button variant="default">
        Primary
      </Button>
      <Button variant="secondary">
        Secondary
      </Button>
      <Button variant="outline">
        Outline
      </Button>
    </div>
  )
}`,
		preview: (
			<div className="flex gap-4 flex-wrap">
				<Button variant="default">Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="outline">Outline</Button>
			</div>
		),
	},
	{
		title: 'Badge Component',
		description: 'Status indicators and labels with multiple variants',
		code: `import { Badge } from 'buildgrid-ui'

export function Example() {
  return (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="default">
        Default
      </Badge>
      <Badge variant="secondary">
        Secondary
      </Badge>
      <Badge variant="destructive">
        Error
      </Badge>
      <Badge variant="outline">
        Outline
      </Badge>
    </div>
  )
}`,
		preview: (
			<div className="flex gap-2 flex-wrap">
				<Badge variant="default">Default</Badge>
				<Badge variant="secondary">Secondary</Badge>
				<Badge variant="destructive">Error</Badge>
				<Badge variant="outline">Outline</Badge>
			</div>
		),
	},
	{
		title: 'Avatar Component',
		description: 'User profile pictures with fallbacks and status indicators',
		code: `import { Avatar } from 'buildgrid-ui'

export function Example() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar>
        <Avatar.Image 
          src="https://github.com/shadcn.png" 
          alt="User" 
        />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
      
      <Avatar>
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
    </div>
  )
}`,
		preview: (
			<div className="flex gap-4 items-center">
				<div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
					CN
				</div>
				<div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-semibold text-sm">
					JD
				</div>
			</div>
		),
	},
	{
		title: 'Switch Component',
		description: 'Toggle switches for boolean settings and preferences',
		code: `import { Switch, Label } from 'buildgrid-ui'

export function Example() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="notifications" />
      <Label htmlFor="notifications">
        Enable notifications
      </Label>
    </div>
  )
}`,
		preview: (
			<div className="flex items-center space-x-3">
				<Switch id="demo-switch" />
				<label
					htmlFor="demo-switch"
					className="text-sm font-medium text-gray-700 dark:text-gray-300"
				>
					Enable notifications
				</label>
			</div>
		),
	},
	{
		title: 'HTML Text Editor Block',
		description: 'Rich text editor block for displaying formatted HTML content',
		code: `import { HtmlTextArea } from 'buildgrid-ui'

export function Example() {
  const htmlContent = \`
    <h3>Welcome to BuildGrid UI</h3>
    <p>This is a <strong>rich text</strong> editor that supports:</p>
    <ul>
      <li>HTML formatting</li>
      <li><em>Styled content</em></li>
      <li>Lists and more</li>
    </ul>
  \`
  
  return (
		<HtmlTextEditor />
		
    <HtmlTextArea>
      {htmlContent}
    </HtmlTextArea>
  )
}`,
		preview: (
			<div className="w-full max-w-md space-y-2">
				<HtmlTextEditor />

				<HtmlTextArea>
					{`
    <h3>Welcome to BuildGrid UI</h3>
    <p>This is a <strong>rich text</strong> area that supports:</p>
    <ul>
      <li>HTML formatting</li>
      <li><em>Styled content</em></li>
      <li>Lists and more</li>
    </ul>
  `}
				</HtmlTextArea>
			</div>
		),
	},
]
