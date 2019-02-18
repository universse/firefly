import React from 'react'
import { css } from '@emotion/core'

import SearchBar from 'components/SearchBar'
import SEO from 'components/SEO'
import { baseWrapper, headerHeightInRem } from 'utils/styles'
import { Input, Result } from 'components/common'

export default function SearchPage ({ location }) {
  const initialSearchInput = location.state ? location.state.searchInput : ''
  return (
    <>
      <SEO title='Search' />
      <main
        css={theme => css`
          background-color: ${theme.colors.gray100};
          min-height: calc(100vh - ${headerHeightInRem}rem);
          padding: 2rem 0;

          ${theme.screens.nonDesktop} {
            padding: 1rem 0 4.5rem;
          }
        `}
      >
        <div css={baseWrapper}>
          <SearchBar
            controlledProps={{ isOpen: true }}
            initialSearchInput={initialSearchInput}
            showAllResults
            Input={Input}
            Result={Result}
          />
        </div>
      </main>
    </>
  )
}

/* <form onSubmit={handleSubmit}>
  eslint-disable-next-line
  <Input
    aria-label='What do you want to learn today?'
    name='search'
    onChange={handleSearchInput}
    placeholder='What do you want to learn today?'
  />
</form>
<ul
  css={css`
    margin-top: 1rem;
  `}
>
  {searchInput &&
    results.map(({ node: { id, name } }) => <li key={id}>{name}</li>)}
</ul> */
