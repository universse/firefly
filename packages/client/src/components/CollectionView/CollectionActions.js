import React from 'react'
import { css } from '@emotion/core'

import { IconButton, ProgressBar } from './styled'
import { Heart, Save, Share } from '../../icons'

export default function CollectionActions ({
  id,
  isSaved,
  handleSaveClick,
  numOfItems
}) {
  return (
    <div
      css={theme => css`
        align-items: center;
        border-top: 1px solid ${theme.colors.gray400};
        display: flex;
        height: 4rem;
        justify-content: space-between;
      `}
    >
      <div
        css={css`
          align-items: center;
          display: flex;
          justify-content: space-between;
        `}
      >
        <ProgressBar percentage={50} />
        <div
          css={css`
            margin-left: 1rem;
          `}
        >
          <span
            css={theme => css`
              color: ${theme.colors.gray700};
              font-size: 0.875rem;
              font-weight: 600;
              line-height: 1.25rem;
            `}
          >
            0 of {numOfItems} items completed
          </span>
        </div>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          margin-right: -0.5rem;
          width: 5.5rem;
        `}
      >
        <IconButton aria-label='Share' onClick={() => console.log()}>
          <Share />
        </IconButton>
        <IconButton
          aria-label='Save to My Library'
          onClick={handleSaveClick}
          value={id}
        >
          <Save filled={isSaved} />
        </IconButton>
        {/* FLAG
            <IconButton
          aria-label='Love'
          // onClick={handleHeartClick}
        >
          <Heart />
        </IconButton> */}
      </div>
    </div>
  )
}
