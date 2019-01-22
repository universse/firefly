import React from 'react'
import { css } from '@emotion/core'

import { Tag } from './styled'

export default function Tags ({ tags }) {
  return (
    <ul
      css={css`
        display: flex;
      `}
    >
      {tags.map(tag => (
        <li
          key={tag}
          css={css`
            margin-right: 0.25rem;
          `}
        >
          <Tag to='/'>{tag}</Tag>
        </li>
      ))}
    </ul>
  )
}
