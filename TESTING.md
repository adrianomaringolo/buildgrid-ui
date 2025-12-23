# Testing Guide

This document describes how to run and write tests for BuildGrid UI components and utilities.

## Testing Configuration

BuildGrid UI uses **Vitest** as its testing framework with the following configuration:

- **Framework**: Vitest v3.2.4 - Fast, modern testing framework built on Vite
- **Environment**: jsdom - Browser-like environment for component testing
- **Coverage**: v8 provider with comprehensive reporting
- **Testing Utilities**: @testing-library/react, @testing-library/user-event
- **Setup**: Global test configuration with jest-dom matchers

## Available Scripts

```bash
# Development - Watch mode with instant feedback
npm test

# CI/Production - Single run with exit codes
npm run test:run

# Watch Mode - Continuous testing during development
npm run test:watch

# Visual Interface - Interactive test runner with GUI
npm run test:ui

# Coverage Report - Generate detailed coverage analysis
npm run test:coverage

# Coverage + Browser - Generate and automatically open coverage report
npm run test:coverage:open
```

## Test Structure & Organization

### File Location & Naming
- Tests should be co-located with the component they test
- Naming convention: `[component-name].test.tsx`
- Example: `src/components/accordion/accordion.test.tsx`

### Standard Test Structure

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { ComponentName } from './component-name'

describe('ComponentName', () => {
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      render(<ComponentName />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('handles click events correctly', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      
      render(<ComponentName onClick={handleClick} />)
      
      await user.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledOnce()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<ComponentName />)
      expect(screen.getByRole('button')).toHaveAttribute('aria-label')
    })
  })
})
```

## Test Categories

### 1. Rendering Tests
**Purpose**: Verify component renders correctly with various props and states

**What to test**:
- Component renders without crashing
- Default props are applied correctly
- Custom props override defaults
- Conditional rendering based on props
- CSS classes are applied correctly

**Example**:
```typescript
describe('Button Rendering', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-primary')
  })

  it('applies custom variant', () => {
    render(<Button variant="secondary">Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-secondary')
  })
})
```

### 2. Interaction Tests
**Purpose**: Test user interactions and event handling

**What to test**:
- Click events and callbacks
- Keyboard interactions
- Form submissions
- State changes from user actions
- Event propagation

**Example**:
```typescript
describe('Accordion Interactions', () => {
  it('toggles content on trigger click', async () => {
    const user = userEvent.setup()
    render(<AccordionExample />)

    const trigger = screen.getByText('Section 1')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Section 1 content')).toBeVisible()
  })
})
```

### 3. Accessibility Tests
**Purpose**: Ensure components meet WCAG 2.1 standards and are keyboard accessible

**What to test**:
- ARIA attributes and roles
- Keyboard navigation (Tab, Enter, Space, Arrow keys)
- Screen reader compatibility
- Focus management
- Color contrast and visual indicators

**Example**:
```typescript
describe('Accordion Accessibility', () => {
  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<AccordionExample />)

    // Tab navigation
    await user.tab()
    expect(screen.getAllByRole('button')[0]).toHaveFocus()

    // Enter key activation
    await user.keyboard('{Enter}')
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })

  it('has proper ARIA relationships', async () => {
    const user = userEvent.setup()
    render(<AccordionExample />)

    const trigger = screen.getByText('Section 1')
    await user.click(trigger)

    const controlsId = trigger.getAttribute('aria-controls')
    const content = screen.getByText('Section 1 content').closest('[role="region"]')
    
    expect(content).toHaveAttribute('id', controlsId)
  })
})
```

### 4. Edge Cases & Error Handling
**Purpose**: Test boundary conditions and error scenarios

**What to test**:
- Empty or null props
- Invalid prop combinations
- Error boundaries
- Loading and error states
- Performance with large datasets

**Example**:
```typescript
describe('Edge Cases', () => {
  it('handles empty accordion gracefully', () => {
    render(<Accordion type="single" />)
    expect(document.querySelector('[data-radix-accordion-root]')).toBeInTheDocument()
  })

  it('handles invalid props without crashing', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    render(<Button variant="invalid-variant">Test</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })
})
```

## Best Practices

### 1. Use userEvent over fireEvent
```typescript
// ✅ Recommended - Simulates real user behavior
const user = userEvent.setup()
await user.click(button)
await user.keyboard('{Enter}')
await user.type(input, 'Hello World')

// ❌ Avoid - Lower-level DOM events
fireEvent.click(button)
fireEvent.keyDown(button, { key: 'Enter' })
```

### 2. Test Behavior, Not Implementation
```typescript
// ✅ Recommended - Tests what users see and experience
expect(screen.getByText('Success message')).toBeInTheDocument()
expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')

// ❌ Avoid - Tests internal implementation details
expect(component.state.isOpen).toBe(true)
expect(wrapper.find('.internal-class')).toHaveLength(1)
```

### 3. Use Semantic Queries
```typescript
// ✅ Recommended - Accessible and semantic
screen.getByRole('button', { name: 'Submit' })
screen.getByLabelText('Email address')
screen.getByText('Welcome message')

// ❌ Avoid when semantic alternatives exist
screen.getByTestId('submit-button')
screen.getByClassName('email-input')
```

### 4. Organize Tests Logically
```typescript
describe('ComponentName', () => {
  describe('Rendering', () => {
    // Rendering tests
  })
  
  describe('User Interactions', () => {
    // Interaction tests
  })
  
  describe('Accessibility', () => {
    // A11y tests
  })
  
  describe('Edge Cases', () => {
    // Error handling and boundary tests
  })
})
```

### 5. Setup and Cleanup
```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    // Setup before each test
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Cleanup after each test
    cleanup()
  })
})
```

## Coverage Configuration

### Target Metrics
BuildGrid UI maintains high coverage standards:

```javascript
coverage: {
  thresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
```

### Excluded Files
The following files are excluded from coverage:
- Storybook stories (`*.stories.tsx`)
- Configuration files (`*.config.*`)
- Index files (`index.ts`)
- Build output (`dist/`)
- Documentation (`website/`)
- Test setup files

### Viewing Coverage Reports
```bash
# Generate coverage report
npm run test:coverage

# Open HTML report in browser
npm run test:coverage:open

# View coverage in terminal
npm run test:coverage -- --reporter=text
```

## Continuous Integration

### GitHub Actions Workflow
The project includes a comprehensive CI workflow that:
- Runs tests on Node.js 18.x and 20.x
- Executes linting and type checking
- Generates coverage reports
- Uploads coverage to Codecov
- Verifies build integrity

### Quality Gates
All pull requests must pass:
- ✅ All tests passing
- ✅ Coverage thresholds maintained
- ✅ No TypeScript errors
- ✅ ESLint rules compliance
- ✅ Build verification

## Debugging Tests

### Debug Mode
```bash
# Run tests with interactive debugger
npm run test:ui

# Run specific test file
npm test -- accordion.test.tsx

# Run tests matching pattern
npm test -- --grep "keyboard navigation"
```

### Console Debugging
```typescript
import { screen } from '@testing-library/react'

// Print entire DOM tree
screen.debug()

// Print specific element
screen.debug(screen.getByRole('button'))

// Print with custom serializer
screen.debug(element, 10000) // Increase max length
```

### Available Queries
```typescript
// Finding elements (throws if not found)
screen.getByRole('button')
screen.getByText('Click me')
screen.getByLabelText('Email')
screen.getByPlaceholderText('Enter email')
screen.getByDisplayValue('current value')

// Querying elements (returns null if not found)
screen.queryByText('Optional text')
screen.queryByRole('button')

// Async queries (waits for element to appear)
await screen.findByText('Loading complete')
await screen.findByRole('dialog')
```

## Example: Complete Test Suite

See `src/components/accordion/accordion.test.tsx` for a comprehensive example that covers:

- **Rendering Tests**: Default props, custom classes, ref forwarding
- **Single/Multiple Behavior**: Accordion type-specific functionality
- **Keyboard Navigation**: Tab, Enter, Space key interactions
- **Accessibility**: ARIA attributes, roles, relationships
- **User Interactions**: Click events, state changes
- **Edge Cases**: Empty accordion, invalid props, error boundaries

## Testing Philosophy

BuildGrid UI follows these testing principles:

1. **User-Centric Testing**: Test what users see and do, not implementation details
2. **Accessibility First**: Every component tested for keyboard navigation and screen readers
3. **Real User Interactions**: Use `userEvent` for realistic behavior simulation
4. **Comprehensive Coverage**: Unit, integration, and accessibility tests for all components
5. **Fast Feedback**: Quick test execution for efficient development workflow
6. **Maintainable Tests**: Clear, readable tests that serve as living documentation

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [User Event API](https://testing-library.com/docs/user-event/intro/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)