import React, { memo, useContext, useMemo } from 'react'
import { css } from '@emotion/core'

import CategoryFilter from 'components/CategoryFilter'
import Footer from 'components/Footer'
import Header, { MobileHeader } from 'components/Header'
import Hero from 'components/Hero'
import { MobileNavigation } from 'components/Navigation'
import SEO from 'components/SEO'
import { IconButton, Sidebar } from 'components/common'
import Media from 'contexts/Media'
import { ModalContext } from 'contexts/Modal'
import { URLQueryContext } from 'contexts/URLQuery'
import SavedCollections from 'contexts/SavedCollections'
import { URLUtilsContext } from 'contexts/URLUtils'
import { Filter } from 'icons'
import useQuery from 'hooks/useQuery'
import useURLUtils from 'hooks/useURLUtils'
import {
  baseWrapper,
  headerHeightInRem,
  mobileNavigationHeightInRem
} from 'utils/styles'
import ModalTypes from 'constants/ModalTypes'
import { toTitleCase } from 'common'

const IndexLayout = memo(function ({
  category,
  children,
  location,
  openModal
}) {
  const { pathname, search } = location

  const [queryValues, dispatch] = useQuery(search)
  const urlUtils = useURLUtils(queryValues, pathname, dispatch)

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
            css={theme => css`
              ${baseWrapper};
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
            <SavedCollections>
              <URLQueryContext.Provider value={queryValues}>
                <URLUtilsContext.Provider value={urlUtils}>
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
                </URLUtilsContext.Provider>
              </URLQueryContext.Provider>
            </SavedCollections>
          </div>
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
