import React from 'react'
import { css } from '@emotion/core'
import { Location } from '@reach/router'

import { Heart, Save, Share } from '../../icons'
import { ProgressBar } from './styled'
import { IconButton } from 'components/common'
import { copyToClipboard } from './utils'

export default function CollectionActions ({
  id,
  isSaved,
  handleSaveClick,
  numOfItems,
  numOfCompleted
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
        <ProgressBar percentage={(numOfCompleted / numOfItems) * 100} />
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
            {numOfCompleted} of {numOfItems} items completed
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
        <Location>
          {({ location }) => (
            <IconButton
              aria-label='Share'
              onClick={() => copyToClipboard(location.href)}
            >
              <Share />
            </IconButton>
          )}
        </Location>
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
