# Calendar Component Tests

This test suite provides comprehensive coverage for the Calendar component, ensuring it renders correctly, handles navigation, supports multiple languages, manages date selection, and maintains proper accessibility standards.

## Test Coverage

### Rendering (4 tests)
- ✅ Default calendar rendering with proper structure
- ✅ Selected date highlighting
- ✅ Weekday headers display
- ✅ All days of the month rendering

### Language Support (3 tests)
- ✅ English language rendering (default)
- ✅ Portuguese language rendering
- ✅ Portuguese weekday abbreviations

### Navigation (4 tests)
- ✅ Previous month navigation
- ✅ Next month navigation
- ✅ Multiple month navigation
- ✅ Year boundary navigation

### Date Selection (3 tests)
- ✅ onChange callback execution
- ✅ Graceful handling when no onChange provided
- ✅ Visual selection updates

### Accessibility (6 tests)
- ✅ Proper ARIA roles and labels
- ✅ aria-live region for month/year changes
- ✅ aria-pressed for selected dates
- ✅ Descriptive aria-labels for date buttons
- ✅ aria-hidden for weekday headers
- ✅ aria-hidden for empty calendar cells

### Keyboard Navigation (3 tests)
- ✅ Enter key on navigation buttons
- ✅ Space key on navigation buttons
- ✅ Enter key on date buttons

### Styling (4 tests)
- ✅ Container CSS classes
- ✅ Navigation button hover styles
- ✅ Date button hover styles
- ✅ Selected date styling

### Edge Cases (3 tests)
- ✅ Different month lengths (leap year handling)
- ✅ Year boundary transitions
- ✅ Undefined selectedDate handling

### Different Starting Dates (2 tests)
- ✅ Different month rendering
- ✅ Different year rendering

### Multiple Calendar Instances (1 test)
- ✅ Independent calendar rendering

### Integration with Form Libraries (1 test)
- ✅ Controlled component pattern

## Total: 34 tests

All tests use Vitest with jsdom environment and @testing-library/react for realistic DOM testing. The test suite uses date-fns for date manipulation and ensures the Calendar component handles various locales, date ranges, and user interactions properly. Tests are optimized to avoid timing issues while maintaining comprehensive coverage.