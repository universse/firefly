import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { toTitleCase } from 'common'

import Hero from 'components/Hero'
import SEO from 'components/SEO'
// import { FABDesktop } from 'components/common'
import URLParams from 'contexts/URLParams'
// import { Suggest } from 'assets/icons'
import { bottomBarHeightInRem, screens } from 'constants/Styles'

export default function IndexLayout ({ category, children, location }) {
  return (
    <URLParams location={location}>
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
