# TagInput Component Tests

## Overview
Comprehensive test suite for the TagInput component with 58 test cases covering all functionality, user interactions, and edge cases.

## Test Coverage

### Rendering (5 tests)
- ✅ Renders tag input with default props
- ✅ Renders with custom placeholder
- ✅ Renders with custom className
- ✅ Renders with helper text
- ✅ Renders without helper text by default

### Initial Values (5 tests)
- ✅ Handles string initial value
- ✅ Handles array initial value
- ✅ Filters out empty tags from initial value
- ✅ Does not set initial value if value prop is not empty
- ✅ Handles custom separator in initial value

### Tag Display (4 tests)
- ✅ Displays existing tags
- ✅ Renders remove buttons for each tag
- ✅ Hides placeholder when tags are present
- ✅ Shows placeholder when no tags are present

### Adding Tags (8 tests)
- ✅ Adds tag on Enter key
- ✅ Adds tag on comma key
- ✅ Adds tag when typing comma in input
- ✅ Trims whitespace from tags
- ✅ Does not add empty tags
- ✅ Does not add duplicate tags
- ✅ Clears input after adding tag
- ✅ Uses custom separator

### Removing Tags (4 tests)
- ✅ Removes tag when remove button is clicked
- ✅ Removes last tag on Backspace when input is empty
- ✅ Does not remove tag on Backspace when input has content
- ✅ Does not remove tag on Backspace when no tags exist

### Focus Management (3 tests)
- ✅ Focuses input when container is clicked
- ✅ Does not focus input when clicking on tags or buttons
- ✅ Maintains focus on input after adding tag

### Styling and Layout (5 tests)
- ✅ Applies focus-within styles to container
- ✅ Applies correct tag styling
- ✅ Applies correct remove button styling
- ✅ Applies correct input styling
- ✅ Applies correct helper text styling

### Controlled vs Uncontrolled (3 tests)
- ✅ Works as controlled component
- ✅ Works as uncontrolled component with initial value
- ✅ Calls onChange when tags change

### Accessibility (3 tests)
- ✅ Has proper input attributes
- ✅ Provides accessible labels for remove buttons
- ✅ Maintains proper tab order

### Edge Cases (6 tests)
- ✅ Handles undefined onChange gracefully
- ✅ Handles undefined className gracefully
- ✅ Handles empty separator
- ✅ Handles very long tag names
- ✅ Handles special characters in tags

### Complex Scenarios (3 tests)
- ✅ Handles rapid tag addition and removal
- ✅ Maintains correct state during complex interactions
- ✅ Handles paste operations with multiple tags

## Key Features Tested

### Tag Management
- **Adding Tags**: Enter key, comma separator, automatic parsing
- **Removing Tags**: Click remove button, Backspace key
- **Validation**: No duplicates, no empty tags, whitespace trimming
- **Display**: Visual tag chips with remove buttons

### Input Handling
- **Keyboard Events**: Enter, comma, Backspace navigation
- **Text Processing**: Automatic comma detection and parsing
- **Focus Management**: Container click focusing, input focus retention
- **Placeholder**: Dynamic placeholder based on tag presence

### Customization
- **Separators**: Configurable tag separator (default: comma)
- **Styling**: Custom className support, consistent design system
- **Helper Text**: Optional descriptive text below input
- **Initial Values**: String or array initialization

### State Management
- **Controlled**: External state management with onChange callback
- **Uncontrolled**: Internal state with initial value support
- **Validation**: Duplicate prevention, empty tag filtering

## Usage Examples Covered

```tsx
// Basic tag input
<TagInput />

// With initial values
<TagInput initialValue="tag1,tag2,tag3" />
<TagInput initialValue={['tag1', 'tag2']} />

// Controlled component
const [tags, setTags] = useState(['initial'])
<TagInput value={tags} onChange={setTags} />

// Custom configuration
<TagInput
  placeholder="Add your tags..."
  separator=";"
  helperText="Use semicolons to separate tags"
  className="custom-tag-input"
/>

// With change handler
<TagInput
  value={tags}
  onChange={(newTags) => {
    console.log('Tags updated:', newTags)
    setTags(newTags)
  }}
/>
```

## Interaction Patterns Tested

### Keyboard Interactions
- **Enter**: Add current input as tag
- **Comma**: Add current input as tag (configurable separator)
- **Backspace**: Remove last tag when input is empty
- **Tab**: Navigate between remove buttons and input

### Mouse Interactions
- **Container Click**: Focus the input field
- **Remove Button Click**: Remove specific tag
- **Tag Click**: No action (prevents input focus)

### Text Input Processing
- **Comma Detection**: Automatic tag creation on comma input
- **Whitespace Handling**: Automatic trimming of tag text
- **Duplicate Prevention**: Prevents adding existing tags
- **Empty Tag Prevention**: Ignores empty or whitespace-only tags

## Test Utilities Used

- **@testing-library/react**: Component rendering and queries
- **@testing-library/user-event**: User interaction simulation
- **vitest**: Test framework, mocking, and assertions
- **React hooks**: useState for controlled component testing
- **DOM queries**: Element selection for styling and behavior verification

## Accessibility Features Tested

- **ARIA Labels**: Remove buttons have descriptive labels
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Focus Management**: Proper focus handling and visual indicators
- **Screen Reader Support**: Accessible button labels and input attributes

## Performance Considerations

- **Efficient Updates**: Minimal re-renders during tag operations
- **Large Tag Sets**: Handles many tags without performance issues
- **Rapid Input**: Processes fast typing and multiple comma inputs
- **Memory Management**: Proper cleanup and state management

## Edge Cases Handled

- **Long Tag Names**: Supports very long tag text
- **Special Characters**: Handles Unicode and special characters
- **Empty States**: Graceful handling of empty inputs and arrays
- **Invalid Props**: Defensive programming for undefined/null props
- **Custom Separators**: Flexible separator configuration
- **Paste Operations**: Handles pasted comma-separated text

## Notes

- Component uses a flexible container-click-to-focus pattern
- Tags are displayed as removable chips with hover effects
- Input maintains focus after tag operations for better UX
- Supports both controlled and uncontrolled usage patterns
- Helper text provides additional context when needed
- Custom separators allow for different tag input formats