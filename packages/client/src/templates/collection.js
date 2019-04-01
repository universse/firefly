import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import CollectionView from 'components/CollectionView'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import { FABDesktop, IconButton } from 'components/common'
import { LovedCollectionsContext } from 'contexts/LovedCollections'
import { SavedCollectionsContext } from 'contexts/SavedCollections'
import { Back, Heart, Save, Share, Suggest } from 'icons'
import AriaLabels from 'constants/AriaLabels'
import { headerHeightInRem, mobileHeaderHeightInRem } from 'constants/Styles'
import {
  createLoveCollectionLabel,
  createSaveCollectionLabel
} from 'utils/ariaLabelUtils'
import copyToClipboard from 'utils/copyToClipboard'

export default function CollectionTemplate ({
  data: { collections },
  location: { href }
}) {
  const [savedCollections, onSaveClick] = useContext(SavedCollectionsContext)
  const [lovedCollections, onLoveClick] = useContext(LovedCollectionsContext)

  const { id, name } = collections

  return (
    <>
      <SEO title={name} />
      {savedCollections && lovedCollections && (
        <>
          <MobileHeader
            actions={
              <>
                <IconButton
                  aria-label={createSaveCollectionLabel(name)}
                  onClick={onSaveClick}
                  value={id}
                >
                  <Save filled={!!savedCollections[id]} />
                </IconButton>
                {/* <IconButton
                  aria-label={createLoveCollectionLabel(name)}
                  onClick={onLoveClick}
                  value={id}
                >
                  <Heart filled={!!lovedCollections[id]} />
                </IconButton> */}
                {/* <IconButton
                  aria-label='Share'
                  onClick={() => copyToClipboard(href)}
                >
                  <Share />
                </IconButton> */}
              </>
            }
            navIcon={
              <IconButton
                aria-label={AriaLabels.GO_BACK}
                onClick={() => window.history.back()}
              >
                <Back />
              </IconButton>
            }
            shadow
            title='Collection'
          />
          <main
            css={theme => css`
              background-color: ${theme.colors.gray100};
              min-height: calc(100vh - ${mobileHeaderHeightInRem + 2.25}rem);

              ${theme.screens.nonMobile} {
                padding: 1rem 0;
              }

              ${theme.screens.desktop} {
                min-height: calc(100vh - ${headerHeightInRem}rem);
                padding: 2rem 0;
              }
            `}
          >
            <div
              className='base'
              css={theme => css`
                max-width: 50rem;

                ${theme.screens.mobile} {
                  padding: 0 0 1rem;
                }
              `}
            >
              <CollectionView
                collection={collections}
                savedCollections={savedCollections}
              />
            </div>
            <FABDesktop href='https://docs.google.com/forms/'>
              <Suggest />
            </FABDesktop>
          </main>
        </>
      )}
    </>
  )
}

export const query = graphql`
  query($id: String!) {
    collections(id: { eq: $id }) {
      id
      name
      category
      level
      urls {
        id
        title
        type
        url
      }
      tags
      suggestions
    }
  }
`
