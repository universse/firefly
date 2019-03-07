import React, { useContext } from 'react'
import { css } from '@emotion/core'

import SearchBar from 'components/SearchBar'
import SEO from 'components/SEO'
import { IconButton, Input, Result } from 'components/common'
import { MediaContext } from 'contexts/Media'
import {
  baseWrapper,
  headerHeightInRem,
  mobileNavigationHeightInRem
} from 'utils/styles'
import { Back, Search } from 'icons'

export default function SearchPage ({ location }) {
  const initialSearchInput = location.state ? location.state.searchInput : ''

  const initialIsLoading = location.state
    ? location.state.initialIsLoading
    : false

  const isDesktop = useContext(MediaContext)

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
          }
        `}
      >
        {isDesktop && (
          <div
            css={css`
              position: fixed;
              top: 2rem;
              left: 1rem;
            `}
          >
            <IconButton
              aria-label='Go Back to Previous Screen'
              onClick={() => window.history.back()}
            >
              <Back />
            </IconButton>
          </div>
        )}
        <div
          css={theme => css`
            ${baseWrapper};
            color: ${theme.colors.gray500};
            position: relative;

            ${theme.screens.desktop} {
              max-width: 44rem;
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
            initialIsLoading={initialIsLoading}
            initialSearchInput={initialSearchInput}
            Input={Input}
            Result={Result}
          />
        </div>
      </main>
    </>
  )
}
