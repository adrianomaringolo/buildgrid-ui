# Badge Component Tests

This test suite provides comprehensive coverage for the Badge component, ensuring it renders correctly with different variants, handles various content types, and maintains proper accessibility standards.

## Test Coverage

### Rendering (4 tests)
- ✅ Default variant rendering with proper CSS classes
- ✅ Text content display
- ✅ Custom className merging
- ✅ HTML attribute forwarding

### Variants (4 tests)
- ✅ Default variant styling
- ✅ Secondary variant styling
- ✅ Destructive variant styling
- ✅ Outline variant styling

### Content Types (4 tests)
- ✅ Text content rendering
- ✅ Number content rendering
- ✅ JSX content rendering
- ✅ Icon content rendering

### Accessibility (3 tests)
- ✅ Focus styles application
- ✅ aria-label support
- ✅ Role attribute support

### Styling (2 tests)
- ✅ Base CSS classes application
- ✅ Custom class merging with defaults

### Edge Cases (4 tests)
- ✅ Empty badge rendering
- ✅ Undefined variant handling
- ✅ Very long text handling
- ✅ Special characters handling

### Multiple Badges (1 test)
- ✅ Independent rendering of multiple badges

### Custom Styling Combinations (3 tests)
- ✅ Custom padding support
- ✅ Custom border radius support
- ✅ Custom font size support

## Total: 25 tests

All tests use Vitest with jsdom environment and @testing-library/react for realistic DOM testing. The test suite ensures the Badge component is robust, accessible, and handles various use cases gracefully.