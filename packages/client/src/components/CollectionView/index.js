import React, { useContext } from 'react'
import { css } from '@emotion/core'

import CollectionDetails from './CollectionDetails'
import CollectionActions from './CollectionActions'
import LearningList from './LearningList'
import useSavedCollections from 'hooks/useSavedCollections'

// TODO: add helmet
// suggestion component

export default function CollectionView ({
  collection: { urls, ...collection }
}) {
  // const handleHeartClick = () => (user ? handleModalOpen() : handleModalOpen())
  const [savedCollections, dispatch] = useSavedCollections()

  const onSaveClick = e =>
    dispatch({
      type: 'saveClick',
      payload: collection
    })

  return savedCollections ? (
    <>
      <div
        css={css`
          background-color: #fff;
          border-radius: 8px;
          margin-bottom: 2rem;
        `}
      >
        <CollectionDetails
          name={collection.name}
          level={collection.level}
          tags={collection.tags}
        />
        <div
          css={css`
            padding: 0 4rem;
          `}
        >
          <CollectionActions
            isSaved={!!savedCollections[collection.id]}
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
  ) : null
}
