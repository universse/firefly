import { useRef, useState } from 'react'

import useId from './useId'

export default function useComboBox ({ onSelect }) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)
  const items = useRef([])

  const activeDescendant =
    (items.current[highlightedIndex] && items.current[highlightedIndex].id) ||
    ''

  items.current = []

  const id = useId()
  const labelId = `combobox-${id}`
  const inputId = `combobox-input-${id}`
  const menuId = `combobox-menu-${id}`

  const openMenu = e => e.target.value && setIsOpen(true)

  const closeMenu = () => {
    setHighlightedIndex(-1)
    setIsOpen(false)
  }

  // TODO may need pass in index as argument
  const select = () => {
    if (highlightedIndex < 0) return
    onSelect(items.current[highlightedIndex])
    closeMenu()
  }

  const rootProps = {
    'aria-expanded': isOpen ? 'true' : 'false',
    'aria-haspopup': 'listbox',
    'aria-labelledby': labelId,
    'aria-owns': menuId,
    role: 'combobox'
  }

  const labelProps = {
    id: labelId,
    htmlFor: inputId
  }

  function getInputProps ({ onChange }) {
    return {
      id: inputId,
      'aria-activedescendant': activeDescendant,
      'aria-autocomplete': 'list',
      'aria-controls': menuId,
      'aria-labelledby': labelId,
      onBlur: () => {
        highlightedIndex === -1 && closeMenu()
      },
      onChange: e => {
        setIsOpen(!!e.target.value)
        onChange && onChange(e)
      },
      onClick: openMenu,
      onFocus: openMenu,
      onKeyDown: e => {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault()
            openMenu(e)
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
                : highlightedIndex - 1
            )
            break

          case 'Enter':
            select()
            break

          case 'Escape':
          case 'Tab':
            closeMenu()
            break
        }
      }
    }
  }

  const menuProps = {
    'aria-labelledby': labelId,
    id: menuId,
    onMouseLeave: () => setHighlightedIndex(-1),
    role: 'listbox'
  }

  function getMenuItemProps ({ index, item }) {
    items.current.push(item)
    const { meta, ...props } = item

    return {
      'aria-selected': index === highlightedIndex,
      onClick: select,
      onMouseEnter: () => setHighlightedIndex(index),
      role: 'option',
      tabIndex: -1,
      ...props
    }
  }

  return {
    highlightedIndex,
    isOpen,
    rootProps,
    labelProps,
    getInputProps,
    menuProps,
    getMenuItemProps
  }
}
