import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import CollectionView from 'components/CollectionView'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import { IconButton } from 'components/common'
import { Back, Save, Share } from 'icons'
import useSavedCollections from 'hooks/useSavedCollections'
import {
  baseWrapper,
  headerHeightInRem,
  mobileBarsHeightInRem
} from 'utils/styles'
import copyToClipboard from 'utils/copyToClipboard'

export default function ({ data: { collections }, location: { href } }) {
  const [savedCollections, onSaveClick] = useSavedCollections()
  const { id, name } = collections

  return (
    <>
      <SEO title={name} />
      {savedCollections && (
        <>
          <MobileHeader
            actions={
              <>
                <IconButton
                  aria-label='Save to My Library'
                  onClick={onSaveClick}
                  value={id}
                >
                  <Save filled={!!savedCollections[id]} />
                </IconButton>
                <IconButton
                  aria-label='Share'
                  onClick={() => copyToClipboard(href)}
                >
                  <Share />
                </IconButton>
              </>
            }
            navIcon={
              <IconButton
                aria-label='Go Back to Previous Screen'
                onClick={() => window.history.back()}
              >
                <Back />
              </IconButton>
            }
            title='Collection'
          />
          <main
            css={theme => css`
              background-color: ${theme.colors.gray100};
              min-height: calc(100vh - ${headerHeightInRem}rem);
              padding: 2rem 0;

              ${theme.screens.nonDesktop} {
                min-height: calc(100vh - ${mobileBarsHeightInRem}rem);
                padding: 1rem 0;
              }
            `}
          >
            <div
              css={theme => css`
                ${baseWrapper};
                max-width: 50rem;

                ${theme.screens.mobile} {
                  padding: 0;
                }
              `}
            >
              <CollectionView
                collection={collections}
                onSaveClick={onSaveClick}
                savedCollections={savedCollections}
              />
            </div>
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
