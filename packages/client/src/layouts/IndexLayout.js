import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { toTitleCase } from 'common'

import useIsScrollingDown from './useIsScrollingDown'
import CategoryFilter from 'components/CategoryFilter'
import { MobileHeader } from 'components/Header'
import Hero from 'components/Hero'
import SEO from 'components/SEO'
import { FABDesktop, Sidebar } from 'components/common'
import { SetModalContext } from 'contexts/SetModal'
import URLParams from 'contexts/URLParams'
import { Filter, Suggest } from 'assets/icons'
import {
  headerHeightInRem,
  mobileHeaderHeightInRem,
  bottomBarHeightInRem,
  screens
} from 'constants/Styles'
import ModalTypes from 'constants/ModalTypes'

function TopBars (props) {
  const isScrollingDown = useIsScrollingDown()

  return (
    <div
      css={css`
        ${screens.nonDesktop} {
          position: sticky;
          top: 0;
          transform: translateY(
            ${isScrollingDown ? `-${mobileHeaderHeightInRem}rem` : 0}
          );
          transition: transform 0.3s;
          will-change: transform;
          z-index: 200;
        }
      `}
      {...props}
    />
  )
}

export default function IndexLayout ({ category, children, location }) {
  const setActiveModalType = useContext(SetModalContext)

  const actions = useMemo(
    () => (
      <button
        aria-label='Filter Collections by Tags'
        className='IconButton'
        onClick={() => setActiveModalType(ModalTypes.MOBILE_FILTER)}
        type='button'
      >
        <Filter />
      </button>
    ),
    [setActiveModalType]
  )

  const isScrollingDown = useIsScrollingDown()

  return (
    <URLParams location={location}>
      <SEO title={category === 'all' ? '' : toTitleCase(category)} />
      <section id='hero'>
        <Hero />
      </section>
      <div
        css={css`
          min-height: calc(100vh - ${mobileHeaderHeightInRem}rem);
          padding: 0 0 ${bottomBarHeightInRem}rem;

          ${screens.desktop} {
            min-height: calc(100vh - ${headerHeightInRem}rem);
            padding: 2rem 0;
          }
        `}
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
          <TopBars>
            <MobileHeader actions={actions} title='Collections' />
            <Sidebar>
              <CategoryFilter pathname={location.pathname} />
            </Sidebar>
          </TopBars>
          {children}
        </div>
        {/* <FABDesktop
          href={`https://docs.google.com/forms/d/e/1FAIpQLSfPo7KFY11Wp0E3IxO6-TxYY6ATHB4Ai-Io-KWRzcPCsqWyDQ/viewform?usp=pp_url&entry.1943859076=${category}`}
        >
          <Suggest />
        </FABDesktop> */}
      </div>
    </URLParams>
  )
}

IndexLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  category: PropTypes.string
}
