# Label Component Tests

This directory contains comprehensive unit tests for the Label component built on Radix UI.

## Test Coverage

The test suite covers the Label component with all its functionality and integration patterns.

### Core Component
- **Label**: Accessible label component with form association capabilities

## Test Categories

### 1. Rendering Tests (8+ tests)
- Default component rendering with correct styling
- Custom className application
- HTML attribute forwarding (id, title, data-*, etc.)
- Label element rendering
- Content type handling (text, React elements, icons)

### 2. Form Association Tests (6+ tests)
- **htmlFor attribute**: Associates label with form controls
- **Nested controls**: Labels wrapping form inputs
- **aria-labelledby**: Alternative labeling relationship
- **Click behavior**: Label clicks focus associated controls
- **Complex forms**: Multi-field form integration

### 3. Accessibility Tests (8+ tests)
- Required field indicators
- Screen reader text support
- Disabled state styling with peer classes
- ARIA attribute support
- Label-input relationships
- Fieldset and legend patterns

### 4. Content Types Tests (6+ tests)
- Plain text content
- React element content (bold, italic, etc.)
- Icon integration
- Empty content handling
- Special characters
- Numeric content

### 5. Styling Tests (5+ tests)
- Default styling classes application
- Custom className merging with defaults
- Peer-disabled state classes
- Undefined className handling
- Long text content handling

### 6. Ref Forwarding Tests (4+ tests)
- Ref forwarding to label element
- DOM method access through ref
- Label element type validation
- Click method availability

### 7. Form Integration Tests (4+ tests)
- Complex form structures
- Multiple label scenarios
- Fieldset integration
- Form validation patterns

### 8. Edge Cases Tests (8+ tests)
- Very long text content
- Special characters in content
- Numeric content
- Boolean attributes
- Multiple labels with same text
- Empty labels
- Undefined props handling

### 9. Radix UI Integration Tests (4+ tests)
- Radix Label primitive functionality
- Data attributes support
- State management
- Event handling

## Key Features Tested

### Form Association
- ✅ htmlFor attribute linking
- ✅ Nested input association
- ✅ Click-to-focus behavior
- ✅ aria-labelledby relationships
- ✅ Complex form integration

### Accessibility
- ✅ Screen reader compatibility
- ✅ Required field indicators
- ✅ Disabled state handling
- ✅ ARIA attribute support
- ✅ Keyboard navigation

### Content Flexibility
- ✅ Text content rendering
- ✅ React element children
- ✅ Icon integration
- ✅ Empty content handling
- ✅ Special character support

### Styling System
- ✅ Default class application
- ✅ Custom className merging
- ✅ Peer state classes
- ✅ Responsive behavior
- ✅ State-based styling

### Radix UI Integration
- ✅ Primitive component wrapping
- ✅ Event handling
- ✅ State management
- ✅ Data attribute support

## Testing Utilities

The tests use:
- **@testing-library/react** for component rendering and queries
- **@testing-library/user-event** for realistic user interactions
- **Vitest** for test framework and assertions
- **jsdom** environment for DOM simulation

## Running the Tests

```bash
# Run all label tests
npm test label

# Run tests in watch mode
npm test label -- --watch

# Run tests with coverage
npm test label -- --coverage
```

## Test Structure

Each test file follows a consistent structure:
1. **Rendering** - Basic rendering and prop handling
2. **Form Association** - Label-input relationships
3. **Accessibility** - ARIA attributes and screen reader support
4. **Content Types** - Different content variations
5. **Styling** - Class application and customization
6. **Ref Forwarding** - Reference handling and methods
7. **Form Integration** - Complex form scenarios
8. **Edge Cases** - Error handling and boundary conditions
9. **Radix UI Integration** - Primitive functionality

## Styling Classes Tested

### Base Classes
- Typography: `text-sm`, `font-medium`, `leading-none`
- Peer states: `peer-disabled:cursor-not-allowed`, `peer-disabled:opacity-70`

### State Classes
- Disabled peer handling
- Custom className merging
- Responsive behavior

## Form Integration Patterns

### Basic Association
```tsx
<Label htmlFor="username">Username</Label>
<input id="username" type="text" />
```

### Nested Association
```tsx
<Label>
  Email Address
  <input type="email" />
</Label>
```

### ARIA Association
```tsx
<Label id="password-label">Password</Label>
<input type="password" aria-labelledby="password-label" />
```

The tests ensure the Label component provides excellent accessibility, proper form integration, and flexible content handling across all supported use cases.