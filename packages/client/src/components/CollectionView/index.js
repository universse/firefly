import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import localforage from 'localforage'

import CollectionDetails from './CollectionDetails'
import CollectionActions from './CollectionActions'
import LearningList from './LearningList'
import LocalStorage from 'constants/LocalStorage'

// TODO:
// suggestion component

export default function CollectionView ({
  collection: { id, category, level, name, tags, urls },
  onSaveClick,
  savedCollections
}) {
  // const handleHeartClick = () => (user ? handleModalOpen() : handleModalOpen())
  const [completedItems, setCompletedItems] = useState()

  useEffect(() => {
    localforage
      .getItem(LocalStorage.COMPLETED_ITEMS)
      .then(value => (value ? setCompletedItems(value) : setCompletedItems({})))
  }, [])

  const save = () => {
    localforage.setItem(LocalStorage.COMPLETED_ITEMS, completedItems)
  }

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

  return completedItems ? (
    <>
      <div
        css={theme => css`
          background-color: #fff;
          margin-bottom: 1rem;

          ${theme.screens.nonMobile} {
            border-radius: 8px;
            box-shadow: ${theme.shadows.subtle};
            margin-bottom: 2rem;
          }
        `}
      >
        <CollectionDetails
          id={id}
          category={category}
          level={level}
          name={name}
          tags={tags}
        />
        <div
          css={theme => css`
            margin: 0 4rem;

            ${theme.screens.mobile} {
              display: none;
            }
          `}
        >
          <CollectionActions
            id={id}
            isSaved={!!savedCollections[id]}
            handleSaveClick={onSaveClick}
            numOfItems={urls.length}
            numOfCompleted={numOfCompleted}
          />
        </div>
      </div>
      <div
        css={theme => css`
          background-color: #fff;

          ${theme.screens.nonMobile} {
            border-radius: 8px;
            box-shadow: ${theme.shadows.subtle};
          }
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
