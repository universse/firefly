import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { URLParamsContext } from 'contexts/URLParams'
import Icon from 'assets/icons'
import useListBox from 'hooks/useListBox'
import AriaLabels from 'constants/AriaLabels'
import { logClickTagFilter } from 'utils/amplitude'

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
    getItemProps
  } = useListBox({ onSelect })

  return (
    <details className='ListBox' open {...detailsProps}>
      <summary aria-label={AriaLabels.FILTER_BY_TAGS} {...summaryProps}>
        {AriaLabels.FILTER_BY_TAGS}
        <div
          css={css`
            color: var(--gray600);
            margin-left: 0.5rem;
          `}
        >
          <Icon icon='tag' size='medium' />
        </div>
      </summary>
      <div
        {...getMenuProps({
          'aria-label': AriaLabels.FILTER_BY_TAGS,
          'aria-orientation': 'horizontal'
        })}
      >
        {aggregatedTags.map(([tag, count], index) => {
          const isSelected = tags.includes(tag)

          let className = 'Chip'
          highlightedIndex === index && (className += ' highlighted')
          isSelected && (className += ' selected')

          return (
            <button
              key={tag}
              {...className && { className }}
              {...getItemProps({
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
      </div>
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
            className='TextButton'
            onClick={() => queryDispatch({ tags: [] })}
            style={{
              color: 'var(--brand500)'
            }}
            type='button'
          >
            clear all
          </button>
        </div>
      )}
    </details>
  )
}

TagFilter.propTypes = {
  aggregatedTags: PropTypes.arrayOf(PropTypes.array).isRequired
}
