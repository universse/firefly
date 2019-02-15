import React, { useContext } from 'react'
import { css } from '@emotion/core'

export default function CategoryFilter ({ aggregatedTags }) {
  return (
    <ul
      css={theme => css`
        ${theme.screens.nonDesktop} {
          display: none;
        }
      `}
    >
      {Object.entries(aggregatedTags).map(([tag, count]) => (
        <li key={tag}>
          {tag} - {count}
        </li>
      ))}
    </ul>
  )
}
