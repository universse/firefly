import React from 'react'
import { css } from '@emotion/core'

import LearningItem from './LearningItem'

export default function LearningList ({ completedItems, onCheckClick, urls }) {
  return (
    <ul
      css={css`
        li:last-child div {
          border: none;
        }
      `}
    >
      {urls.map(url => (
        <li
          css={css`
            position: relative;
          `}
          key={url.id}
        >
          <LearningItem
            {...url}
            checked={!!completedItems[url.id]}
            handleCheckClick={onCheckClick}
          />
        </li>
      ))}
    </ul>
  )
}
