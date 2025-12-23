# Sheet Component Tests

This test suite provides comprehensive coverage for the Sheet component and its sub-components.

## Test Coverage

### Components Tested
- **Sheet** - Root sheet component with controlled/uncontrolled state
- **SheetTrigger** - Button or element that opens the sheet
- **SheetContent** - Main sheet container with side positioning
- **SheetHeader** - Header section with consistent spacing
- **SheetFooter** - Footer section with action buttons
- **SheetTitle** - Accessible title for the sheet
- **SheetDescription** - Accessible description for the sheet
- **SheetClose** - Button to close the sheet

### Test Categories

#### Functionality Tests
- ✅ Component rendering and basic functionality
- ✅ Controlled and uncontrolled state management
- ✅ Sheet opening and closing behavior
- ✅ Different side positioning (top, right, bottom, left)
- ✅ Custom trigger elements with asChild

#### Styling Tests
- ✅ Default CSS classes and styling
- ✅ Custom className application
- ✅ Side-specific styling and positioning
- ✅ Responsive behavior and animations

#### Interaction Tests
- ✅ Click to open/close
- ✅ Keyboard navigation (Enter, Space, Escape)
- ✅ Overlay click to close
- ✅ Close button functionality
- ✅ Focus management and trapping

#### Accessibility Tests
- ✅ ARIA attributes and roles
- ✅ Screen reader compatibility
- ✅ Keyboard navigation support
- ✅ Focus trapping within sheet
- ✅ Custom ARIA labels and descriptions

#### Integration Tests
- ✅ Radix UI Dialog integration
- ✅ Form submission within sheets
- ✅ Nested interactive elements
- ✅ Multiple sheet instances
- ✅ Portal rendering behavior

#### Edge Cases
- ✅ Rapid open/close operations
- ✅ Sheets without title or description
- ✅ Undefined className handling
- ✅ Complex nested content

## Key Features Tested

### Side Positioning
- **Right** (default): Slides in from right edge
- **Left**: Slides in from left edge  
- **Top**: Slides in from top edge
- **Bottom**: Slides in from bottom edge

### State Management
- Default open state support
- Controlled open/onOpenChange
- Event handling for state changes
- Multiple sheet coordination

### User Interactions
- Trigger activation (click, keyboard)
- Overlay click to dismiss
- Close button functionality
- Escape key to close
- Focus management

### Accessibility Features
- Proper dialog role and ARIA attributes
- Focus trapping within sheet
- Screen reader announcements
- Keyboard navigation support
- Required title for accessibility

### Layout Components
- **SheetHeader**: Consistent header spacing and layout
- **SheetFooter**: Action button container with proper spacing
- **SheetTitle**: Required for accessibility, can be visually hidden
- **SheetDescription**: Optional description for context

## Important Notes

### Radix UI Integration
- Built on Radix UI Dialog primitive
- Supports all Radix Dialog features
- Portal rendering by default
- Focus management handled automatically

### Accessibility Requirements
- SheetTitle is required for screen reader accessibility
- SheetDescription is recommended for context
- Focus is trapped within the sheet when open
- Proper ARIA attributes are automatically applied

### Styling System
- Uses data attributes for styling states
- Supports custom animations via CSS
- Responsive sizing with max-width constraints
- Side-specific positioning and animations

### Performance Considerations
- Portal rendering prevents layout issues
- Lazy rendering - content only rendered when open
- Efficient event handling
- Proper cleanup on unmount

### Common Usage Patterns
- Settings panels
- Navigation drawers
- Form overlays
- Detail views
- Action confirmations