# Skeleton Component Tests

This test suite provides comprehensive coverage for the Skeleton component.

## Test Coverage

### Component Tested
- **Skeleton** - Loading placeholder component with shimmer animation

### Test Categories

#### Functionality Tests
- ✅ Component rendering with default props
- ✅ Repeat functionality for multiple skeletons
- ✅ Custom styling and className application
- ✅ HTML attribute forwarding

#### Repeat Functionality Tests
- ✅ Single skeleton rendering (default)
- ✅ Multiple skeleton rendering with repeat prop
- ✅ Zero repeat handling (renders nothing)
- ✅ Invalid value handling (null, undefined, NaN, negative)
- ✅ Unique key generation for repeated elements

#### Styling Tests
- ✅ Default shimmer animation classes
- ✅ Gradient background for animation effect
- ✅ Custom className combination with defaults
- ✅ Consistent styling across repeated elements

#### Animation Tests
- ✅ Shimmer animation class application
- ✅ Gradient background configuration
- ✅ Background size for animation effect
- ✅ Animation consistency across instances

#### Accessibility Tests
- ✅ ARIA attributes support (aria-label, aria-hidden, role)
- ✅ Screen reader compatibility
- ✅ Descriptive labeling for loading states
- ✅ Live region support for dynamic content

#### Edge Cases
- ✅ Negative repeat values (defaults to 1)
- ✅ Very large repeat values (performance)
- ✅ Decimal repeat values (floors to integer)
- ✅ String repeat values (coerces to number)
- ✅ NaN and null handling
- ✅ Boolean props handling

## Key Features Tested

### Repeat System
- **Default**: Single skeleton (repeat=1)
- **Multiple**: Array generation with unique keys
- **Zero**: Returns null (no rendering)
- **Invalid**: Fallback to 1 skeleton
- **Validation**: Handles edge cases gracefully

### Animation System
- **Shimmer Effect**: CSS animation class
- **Gradient Background**: Left-to-right gradient
- **Background Size**: 200% width for animation
- **Performance**: Efficient CSS-based animation

### Styling Flexibility
- **Default Classes**: Shimmer animation, gradient, rounded corners
- **Custom Styling**: Full className override support
- **Responsive**: Works with responsive utility classes
- **Consistent**: Same styling applied to all repeated elements

### Usage Patterns
- **Text Placeholders**: Various widths and heights
- **Image Placeholders**: Square, rectangular, circular
- **Avatar Placeholders**: Circular with consistent sizing
- **Card Placeholders**: Complex layouts with multiple skeletons
- **List Placeholders**: Repeated items with consistent spacing

## Important Implementation Details

### Repeat Logic
```typescript
const validRepeat = repeat == null || Number.isNaN(repeat) || repeat < 0 ? 1 : Math.floor(repeat)
if (validRepeat === 0) return null
```

### Animation Classes
- `animate-shimmer`: Custom CSS animation
- `bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300`: Gradient colors
- `bg-[length:200%_100%]`: Background size for animation effect

### Accessibility Best Practices
- Use `aria-label` to describe what's loading
- Use `aria-hidden="true"` for purely decorative skeletons
- Use `role="presentation"` for layout skeletons
- Consider `aria-live` regions for dynamic loading states

### Performance Considerations
- Efficient rendering with React.Fragment
- CSS-based animations (no JavaScript)
- Minimal DOM manipulation
- Optimized for large numbers of skeletons

### Common Usage Examples
```jsx
// Text skeleton
<Skeleton className="h-4 w-full" />

// Avatar skeleton  
<Skeleton className="h-12 w-12 rounded-full" />

// Multiple lines
<Skeleton repeat={3} className="h-4 w-full mb-2" />

// Card skeleton
<div>
  <Skeleton className="h-32 w-full rounded-lg mb-4" />
  <Skeleton className="h-6 w-3/4 mb-2" />
  <Skeleton repeat={2} className="h-4 w-full mb-1" />
</div>
```