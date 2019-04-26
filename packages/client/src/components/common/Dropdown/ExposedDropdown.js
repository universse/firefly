import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import Downshift from 'downshift'

import { OptionList, Root } from './styled'

function ExposedDropdown ({
  handleChange,
  id,
  items,
  label,
  OptionList,
  OptionButton,
  Root,
  selectedItem,
  ToggleButton,
  TogglerLabel
}) {
  return (
    <Downshift
      itemToString={({ value }) => value}
      onChange={handleChange}
      selectedItem={items.find(({ value }) => value === selectedItem)}
    >
      {({
        getItemProps,
        getLabelProps,
        getMenuProps,
        getRootProps,
        getToggleButtonProps,
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
                onKeyDown: e =>
                  e.key === 'Tab' &&
                  highlightedIndex !== null &&
                  selectItem(items[highlightedIndex])
              })}
            >
              {selectedItem.label}
            </ToggleButton>
          </div>
          <OptionList {...getMenuProps({ refKey: 'innerRef' })}>
            {isOpen &&
              items.map((option, index) => (
                <OptionButton
                  key={option.value}
                  aria-label={option.label}
                  {...getItemProps({
                    item: option,
                    index,
                    isHighlighted: highlightedIndex === index,
                    isSelected: option === selectedItem
                  })}
                >
                  {option.label}
                </OptionButton>
              ))}
          </OptionList>
        </Root>
      )}
    </Downshift>
  )
}

export default memo(ExposedDropdown)

ExposedDropdown.defaultProps = {
  OptionList,
  Root
}

ExposedDropdown.propTypes = {
  handleChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  OptionButton: PropTypes.elementType.isRequired,
  selectedItem: PropTypes.string.isRequired,
  ToggleButton: PropTypes.elementType.isRequired,
  TogglerLabel: PropTypes.elementType.isRequired,
  OptionList: PropTypes.elementType,
  Root: PropTypes.elementType
}
