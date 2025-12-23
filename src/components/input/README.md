# Input Component Tests

This directory contains comprehensive unit tests for the Input component with all its variants and features.

## Test Coverage

The test suite covers the Input component with all its sizing variants and input types.

### Core Component
- **Input**: Flexible input component with size variants and full HTML input support

## Test Categories

### 1. Rendering Tests (25+ tests)
- Default component rendering with correct styling
- Custom className application
- HTML attribute forwarding (id, name, data-*, etc.)
- Different input types (text, email, password, number, etc.)
- Placeholder and initial value rendering

### 2. Sizing Variants Tests (10+ tests)
- **Small (sm)**: h-8, text-xs, px-2
- **Medium (md)**: h-10, text-sm, px-3 (default)
- **Large (lg)**: h-12, text-base, px-4
- **Extra Large (xl)**: h-14, text-lg, px-5
- **2XL (2xl)**: h-16, text-xl, px-6
- Default sizing behavior

### 3. User Interaction Tests (20+ tests)
- Text input and value changes
- Focus and blur events
- Key events (keydown, keyup, Enter)
- Input clearing and selection
- Realistic user typing simulation

### 4. Input States Tests (15+ tests)
- Disabled state behavior and styling
- Readonly state functionality
- Required field validation
- Input prevention when disabled/readonly
- State-specific CSS classes

### 5. Accessibility Tests (15+ tests)
- ARIA attributes (aria-label, aria-describedby, etc.)
- Screen reader compatibility
- Label association
- Required and invalid states
- Keyboard navigation support

### 6. Form Integration Tests (15+ tests)
- Form submission handling
- Name attribute support
- Validation attributes (pattern, minLength, maxLength)
- Form context compatibility
- Input value persistence

### 7. Input Types Tests (20+ tests)
- **Text inputs**: text, email, tel, url, search
- **Number inputs**: number with min, max, step
- **Date/Time inputs**: date, time, datetime-local
- **File inputs**: file with accept and multiple
- **Other types**: password, color, range
- Type-specific behavior and attributes

### 8. Controlled vs Uncontrolled Tests (10+ tests)
- Controlled component with value prop
- Uncontrolled component with defaultValue
- State synchronization
- Change event handling

### 9. Ref Forwarding Tests (8+ tests)
- Ref forwarding to input element
- Programmatic focus control
- Method access through ref
- Ref type validation

### 10. Edge Cases Tests (15+ tests)
- Undefined props handling
- Empty and null values
- Invalid prop combinations
- Graceful degradation
- Error boundary scenarios

## Key Features Tested

### Styling System
- ✅ Class Variance Authority (CVA) integration
- ✅ Size variant application
- ✅ Custom className merging
- ✅ Default styling preservation
- ✅ Responsive design classes

### Input Functionality
- ✅ All HTML input types supported
- ✅ Value and defaultValue handling
- ✅ Change event propagation
- ✅ Focus management
- ✅ Keyboard event handling

### Form Integration
- ✅ Native form submission
- ✅ Validation attribute support
- ✅ Name and ID attribute handling
- ✅ Required field behavior
- ✅ Pattern validation

### Accessibility
- ✅ ARIA attribute support
- ✅ Label association
- ✅ Screen reader compatibility
- ✅ Keyboard navigation
- ✅ Focus indicators

### File Input Support
- ✅ File selection functionality
- ✅ Accept attribute filtering
- ✅ Multiple file selection
- ✅ File input styling classes

### Number Input Support
- ✅ Numeric value handling
- ✅ Min/max constraints
- ✅ Step increment support
- ✅ Spinner button functionality

## Testing Utilities

The tests use:
- **@testing-library/react** for component rendering and queries
- **@testing-library/user-event** for realistic user interactions
- **Vitest** for test framework and assertions
- **jsdom** environment for DOM simulation

## Running the Tests

```bash
# Run all input tests
npm test input

# Run tests in watch mode
npm test input -- --watch

# Run tests with coverage
npm test input -- --coverage
```

## Test Structure

Each test file follows a consistent structure:
1. **Rendering** - Basic rendering and prop handling
2. **Sizing Variants** - All size options and default behavior
3. **User Interaction** - Input, focus, keyboard events
4. **States** - Disabled, readonly, required states
5. **Accessibility** - ARIA attributes and screen reader support
6. **Form Integration** - Form context and validation
7. **Input Types** - All supported HTML input types
8. **Controlled/Uncontrolled** - State management patterns
9. **Ref Forwarding** - Reference handling and methods
10. **Edge Cases** - Error handling and boundary conditions

## Styling Classes Tested

### Base Classes
- Layout: `flex`, `w-full`, `rounded-md`
- Border: `border`, `border-input`
- Background: `bg-transparent`
- Text: `shadow-sm`, `transition-colors`

### Size-Specific Classes
- Height and padding variations
- Text size adjustments
- Responsive behavior

### State Classes
- Focus: `focus-visible:outline-none`, `focus-visible:ring-1`
- Disabled: `disabled:cursor-not-allowed`, `disabled:opacity-50`
- Placeholder: `placeholder:text-muted-foreground`
- File: `file:border-0`, `file:bg-transparent`

The tests ensure the Input component is robust, accessible, and provides consistent behavior across all input types and use cases.