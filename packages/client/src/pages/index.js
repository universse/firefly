import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import CategoryFilter from 'components/CategoryFilter'
import Collections from 'components/Collections'
import MobileFilters from 'components/MobileFilters'
import SortByDifficulty from 'components/SortByDifficulty'
import TagFilter from 'components/TagFilter'
import { Cross, Search } from 'assets/icons'
import { URLParamsContext } from 'contexts/URLParams'
import { MediaContext } from 'contexts/Media'
import { SetModalContext } from 'contexts/SetModal'
import useIsScrollingDown from 'hooks/useIsScrollingDown'
import AriaLabels from 'constants/AriaLabels'
// import useDebouncedValue from 'hooks/useDebouncedValue'
import ModalTypes from 'constants/ModalTypes'
import { CollectionIdsType } from 'constants/Types'
import { headerHeightInRem, screens } from 'constants/Styles'
// import URLParamKeys from 'constants/URLParamKeys'
import { logInputSearch } from 'utils/amplitude'
import searchWorker from 'utils/searchWorker'

function SearchBar () {
  const {
    query: { searchInput },
    queryDispatch
  } = useContext(URLParamsContext)

  return (
    <>
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
    </>
  )
}

function TopBarWrapper (props) {
  const { isPastBaseline, isScrollingDown } = useIsScrollingDown({
    id: 'main',
    property: 'offsetTop'
  })

  return (
    <div
      css={css`
        background-color: var(--white900);
        ${isPastBaseline && 'box-shadow: var(--shadow-01);'}
        position: sticky;
        top: 0;
        transform: translateY(${isScrollingDown ? '-100%' : 0});
        transition: transform 0.45s;
        z-index: 200;
      `}
      {...props}
    />
  )
}

function TopBar ({ pathname }) {
  const setActiveModalType = useContext(SetModalContext)

  return (
    <>
      <CategoryFilter pathname={pathname} />
      <div
        css={css`
          align-items: center;
          display: flex;
          justify-content: space-between;
          padding: 1rem;
        `}
      >
        <div
          css={css`
            flex: 1 0 auto;
            margin-right: 1rem;
            position: relative;
          `}
        >
          <SearchBar />
        </div>
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
      </div>
    </>
  )
}

TopBar.propTypes = {
  pathname: PropTypes.string.isRequired
}

export default function IndexPage ({ data, location }) {
  const { isDesktop } = useContext(MediaContext)

  const {
    query: { searchInput, sort, tags }
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
      {isDesktop && (
        <>
          <div
            css={css`
              align-self: flex-start;
              margin-top: 4.5rem;
              position: sticky;
              top: ${headerHeightInRem + 1}rem;
            `}
          >
            <CategoryFilter pathname={location.pathname} />
          </div>
          <main
            css={css`
              height: 100%;
              width: 70%;
            `}
            id='main'
          >
            <div
              css={css`
                align-items: center;
                display: flex;
                justify-content: space-between;
                margin-bottom: 1.5rem;
              `}
            >
              <div
                css={css`
                  flex: 1 0 auto;
                  margin-right: 5rem;
                  position: relative;
                `}
              >
                <SearchBar />
              </div>
              {isDesktop && <SortByDifficulty sort={sort} />}
            </div>
            <div
              css={css`
                margin: 0 0 2rem 1rem;
              `}
            >
              <TagFilter aggregatedTags={aggregatedTags} />
            </div>
            <Collections collectionIds={collectionIds} />
          </main>
        </>
      )}
      {isDesktop === false && (
        <>
          <TopBarWrapper>
            <TopBar pathname={location.pathname} />
          </TopBarWrapper>
          <MobileFilters
            aggregatedTags={aggregatedTags}
            collectionCount={collectionIds.length}
          />
          <main
            css={css`
              padding: 0 0 1rem 0;

              ${screens.tablet} {
                padding: 0 1rem 1rem 1rem;
              }
            `}
            id='main'
          >
            <Collections collectionIds={collectionIds} />
          </main>
        </>
      )}
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
