import React, { useCallback, useContext } from 'react'
import { css } from '@emotion/core'

// import ShareDropdown from 'components/ShareDropdown'
import { ActionBar, IconButton, ProgressBar } from 'components/common'
import { LovedCollectionsContext } from 'contexts/LovedCollections'
import { SavedCollectionsContext } from 'contexts/SavedCollections'
import { Heart, Save } from 'icons'
import {
  createLoveCollectionLabel,
  createSaveCollectionLabel
} from 'utils/ariaLabelUtils'

export default function CollectionActions ({
  id,
  isLoved,
  isSaved,
  name,
  numOfItems,
  numOfCompleted
}) {
  const [, onSaveClick] = useContext(SavedCollectionsContext)
  const [, onLoveClick] = useContext(LovedCollectionsContext)

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
          aria-label={createSaveCollectionLabel(name)}
          onClick={onSaveClick}
          value={id}
        >
          <Save filled={isSaved} />
        </IconButton>
        {/* <ShareDropdown name={name} /> */}
        {/* <IconButton
          aria-label={createLoveCollectionLabel(name)}
          onClick={onLoveClick}
          value={id}
        >
          <Heart filled={isLoved} />
        </IconButton> */}
      </ActionBar>
    </div>
  )
}
