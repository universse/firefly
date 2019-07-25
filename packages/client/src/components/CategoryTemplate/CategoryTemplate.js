import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import Collections from './Collections'
import MobileFilters from 'components/MobileFilters'
import { MobileSortByDifficulty } from 'components/SortByDifficulty'
import TagFilter from 'components/TagFilter'
import { URLParamsContext } from 'contexts/URLParams'
import { MediaContext } from 'contexts/Media'
// import useDebouncedValue from 'hooks/useDebouncedValue'
import { CollectionIdsType } from 'constants/Types'
// import URLParamKeys from 'constants/URLParamKeys'
import searchWorker from 'utils/searchWorker'

export default function CategoryTemplate ({ data }) {
  const { isDesktop } = useContext(MediaContext)

  const {
    query: { searchInput, sort, tags }
  } = useContext(URLParamsContext)

  // const handleChange = useCallback(e => {
  //   queryDispatch({ searchInput: e.target.value })
  //   logInputSearch(e.target.value, true)
  // }, [queryDispatch])

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
        data.allCollectionIds.nodes.length
          ? JSON.stringify(data.allCollectionIds.nodes)
          : null
      )
      .then(state => isPending && setState(state))

    return () => (isPending = false)
  }, [data, searchInput, sort, tags])

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
