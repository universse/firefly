import { useRef, useState } from 'react'

export default function useDropdownMenu ({ items, menuItemCount, onSelect }) {
  menuItemCount = menuItemCount || items.length

  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const detailsRef = useRef()
  const detailsProps = {
    ref: detailsRef
  }

  const select = () => {
    if (highlightedIndex < 0) return

    return onSelect
      ? onSelect(items[highlightedIndex])
      : menuRef.current.children[highlightedIndex].click()
  }

  const summaryProps = {
    'aria-haspopup': 'menu',
    onBlur: e => {
      e.preventDefault()
      select()
      detailsRef.current.removeAttribute('open')
    },
    onKeyDown: e => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()

          !detailsRef.current.hasAttribute('open') &&
            detailsRef.current.setAttribute('open', '')

          setHighlightedIndex(highlightedIndex =>
            highlightedIndex === menuItemCount - 1 ? 0 : highlightedIndex + 1
          )
          break

        case 'ArrowUp':
          e.preventDefault()

          setHighlightedIndex(highlightedIndex =>
            highlightedIndex === 0 ? menuItemCount - 1 : highlightedIndex - 1
          )
          break

        case 'Enter':
          select()
          setHighlightedIndex(-1)
          break

        case 'Escape':
          e.preventDefault()
          setHighlightedIndex(-1)
          detailsRef.current.removeAttribute('open')
          break

        case 'Tab':
          select()
          break
      }
    }
  }

  const menuRef = useRef()
  const menuProps = {
    ref: menuRef,
    role: 'menu'
  }

  function getMenuItemProps (index) {
    return {
      onMouseLeave: () => setHighlightedIndex(-1),
      onMouseMove: () => setHighlightedIndex(index),
      role: 'menuitem',
      tabIndex: -1
    }
  }

  return {
    detailsProps,
    highlightedIndex,
    summaryProps,
    menuProps,
    getMenuItemProps
  }
}
