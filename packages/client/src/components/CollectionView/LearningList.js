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
            handleCheckClick={onCheckClick}
            isChecked={!!check[url.id]}
          />
        </li>
      ))}
    </ul>
  )
}

export default memo(LearningList)
