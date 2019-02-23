import React from 'react'
import { css } from '@emotion/core'

import SearchBar from 'components/SearchBar'
import SEO from 'components/SEO'
import { IconButton, Input, Result } from 'components/common'
import useMedia from 'hooks/useMedia'
import { media } from 'constants/Theme'
import {
  baseWrapper,
  headerHeightInRem,
  mobileHeaderHeightInRem,
  mobileNavigationHeightInRem
} from 'utils/styles'
import { Back, Search } from 'icons'

export default function SearchPage ({ location }) {
  const initialSearchInput = location.state ? location.state.searchInput : ''
  const isDesktop = useMedia(media.desktop)

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
