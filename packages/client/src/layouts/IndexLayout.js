import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { toTitleCase } from 'common'

import CategoryFilter from 'components/CategoryFilter'
import Hero from 'components/Hero'
import SearchBar from 'components/SearchBar'
import SEO from 'components/SEO'
import SortByDifficulty from 'components/SortByDifficulty'
// import { FABDesktop } from 'components/common'
// import { Suggest } from 'assets/icons'
import { MediaContext } from 'contexts/Media'
import { SetModalContext } from 'contexts/SetModal'
import { URLParamsContext } from 'contexts/URLParams'
import useIsScrollingDown from 'hooks/useIsScrollingDown'
import AriaLabels from 'constants/AriaLabels'
import ModalTypes from 'constants/ModalTypes'
import {
  bottomBarHeightInRem,
  headerHeightInRem,
  screens
} from 'constants/Styles'
import { logInputSearch } from 'utils/amplitude'

function TopBarWrapper (props) {
  const { isPastBaseline, isScrollingDown, ref } = useIsScrollingDown()

  return (
    <div
      ref={ref}
      css={css`
        background-color: var(--white900);
        ${isPastBaseline && 'box-shadow: var(--shadow-01);'}
        position: sticky;
        top: 0;
        transform: translateY(${isScrollingDown ? '-100%' : 0});
        transition: box-shadow 0.2s, transform 0.6s;
        z-index: 200;
      `}
      {...props}
    />
  )
}

function TopBar ({ children, pathname }) {
  const setActiveModalType = useContext(SetModalContext)

  return (
    <>
      <CategoryFilter pathname={pathname} />
      <div
        css={css`
          align-items: center;
          display: flex;
          justify-content: space-between;
          padding: 1rem;
        `}
      >
        <div
          css={css`
            flex: 1 0 auto;
            margin-right: 1rem;
            position: relative;
          `}
        >
          {children}
        </div>
        <button
          aria-label={AriaLabels.SORT_AND_FILTER_COLLECTIONS}
          css={css`
            color: var(--accent500);
            font-size: 0.875rem;
            font-weight: 600;
          `}
          onClick={() => setActiveModalType(ModalTypes.MOBILE_FILTER)}
          type='button'
        >
          Filters
        </button>
      </div>
    </>
  )
}

TopBar.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string.isRequired
}

export default function IndexLayout ({ category, children, location }) {
  const { isDesktop } = useContext(MediaContext)

  const {
    query: { searchInput },
    queryDispatch
  } = useContext(URLParamsContext)

  const searchBarProps = {
    handleClearClick: () => queryDispatch({ searchInput: '' }),
    large: true,
    onChange: e => {
      queryDispatch({ searchInput: e.target.value })
      logInputSearch(e.target.value, true)
    },
    value: searchInput
  }

  return (
    <>
      <SEO title={category === 'all' ? '' : toTitleCase(category)} />
      <section id='hero'>
        <Hero />
      </section>
      <div
        css={css`
          padding: 0 0 ${bottomBarHeightInRem}rem;

          ${screens.desktop} {
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
          {isDesktop && (
            <>
              <div
                css={css`
                  align-self: flex-start;
                  margin-top: 4.5rem;
                  position: sticky;
                  top: ${headerHeightInRem + 1}rem;
                `}
              >
                <CategoryFilter pathname={location.pathname} />
              </div>
              <main
                css={css`
                  height: 100%;
                  width: 70%;
                `}
                id='main'
              >
                <div
                  css={css`
                    align-items: center;
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1.5rem;
                  `}
                >
                  <div
                    css={css`
                      flex: 1 0 auto;
                      margin-right: 5rem;
                      position: relative;
                    `}
                  >
                    <SearchBar {...searchBarProps} />
                  </div>
                  <SortByDifficulty />
                </div>
                {children}
              </main>
            </>
          )}
          {isDesktop === false && (
            <>
              <TopBarWrapper>
                <TopBar pathname={location.pathname}>
                  <SearchBar {...searchBarProps} />
                </TopBar>
              </TopBarWrapper>
              <main
                css={css`
                  padding: 0 0 1rem 0;

                  ${screens.tablet} {
                    padding: 0 1rem 1rem 1rem;
                  }
                `}
                id='main'
              >
                {children}
              </main>
            </>
          )}
        </div>
        {/* <FABDesktop
          href={`https://docs.google.com/forms/d/e/1FAIpQLSfPo7KFY11Wp0E3IxO6-TxYY6ATHB4Ai-Io-KWRzcPCsqWyDQ/viewform?usp=pp_url&entry.1943859076=${category}`}
        >
          <Suggest />
        </FABDesktop> */}
      </div>
    </>
  )
}

IndexLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  category: PropTypes.string
}
