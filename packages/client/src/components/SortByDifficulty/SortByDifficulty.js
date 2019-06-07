import React, { useCallback, useContext } from 'react'

import { ToggleButton } from './styled'
import { URLParamsContext } from 'contexts/URLParams'
import useDropdownMenu from 'hooks/useDropdownMenu'
import SortOptions from 'constants/SortOptions'
import { logSortDifficulty } from 'utils/amplitudeUtils'

export default function SortByDifficulty () {
  const {
    query: { sort },
    queryDispatch
  } = useContext(URLParamsContext)

  const onSelect = useCallback(({ value }) => {
    queryDispatch({ sort: value })
    logSortDifficulty({ sort: value })
  }, [queryDispatch])

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
      <ToggleButton aria-label='Sort by' {...summaryProps}>
        <span>Sort By: </span>
        {SortOptions[selectedIndex].label}
      </ToggleButton>
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
