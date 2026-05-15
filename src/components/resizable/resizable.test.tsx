import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable'

describe('ResizablePanelGroup', () => {
  describe('Rendering', () => {
    it('renders with data-slot="resizable-panel-group"', () => {
      const { container } = render(<ResizablePanelGroup />)
      const group = container.querySelector('[data-slot="resizable-panel-group"]')
      expect(group).toBeInTheDocument()
    })

    it('defaults to horizontal direction', () => {
      const { container } = render(<ResizablePanelGroup />)
      const group = container.querySelector('[data-slot="resizable-panel-group"]')
      expect(group).toHaveAttribute('data-direction', 'horizontal')
    })

    it('applies vertical direction via prop', () => {
      const { container } = render(<ResizablePanelGroup direction="vertical" />)
      const group = container.querySelector('[data-slot="resizable-panel-group"]')
      expect(group).toHaveAttribute('data-direction', 'vertical')
    })

    it('forwards className', () => {
      const { container } = render(<ResizablePanelGroup className="custom-group" />)
      const group = container.querySelector('[data-slot="resizable-panel-group"]')
      expect(group).toHaveClass('custom-group')
    })

    it('renders children', () => {
      render(
        <ResizablePanelGroup>
          <span>child content</span>
        </ResizablePanelGroup>,
      )
      expect(screen.getByText('child content')).toBeInTheDocument()
    })

    it('applies flex layout classes', () => {
      const { container } = render(<ResizablePanelGroup direction="horizontal" />)
      const group = container.querySelector('[data-slot="resizable-panel-group"]')
      expect(group).toHaveClass('flex', 'h-full', 'w-full')
    })

    it('applies flex-col for vertical direction', () => {
      const { container } = render(<ResizablePanelGroup direction="vertical" />)
      const group = container.querySelector('[data-slot="resizable-panel-group"]')
      expect(group).toHaveClass('flex-col')
    })
  })
})

describe('ResizablePanel', () => {
  describe('Rendering', () => {
    it('renders with data-slot="resizable-panel"', () => {
      const { container } = render(<ResizablePanel />)
      const panel = container.querySelector('[data-slot="resizable-panel"]')
      expect(panel).toBeInTheDocument()
    })

    it('applies defaultSize as flex style', () => {
      const { container } = render(<ResizablePanel defaultSize={40} />)
      const panel = container.querySelector('[data-slot="resizable-panel"]') as HTMLElement
      expect(panel.style.flex).toBe('0 0 40%')
    })

    it('defaults to a flex grow/shrink style when no defaultSize', () => {
      const { container } = render(<ResizablePanel />)
      const panel = container.querySelector('[data-slot="resizable-panel"]') as HTMLElement
      // jsdom normalizes '1 1 0' to '1 1 0px'
      expect(panel.style.flex).toMatch(/^1 1 0/)
    })

    it('forwards className', () => {
      const { container } = render(<ResizablePanel className="custom-panel" />)
      const panel = container.querySelector('[data-slot="resizable-panel"]')
      expect(panel).toHaveClass('custom-panel')
    })

    it('renders children', () => {
      render(
        <ResizablePanel>
          <div>Panel content</div>
        </ResizablePanel>,
      )
      expect(screen.getByText('Panel content')).toBeInTheDocument()
    })

    it('applies minSize as minWidth style', () => {
      const { container } = render(<ResizablePanel minSize={20} />)
      const panel = container.querySelector('[data-slot="resizable-panel"]') as HTMLElement
      expect(panel.style.minWidth).toBe('20%')
    })
  })
})

describe('ResizableHandle', () => {
  describe('Rendering', () => {
    it('renders with data-slot="resizable-handle"', () => {
      const { container } = render(<ResizableHandle />)
      const handle = container.querySelector('[data-slot="resizable-handle"]')
      expect(handle).toBeInTheDocument()
    })

    it('renders with role="separator"', () => {
      render(<ResizableHandle />)
      expect(screen.getByRole('separator')).toBeInTheDocument()
    })

    it('does not render grip icon when withHandle is false', () => {
      const { container } = render(<ResizableHandle withHandle={false} />)
      const grip = container.querySelector('svg')
      expect(grip).not.toBeInTheDocument()
    })

    it('renders grip icon when withHandle is true', () => {
      const { container } = render(<ResizableHandle withHandle />)
      const grip = container.querySelector('svg')
      expect(grip).toBeInTheDocument()
    })

    it('forwards className', () => {
      const { container } = render(<ResizableHandle className="custom-handle" />)
      const handle = container.querySelector('[data-slot="resizable-handle"]')
      expect(handle).toHaveClass('custom-handle')
    })

    it('applies horizontal cursor by default', () => {
      const { container } = render(<ResizableHandle direction="horizontal" />)
      const handle = container.querySelector('[data-slot="resizable-handle"]')
      expect(handle).toHaveClass('cursor-col-resize')
    })

    it('applies vertical cursor for vertical direction', () => {
      const { container } = render(<ResizableHandle direction="vertical" />)
      const handle = container.querySelector('[data-slot="resizable-handle"]')
      expect(handle).toHaveClass('cursor-row-resize')
    })

    it('is focusable via tabIndex', () => {
      const { container } = render(<ResizableHandle />)
      const handle = container.querySelector('[data-slot="resizable-handle"]') as HTMLElement
      expect(handle.tabIndex).toBe(0)
    })
  })

  describe('Accessibility', () => {
    it('has aria-orientation="vertical" for horizontal split', () => {
      const { container } = render(<ResizableHandle direction="horizontal" />)
      const handle = container.querySelector('[data-slot="resizable-handle"]')
      expect(handle).toHaveAttribute('aria-orientation', 'vertical')
    })

    it('has aria-orientation="horizontal" for vertical split', () => {
      const { container } = render(<ResizableHandle direction="vertical" />)
      const handle = container.querySelector('[data-slot="resizable-handle"]')
      expect(handle).toHaveAttribute('aria-orientation', 'horizontal')
    })
  })
})

describe('ResizablePanelGroup integration', () => {
  it('renders full panel group with panels and handle', () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div>Left</div>
        </ResizablePanel>
        <ResizableHandle direction="horizontal" withHandle />
        <ResizablePanel defaultSize={50}>
          <div>Right</div>
        </ResizablePanel>
      </ResizablePanelGroup>,
    )

    expect(container.querySelector('[data-slot="resizable-panel-group"]')).toBeInTheDocument()
    expect(container.querySelectorAll('[data-slot="resizable-panel"]')).toHaveLength(2)
    expect(container.querySelector('[data-slot="resizable-handle"]')).toBeInTheDocument()
    expect(screen.getByText('Left')).toBeInTheDocument()
    expect(screen.getByText('Right')).toBeInTheDocument()
  })

  it('renders three-panel layout', () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20}>
          <div>Sidebar</div>
        </ResizablePanel>
        <ResizableHandle direction="horizontal" />
        <ResizablePanel defaultSize={60}>
          <div>Main</div>
        </ResizablePanel>
        <ResizableHandle direction="horizontal" />
        <ResizablePanel defaultSize={20}>
          <div>Properties</div>
        </ResizablePanel>
      </ResizablePanelGroup>,
    )

    expect(container.querySelectorAll('[data-slot="resizable-panel"]')).toHaveLength(3)
    expect(container.querySelectorAll('[data-slot="resizable-handle"]')).toHaveLength(2)
  })

  describe('Edge Cases', () => {
    it('renders group with a single panel', () => {
      const { container } = render(
        <ResizablePanelGroup>
          <ResizablePanel>Only panel</ResizablePanel>
        </ResizablePanelGroup>,
      )
      expect(container.querySelector('[data-slot="resizable-panel"]')).toBeInTheDocument()
    })

    it('renders vertical group with panels and handle', () => {
      const { container } = render(
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={60}>
            <div>Top</div>
          </ResizablePanel>
          <ResizableHandle direction="vertical" />
          <ResizablePanel defaultSize={40}>
            <div>Bottom</div>
          </ResizablePanel>
        </ResizablePanelGroup>,
      )

      const group = container.querySelector('[data-slot="resizable-panel-group"]')
      expect(group).toHaveAttribute('data-direction', 'vertical')
      expect(container.querySelectorAll('[data-slot="resizable-panel"]')).toHaveLength(2)
    })
  })
})
