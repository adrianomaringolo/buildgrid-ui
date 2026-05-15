// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable'

const meta: Meta<typeof ResizablePanelGroup> = {
  component: ResizablePanelGroup,
}

export default meta
type Story = StoryObj<typeof ResizablePanelGroup>

export const Horizontal: Story = {
  render: () => (
    <div className="h-64 w-full max-w-2xl rounded-lg border overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full flex-col bg-muted/30 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Editor
            </p>
            <pre className="flex-1 text-xs text-foreground font-mono overflow-auto">
              {`function greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconst result = greet('World');\nconsole.log(result);`}
            </pre>
          </div>
        </ResizablePanel>
        <ResizableHandle direction="horizontal" />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full flex-col bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Preview
            </p>
            <div className="flex-1 flex items-center justify-center rounded-md bg-muted/20 border border-dashed">
              <p className="text-sm text-muted-foreground">Hello, World!</p>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="h-80 w-full max-w-2xl rounded-lg border overflow-hidden">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={60}>
          <div className="flex h-full flex-col bg-muted/30 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Editor
            </p>
            <pre className="flex-1 text-xs text-foreground font-mono overflow-auto">
              {`const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello World!');\n});\n\napp.listen(3000);`}
            </pre>
          </div>
        </ResizablePanel>
        <ResizableHandle direction="vertical" />
        <ResizablePanel defaultSize={40}>
          <div className="flex h-full flex-col bg-zinc-950 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
              Terminal
            </p>
            <pre className="flex-1 text-xs text-green-400 font-mono overflow-auto">
              {`$ node server.js\n> Server running on port 3000\n> GET / 200 — 1.2ms`}
            </pre>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}

export const ThreePanels: Story = {
  render: () => (
    <div className="h-80 w-full max-w-4xl rounded-lg border overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20}>
          <div className="flex h-full flex-col bg-muted/40 p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Files
            </p>
            <ul className="space-y-1 text-xs">
              {['index.tsx', 'app.tsx', 'utils.ts', 'styles.css', 'README.md'].map((file) => (
                <li
                  key={file}
                  className="flex items-center gap-2 rounded px-2 py-1 hover:bg-accent cursor-pointer text-foreground"
                >
                  <span className="text-muted-foreground">📄</span>
                  {file}
                </li>
              ))}
            </ul>
          </div>
        </ResizablePanel>
        <ResizableHandle direction="horizontal" />
        <ResizablePanel defaultSize={55}>
          <div className="flex h-full flex-col bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              index.tsx
            </p>
            <pre className="flex-1 text-xs text-foreground font-mono overflow-auto">
              {`import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './app';\n\nconst root = document.getElementById('root')!;\nReactDOM.createRoot(root).render(<App />);`}
            </pre>
          </div>
        </ResizablePanel>
        <ResizableHandle direction="horizontal" />
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full flex-col bg-muted/20 p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Properties
            </p>
            <div className="space-y-3 text-xs">
              {[
                { label: 'File', value: 'index.tsx' },
                { label: 'Type', value: 'TypeScript' },
                { label: 'Size', value: '312 bytes' },
                { label: 'Modified', value: 'Just now' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-muted-foreground">{label}</p>
                  <p className="font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}

export const WithHandle: Story = {
  render: () => (
    <div className="h-64 w-full max-w-2xl rounded-lg border overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40}>
          <div className="flex h-full items-center justify-center bg-muted/30">
            <p className="text-sm text-muted-foreground">Left Panel</p>
          </div>
        </ResizablePanel>
        <ResizableHandle direction="horizontal" withHandle />
        <ResizablePanel defaultSize={60}>
          <div className="flex h-full items-center justify-center bg-background">
            <p className="text-sm text-muted-foreground">Right Panel</p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-6 max-w-4xl">
      <div>
        <p className="text-sm font-semibold mb-2">Horizontal — Code Editor + Preview</p>
        <div className="h-48 rounded-lg border overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center bg-muted/30">
                <p className="text-sm text-muted-foreground font-mono">Editor</p>
              </div>
            </ResizablePanel>
            <ResizableHandle direction="horizontal" withHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center bg-background">
                <p className="text-sm text-muted-foreground">Preview</p>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold mb-2">Vertical — Editor + Terminal</p>
        <div className="h-48 rounded-lg border overflow-hidden">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={65}>
              <div className="flex h-full items-center justify-center bg-muted/30">
                <p className="text-sm text-muted-foreground font-mono">Editor</p>
              </div>
            </ResizablePanel>
            <ResizableHandle direction="vertical" withHandle />
            <ResizablePanel defaultSize={35}>
              <div className="flex h-full items-center justify-center bg-zinc-950">
                <p className="text-sm text-green-400 font-mono">Terminal</p>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold mb-2">Three Panels — Sidebar + Main + Properties</p>
        <div className="h-48 rounded-lg border overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={20}>
              <div className="flex h-full items-center justify-center bg-muted/40">
                <p className="text-xs text-muted-foreground">Files</p>
              </div>
            </ResizablePanel>
            <ResizableHandle direction="horizontal" />
            <ResizablePanel defaultSize={55}>
              <div className="flex h-full items-center justify-center bg-background">
                <p className="text-sm text-muted-foreground font-mono">Code</p>
              </div>
            </ResizablePanel>
            <ResizableHandle direction="horizontal" />
            <ResizablePanel defaultSize={25}>
              <div className="flex h-full items-center justify-center bg-muted/20">
                <p className="text-xs text-muted-foreground">Props</p>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  ),
}
