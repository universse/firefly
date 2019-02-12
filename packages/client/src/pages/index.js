import React, { createContext, useMemo } from 'react'
import { graphql, navigate } from 'gatsby'
import { css } from '@emotion/core'
import qs from 'qs'

import Hero from 'components/Hero'
import Collections from 'components/Collections'
import CategoryFilter from 'components/CategoryFilter'
import useTags from 'hooks/useTags'
import { baseWrapper } from 'utils/styles'
import hasSignedIn from 'utils/hasSignedIn'

export const URLUtilsContext = createContext()

export default function IndexPage ({ data, location }) {
  const { pathname, search } = location
  const [tags, setTags] = useTags(search)

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

  const updateQuery = tag => {
    const { href, updatedTags } = constructUrl(tag)
    navigate(href)
    setTags(updatedTags)
  }

  const collections = useMemo(
    () =>
      data.allCollections.edges.filter(collection =>
        tags.reduce(
          (bool, tag) => bool && collection.node.tags.includes(tag),
          true
        )
      ),
    [data, tags]
  )

  const onFilterClick = () => setTags([])

  if (!hasSignedIn) {
    return (
      <>
        <Hero />
        <main
          css={theme => css`
            background-color: ${theme.colors.gray100};
            padding: 0 0 3.5rem;

            ${theme.screens.desktop} {
              padding: 3rem 0;
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
            <URLUtilsContext.Provider
              value={{ updateQuery, constructUrl, onFilterClick }}
            >
              <CategoryFilter />
              <Collections
                collections={[
                  ...collections,
                  ...collections,
                  ...collections,
                  ...collections,
                  ...collections,
                  ...collections,
                  ...collections,
                  ...collections,
                  ...collections,
                  ...collections,
                  ...collections,
                  ...collections
                ]}
              />
            </URLUtilsContext.Provider>
          </div>
        </main>
      </>
    )
  }
  return null
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
