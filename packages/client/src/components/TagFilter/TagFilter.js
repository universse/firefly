import React, { useContext, useCallback } from 'react'
import { css } from '@emotion/core'
import { navigate } from 'gatsby'

import { URLUtilsContext } from 'contexts/URLUtils'
import { Title } from 'components/common'
import { ClearFilterButton, Count, MobileTag, Tag } from './styled'

export default function TagFilter ({ aggregatedTags, sort, tags }) {
  const { constructUrl, onQueryClick, updateQuery } = useContext(
    URLUtilsContext
  )

  const handleClearFilterClick = useCallback(() => onQueryClick({ tag: '' }), [
    onQueryClick
  ])

  return (
    <div
      css={theme => css`
        margin-bottom: 2rem;
      `}
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
                isActive={tags.includes(tag)}
                onClick={e => {
                  e.preventDefault()
                  updateQuery(updatedTags)
                  navigate(href)
                }}
                href={href}
              >
                {tag}
              </Tag>
              <Count isActive={tags.includes(tag)}>{count}</Count>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function MobileTagFilter ({ aggregatedTags, sort, tags }) {
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
            color: ${theme.colors.gray700};
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
                isActive={tags.includes(tag)}
                onClick={e => {
                  e.preventDefault()
                  updateQuery(updatedTags)
                  navigate(href)
                }}
                href={href}
              >
                {tag}
                <Count isActive={tags.includes(tag)}>{count}</Count>
              </MobileTag>
            </li>
          )
        })}
      </ul>
    </>
  )
}
