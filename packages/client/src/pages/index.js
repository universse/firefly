import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Collections from 'components/Collections'
import MobileFilters from 'components/MobileFilters'
import SortByDifficulty from 'components/SortByDifficulty'
import { Cross, Search } from 'icons'
import { URLParamsContext } from 'contexts/URLParams'
import { MediaContext } from 'contexts/Media'
import AriaLabels from 'constants/AriaLabels'
import { CollectionIdsType } from 'constants/Types'
import { screens } from 'constants/Styles'
import getSearchWorker from 'utils/getSearchWorker'

export default function IndexPage ({ data }) {
  const isDesktop = useContext(MediaContext)
  const {
    query: { sort, tags }
  } = useContext(URLParamsContext)

  const [collectionIds, setCollectionIds] = useState([])
  const [aggregatedTags, setAggregatedTags] = useState([])

  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    let isFresh = true

    getSearchWorker()
      .search(searchInput, data.allCollectionIds.nodes, sort, tags)
      .then(({ aggregatedTags, collectionIds }) => {
        if (isFresh) {
          setAggregatedTags(aggregatedTags)
          setCollectionIds(collectionIds)
        }
      })

    return () => (isFresh = false)
  }, [data, searchInput, sort, tags])

  return (
    <>
      {!isDesktop && <MobileFilters aggregatedTags={aggregatedTags} />}
      <div
        css={css`
          height: 100%;
          width: 100%;
          position: relative;

          ${screens.desktop} {
            width: 70%;
          }
        `}
      >
        {isDesktop && (
          <div>
            <div
              css={css`
                align-items: center;
                color: var(--colors-gray600);
                display: flex;
                height: 3rem;
                left: 1rem;
                position: absolute;
                z-index: 2;
              `}
            >
              <Search />
            </div>
            <input
              aria-label={AriaLabels.SEARCH_BAR_LABEL}
              autoComplete='off'
              css={css`
                border-radius: 1.5rem;
                box-shadow: var(--shadows-02);
                color: var(--colors-gray900);
                font-size: 1rem;
                height: 3rem;
                padding-left: 3.25rem;
                width: 100%;
              `}
              onChange={e => setSearchInput(e.target.value)}
              placeholder={AriaLabels.SEARCH_BAR_LABEL}
              type='text'
              value={searchInput}
            />
            {searchInput && (
              <div
                css={css`
                  position: absolute;

                  right: 0.5rem;
                  top: 0;
                `}
              >
                <button
                  aria-label='Clear Search Field'
                  className='IconButton'
                  onClick={() => setSearchInput('')}
                  type='button'
                >
                  <Cross small />
                </button>
              </div>
            )}
            <div
              css={css`
                align-items: center;
                display: flex;
                justify-content: flex-end;
                margin: 2rem 0 1rem;
              `}
            >
              <SortByDifficulty sort={sort} />
            </div>
          </div>
        )}
        <Collections collectionIds={collectionIds} />
      </div>
    </>
  )
}

IndexPage.propTypes = {
  data: PropTypes.exact({
    allCollectionIds: PropTypes.exact({ nodes: CollectionIdsType })
  }).isRequired
}

export const collections = graphql`
  fragment collections on collectionsConnection {
    nodes {
      id
    }
  }
`

export const query = graphql`
  query($category: String) {
    allCollectionIds: allCollections(filter: { category: { eq: $category } }) {
      ...collections
    }
  }
`
