# BuildGrid UI — Developer Guide

## Component registry

`components-manifest.json` (repo root) is a machine-readable index of every component and block: exports, variants, key props, and a usage snippet. **Check it first** before exploring `src/` — it tells you what exists and what import path to use.

---

## Tech stack

- React component library — Tailwind CSS v4 + shadcn/ui primitives (Radix UI)
- Storybook (`@storybook/react-vite`) for visual documentation
- Vitest + `@testing-library/react` for unit tests
- TypeScript strict mode; path alias `@/` → `src/`
- `cn()` from `@/lib/utils` for class merging
- `cva()` from `class-variance-authority` for multi-variant components

---

## Creating a new component or block

Every new component **must** include three files plus a barrel:

```
src/components/<name>/
  <name>.tsx          # component implementation
  <name>.stories.tsx  # Storybook stories
  <name>.test.tsx     # unit tests
  index.ts            # barrel re-export
```

After creating the files, add `export * from './<name>'` to `src/components/index.ts` (alphabetical order).

For blocks: same structure under `src/blocks/<name>/`, registered in `src/blocks/index.ts`.

---

## 1 — Component (`<name>.tsx`)

- Add `'use client'` only when the component uses React hooks or browser APIs.
- Wrap Radix primitives with styled `cn()` classes; never use inline styles.
- Add `dark:` Tailwind classes on every colour token.
- Add `data-slot="..."` attributes for external styling hooks.
- Use `React.ComponentProps<typeof Primitive.X>` for prop types instead of re-declaring manually.
- Use `cva()` when the component has multiple visual variants.
- Export the component function(s) and all public prop types.

```tsx
// Example skeleton
'use client'

import * as FooPrimitive from '@radix-ui/react-foo'
import * as React from 'react'
import { cn } from '@/lib/utils'

function Foo({ className, ...props }: React.ComponentProps<typeof FooPrimitive.Root>) {
  return (
    <FooPrimitive.Root
      data-slot="foo"
      className={cn('rounded-md border bg-background', className)}
      {...props}
    />
  )
}

export { Foo }
```

---

## 2 — Stories (`<name>.stories.tsx`)

- First line: `// organize-imports-ignore`
- `meta` has **no `title`** — Storybook auto-discovers the path from the file location.
- Omit `tags: ['autodocs']` unless explicitly required.
- Create **one named export per significant variant** (e.g. `export const Info`, `export const Outline`).
- Create a `Default` export that shows all variants together in a realistic demo page.
- Use **inline render functions**, not `args`-driven stories, for stateful components.
- Wrap content in `max-w-2xl` containers; use `space-y-4` between examples.
- Use **realistic, contextual content** — not "Lorem ipsum" or placeholder text.

```tsx
// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Foo } from './foo'

const meta: Meta<typeof Foo> = { component: Foo }
export default meta
type Story = StoryObj<typeof Foo>

export const Variant: Story = {
  render: () => (
    <div className="space-y-4 p-6 max-w-2xl">
      <Foo variant="x">Realistic content here</Foo>
    </div>
  ),
}

export const Default: Story = {
  render: () => (
    <div className="p-8 space-y-6">
      {/* show all variants */}
    </div>
  ),
}
```

---

## 3 — Tests (`<name>.test.tsx`)

- Use `describe` blocks: **Rendering**, **Variants**, **Accessibility**, **Interaction**, **Edge Cases**.
- Test every exported variant and significant prop.
- Test keyboard interactions and ARIA attributes for interactive components.
- Avoid asserting on internal class names beyond confirming the variant class is applied.
- Import from the barrel index when possible: `import { Foo } from '.'`

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Foo } from '.'

describe('Foo', () => {
  describe('Rendering', () => {
    it('renders with default props', () => { ... })
  })
  describe('Variants', () => { ... })
  describe('Accessibility', () => { ... })
  describe('Edge Cases', () => { ... })
})
```

---

## 4 — Barrel (`index.ts`)

```ts
export * from './foo'
```

---

## Conventions

| Rule | Detail |
|---|---|
| Dark mode | Every colour class must have a `dark:` counterpart |
| `className` prop | Always accept and forward it for extensibility |
| No inline styles | Use Tailwind utilities exclusively |
| No comments explaining *what* | Only comment *why* (non-obvious constraints) |
| Shadcn parity | Match shadcn/ui component API shape when a parallel exists |

---

## Component selection — prefer the higher-level option

| Need | Use | Not |
|---|---|---|
| Interactive data grid | `DataTable` block | `Table` primitives (static only) |
| Paginated list (non-tabular) | `PaginatedItems` block | Manual pagination state |
| Pagination bar | `PaginationControls` block | `Pagination` primitives |
| Destructive confirmation | `AlertDialog` | `Dialog` |
| Side panel | `Sheet` | `Drawer` (unless swipe gesture needed) |

---

## Composition patterns

### Paginated data grid — client-side

```tsx
import { DataTable } from '@/blocks/data-table'
import type { DataTableColumn } from '@/blocks/data-table'

type Row = { id: string; name: string; status: 'active' | 'inactive' }

const columns: DataTableColumn<Row>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'status', header: 'Status', cell: (row) => <Badge>{row.status}</Badge> },
]

<DataTable data={rows} columns={columns} />
```

### Paginated data grid — server-side

```tsx
// data must contain only the current page's items
<DataTable
  data={currentPageRows}
  columns={columns}
  serverPagination={{
    currentPage,
    totalPages,
    totalItems,
    onPageChange: setPage,
  }}
/>
```

### Paginated custom list (cards, not a table)

```tsx
import { PaginatedItems } from '@/blocks/paginated-items'
import { EmptyItems } from '@/blocks/empty-message'

<PaginatedItems
  data={allItems}
  perPage={20}
  emptyState={<EmptyItems notFoundText="No results found." />}
>
  {(items) =>
    items.map((item) => (
      <Card key={item.id}>
        <CardContent>{item.name}</CardContent>
      </Card>
    ))
  }
</PaginatedItems>
```

### Form inside a Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Edit profile</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="space-y-1">
      <Label htmlFor="name">Name</Label>
      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
    <div className="space-y-1">
      <Label htmlFor="role">Role</Label>
      <Select value={role} onValueChange={setRole}>
        <SelectTrigger id="role"><SelectValue placeholder="Select role" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </CardContent>
  <CardFooter className="gap-2 justify-end">
    <Button variant="outline" onClick={onCancel}>Cancel</Button>
    <Button onClick={onSave}>Save</Button>
  </CardFooter>
</Card>
```

### Destructive confirmation

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Side panel with form (Sheet)

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Edit item</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Edit item</SheetTitle>
      <SheetDescription>Make changes and save.</SheetDescription>
    </SheetHeader>
    {/* form fields */}
    <SheetFooter>
      <SheetClose asChild>
        <Button variant="outline">Cancel</Button>
      </SheetClose>
      <Button onClick={onSave}>Save</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

### Toast notifications

```tsx
// Place once in root layout:
import { Toaster } from '@/components/toaster'
export default function RootLayout({ children }) {
  return <>{children}<Toaster /></>
}

// Call from anywhere:
import { toast } from '@/components/toaster'
toast.success('Saved successfully.')
toast.error('Failed to save.')
toast.loading('Saving…')
```

### Tooltip (provider once, use many)

```tsx
// Root layout or shared ancestor — only once:
<TooltipProvider>
  <App />
</TooltipProvider>

// Inside any component:
<Tooltip>
  <TooltipTrigger asChild>
    <Button size="icon" variant="ghost"><TrashIcon /></Button>
  </TooltipTrigger>
  <TooltipContent>Delete item</TooltipContent>
</Tooltip>
```
