import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import Details from './Details'
import DetailsModal from './DetailsModal'
import LearningItem from './LearningItem'
import { CollectionTitle } from './styled'
import { ProgressBar } from 'components/common'
import { LatestActivityContext } from 'contexts/LatestActivity'
import { MediaContext } from 'contexts/Media'
import {
  bottomBarHeightInRem,
  headerHeightInRem,
  screens
} from 'constants/Styles'
import { CollectionViewType } from 'constants/Types'

// TODO:
// suggestion component
export default function CollectionView ({
  check,
  collection: { id, category, level, name, tags, urls },
  isSaved
}) {
  const { isDesktop } = useContext(MediaContext)
  const itemCount = urls.length

  const completedCount =
    check &&
    urls.reduce((total, current) => (check[current.id] ? total + 1 : total), 0)

  const percentage = (completedCount / itemCount) * 100

  const { setLatestActivity } = useContext(LatestActivityContext)

  useEffect(() => {
    isSaved &&
      setLatestActivity({
        id,
        name,
        percentage
      })
  }, [id, isSaved, name, percentage, setLatestActivity])

  return (
    <>
      {isDesktop === false && (
        <DetailsModal
          category={category}
          level={level}
          name={name}
          tags={tags}
        />
      )}
      <div
        css={css`
          grid-area: title;

          ${screens.mobile} {
            margin: 0 1rem;
          }
        `}
      >
        <CollectionTitle>{name}</CollectionTitle>
      </div>
      {isDesktop && (
        <div
          css={css`
            align-self: start;
            grid-area: sidebar;
            position: sticky;
            top: ${headerHeightInRem + 1}rem;
          `}
        >
          <Details
            category={category}
            level={level}
            percentage={percentage}
            tags={tags}
          />
        </div>
      )}
      <main
        css={css`
          display: contents;
        `}
        id='main'
      >
        <ul className='LearningList'>
          {urls.map(url => (
            <li key={url.id}>
              <LearningItem
                collectionId={id}
                isChecked={!!check[url.id]}
                {...url}
              />
            </li>
          ))}
        </ul>
      </main>
      {isDesktop === false && (
        <div
          css={css`
            align-items: center;
            background-color: var(--white900);
            bottom: ${bottomBarHeightInRem}rem;
            display: flex;
            justify-content: space-between;
            left: 0;
            padding: 0.5rem 1rem;
            position: fixed;
            width: 100%;
            z-index: 1;
          `}
        >
          <div
            css={css`
              flex: 1 0 auto;
            `}
          >
            <ProgressBar percentage={percentage} />
          </div>
          <div
            css={css`
              text-align: right;
              width: 4rem;
            `}
          >
            <span
              css={css`
                color: var(--colors-gray800);
                font-size: 0.875rem;
                font-variant-numeric: tabular-nums;
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
  collection: CollectionViewType.isRequired,
  isSaved: PropTypes.bool.isRequired
}
