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
import TagFilter from 'components/TagFilter'
import { IconButton, Sidebar } from 'components/common'
import { Filter } from 'icons'
import useAggregatedTags from 'hooks/useAggregatedTags'
import useParams from 'hooks/useParams'
import useSortedCollections from 'hooks/useSortedCollections'
import useURLUtils from 'hooks/useURLUtils'
import { baseWrapper, mobileNavigationHeightInRem } from 'utils/styles'
import hasSignedIn from 'utils/hasSignedIn'
import ModalTypes from 'constants/ModalTypes'

export const URLUtilsContext = createContext()

export default function IndexPage ({ data, location: { pathname, search } }) {
  const [queryValues, dispatch] = useParams(search)
  const collections = useSortedCollections(data, queryValues)
  const aggregatedTags = useAggregatedTags(collections, queryValues)
  const urlUtils = useURLUtils(queryValues, pathname, dispatch)
  const { focusable, openModal } = useContext(ModalContext)

  if (!hasSignedIn) {
    return (
      <>
        <SEO />
        <MobileHeader
          actions={
            <IconButton
              aria-label='Filter Collections by Tags'
              onClick={() => openModal(ModalTypes.MOBILE_TAG_FILTER)}
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
                <TagFilter
                  aggregatedTags={aggregatedTags}
                  tags={queryValues.tags}
                />
                <Modal
                  contentLabel='Filter Collections by Tags'
                  type={ModalTypes.MOBILE_TAG_FILTER}
                >
                  <div>
                    <span ref={focusable}>testing</span>
                  </div>
                </Modal>
              </Sidebar>
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
