# Button Component Tests

This test suite provides comprehensive coverage for the Button component, ensuring it renders correctly with different variants and sizes, handles loading states, supports the asChild pattern, and maintains proper accessibility standards.

## Test Coverage

### Rendering (4 tests)
- ✅ Default variant and size rendering with proper CSS classes
- ✅ Text content display
- ✅ Custom className merging
- ✅ HTML attribute forwarding with data-slot

### Variants (6 tests)
- ✅ Default variant styling
- ✅ Destructive variant styling
- ✅ Outline variant styling
- ✅ Secondary variant styling
- ✅ Ghost variant styling
- ✅ Link variant styling

### Sizes (5 tests)
- ✅ Medium size (default) styling
- ✅ Small size styling
- ✅ Large size styling
- ✅ Extra large size styling
- ✅ Icon size styling

### Loading State (3 tests)
- ✅ Loading spinner display when isLoading is true
- ✅ No spinner when isLoading is false
- ✅ No spinner by default

### AsChild Prop (3 tests)
- ✅ Renders as Slot when asChild is true
- ✅ Ignores isLoading when asChild is true (with warning)
- ✅ Applies button classes to child element

### Interactions (4 tests)
- ✅ onClick handler execution
- ✅ Disabled state prevents onClick
- ✅ Keyboard navigation with Enter key
- ✅ Space key activation

### Disabled State (2 tests)
- ✅ Disabled styling application
- ✅ Non-clickable when disabled

### Accessibility (4 tests)
- ✅ Focus styles application
- ✅ aria-label support
- ✅ aria-describedby support
- ✅ aria-invalid styling

### Content Types (4 tests)
- ✅ Text content rendering
- ✅ Icon content rendering
- ✅ Icon-only button rendering
- ✅ Complex JSX content rendering

### Edge Cases (4 tests)
- ✅ Undefined variant and size handling
- ✅ Empty button rendering
- ✅ Very long text handling
- ✅ Special characters handling

### Form Integration (3 tests)
- ✅ Type attribute support
- ✅ Form attribute support
- ✅ Form context integration

### Loading State with Different Variants (1 test)
- ✅ Loading state with all variants

## Total: 43 tests

All tests use Vitest with jsdom environment and @testing-library/react for realistic DOM testing. The test suite ensures the Button component is robust, accessible, and handles various use cases including the advanced asChild pattern for composition.