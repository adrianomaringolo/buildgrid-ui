# Pagination Component Tests

This directory contains comprehensive unit tests for the Pagination component system with navigation controls.

## Test Coverage

The test suite covers all Pagination components and their interactions in a complete pagination interface.

### Core Components
- **Pagination**: Root navigation container with aria-label
- **PaginationContent**: List container for pagination items
- **PaginationItem**: Individual pagination item wrapper
- **PaginationLink**: Clickable page link with active state support
- **PaginationPrevious**: Previous page navigation with chevron
- **PaginationNext**: Next page navigation with chevron
- **PaginationEllipsis**: Visual ellipsis for page gaps

## Test Categories

### 1. Pagination Component Tests (6+ tests)
- Default navigation rendering with aria-label
- Custom className application
- HTML attribute forwarding
- Navigation role and accessibility
- Flex layout and centering classes
- Container functionality

### 2. PaginationContent Component Tests (6+ tests)
- List rendering with correct styling
- Flex row layout and gap classes
- Custom className support
- Ref forwarding to ul element
- List container functionality
- Items alignment

### 3. PaginationItem Component Tests (6+ tests)
- List item wrapper rendering
- Custom className application
- Ref forwarding to li element
- Item container functionality
- Basic styling classes
- Content wrapping

### 4. PaginationLink Component Tests (12+ tests)
- Link rendering with default styling
- Active state with aria-current="page"
- Inactive state without aria-current
- Click event handling
- Custom size support
- Custom className application
- Disabled state support
- Button variant integration
- Text color variations
- Size prop handling

### 5. PaginationPrevious Component Tests (10+ tests)
- Previous button with chevron left icon
- Correct aria-label "Previous page"
- Custom className support
- Click event handling
- Disabled state support
- Custom content rendering
- Icon positioning and styling
- Gap classes for spacing
- Button inheritance

### 6. PaginationNext Component Tests (10+ tests)
- Next button with chevron right icon
- Correct aria-label "Next page"
- Custom className support
- Click event handling
- Disabled state support
- Custom content rendering
- Icon positioning and styling
- Gap classes for spacing
- Button inheritance

### 7. PaginationEllipsis Component Tests (6+ tests)
- Ellipsis rendering with MoreHorizontal icon
- aria-hidden attribute for accessibility
- Screen reader text "More pages"
- Custom className support
- Flex centering classes
- Icon styling

### 8. Complete Pagination Structure Tests (4+ tests)
- Full pagination with all components
- Complex pagination with gaps
- Active page highlighting
- Navigation button states

### 9. Keyboard Navigation Tests (6+ tests)
- Tab navigation between items
- Enter key activation
- Space key activation
- Focus management
- Keyboard accessibility
- Sequential navigation

### 10. Accessibility Tests (10+ tests)
- Navigation role and aria-label
- aria-current for active pages
- aria-labels for navigation buttons
- Screen reader text for ellipsis
- aria-hidden for decorative elements
- Proper focus management
- Keyboard navigation support
- Semantic HTML structure

### 11. Edge Cases Tests (8+ tests)
- Empty pagination handling
- Single page pagination
- Large page numbers
- Undefined className handling
- First page state
- Last page state
- Button variant integration
- Size variations

### 12. Button Integration Tests (4+ tests)
- Button variant inheritance
- Size prop support
- Disabled state handling
- Custom button properties

### 13. Complex Pagination Scenarios Tests (6+ tests)
- Pagination with gaps and ellipses
- First page with disabled previous
- Last page with disabled next
- Multi-gap pagination
- Large page ranges
- State consistency

## Key Features Tested

### Navigation Structure
- ✅ Semantic navigation element
- ✅ Proper ARIA labeling
- ✅ List-based item organization
- ✅ Button-based interactions
- ✅ Icon integration

### Page State Management
- ✅ Active page indication
- ✅ aria-current="page" for active
- ✅ Visual active state styling
- ✅ State consistency
- ✅ Page transition handling

### Navigation Controls
- ✅ Previous/Next buttons
- ✅ Proper aria-labels
- ✅ Chevron icon positioning
- ✅ Disabled state handling
- ✅ Custom content support

### Visual Indicators
- ✅ Ellipsis for page gaps
- ✅ Screen reader text
- ✅ aria-hidden for decorative elements
- ✅ Icon styling consistency
- ✅ Visual hierarchy

### Accessibility
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ ARIA attributes and roles
- ✅ Focus management
- ✅ Semantic structure

### Button Integration
- ✅ Button component inheritance
- ✅ Variant and size support
- ✅ Disabled state handling
- ✅ Click event propagation
- ✅ Custom styling support

## Testing Utilities

The tests use:
- **@testing-library/react** for component rendering and queries
- **@testing-library/user-event** for realistic user interactions
- **Vitest** for test framework and assertions
- **jsdom** environment for DOM simulation

## Running the Tests

```bash
# Run all pagination tests
npm test pagination

# Run tests in watch mode
npm test pagination -- --watch

# Run tests with coverage
npm test pagination -- --coverage
```

## Test Structure

Each test file follows a consistent structure:
1. **Pagination Component** - Root navigation container
2. **PaginationContent Component** - List container functionality
3. **PaginationItem Component** - Item wrapper behavior
4. **PaginationLink Component** - Page link functionality
5. **PaginationPrevious Component** - Previous navigation
6. **PaginationNext Component** - Next navigation
7. **PaginationEllipsis Component** - Gap indicators
8. **Complete Pagination Structure** - Full component integration
9. **Keyboard Navigation** - Keyboard accessibility
10. **Accessibility** - ARIA and screen reader support
11. **Edge Cases** - Error handling and boundary conditions
12. **Button Integration** - Button component inheritance
13. **Complex Pagination Scenarios** - Real-world usage patterns

## Pagination Patterns Tested

### Basic Pagination
```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="/page/1" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/1" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="/page/2" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

### Pagination with Gaps
```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="/page/4" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/1">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/5" isActive>5</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="/page/6" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

### First/Last Page States
```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="/page/1" disabled />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/1" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="/page/2" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

The tests ensure the Pagination component system provides excellent user experience, accessibility, and flexibility for building pagination interfaces across different use cases and page ranges.