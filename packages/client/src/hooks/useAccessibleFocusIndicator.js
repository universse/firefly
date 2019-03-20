import { useEffect } from 'react'

export default function useAccessibleFocusIndicator () {
  useEffect(() => {
    const handleKeyDown = e =>
      document.body.classList.toggle('keyboard-in-use', true)
    const handleMouseDown = e =>
      document.body.classList.toggle('keyboard-in-use', false)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleMouseDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])
}
