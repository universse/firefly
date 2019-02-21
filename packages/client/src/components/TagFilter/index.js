import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { Title } from 'components/common'
import { Count, Tag } from './styled'
import { URLUtilsContext } from 'pages'

export default function CategoryFilter ({ aggregatedTags, tags }) {
  const { updateQuery, constructUrl, onTagResetClick } = useContext(
    URLUtilsContext
  )

  return (
    <div
      css={theme => css`
        margin-bottom: 2rem;

        ${theme.screens.nonDesktop} {
          display: none;
        }
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
          css={theme => css`
            color: ${theme.colors.gray500};
            font-size: 0.875rem;
          `}
          onClick={onTagResetClick}
        >
          reset
        </button>
      </div>
      <ul>
        {aggregatedTags.map(([tag, count]) => (
          <li
            key={tag}
            css={css`
              align-items: center;
              display: flex;
              height: 1.5rem;
              justify-content: space-between;
              margin: 0.375rem 0 0.375rem calc(1rem + 4px);
            `}
          >
            <Tag
              isActive={tags.includes(tag)}
              onClick={e => {
                e.preventDefault()
                updateQuery(tag)
              }}
              href={constructUrl(tag).href}
            >
              {tag}
            </Tag>
            <Count isActive={tags.includes(tag)}>{count}</Count>
          </li>
        ))}
      </ul>
    </div>
  )
}
