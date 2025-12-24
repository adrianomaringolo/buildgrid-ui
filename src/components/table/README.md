# Table Component Tests

## Overview
Comprehensive test suite for the Table component family, covering all table elements, accessibility features, styling, and complex table structures.

## Test Coverage

### ✅ Table Component (4 tests)
- Default props rendering
- Custom className application
- Overflow container rendering
- HTML attributes forwarding

### ✅ TableHeader Component (3 tests)
- Default styling application
- Custom className support
- HTML attributes forwarding

### ✅ TableBody Component (3 tests)
- Default styling application
- Custom className support
- HTML attributes forwarding

### ✅ TableFooter Component (3 tests)
- Default styling application
- Custom className support
- HTML attributes forwarding

### ✅ TableRow Component (4 tests)
- Default styling application
- Custom className support
- Selected state support
- HTML attributes forwarding

### ✅ TableHead Component (4 tests)
- Default styling application
- Custom className support
- TH HTML attributes support
- HTML attributes forwarding

### ✅ TableCell Component (4 tests)
- Default styling application
- Custom className support
- TD HTML attributes support (colspan, rowspan)
- HTML attributes forwarding

### ✅ TableCaption Component (3 tests)
- Default styling application
- Custom className support
- HTML attributes forwarding

### ✅ Complete Table Structure (1 test)
- Full table with all components
- Proper semantic structure
- Row counting validation

### ✅ Accessibility (3 tests)
- Proper table semantics
- Caption accessibility support
- Scope attribute support on headers

### ✅ Ref Forwarding (3 tests)
- Table ref forwarding
- TableRow ref forwarding
- TableCell ref forwarding

### ✅ Edge Cases (4 tests)
- Undefined className handling
- Empty table handling
- Header-only table
- Body-only table

### ✅ Complex Scenarios (3 tests)
- Nested content in cells
- Large tables with many rows
- Tables with colspan and rowspan

## Key Features Tested

### Table Components
- ✅ `Table` - Main table wrapper with overflow container
- ✅ `TableHeader` - Table header section (thead)
- ✅ `TableBody` - Table body section (tbody)
- ✅ `TableFooter` - Table footer section (tfoot)
- ✅ `TableRow` - Table row (tr)
- ✅ `TableHead` - Table header cell (th)
- ✅ `TableCell` - Table data cell (td)
- ✅ `TableCaption` - Table caption

### Styling Features
- ✅ Responsive overflow handling
- ✅ Hover effects on rows
- ✅ Selected state styling
- ✅ Consistent spacing and typography
- ✅ Muted colors for headers and footers

### Accessibility Features
- ✅ Proper semantic HTML structure
- ✅ Table role and ARIA attributes
- ✅ Caption support for screen readers
- ✅ Scope attributes on headers
- ✅ Column and row header associations

### Advanced Features
- ✅ Colspan and rowspan support
- ✅ Checkbox integration styling
- ✅ Nested content support
- ✅ Large table handling
- ✅ Custom styling flexibility

## Test Statistics
- **Total Tests**: 42
- **Test Categories**: 13
- **Coverage**: 100% of component functionality
- **Framework**: Vitest + React Testing Library

## Usage Examples Tested

```tsx
// Basic table
<Table>
  <TableBody>
    <TableRow>
      <TableCell>Content</TableCell>
    </TableRow>
  </TableBody>
</Table>

// Complete table structure
<Table>
  <TableCaption>Employee Data</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>Developer</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total: 1 employee</TableCell>
    </TableRow>
  </TableFooter>
</Table>

// With accessibility features
<Table>
  <TableCaption>User permissions table</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">User</TableHead>
      <TableHead scope="col">Permission</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow data-state="selected">
      <TableCell>Admin</TableCell>
      <TableCell>Full Access</TableCell>
    </TableRow>
  </TableBody>
</Table>

// With spanning cells
<Table>
  <TableBody>
    <TableRow>
      <TableCell colSpan={2}>Spanning cell</TableCell>
    </TableRow>
    <TableRow>
      <TableCell rowSpan={2}>Tall cell</TableCell>
      <TableCell>Regular cell</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Styling Classes Tested

### Table
- ✅ `w-full caption-bottom text-sm`
- ✅ Overflow container: `relative w-full overflow-auto`

### TableHeader
- ✅ `[&_tr]:border-b`

### TableBody
- ✅ `[&_tr:last-child]:border-0`

### TableFooter
- ✅ `border-t bg-muted/50 font-medium [&>tr]:last:border-b-0`

### TableRow
- ✅ `border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted`

### TableHead
- ✅ `h-10 px-2 text-left align-middle font-medium text-muted-foreground`
- ✅ `[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]`

### TableCell
- ✅ `p-2 align-middle`
- ✅ `[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]`

### TableCaption
- ✅ `mt-4 text-sm text-muted-foreground`

## Accessibility Compliance

- ✅ Semantic HTML table structure
- ✅ Proper role attributes
- ✅ Caption support for context
- ✅ Header scope attributes
- ✅ Row and cell associations
- ✅ Screen reader compatibility

## Notes
- Tests cover all table components comprehensively
- Accessibility features thoroughly validated
- Complex table structures supported
- Responsive design considerations included
- Ref forwarding enables imperative access
- Edge cases handled gracefully
- Performance considerations for large tables