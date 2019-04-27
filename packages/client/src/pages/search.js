import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import SearchBar from 'components/SearchBar'
import SEO from 'components/SEO'
import { Back, Search } from 'icons'
import {
  ClearSearchWrapper,
  IconButton,
  Input,
  Result
} from 'components/common'
import { MediaContext } from 'contexts/Media'
import AriaLabels from 'constants/AriaLabels'
import {
  headerHeightInRem,
  mobileNavigationHeightInRem,
  screens
} from 'constants/Styles'

// TODO: loading state
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
        css={css`
          min-height: calc(100vh - ${headerHeightInRem}rem);
          padding: 0 0 2rem;

          ${screens.nonDesktop} {
            min-height: calc(100vh - ${mobileNavigationHeightInRem}rem);
            padding: 1rem 0 ${mobileNavigationHeightInRem + 1}rem;
          }
        `}
      >
        {isDesktop && (
          <div
            css={css`
              left: 1rem;
              position: fixed;
              top: 2rem;
            `}
          >
            <IconButton
              aria-label={AriaLabels.GO_BACK}
              onClick={() => window.history.back()}
            >
              <Back />
            </IconButton>
          </div>
        )}
        <div
          className='base'
          css={css`
            color: var(--colors-gray500);
            position: relative;

            ${screens.desktop} {
              max-width: 44rem;
              top: -2rem;
            }
          `}
        >
          <div
            css={css`
              align-items: center;
              display: flex;
              height: 2.5rem;
              left: 2rem;
              position: absolute;
              z-index: 2;

              ${screens.desktop} {
                height: 3rem;
              }
            `}
          >
            <Search />
          </div>
          <SearchBar
            ClearSearchWrapper={ClearSearchWrapper}
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

SearchPage.propTypes = {
  location: PropTypes.object.isRequired
}
