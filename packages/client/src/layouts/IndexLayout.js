import React, { memo, useContext, useMemo } from 'react'
import { css } from '@emotion/core'

import CategoryFilter from 'components/CategoryFilter'
import Footer from 'components/Footer'
import Header, { MobileHeader } from 'components/Header'
import Hero from 'components/Hero'
import { MobileNavigation } from 'components/Navigation'
import SEO from 'components/SEO'
import { FABDesktop, IconButton, Sidebar } from 'components/common'
import Media from 'contexts/Media'
import { ModalContext } from 'contexts/Modal'
import URLParams from 'contexts/URLParams'
import { Filter, Suggest } from 'icons'
import {
  headerHeightInRem,
  mobileNavigationHeightInRem
} from 'constants/Styles'
import ModalTypes from 'constants/ModalTypes'
import { toTitleCase } from 'common'

const IndexLayout = memo(function ({
  category,
  children,
  location,
  openModal
}) {
  const { pathname, search } = location

  const actions = useMemo(
    () => (
      <IconButton
        aria-label='Filter Collections by Tags'
        onClick={() => openModal(ModalTypes.MOBILE_FILTER)}
      >
        <Filter />
      </IconButton>
    ),
    [openModal]
  )

  const title = category === 'all' ? '' : toTitleCase(category)

  return (
    <>
      <SEO title={title} />
      <div
        css={theme => css`
          ${theme.screens.desktop} {
            padding-top: ${headerHeightInRem}rem;
          }
        `}
      >
        <Header />
        <section id='hero'>
          <Hero />
        </section>
        <MobileHeader actions={actions} title='Collections' />
        <main
          css={theme => css`
            background-color: ${theme.colors.gray100};
            min-height: calc(100vh - ${headerHeightInRem}rem);
            padding: 0 0 ${mobileNavigationHeightInRem}rem;

            ${theme.screens.desktop} {
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
            <URLParams pathname={pathname} search={search}>
              <Media>
                {isDesktop => (
                  <>
                    {!isDesktop && (
                      <Sidebar>
                        <CategoryFilter />
                      </Sidebar>
                    )}
                    {children}
                  </>
                )}
              </Media>
            </URLParams>
          </div>
          <FABDesktop href='https://docs.google.com/forms/'>
            <Suggest />
          </FABDesktop>
        </main>
        <Footer />
        <MobileNavigation location={location} />
      </div>
    </>
  )
})

export default function (props) {
  const { openModal } = useContext(ModalContext)

  return <IndexLayout {...props} openModal={openModal} />
}
