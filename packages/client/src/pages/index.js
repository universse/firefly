import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Hero from 'components/Hero'
import Collections from 'components/Collections'
import CategoryFilter from 'components/CategoryFilter'
import { baseWrapper } from '../styles'
import hasSignedIn from 'utils/hasSignedIn'

export default function IndexPage ({ data, location }) {
  if (!hasSignedIn) {
    return (
      <>
        <Hero />
        <main
          css={theme => css`
            background-color: ${theme.colors.gray100};
            padding: 3rem 0;
          `}
          id='main'
        >
          <div css={baseWrapper}>
            <CategoryFilter />
            <Collections collections={data.allCollections.edges} />
          </div>
        </main>
      </>
    )
  }

  return (
    <main
      css={theme => css`
        background-color: ${theme.colors.gray100};
        padding: 3rem 0;
      `}
      id='main'
    >
      {/* first time user ?  */}
      <div css={baseWrapper}>
        <CategoryFilter />
        <Collections collections={data.allCollections.edges} />
      </div>
    </main>
  )
}

export const query = graphql`
  query($category: String) {
    allCollections(filter: { category: { eq: $category } }) {
      edges {
        node {
          id
          category
          level
          name
          tags
        }
      }
    }
  }
`
