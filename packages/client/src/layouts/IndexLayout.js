import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { toTitleCase } from 'common'

// import useIsScrollingDown from './useIsScrollingDown'
import CategoryFilter from 'components/CategoryFilter'
// import { MobileHeader } from 'components/Header'
import Hero from 'components/Hero'
import SEO from 'components/SEO'
// import { FABDesktop } from 'components/common'
import URLParams from 'contexts/URLParams'
// import { Filter, Suggest } from 'assets/icons'
import {
  headerHeightInRem,
  mobileHeaderHeightInRem,
  bottomBarHeightInRem,
  screens
} from 'constants/Styles'

function Sidebar (props) {
  return (
    <div
      css={css`
        position: sticky;
        top: 0;

        ${screens.nonDesktop} {
          background-color: var(--white900);
          box-shadow: var(--shadow-01);
          z-index: 200;
        }

        ${screens.desktop} {
          align-self: flex-start;
          margin-top: 4.5rem;
          top: ${headerHeightInRem + 1}rem;
        }
      `}
      {...props}
    />
  )
}

export default function IndexLayout ({ category, children, location }) {
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
          <Sidebar>
            <CategoryFilter pathname={location.pathname} />
          </Sidebar>
          <main
            css={css`
              height: 100%;
              width: 100%;

              ${screens.tablet} {
                padding: 1rem;
              }

              ${screens.desktop} {
                width: 70%;
              }
            `}
            id='main'
          >
            {children}
          </main>
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
