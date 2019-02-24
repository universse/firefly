import React from 'react'
import { css } from '@emotion/core'
import { Location } from '@reach/router'

import { Heart, Save, Share } from '../../icons'
import { ProgressBar } from './styled'
import { ActionBar, IconButton } from 'components/common'
import copyToClipboard from 'utils/copyToClipboard'

function CollectionActions ({
  id,
  isSaved,
  handleSaveClick,
  location: { href },
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
        <ProgressBar
          percentage={(numOfCompleted / numOfItems) * 100}
          width='15rem'
        />
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
      <ActionBar>
        <IconButton
          aria-label='Save to My Library'
          onClick={handleSaveClick}
          value={id}
        >
          <Save filled={isSaved} />
        </IconButton>
        <IconButton aria-label='Share' onClick={() => copyToClipboard(href)}>
          <Share />
        </IconButton>
        {/* FLAG
            <IconButton
          aria-label='Love'
          // onClick={handleHeartClick}
        >
          <Heart />
        </IconButton> */}
      </ActionBar>
    </div>
  )
}

export default function WithLocation (props) {
  return (
    <Location>
      {({ location }) => <CollectionActions location={location} {...props} />}
    </Location>
  )
}
