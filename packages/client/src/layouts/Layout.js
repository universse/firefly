import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Modal from '../components/Modal'
import Header from '../components/Header'

const Layout = ({ children }) => (
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
        <Modal>
          <div
            css={css`
              margin-top: 4rem;
            `}
          >
            <Header siteTitle={data.site.siteMetadata.title} />
            {children}
          </div>
        </Modal>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
