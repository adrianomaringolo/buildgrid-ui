# Collapsible Component Tests

This test suite provides comprehensive coverage for the Collapsible component system, ensuring it renders correctly, handles expand/collapse interactions, supports keyboard navigation, and maintains proper accessibility standards.

## Test Coverage

### Collapsible Component (6 tests)
- ✅ Default rendering with data-slot attribute
- ✅ Custom className merging
- ✅ HTML attribute forwarding
- ✅ Closed by default state
- ✅ Open with defaultOpen prop
- ✅ Open with controlled open prop

### CollapsibleTrigger Component (6 tests)
- ✅ Default button rendering with data-slot
- ✅ Custom className merging
- ✅ HTML attribute forwarding
- ✅ Proper accessibility attributes (aria-expanded, aria-controls)
- ✅ Button element rendering
- ✅ asChild prop support for custom elements

### CollapsibleContent Component (5 tests)
- ✅ Default rendering with data-slot
- ✅ Custom className merging
- ✅ HTML attribute forwarding
- ✅ Hidden when collapsible is closed
- ✅ Visible when collapsible is open

### Interactions (4 tests)
- ✅ Toggle content on trigger click
- ✅ onOpenChange callback execution
- ✅ Enter key support
- ✅ Space key support

### Controlled Component (2 tests)
- ✅ Controlled component pattern
- ✅ External state changes handling

### Disabled State (2 tests)
- ✅ Disabled trigger rendering
- ✅ No toggle when disabled trigger is clicked

### Content Types (3 tests)
- ✅ Text content rendering
- ✅ Complex JSX content rendering
- ✅ Form elements rendering

### Accessibility (4 tests)
- ✅ Proper ARIA attributes (aria-expanded, aria-controls)
- ✅ aria-expanded updates on toggle
- ✅ aria-label support on trigger
- ✅ aria-describedby support

### Edge Cases (5 tests)
- ✅ Empty collapsible rendering
- ✅ Collapsible with only trigger
- ✅ Collapsible with only content
- ✅ Undefined className handling
- ✅ Very long content handling

### Multiple Collapsibles (1 test)
- ✅ Independent rendering of multiple collapsibles

### Custom Styling (1 test)
- ✅ Custom class merging with default behavior

## Total: 39 tests

All tests use Vitest with jsdom environment and @testing-library/react for realistic DOM testing. The test suite ensures the Collapsible component follows Radix UI patterns, is accessible, and handles various content types and interaction patterns properly. Tests include proper async handling for state transitions and animations.