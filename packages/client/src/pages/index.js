import React, { useContext } from 'react'
// import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import { AuthenticationContext } from 'components/Authentication'
import Layout from 'layouts/Layout'
import Hero from 'components/Hero'
import Collections from 'components/Collections'
import CategoryFilter from 'components/CategoryFilter'
import { baseWrapper } from '../styles'
import LocalStorage from 'constants/LocalStorage'

export default function IndexPage (props) {
  const user = useContext(AuthenticationContext)

  if (!window.localStorage.getItem(LocalStorage.IS_VISITED)) {
    window.localStorage.setItem(LocalStorage.IS_VISITED, true)

    return (
      <Layout>
        <Hero />
        <main
          css={theme => css`
            background-color: ${theme.colors.gray100};
            padding: 3rem 0;
          `}
          id='main'
        >
          <div
            css={css`
              ${baseWrapper};
            `}
          >
            <CategoryFilter />
            <Collections />
          </div>
        </main>
      </Layout>
    )
  }

  // TODO: loading screen
  return user === false ? (
    <div />
  ) : (
    <Layout>
      {!user && <Hero />}
      <main
        css={theme => css`
          background-color: ${theme.colors.gray100};
          padding: 3rem 0;
        `}
        id='main'
      >
        <div
          css={css`
            ${baseWrapper};
          `}
        >
          <CategoryFilter />
          <Collections />
        </div>
      </main>
    </Layout>
  )
}

// export const query = graphql`
//   query($id: String!) {
//     collections(id: { eq: $id }) {
//       id
//       name
//       # category
//       level
//       urls {
//         id
//         url
//         type
//       }
//       tags
//       suggestions
//     }
//   }
// `
