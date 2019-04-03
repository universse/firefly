import React, { memo } from 'react'
import { css } from '@emotion/core'

import LearningItem from './LearningItem'

function LearningList ({ check, onCheckClick, urls }) {
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
          key={url.id}
          css={css`
            position: relative;
          `}
        >
          <LearningItem
            {...url}
            checked={!!check[url.id]}
            handleCheckClick={onCheckClick}
          />
        </li>
      ))}
    </ul>
  )
}

export default memo(LearningList)
