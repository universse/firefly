import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { toTitleCase } from 'common'

import useIsScrollingDown from './useIsScrollingDown'
import CategoryFilter from 'components/CategoryFilter'
import Footer from 'components/Footer'
import { MobileHeader } from 'components/Header'
import Hero from 'components/Hero'
import SEO from 'components/SEO'
import { FABDesktop, IconButton, Sidebar } from 'components/common'
import Media from 'contexts/Media'
import { SetModalContext } from 'contexts/SetModal'
import URLParams from 'contexts/URLParams'
import { Filter, Suggest } from 'icons'
import {
  headerHeightInRem,
  mobileHeaderHeightInRem,
  mobileNavigationHeightInRem,
  screens
} from 'constants/Styles'
import ModalTypes from 'constants/ModalTypes'

export default function IndexLayout ({ category, children, location }) {
  const setActiveModalType = useContext(SetModalContext)

  const actions = useMemo(
    () => (
      <IconButton
        aria-label='Filter Collections by Tags'
        onClick={() => setActiveModalType(ModalTypes.MOBILE_FILTER)}
      >
        <Filter />
      </IconButton>
    ),
    [setActiveModalType]
  )

  const isScrollingDown = useIsScrollingDown()

  return (
    <URLParams location={location}>
      <SEO title={category ? toTitleCase(category) : ''} />
      <MobileHeader
        actions={actions}
        isScrollingDown={isScrollingDown}
        title='Collections'
      />
      <section
        css={css`
          ${screens.nonDesktop} {
            order: -1;
          }
        `}
        id='hero'
      >
        <Hero />
      </section>
      <main
        css={css`
          background-color: var(--colors-gray100);
          min-height: calc(100vh - ${mobileHeaderHeightInRem}rem);
          padding: 0 0 ${mobileNavigationHeightInRem}rem;

          ${screens.desktop} {
            min-height: calc(100vh - ${headerHeightInRem}rem);
            padding: 2rem 0;
          }
        `}
        id='main'
      >
        <div
          className='base'
          css={css`
            display: flex;

            ${screens.nonDesktop} {
              flex-direction: column;
              padding: 0;
            }

            ${screens.desktop} {
              justify-content: space-between;
            }
          `}
        >
          <Media>
            {isDesktop => (
              <>
                {!isDesktop && (
                  <Sidebar isScrollingDown={isScrollingDown}>
                    <CategoryFilter location={location} />
                  </Sidebar>
                )}
                {children}
              </>
            )}
          </Media>
        </div>
        {/* <FABDesktop
          href={`https://docs.google.com/forms/d/e/1FAIpQLSfPo7KFY11Wp0E3IxO6-TxYY6ATHB4Ai-Io-KWRzcPCsqWyDQ/viewform?usp=pp_url&entry.1943859076=${category}`}
        >
          <Suggest />
        </FABDesktop> */}
      </main>
      {/* v2 */}
      {/* <Footer /> */}
    </URLParams>
  )
}

IndexLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  category: PropTypes.string
}
