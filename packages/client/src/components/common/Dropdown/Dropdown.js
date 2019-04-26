import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import Downshift from 'downshift'
import { navigate } from 'gatsby'

import { OptionButton, OptionList, Root } from './styled'

function Dropdown ({
  Icon,
  id,
  items,
  label,
  onToggleButtonClick,
  OptionList,
  OptionButton,
  Root,
  ToggleButton
}) {
  return (
    <Downshift
      itemToString={item => item && item.children}
      onSelect={({ href, onClick, to }) => {
        href && window.open(href)
        onClick && onClick()
        to && navigate(to)
      }}
    >
      {({
        getItemProps,
        getLabelProps,
        getMenuProps,
        getRootProps,
        getToggleButtonProps,
        highlightedIndex,
        isOpen,
        selectItem
      }) => (
        <Root {...getRootProps({ refKey: 'innerRef' })}>
          <div
            css={css`
              align-items: center;
              display: flex;
            `}
          >
            <label
              className='visually-hidden'
              {...getLabelProps({ htmlFor: id })}
            >
              {label}
            </label>
            <ToggleButton
              {...getToggleButtonProps({
                'aria-expanded': isOpen,
                'data-toggle': 'dropdown',
                id,
                ...(onToggleButtonClick && { onClick: onToggleButtonClick })
              })}
            >
              <Icon />
            </ToggleButton>
          </div>
          <OptionList {...getMenuProps({ refKey: 'innerRef' })}>
            {isOpen &&
              items.map((item, index) => (
                <OptionButton
                  key={index}
                  {...item}
                  {...getItemProps({
                    item,
                    index,
                    isHighlighted: highlightedIndex === index
                  })}
                  onClick={e => {
                    if (e.ctrlKey || e.metaKey || e.shiftKey) {
                      if (item.as !== 'button') return
                    }
                    e.preventDefault()
                    selectItem(item)
                  }}
                />
              ))}
          </OptionList>
        </Root>
      )}
    </Downshift>
  )
}

export default memo(Dropdown)

Dropdown.defaultProps = {
  OptionButton,
  OptionList,
  Root
}

Dropdown.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  id: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  ToggleButton: PropTypes.elementType.isRequired,
  onToggleButtonClick: PropTypes.func,
  OptionButton: PropTypes.elementType,
  OptionList: PropTypes.elementType,
  Root: PropTypes.elementType
}
