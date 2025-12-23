# MultiSelect Component Tests

This directory contains comprehensive unit tests for the MultiSelect component with popover-based option selection.

## Test Coverage

The test suite covers the MultiSelect component with all its variants, interactions, and functionality.

### Core Component
- **MultiSelect**: Advanced multi-selection component with search, badges, and popover interface

## Test Categories

### 1. Rendering Tests (10+ tests)
- Default component rendering with trigger button
- Custom placeholder text
- Default selected values display
- Custom className application
- HTML attribute forwarding
- Badge rendering for selected options

### 2. Variants Tests (8+ tests)
- **Default variant**: Standard styling with card background
- **Secondary variant**: Secondary color scheme
- **Destructive variant**: Error/warning styling
- **Inverted variant**: Inverted color scheme
- Badge styling per variant
- Variant class application

### 3. Popover Interaction Tests (6+ tests)
- Popover opening on trigger click
- Popover closing on outside click
- Escape key closing behavior
- Search input focus management
- Modal popover functionality
- Popover positioning

### 4. Option Selection Tests (12+ tests)
- Single option selection
- Multiple option selection
- Option deselection on re-click
- Select All functionality
- Deselect All when all selected
- Selection state management
- Value change callbacks
- Checkbox indicators

### 5. Badge Management Tests (8+ tests)
- Selected options as badges
- Badge removal via X button
- MaxCount badge limiting
- "More" badge for excess selections
- Extra options clearing
- Badge styling variants
- Badge interaction handling

### 6. Clear Functionality Tests (6+ tests)
- Clear all button in trigger
- Clear button in popover
- Clear all selections
- Clear button visibility
- Clear event handling
- State reset on clear

### 7. Search Functionality Tests (10+ tests)
- Option filtering by search input
- "No results found" state
- Search input keyboard handling
- Enter key behavior in search
- Backspace removing last selection
- Search term highlighting
- Case-insensitive search
- Search state management

### 8. Keyboard Navigation Tests (4+ tests)
- Enter key popover opening
- Space key popover opening
- Tab navigation
- Keyboard accessibility

### 9. Accessibility Tests (4+ tests)
- ARIA attributes on trigger
- Custom aria-label support
- Screen reader compatibility
- Focus management

### 10. Edge Cases Tests (12+ tests)
- Empty options array
- Undefined className handling
- MaxCount edge cases (0, very large)
- Rapid selection/deselection
- State consistency
- Complex interaction scenarios
- Error boundary conditions

### 11. Ref Forwarding Tests (4+ tests)
- Ref forwarding to button element
- Button method access
- Programmatic interaction
- Ref type validation

## Key Features Tested

### Selection Management
- ✅ Single and multiple selection
- ✅ Select/deselect all functionality
- ✅ Selection state persistence
- ✅ Value change callbacks
- ✅ Default value handling

### Badge System
- ✅ Selected option badges
- ✅ Badge removal interactions
- ✅ MaxCount limiting
- ✅ Overflow handling with "more" badge
- ✅ Variant-based styling

### Search and Filtering
- ✅ Real-time option filtering
- ✅ Case-insensitive search
- ✅ Empty results handling
- ✅ Search input keyboard shortcuts
- ✅ Backspace selection removal

### Popover Interface
- ✅ Click to open/close
- ✅ Outside click closing
- ✅ Escape key handling
- ✅ Modal and non-modal modes
- ✅ Proper positioning

### Keyboard Accessibility
- ✅ Enter/Space key opening
- ✅ Tab navigation
- ✅ Search input focus
- ✅ Keyboard shortcuts

### Styling Variants
- ✅ Default, secondary, destructive, inverted
- ✅ Badge variant consistency
- ✅ Custom className support
- ✅ Responsive behavior

## Testing Utilities

The tests use:
- **@testing-library/react** for component rendering and queries
- **@testing-library/user-event** for realistic user interactions
- **Vitest** for test framework and assertions
- **jsdom** environment for DOM simulation

## Running the Tests

```bash
# Run all multi-select tests
npm test multi-select

# Run tests in watch mode
npm test multi-select -- --watch

# Run tests with coverage
npm test multi-select -- --coverage
```

## Test Structure

Each test file follows a consistent structure:
1. **Rendering** - Basic rendering and prop handling
2. **Variants** - All styling variants and badge styles
3. **Popover Interaction** - Opening, closing, positioning
4. **Option Selection** - Selection logic and state management
5. **Badge Management** - Badge display and interactions
6. **Clear Functionality** - Clear buttons and state reset
7. **Search Functionality** - Filtering and search behavior
8. **Keyboard Navigation** - Keyboard accessibility
9. **Accessibility** - ARIA attributes and screen readers
10. **Edge Cases** - Error handling and boundary conditions
11. **Ref Forwarding** - Reference handling and methods

## Component Props Tested

### Core Props
- `options`: Array of selectable options
- `onValueChange`: Selection change callback
- `defaultValue`: Initial selected values
- `placeholder`: Trigger placeholder text

### Customization Props
- `variant`: Styling variant selection
- `maxCount`: Badge display limit
- `className`: Custom styling
- `modalPopover`: Modal behavior toggle

### Advanced Props
- `asChild`: Render as child component
- HTML button attributes
- Accessibility attributes

## Usage Patterns Tested

### Basic Multi-Select
```tsx
<MultiSelect
  options={options}
  onValueChange={handleChange}
  placeholder="Select options"
/>
```

### With Variants and Limits
```tsx
<MultiSelect
  options={options}
  onValueChange={handleChange}
  variant="secondary"
  maxCount={3}
  defaultValue={['option1']}
/>
```

### Modal Popover
```tsx
<MultiSelect
  options={options}
  onValueChange={handleChange}
  modalPopover={true}
/>
```

The tests ensure the MultiSelect component provides excellent user experience, accessibility, and flexibility across all supported use cases and interaction patterns.