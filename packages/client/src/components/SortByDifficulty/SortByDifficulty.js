import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { URLParamsContext } from 'contexts/URLParams'
import { ChevronDown } from 'icons'
import useDropdownMenu from 'hooks/useDropdownMenu'
import SortOptions from 'constants/SortOptions'
import { logSortDifficulty } from 'utils/amplitudeUtils'

export default function SortByDifficulty () {
  const {
    query: { sort },
    queryDispatch
  } = useContext(URLParamsContext)

  const onSelect = ({ value }) => {
    queryDispatch({ sort: value })
    logSortDifficulty({ sort: value })
  }

  const selectedIndex = SortOptions.findIndex(({ value }) => value === sort)

  const {
    detailsProps,
    summaryProps,
    menuProps,
    getMenuItemProps,
    highlightedIndex
  } = useDropdownMenu({
    items: SortOptions,
    onSelect,
    selectedIndex
  })

  return (
    <details className='DropdownMenu' {...detailsProps}>
      <summary aria-label='Sort by' className='Exposed' {...summaryProps}>
        <span>Sort by: </span>
        {SortOptions[selectedIndex].label}
        <div
          css={css`
            color: var(--colors-gray600);
            height: 1.5rem;
          `}
        >
          <ChevronDown />
        </div>
      </summary>
      <ul {...menuProps}>
        {SortOptions.map((option, index) => {
          let className = 'uppercase'
          highlightedIndex === index && (className += ' highlighted')
          selectedIndex === index && (className += ' selected')

          return (
            <button
              key={option.value}
              aria-label={option.label}
              className={className}
              onClick={() => onSelect(option)}
              {...getMenuItemProps(index)}
            >
              {option.label}
            </button>
          )
        })}
      </ul>
    </details>
  )
}
