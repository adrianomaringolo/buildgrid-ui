# Separator Component Tests

This test suite provides comprehensive coverage for the Separator component.

## Test Coverage

### Component Tested
- **Separator** - Visual divider element with horizontal/vertical orientations

### Test Categories

#### Functionality Tests
- ✅ Component rendering with default props
- ✅ Horizontal and vertical orientations
- ✅ Decorative vs semantic separator behavior
- ✅ Custom styling and className application

#### Styling Tests
- ✅ Default CSS classes application
- ✅ Orientation-specific styling (horizontal/vertical)
- ✅ Custom className combination with defaults
- ✅ Undefined className handling

#### Accessibility Tests
- ✅ Proper role attributes (role="none" for decorative, role="separator" for semantic)
- ✅ ARIA attributes support (aria-label, aria-labelledby, aria-describedby)
- ✅ Custom aria-orientation support
- ✅ Screen reader compatibility

#### Integration Tests
- ✅ Radix UI Separator integration
- ✅ Usage in different contexts (navigation, forms, cards)
- ✅ Multiple separator instances
- ✅ Ref forwarding and DOM access

#### Edge Cases
- ✅ Boolean props handling
- ✅ String orientation values
- ✅ Empty content handling
- ✅ Rapid prop changes

## Key Features Tested

### Orientation Support
- **Horizontal** (default): `h-[1px] w-full` classes
- **Vertical**: `h-full w-[1px]` classes
- Proper data-orientation attributes

### Decorative vs Semantic
- **Decorative** (default): `role="none"`, purely visual
- **Semantic**: `role="separator"`, meaningful for screen readers
- Proper accessibility attributes based on type

### Styling System
- Default classes: `shrink-0 bg-border`
- Orientation-specific dimensions
- Custom className support
- CSS class combination

### Usage Contexts
- Content dividers
- Navigation menu separators
- Form section dividers
- Card layout separators

## Important Notes

### Radix UI Behavior
- When `decorative=true` (default), the separator has `role="none"`
- When `decorative=false`, the separator has `role="separator"`
- The `data-decorative` attribute is not exposed in the DOM by Radix UI
- Data attributes like `data-orientation` are automatically added

### Accessibility Guidelines
- Use `decorative=false` for separators that provide semantic meaning
- Add `aria-label` for semantic separators to describe their purpose
- Decorative separators are ignored by screen readers
- Consider context when choosing between decorative and semantic

### Styling Considerations
- Default styling provides a subtle 1px border
- Vertical separators need explicit height from parent container
- Custom colors can be applied via className
- Responsive behavior depends on parent container