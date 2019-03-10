import React, { useContext, memo } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import CategoryFilter from 'components/CategoryFilter'
import Collections from 'components/Collections'
import Hero from 'components/Hero'
import { MobileHeader } from 'components/Header'
import Modal from 'components/Modal'
import SEO from 'components/SEO'
import SortByDifficulty, {
  MobileSortByDifficulty
} from 'components/SortByDifficulty'
import TagFilter, { MobileTagFilter } from 'components/TagFilter'
import { AllCollectionsContext } from 'contexts/AllCollections'
import Media from 'contexts/Media'
import { ModalContext } from 'contexts/Modal'
import { URLUtilsContext } from 'contexts/URLUtils'
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

const IndexPage = memo(function ({
  data,
  location: { pathname, search },
  openModal
}) {
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

  // TODO create collection
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
                    <div
                      css={css`
                        align-items: center;
                        display: flex;
                        justify-content: flex-end;
                        margin-bottom: 0.75rem;
                      `}
                    >
                      {isDesktop && <SortByDifficulty sort={sort} />}
                    </div>
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
})

export default function (props) {
  const { openModal } = useContext(ModalContext)

  return <IndexPage {...props} openModal={openModal} />
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
