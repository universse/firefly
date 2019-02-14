import React, { createContext, useMemo } from 'react'
import { graphql, navigate } from 'gatsby'
import { css } from '@emotion/core'
import qs from 'qs'

import Hero from 'components/Hero'
import Collections from 'components/Collections'
import CategoryFilter from 'components/CategoryFilter'
import SEO from 'components/SEO'
import useParams from 'hooks/useParams'
import useSortedCollections from 'hooks/useSortedCollections'
import { baseWrapper } from 'utils/styles'
import hasSignedIn from 'utils/hasSignedIn'

export const URLUtilsContext = createContext()

export default function IndexPage ({ data, location: { pathname, search } }) {
  const [queryValues, dispatch] = useParams(search)
  const collections = useSortedCollections(data, queryValues)
  const { sort, tags } = queryValues

  const urlUtils = useMemo(() => {
    const constructUrl = tag => {
      const updatedTags = tags.includes(tag)
        ? tags.filter(t => t !== tag)
        : [...tags, tag]

      if (updatedTags.length === 0) {
        return { href: pathname, updatedTags }
      } else {
        const queryString = qs.stringify(
          { tags: updatedTags.join(',') },
          { encode: false }
        )
        return {
          href: `${pathname}?${queryString}`,
          updatedTags
        }
      }
    }

    return {
      constructUrl,
      updateQuery: tag => {
        const { href, updatedTags } = constructUrl(tag)
        navigate(href)
        dispatch({ payload: { sort, tags: updatedTags } })
      },
      onFilterClick: () => dispatch({ payload: { sort, tags: [] } })
    }
  }, [queryValues])

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
