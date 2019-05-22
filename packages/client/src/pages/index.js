import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import CategoryFilter from 'components/CategoryFilter'
import Collections from 'components/Collections'
import MobileFilters from 'components/MobileFilters'
import SortByDifficulty from 'components/SortByDifficulty'
import TagFilter from 'components/TagFilter'
import { URLParamsContext } from 'contexts/URLParams'
import { MediaContext } from 'contexts/Media'
import { Sidebar } from 'components/common'
import useFilteredCollections from 'hooks/useFilteredCollections'
import useSortedCollections from 'hooks/useSortedCollections'
import { CollectionsType } from 'constants/Types'
import { screens } from 'constants/Styles'

export default function IndexPage ({ data }) {
  const isDesktop = useContext(MediaContext)
  const {
    query: { sort, tags }
  } = useContext(URLParamsContext)

  const { aggregatedTags, filteredCollections } = useFilteredCollections(
    data.allCollections.edges,
    tags
  )

  const sortedCollections = useSortedCollections(filteredCollections, sort)

  return (
    <>
      {isDesktop && (
        <Sidebar>
          <CategoryFilter />
          <TagFilter aggregatedTags={aggregatedTags} />
        </Sidebar>
      )}
      {!isDesktop && <MobileFilters aggregatedTags={aggregatedTags} />}
      <div
        css={css`
          height: 100%;
          width: 100%;

          ${screens.desktop} {
            width: 70%;
          }
        `}
      >
        {isDesktop && (
          <div
            css={css`
              align-items: center;
              display: flex;
              justify-content: flex-end;
              margin-bottom: 0.75rem;
            `}
          >
            <SortByDifficulty sort={sort} />
          </div>
        )}
        <Collections collections={sortedCollections} />
      </div>
    </>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({ edges: CollectionsType }).isRequired
}

export const collections = graphql`
  fragment collections on collectionsConnection {
    edges {
      node {
        id
        category
        level
        name
        itemCount
        tags
      }
    }
  }
`

export const query = graphql`
  query($category: String) {
    allCollections(filter: { category: { eq: $category } }) {
      ...collections
    }
  }
`
