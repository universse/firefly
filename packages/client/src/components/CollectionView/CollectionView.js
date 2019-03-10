import React, { useContext } from 'react'
import { css } from '@emotion/core'

import CollectionDetails from './CollectionDetails'
import CollectionActions from './CollectionActions'
import LearningList from './LearningList'
import { ProgressBar } from './styled'
import { MediaContext } from 'contexts/Media'
import useLocalForage from 'hooks/useLocalForage'
import useSavedItemsReducer from 'hooks/useSavedItemsReducer'
import LocalStorage from 'constants/LocalStorage'

// TODO:
// suggestion component

export default function CollectionView ({
  collection: { id, category, level, name, tags, urls },
  onSaveClick,
  savedCollections
}) {
  // const handleHeartClick = () => (user ? handleModalOpen() : handleModalOpen())

  const [completedItems, onCheckClick] = useSavedItemsReducer(
    LocalStorage.COMPLETED_ITEMS
  )

  useLocalForage(LocalStorage.COMPLETED_ITEMS, completedItems)

  const isDesktop = useContext(MediaContext)

  const numOfItems = urls.length

  const numOfCompleted =
    completedItems &&
    urls.reduce(
      (total, current) => (completedItems[current.id] ? total + 1 : total),
      0
    )

  return completedItems ? (
    <>
      <div
        css={theme => css`
          background-color: #fff;
          margin-bottom: 1rem;

          ${theme.screens.nonMobile} {
            border-radius: 8px;
            box-shadow: ${theme.shadows[0]};
            margin-bottom: 2rem;
          }

          ${theme.screens.tablet} {
            margin-bottom: 1rem;
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
        {isDesktop && (
          <div
            css={css`
              margin: 0 4rem;
            `}
          >
            <CollectionActions
              id={id}
              isSaved={!!savedCollections[id]}
              handleSaveClick={onSaveClick}
              numOfItems={numOfItems}
              numOfCompleted={numOfCompleted}
            />
          </div>
        )}
      </div>
      <div
        css={theme => css`
          background-color: #fff;

          ${theme.screens.nonMobile} {
            border-radius: 8px;
            box-shadow: ${theme.shadows[0]};
          }
        `}
      >
        <LearningList
          completedItems={completedItems}
          onCheckClick={onCheckClick}
          urls={urls}
        />
      </div>
      {!isDesktop && (
        <div
          css={theme => css`
            align-items: center;
            background-color: ${theme.colors.white};
            bottom: 0;
            display: flex;
            justify-content: space-between;
            left: 0;
            padding: 0.5rem 1rem;
            position: fixed;
            width: 100%;
          `}
        >
          <div
            css={css`
              flex: 1 0 auto;
            `}
          >
            <ProgressBar percentage={(numOfCompleted / numOfItems) * 100} />
          </div>
          <div
            css={css`
              text-align: right;
              width: 3.5rem;
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
              {numOfCompleted} of {numOfItems}
            </span>
          </div>
        </div>
      )}
    </>
  ) : null
}