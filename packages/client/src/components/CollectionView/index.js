import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import localforage from 'localforage'

import CollectionDetails from './CollectionDetails'
import CollectionActions from './CollectionActions'
import LearningList from './LearningList'
import useSavedCollections from 'hooks/useSavedCollections'
import LocalStorage from 'constants/LocalStorage'

// TODO: add helmet
// suggestion component

export default function CollectionView ({
  collection: { urls, ...collection }
}) {
  // const handleHeartClick = () => (user ? handleModalOpen() : handleModalOpen())
  const [savedCollections, dispatch] = useSavedCollections()
  const [completedItems, setCompletedItems] = useState()

  const save = () => {
    localforage.setItem(LocalStorage.COMPLETED_ITEMS, completedItems)
  }

  useEffect(() => {
    localforage
      .getItem(LocalStorage.COMPLETED_ITEMS)
      .then(value => (value ? setCompletedItems(value) : setCompletedItems({})))
  }, [])

  useEffect(() => {
    window.addEventListener('beforeunload', save)
    return () => {
      save()
      window.removeEventListener('beforeunload', save)
    }
  }, [completedItems])

  const numOfCompleted =
    completedItems &&
    urls.reduce(
      (total, current) => (completedItems[current.id] ? total + 1 : total),
      0
    )

  const onSaveClick = e =>
    dispatch({
      type: 'saveClick',
      payload: collection
    })

  const onCheckClick = e => {
    const id = e.currentTarget.value

    if (completedItems[id]) {
      const newState = { ...completedItems }
      delete newState[id]
      setCompletedItems(newState)
    } else {
      setCompletedItems({ ...completedItems, [id]: true })
    }
  }

  return savedCollections && completedItems ? (
    <>
      <div
        css={css`
          background-color: #fff;
          border-radius: 8px;
          margin-bottom: 2rem;
        `}
      >
        <CollectionDetails
          category={collection.category}
          level={collection.level}
          name={collection.name}
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
            numOfCompleted={numOfCompleted}
          />
        </div>
      </div>
      <div
        css={theme => css`
          background-color: #fff;
          border-radius: 8px;
          box-shadow: ${theme.shadows.subtle};
        `}
      >
        <LearningList
          completedItems={completedItems}
          onCheckClick={onCheckClick}
          urls={urls}
        />
      </div>
    </>
  ) : null
}
