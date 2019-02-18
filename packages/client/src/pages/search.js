import React from 'react'
import { css } from '@emotion/core'

import SearchBar from 'components/SearchBar'
import SEO from 'components/SEO'
import {
  baseWrapper,
  headerHeightInRem,
  mobileHeaderHeightInRem,
  mobileNavigationHeightInRem
} from 'utils/styles'
import { IconButton, Input, Result } from 'components/common'
import { Back, Search } from 'icons'

export default function SearchPage ({ location }) {
  const initialSearchInput = location.state ? location.state.searchInput : ''
  return (
    <>
      <SEO title='Search' />
      <main
        css={theme => css`
          min-height: calc(100vh - ${headerHeightInRem}rem);
          padding: 0 0 2rem;

          ${theme.screens.nonDesktop} {
            min-height: calc(100vh - ${mobileNavigationHeightInRem}rem);
            padding: 1rem 0;
            position: relative;
            top: -${mobileHeaderHeightInRem}rem;
          }
        `}
      >
        <div
          css={theme => css`
            position: fixed;
            top: 2rem;
            left: 1rem;

            ${theme.screens.nonDesktop} {
              display: none;
            }
          `}
        >
          <IconButton
            aria-label='Go Back to Previous Screen'
            onClick={() => window.history.back()}
          >
            <Back />
          </IconButton>
        </div>
        <div
          css={theme => css`
            ${baseWrapper};
            color: ${theme.colors.gray500};
            max-width: 44rem;
            position: relative;

            ${theme.screens.desktop} {
              top: -2rem;
            }
          `}
        >
          <div
            css={theme => css`
              align-items: center;
              display: flex;
              height: 2.5rem;
              left: 2rem;
              position: absolute;
              z-index: 2;

              ${theme.screens.desktop} {
                height: 3rem;
              }
            `}
          >
            <Search />
          </div>
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
