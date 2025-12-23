# DropdownMenu Component Tests

This directory contains comprehensive unit tests for the DropdownMenu component and all its sub-components.

## Test Coverage

The test suite covers all components in the dropdown menu system:

### Core Components
- **DropdownMenu**: Root component with open/close state management
- **DropdownMenuTrigger**: Button that opens the dropdown menu
- **DropdownMenuContent**: Container for menu items with portal rendering

### Menu Items
- **DropdownMenuItem**: Basic clickable menu item
- **DropdownMenuCheckboxItem**: Menu item with checkbox functionality
- **DropdownMenuRadioItem**: Menu item for radio group selection
- **DropdownMenuLabel**: Non-interactive label for menu sections
- **DropdownMenuSeparator**: Visual separator between menu sections
- **DropdownMenuShortcut**: Keyboard shortcut display component

### Grouping and Organization
- **DropdownMenuGroup**: Groups related menu items
- **DropdownMenuRadioGroup**: Container for radio button items

### Submenus
- **DropdownMenuSub**: Container for submenu functionality
- **DropdownMenuSubTrigger**: Trigger for opening submenus
- **DropdownMenuSubContent**: Content container for submenu items

## Test Categories

### 1. Rendering Tests (45+ tests)
- Default component rendering with correct styling
- Custom className application
- HTML attribute forwarding
- Portal rendering behavior
- Conditional rendering based on open state

### 2. User Interaction Tests (25+ tests)
- Click events on triggers and menu items
- Hover interactions for submenus
- Menu opening and closing
- Item selection and callbacks
- Checkbox and radio item state changes

### 3. Keyboard Navigation Tests (15+ tests)
- Arrow key navigation between items
- Enter key for item selection
- Escape key for menu closing
- Tab navigation and focus management
- Submenu keyboard navigation

### 4. Accessibility Tests (10+ tests)
- ARIA attributes and roles
- Screen reader compatibility
- Focus management and trapping
- Keyboard accessibility
- Proper labeling and descriptions

### 5. State Management Tests (20+ tests)
- Controlled vs uncontrolled components
- Open/close state handling
- Checkbox checked/unchecked states
- Radio group value selection
- onOpenChange and onValueChange callbacks

### 6. Styling and Variants Tests (25+ tests)
- Default styling application
- Custom className merging
- Inset styling for nested items
- Size and positioning classes
- Animation and transition classes

### 7. Complex Structure Tests (10+ tests)
- Complete menu with all components
- Nested submenus
- Mixed item types (regular, checkbox, radio)
- Groups with separators and labels

### 8. Edge Cases (15+ tests)
- Empty menus
- Undefined props handling
- Menu without items
- Invalid configurations
- Error boundary scenarios

## Key Features Tested

### Component Integration
- ✅ All sub-components work together seamlessly
- ✅ Portal rendering for proper z-index layering
- ✅ Event propagation and state synchronization
- ✅ Proper cleanup on unmount

### User Experience
- ✅ Smooth open/close animations
- ✅ Intuitive keyboard navigation
- ✅ Proper focus management
- ✅ Accessible interaction patterns

### Customization
- ✅ Flexible styling with className props
- ✅ Inset options for visual hierarchy
- ✅ Custom positioning and offsets
- ✅ Shortcut display functionality

### Form Integration
- ✅ Checkbox and radio state management
- ✅ Value change callbacks
- ✅ Form submission compatibility
- ✅ Validation support

## Testing Utilities

The tests use:
- **@testing-library/react** for component rendering and queries
- **@testing-library/user-event** for realistic user interactions
- **Vitest** for test framework and assertions
- **jsdom** environment for DOM simulation

## Running the Tests

```bash
# Run all dropdown menu tests
npm test dropdown-menu

# Run tests in watch mode
npm test dropdown-menu -- --watch

# Run tests with coverage
npm test dropdown-menu -- --coverage
```

## Test Structure

Each test file follows a consistent structure:
1. **Component rendering** - Basic rendering and prop handling
2. **User interactions** - Click, hover, keyboard events
3. **State management** - Controlled/uncontrolled behavior
4. **Accessibility** - ARIA attributes and keyboard navigation
5. **Edge cases** - Error handling and boundary conditions

The tests ensure the DropdownMenu component is robust, accessible, and provides an excellent user experience across all supported use cases.