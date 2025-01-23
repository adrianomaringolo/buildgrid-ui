import { useEffect, useState } from 'react'

export const useKeyPress = function (
  targetKey: string,
  callback?: (keyPressed: boolean) => void
) {
  const [keyPressed, setKeyPressed] = useState(false)

  function downHandler({ key }: { key: string }) {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  const upHandler = ({ key }: { key: string }) => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  })

  useEffect(() => {
    if (keyPressed) callback?.(keyPressed)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPressed])

  return keyPressed
}
