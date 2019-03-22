import React, { useRef, useCallback, useContext } from 'react'
import { css } from '@emotion/core'

import { ActionBar, IconButton } from 'components/common'
import { ModalContext } from 'contexts/Modal'
import { ProgressBar } from './styled'
import { Heart, Save, Share } from 'icons'
import ModalTypes from 'constants/ModalTypes'
import copyToClipboard from 'utils/copyToClipboard'
import withLocation from 'utils/withLocation'

function CollectionActions ({
  id,
  isSaved,
  handleSaveClick,
  location: { href },
  numOfItems,
  numOfCompleted
}) {
  const { openModal } = useContext(ModalContext)
  const shareButton = useRef()

  const handleShareClick = useCallback(
    () => {
      copyToClipboard(href)
      shareButton.current.focus()
    },
    [href]
  )

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
              color: ${theme.colors.gray800};
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
        <IconButton
          ref={shareButton}
          aria-label='Share'
          onClick={handleShareClick}
        >
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

export default withLocation(CollectionActions)
