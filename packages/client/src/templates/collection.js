import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../layouts/Layout'
import CollectionView from '../components/CollectionView'
import { baseWrapper } from '../styles'

// TODO: add helmet

export default function ({ data: { collections } }) {
  return (
    <Layout>
      <main
        css={theme => css`
          background-color: ${theme.colors.gray100};
          padding: 3rem 0;
        `}
      >
        <div
          css={css`
            ${baseWrapper};
            max-width: 56rem;
          `}
        >
          <CollectionView collection={collections} />
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    collections(id: { eq: $id }) {
      id
      name
      # topic
      level
      urls {
        id
        url
        type
      }
      tags
      suggestions
    }
  }
`
