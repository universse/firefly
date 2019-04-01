import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import Downshift from 'downshift'

import { DefaultRoot } from './styled'

function ExposedDropdown ({
  handleChange,
  id,
  initialValue,
  items,
  label,
  OptionList,
  OptionButton,
  Root,
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
            <TogglerLabel {...getLabelProps({ htmlFor: id })}>
              {label}
            </TogglerLabel>
            <ToggleButton
              {...getToggleButtonProps({
                'aria-expanded': isOpen,
                'data-toggle': 'dropdown',
                id,
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

export default memo(ExposedDropdown)

ExposedDropdown.defaultProps = {
  Root: DefaultRoot
}

ExposedDropdown.propTypes = {
  id: PropTypes.string.isRequired
}
