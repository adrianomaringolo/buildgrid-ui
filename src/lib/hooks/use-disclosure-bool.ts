import * as React from 'react'

export const useDisclosureBool = (initial = false): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = React.useState(initial)

  const open = React.useCallback(() => setIsOpen(true), [])
  const close = React.useCallback(() => setIsOpen(false), [])

  return [isOpen, open, close]
}
