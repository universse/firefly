import { useRef, useState } from 'react'

export default function useListBox ({ onSelect }) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const items = useRef([])

  const activeDescendant =
    (items.current[highlightedIndex] && items.current[highlightedIndex].id) ||
    ''

  items.current = []

  const detailsRef = useRef()
  const menuRef = useRef()

  const select = () => {
    if (
      items.current[highlightedIndex] &&
      !menuRef.current.children[highlightedIndex].disabled
    ) {
      onSelect(items.current[highlightedIndex])
    }
  }

  const unhighlight = () => setHighlightedIndex(-1)

  const detailsProps = {
    ref: detailsRef
  }

  const summaryProps = {
    'aria-haspopup': 'listbox',
    onKeyDown: e => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()

          !detailsRef.current.open &&
            detailsRef.current.setAttribute('open', '')

          setHighlightedIndex(highlightedIndex =>
            highlightedIndex === items.current.length - 1
              ? 0
              : highlightedIndex + 1
          )
          break

        case 'ArrowUp':
          e.preventDefault()

          setHighlightedIndex(highlightedIndex =>
            highlightedIndex === 0
              ? items.current.length - 1
              : highlightedIndex === -1
              ? -1
              : highlightedIndex - 1
          )
          break

        case 'Enter':
          if (highlightedIndex > -1) {
            select()
            e.preventDefault()
          }
          break

        case 'Escape':
          e.preventDefault()
          unhighlight()
          detailsRef.current.removeAttribute('open')
          break
      }
    }
  }

  function getMenuProps (props) {
    return {
      'aria-activedescendant': activeDescendant,
      'aria-multiselectable': 'true',
      ref: menuRef,
      role: 'listbox',
      ...props
    }
  }

  function getItemProps ({ index, item, isSelected, disabled }) {
    items.current.push(item)

    const highlight = () => setHighlightedIndex(index)

    return {
      'aria-selected': isSelected,
      disabled,
      id: item.id,
      onClick: select,
      onMouseEnter: highlight,
      onMouseLeave: unhighlight,
      onTouchStart: highlight,
      role: 'option',
      tabIndex: -1
    }
  }

  return {
    detailsProps,
    highlightedIndex,
    summaryProps,
    getMenuProps,
    getItemProps
  }
}
