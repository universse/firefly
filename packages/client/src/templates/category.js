import React from 'react'
// import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../layouts/Layout'
import { baseWrapper } from '../styles'

// TODO: add helmet

export default function (props) {
  return (
    <Layout>
      <main
        css={theme => css`
          background-color: ${theme.colors.gray100};
          padding: 3rem 0;
        `}
      >
        <div css={baseWrapper}>Category Page</div>
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
