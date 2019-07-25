import React, { useContext } from 'react'
import { css } from '@emotion/core'

import SEO from 'components/SEO'
import SearchComboBox from 'components/SearchComboBox'
import { BackButton } from 'components/common'
import { MediaContext } from 'contexts/Media'
import {
  headerHeightInRem,
  bottomBarHeightInRem,
  screens
} from 'constants/Styles'

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
            <BackButton />
          </div>
        )}
        <div
          className='base'
          css={css`
            position: relative;

            ${screens.desktop} {
              max-width: 44rem;
              top: -2rem;
            }
          `}
        >
          <SearchComboBox large />
        </div>
      </main>
    </>
  )
}
