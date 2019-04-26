import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { toTitleCase } from 'common'

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
import useIsScrollingDown from 'hooks/useIsScrollingDown'
import {
  headerHeightInRem,
  mobileHeaderHeightInRem,
  mobileNavigationHeightInRem
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

  const title = category === 'all' ? '' : toTitleCase(category)

  const isScrollingDown = useIsScrollingDown()

  return (
    <URLParams location={location}>
      <SEO title={title} />
      <MobileHeader
        actions={actions}
        isScrollingDown={isScrollingDown}
        title='Collections'
      />
      <section
        css={theme => css`
          ${theme.screens.nonDesktop} {
            order: -1;
          }
        `}
        id='hero'
      >
        <Hero />
      </section>
      <main
        css={theme => css`
          background-color: ${theme.colors.gray100};
          min-height: calc(100vh - ${mobileHeaderHeightInRem}rem);
          padding: 0 0 ${mobileNavigationHeightInRem}rem;

          ${theme.screens.desktop} {
            min-height: calc(100vh - ${headerHeightInRem}rem);
            padding: 2rem 0;
          }
        `}
      >
        <div
          className='base'
          css={theme => css`
            display: flex;

            ${theme.screens.nonDesktop} {
              flex-direction: column;
              padding: 0;
            }

            ${theme.screens.desktop} {
              justify-content: space-between;
            }
          `}
        >
          <Sidebar isScrollingDown={isScrollingDown} mobile>
            <CategoryFilter />
          </Sidebar>
          <Media>{children}</Media>
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
  category: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired
}
