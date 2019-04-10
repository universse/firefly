import React, { useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { URLParamsContext } from 'contexts/URLParams'
import { ClearFilterButton, Count, MobileTag } from './styled'
import { logClickTagFilter } from 'utils/amplitudeUtils'

export default function MobileTagFilter ({ aggregatedTags, tags }) {
  const { constructUrl, onQueryClick, updateQuery } = useContext(
    URLParamsContext
  )

  const handleClearFilterClick = useCallback(() => onQueryClick({ tag: '' }), [
    onQueryClick
  ])

  return (
    <>
      <div
        css={css`
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        `}
      >
        <h4
          css={theme => css`
            color: ${theme.colors.gray800};
            font-size: 0.875rem;
            font-weight: 700;
            line-height: 1.25rem;
            text-transform: uppercase;
          `}
        >
          Filter by Tags
        </h4>
        <ClearFilterButton
          aria-label='Reset Filters'
          onClick={handleClearFilterClick}
        >
          CLEAR
        </ClearFilterButton>
      </div>
      <ul>
        {aggregatedTags.map(([tag, count]) => {
          const { href, updatedTags } = constructUrl(tag)
          const isActive = tags.includes(tag)

          return (
            <li
              key={tag}
              css={css`
                align-items: center;
                display: flex;
                margin-bottom: 0.75rem;
              `}
            >
              <MobileTag
                href={href}
                isActive={isActive}
                onClick={e => {
                  e.preventDefault()
                  updateQuery(updatedTags)
                  window.history.pushState({}, '', href)
                  logClickTagFilter({ tag, updatedTags })
                }}
              >
                {tag}
                <Count isActive={isActive}>{count}</Count>
              </MobileTag>
            </li>
          )
        })}
      </ul>
    </>
  )
}

MobileTagFilter.propTypes = {
  aggregatedTags: PropTypes.arrayOf(PropTypes.array).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
}
