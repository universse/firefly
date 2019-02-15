import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import CollectionView from 'components/CollectionView'
import SEO from 'components/SEO'
import { baseWrapper } from 'utils/styles'

export default function ({ data: { collections } }) {
  return (
    <>
      <SEO />
      <main
        css={theme => css`
          background-color: ${theme.colors.gray100};
          min-height: calc(100vh - 4rem);
          padding: 3rem 0;
        `}
      >
        <div
          css={css`
            ${baseWrapper};
            max-width: 50rem;
          `}
        >
          <CollectionView collection={collections} />
        </div>
      </main>
    </>
  )
}

export const query = graphql`
  query($id: String!) {
    collections(id: { eq: $id }) {
      id
      name
      category
      level
      urls {
        id
        title
        type
        url
      }
      tags
      suggestions
    }
  }
`
