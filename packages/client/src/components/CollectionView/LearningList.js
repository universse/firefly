import React from 'react'
import { css } from '@emotion/core'

import { LearningItem } from './styled'

export default function LearningList ({ urls }) {
  return (
    <ul
      css={css`
        li:last-child div {
          border: none;
        }
      `}
    >
      {urls.map(({ id, ...url }) => (
        <li
          css={css`
            position: relative;
          `}
          key={id}
        >
          <LearningItem {...url} />
        </li>
      ))}
    </ul>
  )
}
