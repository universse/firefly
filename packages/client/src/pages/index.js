import React, { createContext } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Hero from 'components/Hero'
import Collections from 'components/Collections'
import CategoryFilter from 'components/CategoryFilter'
import SEO from 'components/SEO'
import useAggregatedTags from 'hooks/useAggregatedTags'
import useParams from 'hooks/useParams'
import useSortedCollections from 'hooks/useSortedCollections'
import useURLUtils from 'hooks/useURLUtils'
import { baseWrapper } from 'utils/styles'
import hasSignedIn from 'utils/hasSignedIn'

export const URLUtilsContext = createContext()

export default function IndexPage ({ data, location: { pathname, search } }) {
  const [queryValues, dispatch] = useParams(search)
  const collections = useSortedCollections(data, queryValues)
  // const aggregatedTags = useAggregatedTags(collections)
  const urlUtils = useURLUtils(queryValues, pathname, dispatch)

  // TODO: tags sidebar
  // console.log(aggregatedTags)

  if (!hasSignedIn) {
    return (
      <>
        <SEO />
        <Hero />
        <main
          css={theme => css`
            background-color: ${theme.colors.gray100};
            padding: 0 0 3.5rem;

            ${theme.screens.desktop} {
              padding: 3rem 0 2rem;
            }
          `}
          id='main'
        >
          <div
            css={theme => css`
              ${baseWrapper};
              display: flex;

              ${theme.screens.nonDesktop} {
                flex-direction: column;
                padding: 0;
              }
            `}
          >
            <URLUtilsContext.Provider value={urlUtils}>
              <CategoryFilter />
              <Collections collections={collections} />
            </URLUtilsContext.Provider>
          </div>
        </main>
      </>
    )
  }
  return null
}

export const collections = graphql`
  fragment collections on collectionsConnection {
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
`

export const query = graphql`
  query($category: String) {
    allCollections: allCollections(filter: { category: { eq: $category } }) {
      ...collections
    }

    allCollectionsASC: allCollections(
      filter: { category: { eq: $category } }
      sort: { fields: [level], order: ASC }
    ) {
      ...collections
    }

    allCollectionsDESC: allCollections(
      filter: { category: { eq: $category } }
      sort: { fields: [level], order: DESC }
    ) {
      ...collections
    }
  }
`
