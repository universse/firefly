import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Collections from 'components/Collections'
import MobileFilters from 'components/MobileFilters'
import SortByDifficulty from 'components/SortByDifficulty'
import TagFilter from 'components/TagFilter'
import { Cross, Search } from 'assets/icons'
import { URLParamsContext } from 'contexts/URLParams'
import { MediaContext } from 'contexts/Media'
import { SetModalContext } from 'contexts/SetModal'
import AriaLabels from 'constants/AriaLabels'
// import useDebouncedValue from 'hooks/useDebouncedValue'
import ModalTypes from 'constants/ModalTypes'
import { CollectionIdsType } from 'constants/Types'
import { screens } from 'constants/Styles'
// import URLParamKeys from 'constants/URLParamKeys'
import { logInputSearch } from 'utils/amplitude'
import searchWorker from 'utils/searchWorker'

export default function IndexPage ({ data, location }) {
  const { isDesktop } = useContext(MediaContext)
  const setActiveModalType = useContext(SetModalContext)

  const {
    query: { searchInput, sort, tags },
    queryDispatch
  } = useContext(URLParamsContext)

  const [{ aggregatedTags, collectionIds }, setState] = useState({
    aggregatedTags: [],
    collectionIds: []
  })

  // const [debouncedSearchInput, setDebouncedSearchInput] = useDebouncedValue(
  //   searchInput,
  //   300
  // )

  // useEffect(() => {
  //   setDebouncedSearchInput(
  //     new URLSearchParams(location.search).get(URLParamKeys.SEARCH_INPUT) || ''
  //   )
  // }, [location, setDebouncedSearchInput])

  useEffect(() => {
    let isFresh = true

    searchWorker
      .search(
        searchInput,
        sort,
        JSON.stringify(tags),
        data.allCollectionIds.nodes.length
          ? JSON.stringify(data.allCollectionIds.nodes)
          : null
      )
      .then(state => isFresh && setState(state))

    return () => (isFresh = false)
  }, [data, searchInput, sort, tags])

  return (
    <>
      <div
        css={css`
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;

          ${screens.mobile} {
            margin-bottom: 0;
            padding: 1rem;
          }
        `}
      >
        <div
          css={css`
            flex: 1 0 auto;
            margin-right: 1rem;
            position: relative;

            ${screens.desktop} {
              margin-right: 5rem;
            }
          `}
        >
          <div
            css={css`
              align-items: center;
              color: var(--gray600);
              display: flex;
              height: 2.5rem;
              left: 1rem;
              position: absolute;
              z-index: 2;

              ${screens.nonMobile} {
                height: 3rem;
              }
            `}
          >
            <Search medium />
          </div>
          {typeof isDesktop === 'boolean' && (
            <input
              aria-label={AriaLabels.SEARCH_BAR_LABEL}
              autoComplete='off'
              css={css`
                border-radius: 1.25rem;
                box-shadow: var(--shadow-02);
                color: var(--black900);
                font-size: 0.9375rem;
                height: 2.5rem;
                padding-left: 3rem;
                width: 100%;

                ${screens.nonMobile} {
                  border-radius: 1.5rem;
                  font-size: 1rem;
                  height: 3rem;
                }
              `}
              onChange={e => {
                queryDispatch({ searchInput: e.target.value })
                logInputSearch(e.target.value, true)
              }}
              placeholder={AriaLabels.SEARCH_BAR_LABEL}
              type='text'
              value={searchInput}
            />
          )}
          {searchInput && (
            <div
              css={css`
                position: absolute;
                right: 0.25rem;
                top: -0.25rem;

                ${screens.nonMobile} {
                  top: 0;
                }
              `}
            >
              <button
                aria-label={AriaLabels.CLEAR_SEARCH_INPUT}
                className='IconButton'
                onClick={() => queryDispatch({ searchInput: '' })}
                type='button'
              >
                <Cross small />
              </button>
            </div>
          )}
        </div>
        {isDesktop === false && (
          <MobileFilters
            aggregatedTags={aggregatedTags}
            collectionCount={collectionIds.length}
          />
        )}
        {isDesktop && <SortByDifficulty sort={sort} />}
        {isDesktop === false && (
          <button
            aria-label={AriaLabels.SORT_AND_FILTER_COLLECTIONS}
            css={css`
              color: var(--accent500);
              font-size: 0.875rem;
              font-weight: 600;
            `}
            onClick={() => setActiveModalType(ModalTypes.MOBILE_FILTER)}
            type='button'
          >
            Filters
          </button>
        )}
      </div>
      {isDesktop && (
        <div
          css={css`
            margin: 0 0 2rem 1rem;
          `}
        >
          <TagFilter aggregatedTags={aggregatedTags} />
        </div>
      )}
      <Collections collectionIds={collectionIds} />
    </>
  )
}

IndexPage.propTypes = {
  data: PropTypes.exact({
    allCollectionIds: PropTypes.exact({ nodes: CollectionIdsType })
  }).isRequired,
  location: PropTypes.object.isRequired
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
