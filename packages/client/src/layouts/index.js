import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

// flag
// import Authentication from 'components/Authentication'
// import Modal from 'components/Modal'
import Header from 'components/Header'
import Theme from 'constants/Theme'

export default function Layout ({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'apple-mobile-web-app-capable', content: 'yes' },
              {
                name: 'apple-mobile-web-app-status-bar-style',
                content: 'default'
              }
            ]}
          >
            <html lang='en' />
          </Helmet>
          <ThemeProvider theme={Theme}>
            {/* <Authentication> */}
            {/* <Modal> */}
            <div
              css={css`
                margin-top: 4rem;
              `}
            >
              <Header siteTitle={data.site.siteMetadata.title} />
              {children}
            </div>
            {/* </Modal> */}
            {/* </Authentication> */}
          </ThemeProvider>
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
