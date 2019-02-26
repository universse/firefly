import React, { createContext, useContext } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import CategoryFilter from 'components/CategoryFilter'
import Collections from 'components/Collections'
import Hero from 'components/Hero'
import { MobileHeader } from 'components/Header'
import Modal from 'components/Modal'
import { ModalContext } from 'components/ModalProvider'
import SEO from 'components/SEO'
import SortByDifficulty, {
  MobileSortByDifficulty
} from 'components/SortByDifficulty'
import TagFilter, { MobileTagFilter } from 'components/TagFilter'
import { MediaContext } from 'components/Media'
import { IconButton, Sidebar } from 'components/common'
import { Filter } from 'icons'
import useAggregatedTags from 'hooks/useAggregatedTags'
import useParams from 'hooks/useParams'
import useFilteredCollections from 'hooks/useFilteredCollections'
import useSortedCollections from 'hooks/useSortedCollections'
import useURLUtils from 'hooks/useURLUtils'
import { baseWrapper, mobileNavigationHeightInRem } from 'utils/styles'
import hasSignedIn from 'utils/hasSignedIn'
import ModalTypes from 'constants/ModalTypes'

export const URLUtilsContext = createContext()

export default function IndexPage ({ data, location: { pathname, search } }) {
  const [queryValues, dispatch] = useParams(search)

  const { sort, tags } = queryValues

  // TODO: delete after add data
  const filteredCollections = useFilteredCollections(
    data.allCollections ? data.allCollections.edges : [],
    tags
  )
  const sortedCollections = useSortedCollections(filteredCollections, sort)
  const aggregatedTags = useAggregatedTags(filteredCollections, tags)
  const urlUtils = useURLUtils(queryValues, pathname, dispatch)
  const { openModal } = useContext(ModalContext)
  const isDesktop = useContext(MediaContext)

  if (!hasSignedIn) {
    return (
      <>
        <SEO />
        <MobileHeader
          actions={
            <IconButton
              aria-label='Filter Collections by Tags'
              onClick={() => openModal(ModalTypes.MOBILE_FILTER)}
            >
              <Filter />
            </IconButton>
          }
          title='Collections'
        />
        <Hero />
        <main
          css={theme => css`
            background-color: ${theme.colors.gray100};
            padding: 0 0 ${mobileNavigationHeightInRem}rem;

            ${theme.screens.desktop} {
              padding: 2rem 0;
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

              ${theme.screens.desktop} {
                justify-content: space-between;
              }
            `}
          >
            <URLUtilsContext.Provider value={urlUtils}>
              <Sidebar>
                <CategoryFilter />
                {isDesktop && (
                  <TagFilter aggregatedTags={aggregatedTags} tags={tags} />
                )}
              </Sidebar>
              {!isDesktop && (
                <Modal
                  className='FilterModal'
                  contentLabel='Filter Collections by Tags'
                  type={ModalTypes.MOBILE_FILTER}
                >
                  <MobileSortByDifficulty sort={sort} />
                  <MobileTagFilter
                    aggregatedTags={aggregatedTags}
                    tags={tags}
                  />
                </Modal>
              )}
              <div
                css={theme => css`
                  height: 100%;
                  width: 100%;

                  ${theme.screens.desktop} {
                    margin-top: 1rem;
                    width: 70%;
                  }
                `}
              >
                {isDesktop && <SortByDifficulty sort={sort} />}
                <Collections collections={sortedCollections} />
              </div>
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
