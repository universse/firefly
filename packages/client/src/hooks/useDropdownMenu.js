import { useEffect, useRef, useState } from 'react'

export default function useDropdownMenu ({
  items,
  menuItemCount,
  onSelect,
  left = false,
  top = false
} = {}) {
  menuItemCount = menuItemCount || items.length

  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const detailsRef = useRef()
  const menuRef = useRef()

  const [style, setStyle] = useState({})

  useEffect(() => {
    setStyle({
      [top ? 'bottom' : 'top']: detailsRef.current.offsetHeight + 4,
      [left ? 'right' : 'left']: 0
    })
  }, [left, top])

  // TODO may need pass in index as argument
  const select = () => {
    if (highlightedIndex < 0) return

    onSelect
      ? onSelect(items[highlightedIndex])
      : menuRef.current.children[highlightedIndex].click()
  }

  const unhighlight = () => setHighlightedIndex(-1)

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

          !detailsRef.current.open &&
            detailsRef.current.setAttribute('open', '')

          setHighlightedIndex(highlightedIndex =>
            highlightedIndex === menuItemCount - 1 ? 0 : highlightedIndex + 1
          )
          break

        case 'ArrowUp':
          e.preventDefault()

          setHighlightedIndex(highlightedIndex =>
            highlightedIndex === 0
              ? menuItemCount - 1
              : highlightedIndex === -1
              ? -1
              : highlightedIndex - 1
          )
          break

        case 'Enter':
          select()
          unhighlight()
          break

        case 'Escape':
          e.preventDefault()
          unhighlight()
          detailsRef.current.removeAttribute('open')
          break

        case 'Tab':
          select()
          break
      }
    }
  }

  const menuProps = {
    onMouseLeave: unhighlight,
    ref: menuRef,
    role: 'menu',
    style
  }

  function getItemProps (index) {
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
    getItemProps
  }
}
