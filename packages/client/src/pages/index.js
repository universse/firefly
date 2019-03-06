import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import { AllCollectionsContext } from 'components/AllCollections'
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
import Media from 'components/Media'
import URLUtilsContext from 'contexts/URLUtilsContext'
import { IconButton, Sidebar } from 'components/common'
import { Filter } from 'icons'
import useAggregatedTags from 'hooks/useAggregatedTags'
import useParams from 'hooks/useParams'
import useFilteredCollections from 'hooks/useFilteredCollections'
import useSortedCollections from 'hooks/useSortedCollections'
import useURLUtils from 'hooks/useURLUtils'
import {
  baseWrapper,
  headerHeightInRem,
  mobileNavigationHeightInRem
} from 'utils/styles'
import ModalTypes from 'constants/ModalTypes'

export default function IndexPage ({ data, location: { pathname, search } }) {
  const [queryValues, dispatch] = useParams(search)
  const { sort, tags } = queryValues
  const allCollections = useContext(AllCollectionsContext)
  const filteredCollections = useFilteredCollections(
    data.allCollections ? data.allCollections.edges : allCollections,
    tags
  )
  const sortedCollections = useSortedCollections(filteredCollections, sort)
  const aggregatedTags = useAggregatedTags(filteredCollections, tags)
  const urlUtils = useURLUtils(queryValues, pathname, dispatch)
  const { openModal } = useContext(ModalContext)

  return (
    <>
      <SEO />
      <Hero />
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
      <main
        css={theme => css`
          background-color: ${theme.colors.gray100};
          min-height: calc(100vh - ${headerHeightInRem}rem);
          padding: 0 0 ${mobileNavigationHeightInRem}rem;

          ${theme.screens.desktop} {
            padding: 2rem 0;
          }
        `}
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
            <Media>
              {isDesktop => (
                <>
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
                        width: 70%;
                      }
                    `}
                  >
                    {isDesktop && <SortByDifficulty sort={sort} />}
                    <Collections collections={sortedCollections} />
                  </div>
                </>
              )}
            </Media>
          </URLUtilsContext.Provider>
        </div>
      </main>
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
