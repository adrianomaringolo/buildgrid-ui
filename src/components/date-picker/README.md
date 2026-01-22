# DatePicker

A flexible and accessible date picker component built with React, combining a button trigger with a calendar popover for date selection.

## Features

- **Accessible**: Full keyboard navigation and ARIA attributes
- **Customizable**: Multiple button variants and custom styling support
- **Internationalization**: Support for multiple languages (English and Portuguese)
- **Controlled/Uncontrolled**: Works as both controlled and uncontrolled component
- **Responsive**: Adapts to different screen sizes
- **Type-safe**: Full TypeScript support

## Installation

```bash
npm install @buildgrid/ui
```

## Usage

### Basic Usage

```tsx
import { DatePicker } from '@buildgrid/ui'

function MyComponent() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <DatePicker 
      date={date} 
      onDateChange={setDate}
      placeholder="Pick a date"
    />
  )
}
```

### With Custom Placeholder

```tsx
<DatePicker 
  date={date} 
  onDateChange={setDate}
  placeholder="Select your birthday"
/>
```

### Disabled State

```tsx
<DatePicker 
  date={date} 
  onDateChange={setDate}
  disabled
/>
```

### Different Button Variants

```tsx
<DatePicker 
  date={date} 
  onDateChange={setDate}
  buttonVariant="default"
/>

<DatePicker 
  date={date} 
  onDateChange={setDate}
  buttonVariant="ghost"
/>
```

### Portuguese Language

```tsx
<DatePicker 
  date={date} 
  onDateChange={setDate}
  language="ptBR"
  placeholder="Escolha uma data"
/>
```

### Custom Width

```tsx
<DatePicker 
  date={date} 
  onDateChange={setDate}
  className="w-[400px]"
/>
```

### Form Example

```tsx
function EventForm() {
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()

  return (
    <form>
      <div>
        <label>Event Start Date</label>
        <DatePicker
          date={startDate}
          onDateChange={setStartDate}
          placeholder="Select start date"
        />
      </div>
      <div>
        <label>Event End Date</label>
        <DatePicker
          date={endDate}
          onDateChange={setEndDate}
          placeholder="Select end date"
        />
      </div>
    </form>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `date` | `Date \| undefined` | `undefined` | The selected date |
| `onDateChange` | `(date: Date \| undefined) => void` | `undefined` | Callback when date changes |
| `placeholder` | `string` | `'Pick a date'` | Placeholder text when no date is selected |
| `disabled` | `boolean` | `false` | Whether the date picker is disabled |
| `className` | `string` | `undefined` | Additional CSS classes for the button |
| `language` | `'enUS' \| 'ptBR'` | `'enUS'` | Language for date formatting |
| `buttonVariant` | `'default' \| 'outline' \| 'ghost' \| 'link' \| 'destructive' \| 'secondary'` | `'outline'` | Button style variant |

## Accessibility

The DatePicker component follows WAI-ARIA best practices:

- Proper ARIA attributes for button and popover
- Keyboard navigation support (Tab, Enter, Space)
- Screen reader friendly labels
- Focus management

### Keyboard Shortcuts

- `Tab`: Navigate to the date picker button
- `Enter` or `Space`: Open/close the calendar popover
- `Escape`: Close the popover (when open)
- Arrow keys: Navigate within the calendar

## Styling

The component uses Tailwind CSS classes and can be customized using the `className` prop:

```tsx
<DatePicker 
  date={date} 
  onDateChange={setDate}
  className="w-full max-w-md"
/>
```

## Examples

See the [Storybook documentation](https://buildgrid-ui.vercel.app/storybook) for interactive examples.

## Related Components

- [Calendar](../calendar) - The underlying calendar component
- [Popover](../popover) - The popover container
- [Button](../button) - The trigger button

## License

MIT
