import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import Collections from './Collections'
import MobileFilters from 'components/MobileFilters'
import { MobileSortByDifficulty } from 'components/SortByDifficulty'
import TagFilter from 'components/TagFilter'
import { URLParamsContext } from 'contexts/URLParams'
import { useMedia } from 'hooks/useGlobalStore'
// import useDebouncedValue from 'hooks/useDebouncedValue'
import { CollectionIdsType } from 'constants/Types'
import searchWorker from 'utils/searchWorker'
import { logInputSearch } from 'utils/analytics'

export default function CategoryTemplate ({
  data: {
    allCollectionIds: { nodes }
  }
}) {
  const { isDesktop } = useMedia()

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
    let isPending = true

    searchWorker
      .search(
        searchInput,
        sort,
        JSON.stringify(tags),
        nodes.length ? JSON.stringify(nodes) : null
      )
      .then(state => {
        logInputSearch(searchInput, state.collectionIds.length, true)
        isPending && setState(state)
      })

    return () => (isPending = false)
  }, [nodes, searchInput, sort, tags])

  return (
    <>
      {isDesktop && (
        <div
          css={css`
            margin: 0 0 2rem 1rem;
          `}
        >
          <TagFilter aggregatedTags={aggregatedTags} />
        </div>
      )}
      {isDesktop === false && (
        <MobileFilters collectionCount={collectionIds.length}>
          <MobileSortByDifficulty />
          <TagFilter aggregatedTags={aggregatedTags} />
        </MobileFilters>
      )}
      <Collections collectionIds={collectionIds} />
    </>
  )
}

CategoryTemplate.propTypes = {
  data: PropTypes.exact({
    allCollectionIds: PropTypes.exact({ nodes: CollectionIdsType })
  }).isRequired
}
