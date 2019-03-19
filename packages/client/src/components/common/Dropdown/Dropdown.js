import React, { memo } from 'react'
import { css } from '@emotion/core'
import Downshift from 'downshift'

import { DefaultRoot } from './styled'

function Dropdown ({
  handleChange,
  initialValue,
  items,
  label,
  OptionList,
  Root,
  OptionButton,
  ToggleButton,
  TogglerLabel
}) {
  return (
    <Downshift
      initialSelectedItem={items.find(({ value }) => value === initialValue)}
      itemToString={({ value }) => value}
      onChange={handleChange}
    >
      {({
        getToggleButtonProps,
        getItemProps,
        getLabelProps,
        getRootProps,
        highlightedIndex,
        isOpen,
        selectItem,
        selectedItem
      }) => (
        <Root {...getRootProps({ refKey: 'innerRef' })}>
          <div
            css={css`
              align-items: center;
              display: flex;
            `}
          >
            <TogglerLabel {...getLabelProps({ htmlFor: 'toggler' })}>
              {label}
            </TogglerLabel>
            <ToggleButton
              {...getToggleButtonProps({
                'aria-expanded': isOpen,
                id: 'toggler',
                'data-toggle': 'dropdown',
                onKeyDown: e => {
                  e.key === 'Tab' &&
                    highlightedIndex !== null &&
                    selectItem(items[highlightedIndex])
                }
              })}
            >
              {selectedItem.label}
            </ToggleButton>
          </div>
          {isOpen && (
            <OptionList>
              {items.map((option, index) => (
                <li
                  {...getItemProps({
                    item: option,
                    index
                  })}
                  key={option.value}
                >
                  <OptionButton
                    aria-label={option.label}
                    isHighlighted={highlightedIndex === index}
                    isSelected={option === selectedItem}
                  >
                    {option.label}
                  </OptionButton>
                </li>
              ))}
            </OptionList>
          )}
        </Root>
      )}
    </Downshift>
  )
}

export default memo(Dropdown)

Dropdown.defaultProps = {
  Root: DefaultRoot
}
