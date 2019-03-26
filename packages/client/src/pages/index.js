import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import CategoryFilter from 'components/CategoryFilter'
import Collections from 'components/Collections'
import Modal from 'components/Modal'
import SortByDifficulty, {
  MobileSortByDifficulty
} from 'components/SortByDifficulty'
import TagFilter, { MobileTagFilter } from 'components/TagFilter'
import { AllCollectionsContext } from 'contexts/AllCollections'
import { URLQueryContext } from 'contexts/URLQuery'
import { MediaContext } from 'contexts/Media'
import { Sidebar } from 'components/common'
import useAggregatedTags from 'hooks/useAggregatedTags'
import useFilteredCollections from 'hooks/useFilteredCollections'
import useSortedCollections from 'hooks/useSortedCollections'

import ModalTypes from 'constants/ModalTypes'

export default function IndexPage ({ data }) {
  const isDesktop = useContext(MediaContext)
  const { sort, tags } = useContext(URLQueryContext)
  const allCollections = useContext(AllCollectionsContext)
  const filteredCollections = useFilteredCollections(
    data.allCollections.edges.length
      ? data.allCollections.edges
      : allCollections,
    tags
  )
  const sortedCollections = useSortedCollections(filteredCollections, sort)
  const aggregatedTags = useAggregatedTags(filteredCollections, tags)

  return (
    <>
      {isDesktop && (
        <Sidebar>
          <CategoryFilter />
          <TagFilter aggregatedTags={aggregatedTags} tags={tags} />
        </Sidebar>
      )}
      {!isDesktop && (
        <Modal
          className='FilterModal'
          contentLabel='Filter Collections by Tags'
          type={ModalTypes.MOBILE_FILTER}
        >
          <MobileSortByDifficulty sort={sort} />
          <MobileTagFilter aggregatedTags={aggregatedTags} tags={tags} />
        </Modal>
      )}
      <div
        css={theme => css`
          height: 100%;
          width: 100%;

          ${theme.screens.desktop} {
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

export const collections = graphql`
  fragment collections on collectionsConnection {
    edges {
      node {
        id
        category
        level
        name
        numOfItems
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
