import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import SEO from 'components/SEO'
import SearchBar from 'components/SearchBar'
import { Back, Search } from 'assets/icons'
import { MediaContext } from 'contexts/Media'
import AriaLabels from 'constants/AriaLabels'
import {
  headerHeightInRem,
  bottomBarHeightInRem,
  screens
} from 'constants/Styles'
import goBack from 'utils/goBack'

// TODO: loading state
export default function SearchPage () {
  const { isDesktop } = useContext(MediaContext)

  return (
    <>
      <SEO title='Search' />
      <main
        css={css`
          min-height: calc(100vh - ${headerHeightInRem}rem);
          padding: 0 0 2rem;

          ${screens.nonDesktop} {
            min-height: calc(100vh - ${bottomBarHeightInRem}rem);
            padding: 1rem 0 ${bottomBarHeightInRem + 1}rem;
          }
        `}
        id='main'
      >
        {isDesktop && (
          <div
            css={css`
              left: 1rem;
              position: fixed;
              top: 2rem;
            `}
          >
            <button
              aria-label={AriaLabels.GO_BACK}
              className='IconButton'
              onClick={goBack}
              type='button'
            >
              <Back />
            </button>
          </div>
        )}
        <div
          className='base'
          css={css`
            color: var(--gray600);
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
            <Search medium />
          </div>
          <SearchBar />
        </div>
      </main>
    </>
  )
}

SearchPage.propTypes = {
  location: PropTypes.object.isRequired
}
