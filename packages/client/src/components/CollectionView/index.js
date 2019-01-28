import React from 'react'
import { css } from '@emotion/core'

import CollectionDetails from './CollectionDetails'
import CollectionActions from './CollectionActions'
import LearningList from './LearningList'
import useSavedCollection from 'hooks/useSavedCollection'

// TODO: add helmet
// suggestion component

export default function CollectionView ({
  collection: { id, name, category, level, tags, urls }
}) {
  // const handleHeartClick = () => (user ? handleModalOpen() : handleModalOpen())
  const [isLoading, isSaved, onSaveClick] = useSavedCollection({
    id,
    name,
    category,
    level,
    tags
  })

  return (
    !isLoading && (
      <>
        <div
          css={css`
            background-color: #fff;
            border-radius: 8px;
            margin-bottom: 2rem;
          `}
        >
          <CollectionDetails name={name} level={level} tags={tags} />
          <div
            css={css`
              padding: 0 4rem;
            `}
          >
            <CollectionActions
              isSaved={isSaved}
              handleSaveClick={onSaveClick}
              numOfItems={urls.length}
            />
          </div>
        </div>
        <div
          css={css`
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          `}
        >
          <LearningList urls={urls} />
        </div>
      </>
    )
  )
}
