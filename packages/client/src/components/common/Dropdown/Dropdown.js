import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import Downshift from 'downshift'

import { DefaultRoot } from './styled'

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
    <Downshift itemToString={({ value }) => value}>
      {({
        getToggleButtonProps,
        getItemProps,
        getLabelProps,
        getRootProps,
        highlightedIndex,
        isOpen
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
                onClick: onToggleButtonClick
              })}
            >
              <Icon />
            </ToggleButton>
          </div>
          {isOpen && (
            <OptionList>
              {items.map((option, index) => {
                const { label, ...props } = option

                return (
                  <li
                    {...getItemProps({
                      item: option,
                      index
                    })}
                    key={label}
                  >
                    <OptionButton
                      {...props}
                      isHighlighted={highlightedIndex === index}
                    >
                      {label}
                    </OptionButton>
                  </li>
                )
              })}
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

Dropdown.propTypes = {
  id: PropTypes.string.isRequired
}
