# Checkbox Component Tests

This test suite provides comprehensive coverage for the Checkbox component, ensuring it renders correctly with different states, handles user interactions, supports form integration, and maintains proper accessibility standards.

## Test Coverage

### Rendering (4 tests)
- ✅ Default rendering with proper CSS classes
- ✅ Custom className merging
- ✅ HTML attribute forwarding
- ✅ aria-label support

### States (5 tests)
- ✅ Unchecked by default
- ✅ Checked state rendering
- ✅ Indeterminate state rendering
- ✅ Disabled state rendering
- ✅ Checked and disabled state combination

### Interactions (5 tests)
- ✅ onClick handler execution with checked state
- ✅ onClick handler execution with unchecked state
- ✅ Disabled state prevents interaction
- ✅ Space key activation (Radix behavior)
- ✅ Enter key does not activate (Radix behavior)

### Controlled Component (2 tests)
- ✅ Controlled component pattern
- ✅ Indeterminate state in controlled mode

### Accessibility (5 tests)
- ✅ Focus styles application
- ✅ aria-describedby support
- ✅ aria-invalid support
- ✅ Required attribute support
- ✅ Form label integration

### Visual Indicator (2 tests)
- ✅ Check icon display when checked
- ✅ Checked styling application

### Form Integration (2 tests)
- ✅ Value attribute support
- ✅ Form context integration

### Edge Cases (3 tests)
- ✅ Undefined onCheckedChange handling
- ✅ Undefined className handling
- ✅ Rapid clicks handling

### Multiple Checkboxes (1 test)
- ✅ Independent rendering of multiple checkboxes

### Custom Styling (2 tests)
- ✅ Custom class merging with defaults
- ✅ Custom size styling support

### Ref Forwarding (2 tests)
- ✅ Ref forwarding to underlying element
- ✅ Focus method access through ref

## Total: 33 tests

All tests use Vitest with jsdom environment and @testing-library/react for realistic DOM testing. The test suite ensures the Checkbox component follows Radix UI patterns, is accessible, and handles various states and interactions properly. ResizeObserver is mocked for jsdom compatibility.