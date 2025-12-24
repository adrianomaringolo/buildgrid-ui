# Toggle Component Tests

## Overview
Comprehensive test suite for the Toggle component, a button that can be toggled between pressed and unpressed states using Radix UI Toggle primitive.

## Component Tested

### Toggle (`toggle.test.tsx`)
A toggle button component that supports pressed/unpressed states with customizable variants and sizes.

## Test Coverage (67 tests)

### Rendering (8 tests)
- ✅ Basic rendering with default props
- ✅ Custom className application
- ✅ Default styling classes
- ✅ Hover and focus styling
- ✅ Disabled state styling
- ✅ Pressed state styling

### Variants (2 tests)
- ✅ Default variant (transparent background)
- ✅ Outline variant (border and shadow)

### Sizes (3 tests)
- ✅ Default size (h-9, px-2, min-w-9)
- ✅ Small size (h-8, px-1.5, min-w-8)
- ✅ Large size (h-10, px-2.5, min-w-10)

### States (4 tests)
- ✅ Unpressed by default
- ✅ Pressed when pressed prop is true
- ✅ Pressed when defaultPressed is true
- ✅ Disabled state support

### Interaction (4 tests)
- ✅ Toggles when clicked
- ✅ Calls onPressedChange when toggled
- ✅ Calls onPressedChange with correct values
- ✅ Does not toggle when disabled

### Keyboard Navigation (4 tests)
- ✅ Toggles with Space key
- ✅ Toggles with Enter key
- ✅ Calls onPressedChange with keyboard interaction
- ✅ Does not respond to keyboard when disabled

### Focus Management (3 tests)
- ✅ Is focusable
- ✅ Shows focus ring when focused
- ✅ Is not focusable when disabled

### Accessibility (5 tests)
- ✅ Has proper ARIA attributes
- ✅ Updates aria-pressed when state changes
- ✅ Supports aria-label
- ✅ Supports aria-labelledby
- ✅ Supports aria-describedby

### Content (4 tests)
- ✅ Renders text content
- ✅ Renders React node content
- ✅ Renders with icon
- ✅ Applies icon styling

### Controlled vs Uncontrolled (3 tests)
- ✅ Works as uncontrolled component
- ✅ Works as controlled component
- ✅ Updates when controlled value changes

### Ref Forwarding (2 tests)
- ✅ Forwards ref correctly
- ✅ Allows ref access to focus method

### Edge Cases (3 tests)
- ✅ Handles undefined className gracefully
- ✅ Handles empty children
- ✅ Handles rapid toggling
- ✅ Maintains state consistency during rapid interactions

### Complex Scenarios (3 tests)
- ✅ Works with labels and descriptions
- ✅ Handles multiple toggles independently
- ✅ Combines all variants and sizes correctly

## Key Features Tested

### Toggle States
- **Pressed/Unpressed**: Binary state with visual feedback
- **Default State**: Unpressed by default
- **Initial State**: Support for defaultPressed prop
- **Controlled State**: Support for controlled pressed prop
- **Disabled State**: Non-interactive disabled state

### Variants
- **Default**: Transparent background with hover effects
- **Outline**: Border with shadow and accent hover colors

### Sizes
- **Default**: Standard size (h-9, px-2, min-w-9)
- **Small**: Compact size (h-8, px-1.5, min-w-8)
- **Large**: Larger size (h-10, px-2.5, min-w-10)

### Interaction Methods
- **Mouse**: Click to toggle
- **Keyboard**: Space and Enter keys
- **Touch**: Touch events (inherited from button)
- **Programmatic**: Via controlled props

### Accessibility Features
- **ARIA Attributes**: Proper aria-pressed state
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Screen Reader**: Proper button semantics
- **Labels**: Support for aria-label and aria-labelledby

### Content Support
- **Text Content**: Simple text labels
- **React Nodes**: Complex JSX content
- **Icons**: SVG icons with proper styling
- **Mixed Content**: Text and icons together

## Testing Approach

### Test Categories
1. **Rendering Tests**: Visual appearance and styling
2. **State Tests**: Pressed/unpressed state management
3. **Interaction Tests**: User input handling
4. **Accessibility Tests**: ARIA attributes and keyboard support
5. **Content Tests**: Different content types
6. **Edge Cases**: Error conditions and boundary cases

### Validation Methods
- **DOM Testing**: Element presence and attributes
- **Event Testing**: Click and keyboard interactions
- **State Testing**: aria-pressed and data-state attributes
- **Styling Testing**: CSS class application
- **Accessibility Testing**: ARIA attributes and focus management

### Mock Strategy
- No external mocking required (uses Radix UI primitives)
- User events simulated with @testing-library/user-event
- Focus and keyboard interactions tested directly

## Usage Examples

### Basic Toggle
```typescript
<Toggle>Toggle me</Toggle>
```

### Controlled Toggle
```typescript
const [pressed, setPressed] = useState(false)

<Toggle pressed={pressed} onPressedChange={setPressed}>
  Controlled Toggle
</Toggle>
```

### Toggle with Variants and Sizes
```typescript
<Toggle variant="outline" size="lg">
  Large Outline Toggle
</Toggle>
```

### Toggle with Icon
```typescript
<Toggle>
  <Icon />
  Toggle with Icon
</Toggle>
```

### Disabled Toggle
```typescript
<Toggle disabled>
  Disabled Toggle
</Toggle>
```

### Toggle with Accessibility
```typescript
<Toggle 
  aria-label="Toggle notifications"
  aria-describedby="toggle-help"
>
  Notifications
</Toggle>
```

## Best Practices

### Implementation
- Use controlled components for complex state management
- Provide clear labels for accessibility
- Use appropriate variants for different contexts
- Handle disabled states appropriately
- Include proper ARIA attributes

### Testing
- Test both controlled and uncontrolled usage
- Validate all interaction methods (mouse, keyboard)
- Ensure accessibility compliance
- Test edge cases and error conditions
- Verify proper state management

### Accessibility
- Always provide accessible labels
- Ensure keyboard navigation works
- Test with screen readers
- Use proper ARIA attributes
- Maintain focus management

## Notes
- Built on Radix UI Toggle primitive for accessibility
- Supports both controlled and uncontrolled usage
- Full keyboard navigation support
- Customizable variants and sizes
- Proper ARIA attributes for screen readers
- Icon styling with CSS selectors
- Ref forwarding for direct DOM access