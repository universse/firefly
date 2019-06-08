import { useRef, useState } from 'react'

export default function useDropdownMenu ({ items, menuItemCount, onSelect }) {
  menuItemCount = menuItemCount || items.length

  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const detailsRef = useRef()
  const menuRef = useRef()

  const select = () => {
    if (highlightedIndex < 0) return

    onSelect
      ? onSelect(items[highlightedIndex])
      : menuRef.current.children[highlightedIndex].click()
  }

  const detailsProps = {
    ref: detailsRef
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

  const menuProps = {
    onMouseLeave: () => setHighlightedIndex(-1),
    ref: menuRef,
    role: 'menu'
  }

  function getMenuItemProps (index) {
    return {
      onMouseEnter: () => setHighlightedIndex(index),
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
