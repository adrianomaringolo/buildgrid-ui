# Toggle Group Component Tests

## Overview
Comprehensive test suite for the ToggleGroup and ToggleGroupItem components, which provide grouped toggle functionality with single or multiple selection modes using Radix UI Toggle Group primitives.

## Components Tested

### ToggleGroup & ToggleGroupItem (`toggle-group.test.tsx`)
A group of toggle buttons that can work in single-selection or multiple-selection modes with shared styling and behavior.

## Test Coverage (89 tests)

### ToggleGroup Root (5 tests)
- ✅ Renders with default props
- ✅ Custom className application
- ✅ Default styling classes (flex, items-center, justify-center, gap-1)
- ✅ Single selection type support
- ✅ Multiple selection type support

### ToggleGroupItem (6 tests)
- ✅ Renders with default props
- ✅ Custom className application
- ✅ Toggle variant styling inheritance
- ✅ Inherits variant from group context
- ✅ Inherits size from group context
- ✅ Can override group variant and size

### Single Selection (6 tests)
- ✅ Allows only one item to be selected
- ✅ Calls onValueChange with selected value
- ✅ Supports default value
- ✅ Supports controlled value
- ✅ Can deselect item when clicked again

### Multiple Selection (5 tests)
- ✅ Allows multiple items to be selected
- ✅ Calls onValueChange with array of selected values
- ✅ Supports default value array
- ✅ Supports controlled value array
- ✅ Can deselect items

### Keyboard Navigation (5 tests)
- ✅ Supports arrow key navigation
- ✅ Supports Home and End keys
- ✅ Activates item on Space key
- ✅ Activates item on Enter key

### Disabled State (3 tests)
- ✅ Supports disabled group
- ✅ Supports disabled individual items
- ✅ Does not respond to clicks when disabled

### Orientation (2 tests)
- ✅ Supports horizontal orientation by default
- ✅ Supports vertical orientation

### Accessibility (3 tests)
- ✅ Has proper ARIA attributes
- ✅ Supports aria-label on group
- ✅ Supports aria-labelledby on group
- ✅ Maintains proper tab order

### Variants and Sizes (4 tests)
- ✅ Applies default variant to all items
- ✅ Applies outline variant to all items
- ✅ Applies size to all items
- ✅ Allows individual items to override group variant

### Edge Cases (4 tests)
- ✅ Handles undefined className gracefully
- ✅ Handles empty group
- ✅ Handles single item group
- ✅ Handles rapid selection changes

### Complex Scenarios (3 tests)
- ✅ Works with mixed content types
- ✅ Maintains state consistency across re-renders
- ✅ Handles controlled to uncontrolled transition

## Key Features Tested

### Selection Modes
- **Single Selection**: Only one item can be selected at a time
- **Multiple Selection**: Multiple items can be selected simultaneously
- **Default Values**: Initial selection state
- **Controlled Values**: External state management
- **Deselection**: Ability to deselect items

### Group Behavior
- **Context Sharing**: Variant and size inheritance
- **Unified Styling**: Consistent appearance across items
- **Gap Management**: Proper spacing between items
- **Orientation**: Horizontal and vertical layouts

### Item Behavior
- **State Management**: Individual pressed states
- **Context Inheritance**: Automatic styling from group
- **Override Capability**: Individual customization
- **Event Handling**: Click and keyboard interactions

### Keyboard Navigation
- **Arrow Keys**: Navigate between items
- **Home/End**: Jump to first/last item
- **Space/Enter**: Activate focused item
- **Tab Order**: Proper focus management

### Accessibility Features
- **ARIA Attributes**: Proper group and button roles
- **Keyboard Support**: Full keyboard navigation
- **Focus Management**: Roving tabindex pattern
- **Screen Reader**: Proper semantics and labels

### Styling System
- **Variant Inheritance**: Group-level variant application
- **Size Inheritance**: Group-level size application
- **Individual Override**: Item-level customization
- **Context Provider**: React context for sharing styles

## Testing Approach

### Test Categories
1. **Component Tests**: Individual component rendering
2. **Selection Tests**: Single and multiple selection modes
3. **Interaction Tests**: Mouse and keyboard interactions
4. **Accessibility Tests**: ARIA attributes and keyboard navigation
5. **Styling Tests**: Variant and size inheritance
6. **Edge Cases**: Error conditions and boundary cases

### Validation Methods
- **DOM Testing**: Element presence and attributes
- **Event Testing**: User interactions and state changes
- **State Testing**: Selection state management
- **Context Testing**: Style inheritance and overrides
- **Accessibility Testing**: ARIA attributes and focus management

### Mock Strategy
- No external mocking required (uses Radix UI primitives)
- User events simulated with @testing-library/user-event
- Focus and keyboard interactions tested directly

## Usage Examples

### Single Selection Group
```typescript
<ToggleGroup type="single" defaultValue="option1">
  <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
  <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
  <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
</ToggleGroup>
```

### Multiple Selection Group
```typescript
<ToggleGroup type="multiple" defaultValue={['option1', 'option3']}>
  <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
  <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
  <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
</ToggleGroup>
```

### Controlled Group
```typescript
const [value, setValue] = useState<string>()

<ToggleGroup type="single" value={value} onValueChange={setValue}>
  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
  <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
</ToggleGroup>
```

### Styled Group
```typescript
<ToggleGroup type="single" variant="outline" size="lg">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>
```

### Vertical Group
```typescript
<ToggleGroup type="single" orientation="vertical">
  <ToggleGroupItem value="top">Top</ToggleGroupItem>
  <ToggleGroupItem value="middle">Middle</ToggleGroupItem>
  <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
</ToggleGroup>
```

### Individual Item Customization
```typescript
<ToggleGroup type="single" variant="default">
  <ToggleGroupItem value="normal">Normal</ToggleGroupItem>
  <ToggleGroupItem value="special" variant="outline" size="lg">
    Special
  </ToggleGroupItem>
</ToggleGroup>
```

### Disabled Items
```typescript
<ToggleGroup type="single">
  <ToggleGroupItem value="enabled">Enabled</ToggleGroupItem>
  <ToggleGroupItem value="disabled" disabled>Disabled</ToggleGroupItem>
</ToggleGroup>
```

### With Accessibility
```typescript
<ToggleGroup 
  type="single" 
  aria-label="Text formatting options"
>
  <ToggleGroupItem value="bold" aria-label="Bold text">
    <BoldIcon />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic text">
    <ItalicIcon />
  </ToggleGroupItem>
</ToggleGroup>
```

## Best Practices

### Implementation
- Choose appropriate selection type (single vs multiple)
- Use controlled components for complex state management
- Provide clear labels for accessibility
- Group related functionality together
- Handle disabled states appropriately

### Testing
- Test both selection modes thoroughly
- Validate keyboard navigation
- Ensure accessibility compliance
- Test state management edge cases
- Verify style inheritance and overrides

### Accessibility
- Provide group labels with aria-label or aria-labelledby
- Ensure keyboard navigation works properly
- Test with screen readers
- Use proper ARIA attributes
- Maintain logical tab order

### Styling
- Use group-level variants and sizes for consistency
- Override individual items only when necessary
- Consider orientation for layout
- Maintain visual hierarchy
- Ensure sufficient contrast and spacing

## Notes
- Built on Radix UI Toggle Group primitives for accessibility
- Supports both single and multiple selection modes
- Full keyboard navigation with roving tabindex
- Context-based style inheritance system
- Proper ARIA attributes for screen readers
- Flexible orientation support (horizontal/vertical)
- Individual item customization capabilities
- Comprehensive disabled state handling