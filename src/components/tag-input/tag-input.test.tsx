import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { TagInput } from './tag-input'

describe('TagInput', () => {
	describe('Rendering', () => {
		it('renders tag input with default props', () => {
			render(<TagInput />)

			const input = screen.getByRole('textbox')
			expect(input).toBeInTheDocument()
			expect(input).toHaveAttribute(
				'placeholder',
				'Type and press Enter or comma to add tags...',
			)
		})

		it('renders with custom placeholder', () => {
			render(<TagInput placeholder="Add your tags here..." />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('placeholder', 'Add your tags here...')
		})

		it('renders with custom className', () => {
			render(<TagInput className="custom-tag-input" />)

			const container = document.querySelector('.custom-tag-input')
			expect(container).toBeInTheDocument()
		})

		it('renders with helper text', () => {
			render(<TagInput helperText="Enter tags separated by commas" />)

			expect(screen.getByText('Enter tags separated by commas')).toBeInTheDocument()
		})

		it('renders without helper text by default', () => {
			render(<TagInput />)

			const helperText = document.querySelector('.text-xs.text-muted-foreground')
			expect(helperText).not.toBeInTheDocument()
		})
	})

	describe('Initial Values', () => {
		it('handles string initial value', () => {
			const onChange = vi.fn()
			render(<TagInput initialValue="tag1,tag2,tag3" onChange={onChange} />)

			expect(onChange).toHaveBeenCalledWith(['tag1', 'tag2', 'tag3'])
		})

		it('handles array initial value', () => {
			const onChange = vi.fn()
			render(<TagInput initialValue={['tag1', 'tag2']} onChange={onChange} />)

			expect(onChange).toHaveBeenCalledWith(['tag1', 'tag2'])
		})

		it('filters out empty tags from initial value', () => {
			const onChange = vi.fn()
			render(<TagInput initialValue="tag1,,tag2, ,tag3" onChange={onChange} />)

			expect(onChange).toHaveBeenCalledWith(['tag1', 'tag2', 'tag3'])
		})

		it('does not set initial value if value prop is not empty', () => {
			const onChange = vi.fn()
			render(
				<TagInput value={['existing']} initialValue="tag1,tag2" onChange={onChange} />,
			)

			expect(onChange).not.toHaveBeenCalled()
		})

		it('handles custom separator in initial value', () => {
			const onChange = vi.fn()
			render(<TagInput initialValue="tag1;tag2;tag3" separator=";" onChange={onChange} />)

			expect(onChange).toHaveBeenCalledWith(['tag1', 'tag2', 'tag3'])
		})
	})

	describe('Tag Display', () => {
		it('displays existing tags', () => {
			render(<TagInput value={['React', 'TypeScript', 'Testing']} />)

			expect(screen.getByText('React')).toBeInTheDocument()
			expect(screen.getByText('TypeScript')).toBeInTheDocument()
			expect(screen.getByText('Testing')).toBeInTheDocument()
		})

		it('renders remove buttons for each tag', () => {
			render(<TagInput value={['tag1', 'tag2']} />)

			const removeButtons = screen.getAllByLabelText(/Remove .* tag/)
			expect(removeButtons).toHaveLength(2)
			expect(removeButtons[0]).toHaveAttribute('aria-label', 'Remove tag1 tag')
			expect(removeButtons[1]).toHaveAttribute('aria-label', 'Remove tag2 tag')
		})

		it('hides placeholder when tags are present', () => {
			render(<TagInput value={['tag1']} placeholder="Add tags..." />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('placeholder', '')
		})

		it('shows placeholder when no tags are present', () => {
			render(<TagInput value={[]} placeholder="Add tags..." />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('placeholder', 'Add tags...')
		})
	})

	describe('Adding Tags', () => {
		it('adds tag on Enter key', async () => {
			const onChange = vi.fn()
			const user = userEvent.setup()

			render(<TagInput value={[]} onChange={onChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'new-tag')
			await user.keyboard('{Enter}')

			expect(onChange).toHaveBeenCalledWith(['new-tag'])
		})

		it('adds tag on comma key', async () => {
			const onChange = vi.fn()
			const user = userEvent.setup()

			render(<TagInput value={[]} onChange={onChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'new-tag,')

			expect(onChange).toHaveBeenCalledWith(['new-tag'])
		})

		it('adds tag when typing comma in input', async () => {
			const ControlledTagInput = () => {
				const [tags, setTags] = React.useState<string[]>([])
				return <TagInput value={tags} onChange={setTags} />
			}

			const user = userEvent.setup()
			render(<ControlledTagInput />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'tag1,')

			expect(screen.getByText('tag1')).toBeInTheDocument()

			await user.type(input, 'tag2,')

			expect(screen.getByText('tag1')).toBeInTheDocument()
			expect(screen.getByText('tag2')).toBeInTheDocument()
		})

		it('trims whitespace from tags', async () => {
			const onChange = vi.fn()
			const user = userEvent.setup()

			render(<TagInput value={[]} onChange={onChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, '  spaced-tag  ')
			await user.keyboard('{Enter}')

			expect(onChange).toHaveBeenCalledWith(['spaced-tag'])
		})

		it('does not add empty tags', async () => {
			const onChange = vi.fn()
			const user = userEvent.setup()

			render(<TagInput value={[]} onChange={onChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, '   ')
			await user.keyboard('{Enter}')

			expect(onChange).not.toHaveBeenCalled()
		})

		it('does not add duplicate tags', async () => {
			const onChange = vi.fn()
			const user = userEvent.setup()

			render(<TagInput value={['existing-tag']} onChange={onChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'existing-tag')
			await user.keyboard('{Enter}')

			expect(onChange).not.toHaveBeenCalled()
		})

		it('clears input after adding tag', async () => {
			const onChange = vi.fn()
			const user = userEvent.setup()

			render(<TagInput value={[]} onChange={onChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'new-tag')
			await user.keyboard('{Enter}')

			expect(input).toHaveValue('')
		})

		it('uses custom separator', async () => {
			const onChange = vi.fn()
			const user = userEvent.setup()

			render(<TagInput value={[]} onChange={onChange} separator=";" />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'tag1')
			await user.keyboard('{Enter}')

			expect(onChange).toHaveBeenCalledWith(['tag1'])
		})
	})

	describe('Removing Tags', () => {
		it('removes tag when remove button is clicked', async () => {
			const onChange = vi.fn()
			const user = userEvent.setup()

			render(<TagInput value={['tag1', 'tag2', 'tag3']} onChange={onChange} />)

			const removeButton = screen.getByLabelText('Remove tag2 tag')
			await user.click(removeButton)

			expect(onChange).toHaveBeenCalledWith(['tag1', 'tag3'])
		})

		it('removes last tag on Backspace when input is empty', async () => {
			const onChange = vi.fn()
			const user = userEvent.setup()

			render(<TagInput value={['tag1', 'tag2']} onChange={onChange} />)

			const input = screen.getByRole('textbox')
			input.focus()
			await user.keyboard('{Backspace}')

			expect(onChange).toHaveBeenCalledWith(['tag1'])
		})

		it('does not remove tag on Backspace when input has content', async () => {
			const onChange = vi.fn()
			const user = userEvent.setup()

			render(<TagInput value={['tag1', 'tag2']} onChange={onChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'some text')
			await user.keyboard('{Backspace}')

			expect(onChange).not.toHaveBeenCalled()
		})

		it('does not remove tag on Backspace when no tags exist', async () => {
			const onChange = vi.fn()
			const user = userEvent.setup()

			render(<TagInput value={[]} onChange={onChange} />)

			const input = screen.getByRole('textbox')
			input.focus()
			await user.keyboard('{Backspace}')

			expect(onChange).not.toHaveBeenCalled()
		})
	})

	describe('Focus Management', () => {
		it('focuses input when container is clicked', async () => {
			const user = userEvent.setup()

			render(<TagInput value={['tag1']} />)

			const container = document.querySelector('.cursor-text')
			await user.click(container!)

			const input = screen.getByRole('textbox')
			expect(input).toHaveFocus()
		})

		it('does not focus input when clicking on tags or buttons', async () => {
			const user = userEvent.setup()

			render(<TagInput value={['tag1']} />)

			const tag = screen.getByText('tag1')
			await user.click(tag)

			const input = screen.getByRole('textbox')
			expect(input).not.toHaveFocus()
		})

		it('maintains focus on input after adding tag', async () => {
			const onChange = vi.fn()
			const user = userEvent.setup()

			render(<TagInput value={[]} onChange={onChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'new-tag')
			await user.keyboard('{Enter}')

			expect(input).toHaveFocus()
		})
	})

	describe('Styling and Layout', () => {
		it('applies focus-within styles to container', () => {
			render(<TagInput />)

			const container = document.querySelector('.focus-within\\:ring-2')
			expect(container).toBeInTheDocument()
			expect(container).toHaveClass(
				'focus-within:ring-ring',
				'focus-within:border-transparent',
			)
		})

		it('applies correct tag styling', () => {
			render(<TagInput value={['tag1']} />)

			const tag = screen.getByText('tag1').parentElement
			expect(tag).toHaveClass(
				'inline-flex',
				'items-center',
				'gap-1',
				'px-2',
				'py-1',
				'bg-secondary',
				'text-secondary-foreground',
				'rounded-full',
				'text-sm',
			)
		})

		it('applies correct remove button styling', () => {
			render(<TagInput value={['tag1']} />)

			const removeButton = screen.getByLabelText('Remove tag1 tag')
			expect(removeButton).toHaveClass(
				'hover:bg-secondary-foreground/20',
				'rounded-full',
				'p-0.5',
				'transition-colors',
			)
		})

		it('applies correct input styling', () => {
			render(<TagInput />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveClass(
				'flex-1',
				'min-w-[120px]',
				'bg-transparent',
				'border-none',
				'outline-none',
				'text-foreground',
				'placeholder:text-muted-foreground',
			)
		})

		it('applies correct helper text styling', () => {
			render(<TagInput helperText="Helper text" />)

			const helperText = screen.getByText('Helper text')
			expect(helperText).toHaveClass('text-xs', 'text-muted-foreground', 'mt-2')
		})
	})

	describe('Controlled vs Uncontrolled', () => {
		it('works as controlled component', async () => {
			const ControlledTagInput = () => {
				const [tags, setTags] = React.useState(['initial'])

				return <TagInput value={tags} onChange={setTags} />
			}

			const user = userEvent.setup()
			render(<ControlledTagInput />)

			expect(screen.getByText('initial')).toBeInTheDocument()

			const input = screen.getByRole('textbox')
			await user.type(input, 'new-tag')
			await user.keyboard('{Enter}')

			expect(screen.getByText('new-tag')).toBeInTheDocument()
		})

		it('works as uncontrolled component with initial value', () => {
			const onChange = vi.fn()
			render(<TagInput initialValue={['uncontrolled']} onChange={onChange} />)

			expect(onChange).toHaveBeenCalledWith(['uncontrolled'])
		})

		it('calls onChange when tags change', async () => {
			const onChange = vi.fn()
			const user = userEvent.setup()

			render(<TagInput value={[]} onChange={onChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'test-tag')
			await user.keyboard('{Enter}')

			expect(onChange).toHaveBeenCalledWith(['test-tag'])
		})
	})

	describe('Accessibility', () => {
		it('has proper input attributes', () => {
			render(<TagInput />)

			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('type', 'text')
		})

		it('provides accessible labels for remove buttons', () => {
			render(<TagInput value={['React', 'Vue']} />)

			expect(screen.getByLabelText('Remove React tag')).toBeInTheDocument()
			expect(screen.getByLabelText('Remove Vue tag')).toBeInTheDocument()
		})

		it('maintains proper tab order', () => {
			render(<TagInput value={['tag1', 'tag2']} />)

			const removeButtons = screen.getAllByLabelText(/Remove .* tag/)
			const input = screen.getByRole('textbox')

			// All elements should be focusable
			removeButtons.forEach((button) => {
				expect(button).toHaveAttribute('type', 'button')
			})
			expect(input).toHaveAttribute('type', 'text')
		})
	})

	describe('Edge Cases', () => {
		it('handles undefined onChange gracefully', async () => {
			const user = userEvent.setup()

			render(<TagInput value={[]} />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'test')
			await user.keyboard('{Enter}')

			// Should not crash
			expect(input).toBeInTheDocument()
		})

		it('handles undefined className gracefully', () => {
			render(<TagInput className={undefined} />)

			const input = screen.getByRole('textbox')
			expect(input).toBeInTheDocument()
		})

		it('handles empty separator', async () => {
			const onChange = vi.fn()
			const user = userEvent.setup()

			render(<TagInput value={[]} onChange={onChange} separator="" />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'test')
			await user.keyboard('{Enter}')

			expect(onChange).toHaveBeenCalledWith(['test'])
		})

		it('handles very long tag names', async () => {
			const onChange = vi.fn()
			const user = userEvent.setup()
			const longTag = 'a'.repeat(100)

			render(<TagInput value={[]} onChange={onChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, longTag)
			await user.keyboard('{Enter}')

			expect(onChange).toHaveBeenCalledWith([longTag])
		})

		it('handles special characters in tags', async () => {
			const onChange = vi.fn()
			const user = userEvent.setup()

			render(<TagInput value={[]} onChange={onChange} />)

			const input = screen.getByRole('textbox')
			await user.type(input, 'tag-with-special@chars#123')
			await user.keyboard('{Enter}')

			expect(onChange).toHaveBeenCalledWith(['tag-with-special@chars#123'])
		})
	})

	describe('Complex Scenarios', () => {
		it('handles rapid tag addition and removal', async () => {
			const ControlledTagInput = () => {
				const [tags, setTags] = React.useState<string[]>([])
				return <TagInput value={tags} onChange={setTags} />
			}

			const user = userEvent.setup()
			render(<ControlledTagInput />)

			const input = screen.getByRole('textbox')

			// Add tags one by one
			await user.type(input, 'tag1,')
			expect(screen.getByText('tag1')).toBeInTheDocument()

			await user.type(input, 'tag2,')
			expect(screen.getByText('tag1')).toBeInTheDocument()
			expect(screen.getByText('tag2')).toBeInTheDocument()

			await user.type(input, 'tag3,')
			expect(screen.getByText('tag1')).toBeInTheDocument()
			expect(screen.getByText('tag2')).toBeInTheDocument()
			expect(screen.getByText('tag3')).toBeInTheDocument()
		})

		it('maintains correct state during complex interactions', async () => {
			const ControlledTagInput = () => {
				const [tags, setTags] = React.useState(['initial'])

				return <TagInput value={tags} onChange={setTags} />
			}

			const user = userEvent.setup()
			render(<ControlledTagInput />)

			// Add a tag
			const input = screen.getByRole('textbox')
			await user.type(input, 'added')
			await user.keyboard('{Enter}')

			// Remove the initial tag
			const removeButton = screen.getByLabelText('Remove initial tag')
			await user.click(removeButton)

			// Add another tag
			await user.type(input, 'final')
			await user.keyboard('{Enter}')

			expect(screen.getByText('added')).toBeInTheDocument()
			expect(screen.getByText('final')).toBeInTheDocument()
			expect(screen.queryByText('initial')).not.toBeInTheDocument()
		})

		it('handles paste operations with multiple tags', async () => {
			const onChange = vi.fn()
			const user = userEvent.setup()

			render(<TagInput value={[]} onChange={onChange} />)

			const input = screen.getByRole('textbox')
			await user.click(input)
			await user.paste('tag1,tag2,tag3')

			// Should handle the comma-separated paste
			expect(onChange).toHaveBeenCalledWith(['tag1'])
		})
	})
})
