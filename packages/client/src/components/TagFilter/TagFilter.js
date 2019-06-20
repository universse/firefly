import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { URLParamsContext } from 'contexts/URLParams'
import { Tag } from 'icons'
// import { ClearFilterButton, Count, Tag } from './styled'
import useListBox from 'hooks/useListBox'
import AriaLabels from 'constants/AriaLabels'
import { logClickTagFilter } from 'utils/amplitudeUtils'

//       onClick={() => queryDispatch({ tags: [] })}
export default function TagFilter ({ aggregatedTags }) {
  const {
    query: { tags },
    queryDispatch
  } = useContext(URLParamsContext)

  const onSelect = ({ tag }) => {
    queryDispatch({ tag })
    // logClickTagFilter({ sort: value })
  }

  const {
    detailsProps,
    highlightedIndex,
    summaryProps,
    getMenuProps,
    getMenuItemProps
  } = useListBox({ onSelect })

  return (
    <details className='ListBox' {...detailsProps}>
      <summary aria-label={AriaLabels.FILTER_BY_TAGS} {...summaryProps}>
        Filter by Tags
        <div
          css={css`
            color: var(--colors-gray600);
            margin-left: 0.5rem;
          `}
        >
          <Tag />
        </div>
      </summary>
      <ul {...getMenuProps({ 'aria-orientation': 'horizontal' })}>
        {aggregatedTags.map(([tag, count], index) => {
          const isSelected = tags.includes(tag)

          const classes = []
          isSelected && classes.push('selected')
          highlightedIndex === index && classes.push('highlighted')

          return (
            <button
              key={tag}
              {...classes.length && { className: classes.join(' ') }}
              {...getMenuItemProps({
                index,
                item: { tag, id: tag.replace(/\s/g, '-') },
                disabled: count === 0,
                isSelected
              })}
            >
              {tag}
              <span>{count}</span>
            </button>
          )
        })}
      </ul>
    </details>
  )
}

TagFilter.propTypes = {
  aggregatedTags: PropTypes.arrayOf(PropTypes.array).isRequired
}
