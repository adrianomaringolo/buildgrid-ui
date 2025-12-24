# Spinner Component Tests

## Overview
Comprehensive test suite for the Spinner component with 42 test cases covering all functionality and edge cases.

## Test Coverage

### Rendering (4 tests)
- ✅ Renders spinner with default props
- ✅ Renders with custom className
- ✅ Renders with label
- ✅ Renders without label by default

### Sizes (7 tests)
- ✅ Renders with all size variants (xs, sm, md, lg, xl, 2xl)
- ✅ Uses medium size by default

### Colors (10 tests)
- ✅ Renders with all color variants (primary, secondary, success, error, warning, info, white, neutral)
- ✅ Uses primary color by default
- ✅ Applies color to label when present

### Label Styling (3 tests)
- ✅ Applies italic styling to label
- ✅ Applies color styling to label
- ✅ Renders label as paragraph element

### Animation (3 tests)
- ✅ Applies spin animation to spinner icon
- ✅ Maintains animation with different sizes
- ✅ Maintains animation with different colors

### Container Layout (2 tests)
- ✅ Applies flex column layout to container
- ✅ Centers content vertically and horizontally

### Accessibility (2 tests)
- ✅ Uses LoaderCircle icon with proper accessibility
- ✅ Label provides additional context

### Variant Combinations (2 tests)
- ✅ Combines size and color variants correctly
- ✅ Combines all props correctly

### Edge Cases (3 tests)
- ✅ Handles empty label gracefully
- ✅ Handles undefined className gracefully
- ✅ Handles null label gracefully

### Type Exports (2 tests)
- ✅ Exports spinner colors array
- ✅ Exports spinner sizes array

### Complex Scenarios (2 tests)
- ✅ Renders multiple spinners with different configurations
- ✅ Maintains styling consistency across different configurations

### Performance (2 tests)
- ✅ Renders efficiently with minimal DOM nodes
- ✅ Renders efficiently with label

## Key Features Tested

- **Size Variants**: xs, sm, md, lg, xl, 2xl
- **Color Variants**: primary, secondary, success, error, warning, info, white, neutral
- **Label Support**: Optional text label with color inheritance
- **Animation**: Continuous spin animation
- **Accessibility**: Proper ARIA attributes and screen reader support
- **Performance**: Efficient rendering with minimal DOM nodes
- **Edge Cases**: Graceful handling of undefined/null props

## Usage Examples Covered

```tsx
// Basic spinner
<Spinner />

// With size and color
<Spinner size="lg" color="success" />

// With label
<Spinner label="Loading..." />

// Custom styling
<Spinner className="custom-spinner" />

// All props combined
<Spinner 
  size="xl" 
  color="error" 
  label="Processing..." 
  className="custom-class" 
/>
```

## Test Utilities Used

- **@testing-library/react**: Component rendering and queries
- **@testing-library/user-event**: User interaction simulation
- **vitest**: Test framework and assertions
- **DOM queries**: Direct DOM element selection for styling verification

## Notes

- Tests use `document.querySelector('svg')` instead of `screen.getByRole('img')` because the LoaderCircle icon has `aria-hidden="true"`
- All size and color variants are tested using parameterized tests with `it.each()`
- Performance tests verify minimal DOM structure
- Edge cases ensure graceful degradation with invalid props