import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import Details from './Details'
import LearningItem from './LearningItem'
import ShareWidget from './ShareWidget'
import { CollectionTitle } from './styled'
import { LatestActivityContext } from 'contexts/LatestActivity'
// import { MediaContext } from 'contexts/Media'
import { headerHeightInRem, screens } from 'constants/Styles'
import { CollectionViewType } from 'constants/Types'

// TODO:
// suggestion component
export default function View ({
  check,
  collection: { id, category, level, name, tags, urls },
  isLoved,
  isSaved
}) {
  // const isDesktop = useContext(MediaContext)
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
          grid-area: title;
        `}
      >
        <CollectionTitle>{name}</CollectionTitle>
      </div>
      <div
        css={css`
          align-self: start;
          border: 1px solid var(--black300);
          border-radius: 4px;
          grid-area: sidebar;
          padding: 1rem;
          position: sticky;
          top: ${headerHeightInRem + 2}rem;
        `}
      >
        <Details
          category={category}
          id={id}
          level={level}
          name={name}
          percentage={(completedCount / itemCount) * 100}
          tags={tags}
        />
      </div>
      <aside
        css={css`
          align-self: start;
          grid-area: widget;
          position: sticky;
          top: ${headerHeightInRem + 2}rem;
        `}
      >
        <ShareWidget id={id} isLoved={isLoved} isSaved={isSaved} name={name} />
      </aside>
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
      {/* <div
        css={css`
          background-color: var(--gray100);
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
      <div
        css={css`
          background-color: #fff;
          border-top: 1px solid var(--gray200);
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
                color: var(--black800);
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
      </div> */}
    </>
  )
}

View.propTypes = {
  check: PropTypes.objectOf(PropTypes.bool).isRequired,
  collection: CollectionViewType.isRequired,
  isLoved: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired
}
