import React, { memo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { css } from '@emotion/core'

function Footer () {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <footer
      css={theme => css`
        background-color: ${theme.colors.gray100};

        ${theme.screens.nonDesktop} {
          display: none;
        }
      `}
    >
      <div
        className='base'
        css={theme => css`
          align-items: center;
          border-top: 1px solid ${theme.colors.gray300};
          display: flex;
          height: 3rem;
          justify-content: space-around;
        `}
      >
        <p
          css={theme => css`
            color: ${theme.colors.gray800};
            font-size: 0.8125rem;
            font-weight: 600;
          `}
        >
          © {new Date().getFullYear()} {data.site.siteMetadata.title}
        </p>
      </div>
    </footer>
  )
}

export default memo(Footer)
