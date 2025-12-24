# Tooltip Component Tests

## Overview
Comprehensive test suite for the Tooltip components (TooltipProvider, Tooltip, TooltipTrigger, TooltipContent), which provide contextual information on hover or focus using Radix UI Tooltip primitives.

## Components Tested

### Tooltip System (`tooltip.test.tsx`)
A complete tooltip system with provider, root, trigger, and content components for displaying contextual information.

## Test Coverage (78 tests)

### TooltipProvider (3 tests)
- ✅ Renders with default props (delayDuration=0)
- ✅ Renders with custom delayDuration
- ✅ Forwards additional props (skipDelayDuration)

### Tooltip Root (4 tests)
- ✅ Renders with provider wrapper
- ✅ Forwards props to root
- ✅ Supports controlled state
- ✅ Supports onOpenChange callback

### TooltipTrigger (4 tests)
- ✅ Renders as button by default
- ✅ Supports custom element as trigger (asChild)
- ✅ Forwards additional props
- ✅ Has proper data-slot attribute

### TooltipContent (8 tests)
- ✅ Renders with default props and portal
- ✅ Applies default styling classes
- ✅ Applies animation classes
- ✅ Applies directional slide animations
- ✅ Renders with custom className
- ✅ Supports custom sideOffset
- ✅ Forwards additional props
- ✅ Renders arrow with correct styling

### Complete Tooltip (3 tests)
- ✅ Renders complete tooltip structure
- ✅ Supports complex content
- ✅ Supports multiple tooltips

### Interaction (4 tests)
- ✅ Handles hover events
- ✅ Handles focus events
- ✅ Supports controlled open state
- ✅ Calls onOpenChange when state changes

### Positioning (4 tests)
- ✅ Supports different sides (top, right, bottom, left)
- ✅ Supports different alignments (start, center, end)
- ✅ Supports custom offsets
- ✅ Supports collision detection

### Accessibility (3 tests)
- ✅ Maintains proper ARIA relationships
- ✅ Supports custom ARIA attributes
- ✅ Is keyboard accessible

### Standalone TooltipProvider (2 tests)
- ✅ Can be used independently
- ✅ Provides context to multiple tooltips

### Edge Cases (4 tests)
- ✅ Handles undefined className gracefully
- ✅ Handles empty content
- ✅ Handles null children gracefully
- ✅ Handles rapid hover events

### Performance (3 tests)
- ✅ Renders efficiently with minimal props
- ✅ Handles prop changes efficiently
- ✅ Maintains consistent styling across re-renders

### Complex Scenarios (3 tests)
- ✅ Works with nested interactive elements
- ✅ Handles dynamic content updates
- ✅ Maintains state across provider changes

## Key Features Tested

### Tooltip Structure
- **Provider**: Context provider for tooltip configuration
- **Root**: Main tooltip container with state management
- **Trigger**: Interactive element that shows tooltip
- **Content**: Tooltip content with positioning and styling
- **Portal**: Renders content outside normal DOM flow

### Positioning System
- **Sides**: Top, right, bottom, left positioning
- **Alignment**: Start, center, end alignment options
- **Offsets**: Custom side and align offsets
- **Collision Detection**: Automatic repositioning
- **Arrow**: Pointing arrow with proper styling

### Interaction Methods
- **Hover**: Mouse hover to show/hide
- **Focus**: Keyboard focus to show/hide
- **Controlled**: Programmatic open/close
- **Delay**: Configurable show/hide delays

### Styling Features
- **Default Styling**: Comprehensive default appearance
- **Custom Classes**: Extensible styling system
- **Animations**: Smooth show/hide transitions
- **Directional Animations**: Side-specific slide animations
- **Arrow Styling**: Matching arrow appearance

### Accessibility Features
- **ARIA Relationships**: Proper trigger-content association
- **Keyboard Support**: Focus-based tooltip display
- **Screen Reader**: Proper tooltip semantics
- **Custom ARIA**: Support for additional ARIA attributes

### Provider Features
- **Delay Configuration**: Global delay settings
- **Skip Delay**: Rapid tooltip switching
- **Multiple Tooltips**: Shared configuration
- **Context Sharing**: Provider-level settings

## Testing Approach

### Test Categories
1. **Component Tests**: Individual component rendering
2. **Structure Tests**: Complete tooltip system assembly
3. **Interaction Tests**: Hover, focus, and controlled interactions
4. **Positioning Tests**: All positioning and alignment options
5. **Accessibility Tests**: ARIA attributes and keyboard support
6. **Performance Tests**: Efficient rendering and updates

### Validation Methods
- **DOM Testing**: Element presence and structure
- **Attribute Testing**: Data attributes and ARIA properties
- **Styling Testing**: CSS class application
- **Event Testing**: User interactions
- **Portal Testing**: Content rendering in portal

### Mock Strategy
- **Radix UI Primitives**: Mocked for predictable testing
- **Portal Rendering**: Mocked to capture portal content
- **User Events**: Simulated with @testing-library/user-event

## Usage Examples

### Basic Tooltip
```typescript
<Tooltip>
  <TooltipTrigger>Hover me</TooltipTrigger>
  <TooltipContent>This is a tooltip</TooltipContent>
</Tooltip>
```

### Tooltip with Custom Positioning
```typescript
<Tooltip>
  <TooltipTrigger>Trigger</TooltipTrigger>
  <TooltipContent side="top" align="start" sideOffset={10}>
    Positioned tooltip
  </TooltipContent>
</Tooltip>
```

### Controlled Tooltip
```typescript
const [open, setOpen] = useState(false)

<Tooltip open={open} onOpenChange={setOpen}>
  <TooltipTrigger>Controlled trigger</TooltipTrigger>
  <TooltipContent>Controlled content</TooltipContent>
</Tooltip>
```

### Tooltip with Custom Styling
```typescript
<Tooltip>
  <TooltipTrigger>Trigger</TooltipTrigger>
  <TooltipContent className="bg-red-500 text-white">
    Custom styled tooltip
  </TooltipContent>
</Tooltip>
```

### Multiple Tooltips with Provider
```typescript
<TooltipProvider delayDuration={500}>
  <Tooltip>
    <TooltipTrigger>First trigger</TooltipTrigger>
    <TooltipContent>First tooltip</TooltipContent>
  </Tooltip>
  
  <Tooltip>
    <TooltipTrigger>Second trigger</TooltipTrigger>
    <TooltipContent>Second tooltip</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Tooltip with Complex Content
```typescript
<Tooltip>
  <TooltipTrigger>Info</TooltipTrigger>
  <TooltipContent>
    <div>
      <h4>Tooltip Title</h4>
      <p>Detailed description with <strong>formatting</strong></p>
    </div>
  </TooltipContent>
</Tooltip>
```

### Tooltip with Custom Trigger
```typescript
<Tooltip>
  <TooltipTrigger asChild>
    <button className="custom-button">
      Custom Button
    </button>
  </TooltipTrigger>
  <TooltipContent>Custom trigger tooltip</TooltipContent>
</Tooltip>
```

### Accessible Tooltip
```typescript
<Tooltip>
  <TooltipTrigger aria-label="Help information">
    <HelpIcon />
  </TooltipTrigger>
  <TooltipContent role="tooltip">
    This provides additional help information
  </TooltipContent>
</Tooltip>
```

## Best Practices

### Implementation
- Use TooltipProvider at app level for consistent behavior
- Keep tooltip content concise and helpful
- Position tooltips to avoid covering important content
- Use appropriate delays for user experience
- Handle controlled state carefully

### Testing
- Test all positioning combinations
- Validate accessibility compliance
- Test interaction methods (hover, focus, keyboard)
- Verify portal rendering
- Test performance with multiple tooltips

### Accessibility
- Ensure tooltips are keyboard accessible
- Use proper ARIA attributes
- Test with screen readers
- Provide meaningful tooltip content
- Handle focus management properly

### Performance
- Use TooltipProvider to share configuration
- Avoid unnecessary re-renders
- Keep tooltip content lightweight
- Consider delay settings for user experience

### Styling
- Use consistent styling across tooltips
- Ensure sufficient contrast
- Consider dark/light theme support
- Make arrows match tooltip styling
- Test on different screen sizes

## Notes
- Built on Radix UI Tooltip primitives for accessibility
- Automatic provider wrapper for convenience
- Portal rendering for proper z-index handling
- Comprehensive positioning and alignment system
- Smooth animations with directional variants
- Full keyboard and screen reader support
- Configurable delays and behavior
- Extensible styling system with CSS classes