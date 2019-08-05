import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import Icon from 'assets/icons'
import useDropdownMenu from 'hooks/useDropdownMenu'

export default function DetailDropdown ({ dispatch, items, detail, value }) {
  const onSelect = ({ value }) => {
    dispatch({ type: 'set', payload: { [detail]: value } })
  }

  const {
    detailsProps,
    summaryProps,
    menuProps,
    getItemProps,
    highlightedIndex
  } = useDropdownMenu({
    items: items,
    onSelect,
    selectedIndex: value
  })

  return (
    <details {...detailsProps}>
      <summary aria-label={`Edit ${detail}`} {...summaryProps}>
        {items[value].label}
        <div
          css={css`
            color: var(--gray600);
            height: 1.25rem;
            margin-left: 0.5rem;
          `}
        >
          <Icon icon='chevron-down' size='medium' />
        </div>
      </summary>
      <div {...menuProps}>
        {items.map((option, index) => {
          let className = ''
          highlightedIndex === index && (className += ' highlighted')
          value === index && (className += ' selected')

          return (
            <button
              key={option.value}
              aria-label={option.label}
              className={className}
              onClick={() => onSelect(option)}
              {...getItemProps(index)}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </details>
  )
}

DetailDropdown.propTypes = {
  detail: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired,
  value: PropTypes.number.isRequired
}
