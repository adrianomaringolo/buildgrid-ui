# Carousel Component Tests

This test suite provides comprehensive coverage for the Carousel component system, ensuring it renders correctly, handles navigation interactions, supports different orientations, and maintains proper accessibility standards.

## Test Coverage

### Carousel Component (3 tests)
- ✅ Default rendering with proper ARIA attributes and data-slot
- ✅ Custom className merging
- ✅ HTML attribute forwarding

### CarouselContent Component (4 tests)
- ✅ Default rendering with overflow-hidden class
- ✅ Horizontal layout styling (-ml-4, flex)
- ✅ Vertical layout styling (-mt-4, flex-col)
- ✅ Custom className merging

### CarouselItem Component (4 tests)
- ✅ Default rendering with proper ARIA attributes (role="group", aria-roledescription="slide")
- ✅ Horizontal spacing (pl-4)
- ✅ Vertical spacing (pt-4)
- ✅ Custom className merging

### CarouselPrevious Component (6 tests)
- ✅ Default button rendering with proper attributes
- ✅ Horizontal positioning classes
- ✅ Vertical positioning classes with rotation
- ✅ scrollPrev function call on click
- ✅ Disabled state when cannot scroll prev
- ✅ Custom className merging

### CarouselNext Component (6 tests)
- ✅ Default button rendering with proper attributes
- ✅ Horizontal positioning classes
- ✅ Vertical positioning classes with rotation
- ✅ scrollNext function call on click
- ✅ Disabled state when cannot scroll next
- ✅ Custom className merging

### Complete Carousel Structure (2 tests)
- ✅ Full carousel with multiple slides and navigation
- ✅ Carousel without navigation buttons

### Content Types (3 tests)
- ✅ Text content rendering
- ✅ Complex JSX content rendering
- ✅ Image content rendering

### API Integration (2 tests)
- ✅ setApi callback execution
- ✅ Event listeners setup (reInit, select)

### Edge Cases (3 tests)
- ✅ Empty carousel rendering
- ✅ Single slide handling
- ✅ Undefined className handling

### Error Handling (1 test)
- ✅ Context error when components used outside Carousel

## Total: 34 tests

All tests use Vitest with jsdom environment and @testing-library/react for realistic DOM testing. The test suite mocks embla-carousel-react to focus on component behavior rather than carousel library internals. Tests ensure the Carousel component system is accessible, handles different orientations properly, and integrates well with the underlying carousel functionality.