import React, { useEffect, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import CollectionDetails from './CollectionDetails'
import CollectionActions from './CollectionActions'
import LearningList from './LearningList'
import { ProgressBar } from 'components/common'
import { LatestActivityContext } from 'contexts/LatestActivity'
import { MediaContext } from 'contexts/Media'
import { CollectionViewType } from 'constants/Types'

// TODO:
// suggestion component

export default function CollectionView ({
  check,
  collection: { id, category, level, name, tags, urls },
  isLoved,
  isSaved
}) {
  const isDesktop = useContext(MediaContext)
  const itemCount = urls.length

  const completedCount = useMemo(
    () =>
      check &&
      urls.reduce(
        (total, current) => (check[current.id] ? total + 1 : total),
        0
      ),
    [check, urls]
  )

  const { setLatestActivity } = useContext(LatestActivityContext)

  useEffect(() => {
    isSaved &&
      setLatestActivity({
        id,
        name,
        percentage: (completedCount / itemCount) * 100
      })
  }, [id, isSaved, name, completedCount, itemCount, setLatestActivity])

  return (
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
          category={category}
          id={id}
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
              completedCount={completedCount}
              id={id}
              isLoved={isLoved}
              isSaved={isSaved}
              itemCount={itemCount}
              name={name}
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
        <LearningList check={check} collectionId={id} urls={urls} />
      </div>
      {!isDesktop && (
        <div
          css={theme => css`
            align-items: center;
            background-color: ${theme.colors.white900};
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
            <ProgressBar percentage={(completedCount / itemCount) * 100} />
          </div>
          <div
            css={css`
              text-align: right;
              width: 3.5rem;
            `}
          >
            <span
              css={theme => css`
                color: ${theme.colors.gray800};
                font-size: 0.875rem;
                font-weight: 500;
                line-height: 1.25rem;
              `}
            >
              {completedCount} of {itemCount}
            </span>
          </div>
        </div>
      )}
    </>
  )
}

CollectionView.propTypes = {
  check: PropTypes.objectOf(PropTypes.bool).isRequired,
  isLoved: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
  collection: CollectionViewType
}
