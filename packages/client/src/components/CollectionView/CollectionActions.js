import React, { useCallback, useContext } from 'react'
import { css } from '@emotion/core'

// import ShareDropdown from 'components/ShareDropdown'
import { ActionBar, IconButton, ProgressBar } from 'components/common'
import { UserDataDispatchContext } from 'contexts/UserDataDispatch'
import { Heart, Save } from 'icons'
import { createActionLabel } from 'utils/ariaLabelUtils'

export default function CollectionActions ({
  id,
  isLoved,
  isSaved,
  name,
  itemCount,
  completedCount
}) {
  const onClick = useContext(UserDataDispatchContext)

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
          percentage={(completedCount / itemCount) * 100}
          width='15rem'
        />
        <div
          css={css`
            margin-left: 1rem;
          `}
        >
          <span
            css={theme => css`
              color: ${theme.colors.gray800};
              font-size: 0.875rem;
              font-weight: 600;
              line-height: 1.25rem;
            `}
          >
            {completedCount} of {itemCount} items completed
          </span>
        </div>
      </div>
      <ActionBar>
        <IconButton
          aria-label={createActionLabel(isSaved ? 'unsave' : 'save', name)}
          onClick={onClick}
          value={id}
        >
          <Save filled={isSaved} />
        </IconButton>
        {/* <ShareDropdown name={name} /> */}
        {/* <IconButton
          aria-label={createActionLabel(isLoved ? 'unlove' : 'love', name)}
          onClick={onClick}
          value={id}
        >
          <Heart filled={isLoved} />
        </IconButton> */}
      </ActionBar>
    </div>
  )
}
