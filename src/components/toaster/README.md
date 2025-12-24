# Toast & Toaster Component Tests

## Overview
Comprehensive test suites for the Toast and Toaster components, which provide notification functionality using the Sonner library.

## Components Tested

### Toast (`toast.test.tsx`)
- **Toast Functions**: All toast methods (success, error, warning, info, dismiss)
- **Toast Close Button**: Custom close button with X icon
- **Integration**: Works with Toaster component
- **Toast Variants**: Different notification types
- **Toast Dismissal**: Manual and automatic dismissal
- **Complex Scenarios**: Multiple toasts, React content, custom options
- **Error Handling**: Empty/undefined/null messages
- **Performance**: Rapid creation and dismissal

### Toaster (`toaster.test.tsx`)
- **Rendering**: Default and custom styling
- **Toast Options**: Comprehensive styling configuration
- **Props Forwarding**: Position, theme, visibility options
- **Multiple Props**: Combined configuration options
- **Edge Cases**: Undefined/null props handling
- **Accessibility**: ARIA attributes and keyboard support
- **Theme Integration**: Light/dark mode support
- **Performance**: Efficient rendering and updates
- **Complex Scenarios**: All position options, consistent styling

## Test Coverage

### Toast Component (42 tests)
- ✅ Toast function exports and calls
- ✅ React node message support
- ✅ Additional options handling
- ✅ Close button functionality
- ✅ Integration with Toaster
- ✅ All toast variants (success, error, warning, info)
- ✅ Toast dismissal by ID and all toasts
- ✅ Multiple toast handling
- ✅ Complex React content
- ✅ Custom options support
- ✅ Error handling for edge cases
- ✅ Performance with rapid operations

### Toaster Component (42 tests)
- ✅ Basic rendering with default props
- ✅ Custom className application
- ✅ Default toast options configuration
- ✅ All required classNames present
- ✅ Correct styling for different toast types
- ✅ Icon styling for error/success/warning/info
- ✅ Button styling (action and cancel)
- ✅ Props forwarding (position, expand, richColors, etc.)
- ✅ Multiple props handling
- ✅ Edge cases (undefined/null props)
- ✅ Accessibility support
- ✅ Theme integration
- ✅ Performance optimization
- ✅ All position options support
- ✅ Consistent styling across re-renders

## Key Features Tested

### Toast Functionality
- **Message Types**: String and React node messages
- **Toast Variants**: Success, error, warning, info notifications
- **Custom Options**: Duration, position, dismissible settings
- **Close Button**: Custom styled close button with X icon
- **Dismissal**: Manual dismissal by ID or all toasts
- **Integration**: Seamless integration with Toaster component

### Toaster Configuration
- **Styling**: Comprehensive theme-aware styling system
- **Positioning**: All position options (top/bottom + left/center/right)
- **Theming**: Light/dark mode support
- **Customization**: Rich colors, close buttons, expand options
- **Performance**: Efficient rendering and prop updates
- **Accessibility**: ARIA attributes and keyboard support

### Advanced Features
- **Multiple Toasts**: Handling multiple simultaneous notifications
- **Complex Content**: Support for rich React content in toasts
- **Custom Styling**: Extensible styling system
- **Error Handling**: Graceful handling of edge cases
- **Performance**: Optimized for rapid toast operations
- **Theme Integration**: Automatic theme detection and application

## Testing Approach

### Mocking Strategy
- **Sonner Library**: Mocked to control toast behavior in tests
- **Toast Functions**: Mocked to return predictable IDs
- **Toaster Component**: Mocked to capture props and options

### Test Categories
1. **Unit Tests**: Individual component functionality
2. **Integration Tests**: Component interaction testing
3. **Props Testing**: All prop combinations and forwarding
4. **Edge Cases**: Error conditions and boundary cases
5. **Performance Tests**: Rapid operations and re-renders
6. **Accessibility Tests**: ARIA attributes and keyboard support

### Validation Methods
- **DOM Testing**: Element presence and attributes
- **Event Testing**: User interactions and callbacks
- **Props Testing**: Correct prop forwarding and application
- **Styling Testing**: CSS class application and theme support
- **Performance Testing**: Efficient rendering and updates

## Usage Examples

### Basic Toast Usage
```typescript
// Success notification
const id = toast.success('Operation completed successfully')

// Error notification with custom options
toast.error('Something went wrong', { duration: 5000 })

// Dismiss specific toast
toast.dismiss(id)

// Dismiss all toasts
toast.dismiss()
```

### Toaster Configuration
```typescript
// Basic toaster
<Toaster />

// Customized toaster
<Toaster 
  position="top-right"
  theme="dark"
  richColors
  closeButton
  expand
  visibleToasts={5}
/>
```

### Complex Toast Content
```typescript
// React node content
toast.info(
  <div>
    <h3>Update Available</h3>
    <p>A new version is ready to install</p>
  </div>
)
```

## Best Practices

### Testing
- Mock external dependencies (Sonner) for predictable tests
- Test both individual components and their integration
- Validate all prop combinations and edge cases
- Test performance with rapid operations
- Ensure accessibility compliance

### Implementation
- Use appropriate toast types for different message severities
- Configure Toaster once at the app level
- Handle toast dismissal appropriately
- Consider user experience with toast positioning and duration
- Implement proper error handling for edge cases

## Notes
- Tests use mocked Sonner components for isolation
- All toast variants include custom close buttons
- Toaster provides comprehensive styling configuration
- Components support both controlled and uncontrolled usage
- Performance optimized for rapid toast operations
- Full accessibility support with ARIA attributes