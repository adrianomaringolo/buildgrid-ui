# NavigationMenu Component Tests

This directory contains comprehensive unit tests for the NavigationMenu component system built on Radix UI.

## Test Coverage

The test suite covers all NavigationMenu components and their interactions in a complete navigation system.

### Core Components
- **NavigationMenu**: Root navigation container
- **NavigationMenuList**: List container for menu items
- **NavigationMenuItem**: Individual menu item wrapper
- **NavigationMenuTrigger**: Clickable menu trigger with chevron
- **NavigationMenuContent**: Expandable content area
- **NavigationMenuLink**: Navigation link component
- **NavigationMenuViewport**: Content viewport container
- **NavigationMenuIndicator**: Visual indicator for active items

## Test Categories

### 1. NavigationMenu Component Tests (10+ tests)
- Default rendering with viewport
- Custom className application
- Viewport toggle functionality
- HTML attribute forwarding
- Group/navigation-menu class application
- Data attribute management

### 2. NavigationMenuList Component Tests (4+ tests)
- List rendering with correct styling
- Flex layout and gap classes
- Custom className support
- List-none styling

### 3. NavigationMenuItem Component Tests (4+ tests)
- Menu item wrapper rendering
- Relative positioning classes
- Custom className application
- Item container functionality

### 4. NavigationMenuTrigger Component Tests (6+ tests)
- Trigger button with chevron icon
- Click event handling
- Custom className support
- Chevron rotation on state change
- Button styling classes
- Focus and hover states

### 5. NavigationMenuContent Component Tests (6+ tests)
- Content area rendering
- Show/hide on trigger activation
- Custom className support
- Animation classes
- Positioning classes
- Content visibility management

### 6. NavigationMenuLink Component Tests (8+ tests)
- Link rendering with href
- Custom className support
- Active state handling
- Icon content support
- Flex column layout
- Focus and hover styling
- Transition classes

### 7. NavigationMenuViewport Component Tests (4+ tests)
- Viewport container rendering
- Animation classes
- Custom className support
- Popover styling

### 8. NavigationMenuIndicator Component Tests (4+ tests)
- Indicator rendering with arrow
- Animation classes
- Custom className support
- Visual indicator styling

### 9. navigationMenuTriggerStyle Function Tests (4+ tests)
- Style function return values
- Custom className merging
- Base class inclusion
- CVA integration

### 10. Keyboard Navigation Tests (6+ tests)
- Tab navigation between items
- Enter key trigger activation
- Escape key content closing
- Focus management
- Keyboard accessibility
- Content keyboard navigation

### 11. Mouse Interactions Tests (4+ tests)
- Hover to show content
- Mouse leave to hide content
- Click interactions
- Hover state management

### 12. Accessibility Tests (6+ tests)
- ARIA attributes on components
- Custom aria-label support
- Focus management
- Screen reader compatibility
- Role attributes
- Keyboard navigation support

### 13. Complex Navigation Structure Tests (8+ tests)
- Multi-level navigation rendering
- Multiple menu items with content
- Mixed triggers and links
- State management across items
- Content switching
- Navigation hierarchy

### 14. Edge Cases Tests (6+ tests)
- Empty navigation menu
- Navigation with only list
- Undefined className handling
- State consistency
- Error boundary scenarios

## Key Features Tested

### Navigation Structure
- ✅ Hierarchical menu organization
- ✅ Trigger and content relationships
- ✅ Link and button combinations
- ✅ Viewport and indicator integration
- ✅ Multi-level navigation support

### Interaction Patterns
- ✅ Click to expand/collapse
- ✅ Hover to show content
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ State transitions

### Visual Indicators
- ✅ Chevron rotation on state change
- ✅ Active state highlighting
- ✅ Visual indicators for expanded items
- ✅ Animation transitions
- ✅ Hover and focus states

### Accessibility
- ✅ ARIA attributes and roles
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Focus management
- ✅ Semantic HTML structure

### Styling System
- ✅ CVA-based trigger styling
- ✅ Custom className support
- ✅ Animation classes
- ✅ State-based styling
- ✅ Responsive behavior

### Radix UI Integration
- ✅ Primitive component wrapping
- ✅ State management
- ✅ Event handling
- ✅ Data attributes
- ✅ Animation support

## Testing Utilities

The tests use:
- **@testing-library/react** for component rendering and queries
- **@testing-library/user-event** for realistic user interactions
- **Vitest** for test framework and assertions
- **jsdom** environment for DOM simulation

## Running the Tests

```bash
# Run all navigation-menu tests
npm test navigation-menu

# Run tests in watch mode
npm test navigation-menu -- --watch

# Run tests with coverage
npm test navigation-menu -- --coverage
```

## Test Structure

Each test file follows a consistent structure:
1. **NavigationMenu Component** - Root container functionality
2. **NavigationMenuList Component** - List container behavior
3. **NavigationMenuItem Component** - Item wrapper functionality
4. **NavigationMenuTrigger Component** - Trigger button behavior
5. **NavigationMenuContent Component** - Content area management
6. **NavigationMenuLink Component** - Link functionality
7. **NavigationMenuViewport Component** - Viewport behavior
8. **NavigationMenuIndicator Component** - Visual indicators
9. **navigationMenuTriggerStyle Function** - Style utility
10. **Keyboard Navigation** - Keyboard accessibility
11. **Mouse Interactions** - Mouse behavior
12. **Accessibility** - ARIA and screen reader support
13. **Complex Navigation Structure** - Multi-level scenarios
14. **Edge Cases** - Error handling and boundary conditions

## Navigation Patterns Tested

### Basic Navigation
```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/about">About</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### Expandable Menu
```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/product1">Product 1</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### Complex Multi-Level
```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Services</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div>
          <NavigationMenuLink href="/service1">Service 1</NavigationMenuLink>
          <NavigationMenuLink href="/service2">Service 2</NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

The tests ensure the NavigationMenu component system provides excellent user experience, accessibility, and flexibility for building complex navigation interfaces.