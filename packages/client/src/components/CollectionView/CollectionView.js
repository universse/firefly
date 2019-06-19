import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import CollectionDetails from './CollectionDetails'
// import CollectionActions from './CollectionActions'
import LearningList from './LearningList'
import { ProgressBar } from 'components/common'
import { LatestActivityContext } from 'contexts/LatestActivity'
import { MediaContext } from 'contexts/Media'
import { mobileProgressBarHeight, screens } from 'constants/Styles'
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

  const completedCount =
    check &&
    urls.reduce((total, current) => (check[current.id] ? total + 1 : total), 0)

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
        css={css`
          background-color: var(--colors-gray100);
        `}
      >
        <div
          className='base'
          css={css`
            max-width: 50rem;

            ${screens.mobile} {
              padding: 0;
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
        </div>
      </div>
      <div>
        <div
          className='base'
          css={css`
            max-width: 50rem;

            ${screens.mobile} {
              padding: 0;
            }
          `}
        >
          <div
            css={css`
              background-color: #fff;

              ${screens.nonMobile} {
                border-radius: 8px;
              }
            `}
          >
            <LearningList check={check} collectionId={id} urls={urls} />
          </div>
        </div>
      </div>
      <div
        css={css`
          background-color: #fff;
          border-top: 1px solid var(--colors-gray200);
          bottom: 0;
          height: ${mobileProgressBarHeight}rem;
          left: 0;
          padding: 0.5rem 0;
          position: fixed;
          width: 100%;
          z-index: 1;
        `}
      >
        <div
          className='base'
          css={css`
            align-items: center;
            display: flex;
            justify-content: space-between;
            max-width: 50rem;

            ${screens.desktop} {
              padding: 0 5rem;
            }
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

              ${screens.desktop} {
                width: 6rem;
              }
            `}
          >
            <span
              css={css`
                color: var(--colors-gray800);
                font-size: 0.875rem;
                font-weight: 500;
                line-height: 1.25rem;
              `}
            >
              {completedCount} of {itemCount}
              {isDesktop && ' items'}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

CollectionView.propTypes = {
  check: PropTypes.objectOf(PropTypes.bool).isRequired,
  collection: CollectionViewType.isRequired,
  isLoved: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired
}
