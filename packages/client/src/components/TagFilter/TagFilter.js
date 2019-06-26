import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { URLParamsContext } from 'contexts/URLParams'
import { Tag } from 'assets/icons'
import useListBox from 'hooks/useListBox'
import AriaLabels from 'constants/AriaLabels'
import { logClickTagFilter } from 'utils/amplitudeUtils'

export default function TagFilter ({ aggregatedTags }) {
  const {
    query: { tags },
    queryDispatch
  } = useContext(URLParamsContext)

  const onSelect = ({ tag }) => {
    const updatedTags = tags.includes(tag)
      ? tags.filter(t => t !== tag)
      : [tag, ...tags]
    queryDispatch({ tags: updatedTags })
    logClickTagFilter({ tag, updatedTags })
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
            color: var(--gray600);
            margin-left: 0.5rem;
          `}
        >
          <Tag />
        </div>
      </summary>
      <ul {...getMenuProps({ 'aria-orientation': 'horizontal' })}>
        {aggregatedTags.map(([tag, count], index) => {
          const isSelected = tags.includes(tag)

          let className = ''
          highlightedIndex === index && (className += ' highlighted')
          isSelected && (className += ' selected')

          return (
            <button
              key={tag}
              {...className && { className }}
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
      {!!tags.length && (
        <div
          css={css`
            position: absolute;
            right: 0;
            top: 0;
          `}
        >
          <button
            aria-label='Clear All Filters'
            css={css`
              color: var(--brand500);
              font-size: 0.875rem;
              font-weight: 600;
              line-height: 1.5rem;

              &:hover {
                text-decoration: underline;
              }
            `}
            onClick={() => queryDispatch({ tags: [] })}
            type='button'
          >
            Clear All
          </button>
        </div>
      )}
    </details>
  )
}

TagFilter.propTypes = {
  aggregatedTags: PropTypes.arrayOf(PropTypes.array).isRequired
}
