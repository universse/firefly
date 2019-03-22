import React, { useContext, useCallback } from 'react'
import { css } from '@emotion/core'
import { navigate } from 'gatsby'

import { URLUtilsContext } from 'contexts/URLUtils'
import { Title } from 'components/common'
import { ClearFilterButton, Count, Tag } from './styled'

export default function TagFilter ({ aggregatedTags, sort, tags }) {
  const { constructUrl, onQueryClick, updateQuery } = useContext(
    URLUtilsContext
  )

  const handleClearFilterClick = useCallback(() => onQueryClick({ tag: '' }), [
    onQueryClick
  ])

  return (
    <div
    // css={theme => css`
    //   margin-bottom: 2rem;
    // `}
    >
      <div
        css={css`
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        `}
      >
        <Title>TAGS</Title>
        <ClearFilterButton
          aria-label='Reset Filters'
          onClick={handleClearFilterClick}
        >
          clear
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
                display: flex;
                justify-content: space-between;
                margin: 0.375rem 0 0.375rem calc(1rem + 4px);
              `}
            >
              <Tag
                href={href}
                isActive={isActive}
                onClick={e => {
                  e.preventDefault()
                  updateQuery(updatedTags)
                  navigate(href)
                }}
              >
                {tag}
              </Tag>
              <Count isActive={isActive}>{count}</Count>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
