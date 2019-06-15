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
        <span>Sort By: </span>
        {SortOptions[selectedIndex].label}
        <div
          css={css`
            color: var(--colors-gray500);
            height: 1.5rem;
          `}
        >
          <ChevronDown />
        </div>
      </summary>
      <div className='Menu' {...menuProps}>
        {SortOptions.map((option, index) => {
          const classes = ['uppercase']
          highlightedIndex === index && classes.push('highlighted')
          selectedIndex === index && classes.push('selected')

          return (
            <button
              key={option.value}
              aria-label={option.label}
              className={classes.join(' ')}
              onClick={() => onSelect(option)}
              {...getMenuItemProps(index)}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </details>
  )
}
