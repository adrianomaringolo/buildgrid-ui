# Card Component Tests

This test suite provides comprehensive coverage for the Card component and all its sub-components, ensuring they render correctly, handle various content types, and maintain proper accessibility standards.

## Test Coverage

### Card Component (4 tests)
- ✅ Default rendering with proper CSS classes and data-slot
- ✅ Custom className merging
- ✅ HTML attribute forwarding
- ✅ Renders as div element

### CardHeader Component (3 tests)
- ✅ Default rendering with grid layout classes
- ✅ Custom className merging
- ✅ HTML attribute forwarding

### CardTitle Component (3 tests)
- ✅ Default rendering with typography classes
- ✅ Custom className merging
- ✅ HTML attribute forwarding

### CardDescription Component (3 tests)
- ✅ Default rendering with muted text styling
- ✅ Custom className merging
- ✅ HTML attribute forwarding

### CardAction Component (3 tests)
- ✅ Default rendering with grid positioning classes
- ✅ Custom className merging
- ✅ HTML attribute forwarding

### CardContent Component (3 tests)
- ✅ Default rendering with padding classes
- ✅ Custom className merging
- ✅ HTML attribute forwarding

### CardFooter Component (3 tests)
- ✅ Default rendering with flex layout classes
- ✅ Custom className merging
- ✅ HTML attribute forwarding

### Complete Card Structure (3 tests)
- ✅ Full card with all components
- ✅ Card with header and content only
- ✅ Minimal card with just content

### Content Types (3 tests)
- ✅ Text content rendering
- ✅ JSX content rendering
- ✅ Nested components rendering

### Accessibility (3 tests)
- ✅ aria-label support
- ✅ Role attribute support
- ✅ aria-describedby support

### Edge Cases (4 tests)
- ✅ Empty card rendering
- ✅ Very long content handling
- ✅ Special characters handling
- ✅ Undefined className handling

### Multiple Cards (1 test)
- ✅ Independent rendering of multiple cards

### Custom Styling (2 tests)
- ✅ Custom class merging with defaults
- ✅ Custom padding on components

## Total: 38 tests

All tests use Vitest with jsdom environment and @testing-library/react for realistic DOM testing. The test suite ensures the Card component system is robust, accessible, and handles various content layouts and styling scenarios gracefully.