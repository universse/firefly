import React, { useContext } from 'react'
import { css } from '@emotion/core'
import { navigate } from 'gatsby'

import { Title } from 'components/common'
import { Count, MobileTag, Tag } from './styled'
import { URLUtilsContext } from 'pages'

export default function TagFilter ({ aggregatedTags, sort, tags }) {
  const { updateQuery, constructUrl, onTagClearClick } = useContext(
    URLUtilsContext
  )

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
        <button
          aria-label='Reset Filters'
          css={theme => css`
            color: ${theme.colors.gray700};
            font-size: 0.875rem;
          `}
          onClick={onTagClearClick}
          type='button'
        >
          clear
        </button>
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
  const { updateQuery, constructUrl, onTagClearClick } = useContext(
    URLUtilsContext
  )

  return (
    <>
      <div
        css={css`
          margin-bottom: 1rem;
        `}
      >
        <h4
          css={theme => css`
            color: ${theme.colors.gray700};
            font-size: 1.125rem;
            font-weight: 700;
            line-height: 1.5rem;
          `}
        >
          Filter by Tags
        </h4>
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
