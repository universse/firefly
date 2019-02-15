import React, { useState, useContext } from 'react'
import { css } from '@emotion/core'

import { AllCollectionsContext } from 'components/AllCollections'
import SEO from 'components/SEO'
import useSearch from 'hooks/useSearch'

// TODO
export default function SearchPage ({ location }) {
  const allCollections = useContext(AllCollectionsContext)
  const [searchInput, setSearchInput] = useState(() =>
    location.state ? location.state.searchInput : ''
  )
  const results = useSearch(allCollections, searchInput)

  return (
    <>
      <SEO />
      <main
        css={theme => css`
          background-color: ${theme.colors.gray100};
          min-height: calc(100vh - 4rem);
          padding: 2rem 0;
        `}
      >
        <ul>
          {searchInput &&
            results.map(({ node: { id, name } }) => <li key={id}>{name}</li>)}
        </ul>
      </main>
    </>
  )
}
