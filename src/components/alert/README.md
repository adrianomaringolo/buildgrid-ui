# Alert Component Tests

This file contains comprehensive unit tests for the Alert component.

## Test Coverage

### ✅ Rendering Tests (3 tests)
- Renders with default props
- Renders with title
- Applies custom className

### ✅ Variants Tests (4 tests)
- Renders info variant by default (blue theme)
- Renders warning variant correctly (yellow theme)
- Renders error variant correctly (red theme)
- Renders success variant correctly (green theme)

### ✅ Close Button Tests (4 tests)
- Does not show close button by default
- Shows close button when showCloseButton is true
- Calls onClose when close button is clicked
- Does not show close button when showCloseButton is true but onClose is not provided
- Applies correct close button styles for different variants

### ✅ Action Button Tests (6 tests)
- Does not show action button by default
- Shows action button when provided
- Calls action button onClick when clicked
- Applies default variant to action button
- Applies custom variant to action button
- Shows both action button and close button

### ✅ Animation Tests (2 tests)
- Starts with fade-in animation classes
- Applies closing animation when close button is clicked

### ✅ Accessibility Tests (6 tests)
- Has proper alert role
- Has aria-hidden on icon
- Close button has proper aria-label
- Close button has proper focus styles
- Supports keyboard navigation for close button
- Supports keyboard navigation for action button

### ✅ Content Rendering Tests (2 tests)
- Renders complex children content
- Renders title as heading

### ✅ Edge Cases Tests (3 tests)
- Handles empty children gracefully
- Handles null children gracefully
- Handles multiple onClose calls gracefully

## Key Features Tested

### 🎨 **Variant System**
The component supports four distinct variants:
- **Info** (default): Blue theme with Info icon
- **Warning**: Yellow theme with AlertTriangle icon
- **Error**: Red theme with AlertCircle icon
- **Success**: Green theme with CheckCircle icon

### 🔘 **Interactive Elements**
- **Close Button**: Optional with animation and proper accessibility
- **Action Button**: Customizable with different variants
- **Event Handling**: Proper callback execution

### 🎭 **Animation System**
- **Fade-in**: Smooth entrance animation
- **Fade-out**: Closing animation with proper timing
- **State Management**: Animation state tracking

### ♿ **Accessibility**
- **ARIA Roles**: Proper alert role
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper labeling and descriptions
- **Focus Management**: Proper focus styles

### 🎯 **Content Flexibility**
- **Rich Content**: Supports complex JSX children
- **Title Support**: Optional heading with proper semantics
- **Icon Integration**: Automatic icon selection per variant

## Test Examples

### Variant Testing
```typescript
it('renders warning variant correctly', () => {
  render(<Alert variant="warning">Warning message</Alert>)
  
  const alert = screen.getByRole('alert')
  expect(alert).toHaveClass('bg-yellow-50', 'border-yellow-200', 'text-yellow-800')
  
  const icon = alert.querySelector('svg')
  expect(icon).toHaveClass('text-yellow-600')
})
```

### Close Button Functionality
```typescript
it('calls onClose when close button is clicked', async () => {
  const handleClose = vi.fn()
  const user = userEvent.setup()
  
  render(
    <Alert showCloseButton onClose={handleClose}>
      Alert message
    </Alert>
  )
  
  const closeButton = screen.getByLabelText('Close alert')
  await user.click(closeButton)
  
  await waitFor(() => {
    expect(handleClose).toHaveBeenCalledOnce()
  }, { timeout: 500 })
})
```

### Action Button Testing
```typescript
it('shows action button when provided', () => {
  const handleAction = vi.fn()
  render(
    <Alert 
      actionButton={{
        label: 'Take Action',
        onClick: handleAction
      }}
    >
      Alert message
    </Alert>
  )
  
  expect(screen.getByRole('button', { name: 'Take Action' })).toBeInTheDocument()
})
```

### Animation Testing
```typescript
it('applies closing animation when close button is clicked', async () => {
  const handleClose = vi.fn()
  const user = userEvent.setup()
  
  render(
    <Alert showCloseButton onClose={handleClose}>
      Alert message
    </Alert>
  )
  
  const alert = screen.getByRole('alert')
  const closeButton = screen.getByLabelText('Close alert')
  
  // Initially should be visible
  await waitFor(() => {
    expect(alert).toHaveClass('opacity-100', 'translate-y-0', 'scale-100')
  })
  
  await user.click(closeButton)
  
  // Should apply closing animation
  await waitFor(() => {
    expect(alert).toHaveClass('opacity-0', '-translate-y-2', 'scale-95')
  })
})
```

## Technologies Used

- **Vitest**: Testing framework
- **@testing-library/react**: Component testing utilities
- **@testing-library/user-event**: User interaction simulation
- **Lucide React**: Icons (Info, AlertTriangle, AlertCircle, CheckCircle, X)

## Running Tests

```bash
# Run Alert tests only
npm test -- src/components/alert/alert.test.tsx

# Run with coverage
npm run test:coverage -- src/components/alert/alert.test.tsx

# Run specific test group
npm test -- src/components/alert/alert.test.tsx -t "Variants"
```

## Notes

- Tests include proper async handling for animations
- Accessibility tests ensure WCAG compliance
- Edge cases cover error scenarios and boundary conditions
- Animation tests verify proper timing and state management