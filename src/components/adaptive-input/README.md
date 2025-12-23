# AdaptiveInput Component Tests

This file contains comprehensive unit tests for the AdaptiveInput component.

## Test Coverage

### ✅ Rendering Tests (6 tests)
- Renders correctly with default props
- Renders with left icon
- Renders with right icon  
- Renders with both left and right icons
- Applies custom className
- Forwards ref correctly

### ✅ Icon Positioning Tests (3 tests)
- Positions left icon correctly with proper CSS classes
- Positions right icon correctly with proper CSS classes
- Applies correct padding when left icon is present

### ✅ Mask Functionality Tests (6 tests)
- Applies phone mask correctly: `(000) 000-0000`
- Applies CPF mask correctly: `000.000.000-00`
- Applies date mask correctly: `00/00/0000`
- Handles partial input with mask
- Ignores non-numeric characters with mask
- Works without mask (normal input behavior)

### ✅ Event Handling Tests (3 tests)
- Calls onChange when provided
- Calls onChange with masked value
- Handles onFocus and onBlur events

### ✅ Accessibility Tests (5 tests)
- Has proper input role
- Supports aria-label
- Supports aria-describedby
- Supports disabled state
- Supports required attribute

### ✅ Input Props Forwarding Tests (2 tests)
- Forwards standard input props (type, name, id, maxLength, autoComplete)
- Forwards value prop for controlled inputs

### ✅ Edge Cases Tests (3 tests)
- Handles empty mask gracefully
- Handles mask longer than input
- Handles input longer than mask

## Key Features Tested

### 🎭 **Mask System**
The component includes a sophisticated masking system that:
- Applies formatting patterns to user input
- Filters out non-numeric characters
- Handles partial input gracefully
- Supports common formats (phone, CPF, date)

### 🎨 **Icon Integration**
- Left and right icon positioning
- Automatic padding adjustment
- Proper CSS class application
- Icon container styling

### ♿ **Accessibility**
- Full ARIA support
- Keyboard navigation
- Screen reader compatibility
- Standard input attributes

### 🔧 **Props Forwarding**
- All standard input props are forwarded
- Ref forwarding for imperative access
- Event handler preservation

## Test Examples

### Mask Functionality
```typescript
it('applies phone mask correctly', async () => {
  const user = userEvent.setup()
  render(<AdaptiveInput placeholder="Phone number" mask="(000) 000-0000" />)
  
  const input = screen.getByPlaceholderText('Phone number')
  await user.type(input, '1234567890')
  
  expect(input).toHaveValue('(123) 456-7890')
})
```

### Icon Positioning
```typescript
it('renders with both left and right icons', () => {
  render(
    <AdaptiveInput 
      placeholder="Search users" 
      leftIcon={<Search data-testid="search-icon" />}
      rightIcon={<User data-testid="user-icon" />} 
    />
  )
  
  expect(screen.getByTestId('search-icon')).toBeInTheDocument()
  expect(screen.getByTestId('user-icon')).toBeInTheDocument()
  
  const input = screen.getByPlaceholderText('Search users')
  expect(input).toHaveClass('pl-8', 'pr-8')
})
```

## Technologies Used

- **Vitest**: Testing framework
- **@testing-library/react**: Component testing utilities
- **@testing-library/user-event**: User interaction simulation
- **Lucide React**: Icons for testing icon functionality

## Running Tests

```bash
# Run AdaptiveInput tests only
npm test -- src/components/adaptive-input/adaptive-input.test.tsx

# Run with coverage
npm run test:coverage -- src/components/adaptive-input/adaptive-input.test.tsx
```