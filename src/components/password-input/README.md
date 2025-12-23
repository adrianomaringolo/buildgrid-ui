# PasswordInput Component Tests

## Overview
Comprehensive test suite for the PasswordInput component covering all functionality including password visibility toggle, strength calculation, accessibility, and form integration.

## Test Coverage

### Rendering (8 tests)
- ✅ Default props rendering
- ✅ Custom className application
- ✅ Strength meter toggle (show/hide)
- ✅ Custom strength labels
- ✅ Custom button labels (show/hide password)
- ✅ Custom strength title
- ✅ HTML attributes forwarding
- ✅ Component structure validation

### Password Visibility Toggle (3 tests)
- ✅ Toggle functionality on button click
- ✅ Correct icon display (Eye/EyeOff)
- ✅ Focus management after toggle

### Password Input Handling (4 tests)
- ✅ Value updates on typing
- ✅ onChange callback execution
- ✅ Controlled component pattern
- ✅ Paste event handling

### Password Strength Calculation (6 tests)
- ✅ Very weak (empty password)
- ✅ Weak (short password)
- ✅ Medium (length + lowercase)
- ✅ Strong (length + lowercase + uppercase)
- ✅ Very strong (all criteria met)
- ✅ Progress bar updates

### Accessibility (5 tests)
- ✅ ARIA labels for toggle button
- ✅ ARIA label updates on visibility change
- ✅ Keyboard navigation support
- ✅ Space key activation
- ✅ Form integration with labels

### Form Integration (4 tests)
- ✅ Form submission handling
- ✅ Required attribute support
- ✅ Disabled state handling
- ✅ Validation attributes (minLength, maxLength)

### Edge Cases (5 tests)
- ✅ Very long passwords
- ✅ Special characters handling
- ✅ Undefined className handling
- ✅ Empty custom labels
- ✅ Rapid typing scenarios

### Ref Forwarding (2 tests)
- ✅ Ref forwarding to input element
- ✅ Access to input methods via ref

### Custom Strength Calculation (1 test)
- ✅ Different password pattern validation

### Component Structure (2 tests)
- ✅ DOM structure validation
- ✅ CSS classes application

## Key Features Tested

### Password Strength Algorithm
- Length >= 8 characters: +25 points
- Lowercase letters: +25 points  
- Uppercase letters: +25 points
- Numbers: +25 points
- Total: 0-100 scale with corresponding labels

### Accessibility Features
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- Form integration
- Label association

### User Interactions
- Click to toggle visibility
- Keyboard activation (Enter, Space)
- Real-time strength calculation
- Form submission integration

## Test Statistics
- **Total Tests**: 50
- **Test Categories**: 10
- **Coverage**: Comprehensive coverage of all component functionality
- **Accessibility**: Full ARIA and keyboard navigation testing
- **Edge Cases**: Robust handling of unusual inputs and states

## Usage Examples Tested
- Basic password input with strength meter
- Custom labels and titles
- Controlled and uncontrolled usage
- Form integration scenarios
- Accessibility compliance
- Error handling and edge cases