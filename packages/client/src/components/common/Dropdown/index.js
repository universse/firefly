import React from 'react'
import { css } from '@emotion/core'
import Downshift from 'downshift'

import SortOptions from 'constants/SortOptions'

export default function Dropdown ({
  handleChange,
  initialValue,
  items,
  label,
  Item,
  OptionList,
  Root,
  SortButton,
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
              justify-content: flex-end;
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
                    selectItem(SortOptions[highlightedIndex])
                }
              })}
            >
              {selectedItem.label}
            </ToggleButton>
          </div>
          {isOpen && (
            <OptionList>
              {SortOptions.map((option, index) => (
                <Item
                  {...getItemProps({
                    item: option,
                    index,
                    isHighlighted: highlightedIndex === index
                  })}
                  key={option.value}
                >
                  <SortButton
                    aria-label={option.label}
                    isSelected={option === selectedItem}
                  >
                    {option.label}
                  </SortButton>
                </Item>
              ))}
            </OptionList>
          )}
        </Root>
      )}
    </Downshift>
  )
}
