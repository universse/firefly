import React, { useContext, useCallback } from 'react'
import { css } from '@emotion/core'
import { navigate } from 'gatsby'

import { URLUtilsContext } from 'contexts/URLUtils'
import { ClearFilterButton, Count, MobileTag } from './styled'

export default function MobileTagFilter ({ aggregatedTags, sort, tags }) {
  const { constructUrl, onQueryClick, updateQuery } = useContext(
    URLUtilsContext
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
                  navigate(href)
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
