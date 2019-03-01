import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { navigate } from 'gatsby'

import CollectionView from 'components/CollectionView'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import { IconButton } from 'components/common'
import FirebaseContext from 'contexts/FirebaseContext'
import { Back, Save, Share } from 'icons'
import useIsFirstMount from 'hooks/useIsFirstMount'
import useNormalizedCollections from 'hooks/useNormalizedCollections'
import useSavedCollections from 'hooks/useSavedCollections'
import {
  baseWrapper,
  headerHeightInRem,
  mobileHeaderHeightInRem
} from 'utils/styles'
import copyToClipboard from 'utils/copyToClipboard'
import { createCollectionPath } from '../../gatsby/utils'

export default function NewCollectionPage ({ location }) {
  const normalizedCollections = useNormalizedCollections()
  const [savedCollections, onSaveClick] = useSavedCollections()

  // const firebase = useContext(FirebaseContext)
  const pathname = location.pathname
  const id = pathname.substring(pathname.lastIndexOf('/') + 1)

  const [collection, setCollection] = useState(
    () => location.state && location.state.collection
  )

  const isFirstMount = useIsFirstMount()

  useEffect(() => {
    if (isFirstMount) {
      return
    }

    if (normalizedCollections[id]) {
      const { name } = normalizedCollections[id]
      navigate(createCollectionPath({ id, name }), { replace: true })
      return
    }

    console.log('firebase')
    // firebase.fetchCollection(id).then(collection => setCollection(collection))
  }, [id, isFirstMount, normalizedCollections])

  return (
    <>
      <SEO title='New Collection' />
      {savedCollections && (
        <>
          <MobileHeader
            actions={
              collection && (
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
                    onClick={() => copyToClipboard(location.href)}
                  >
                    <Share />
                  </IconButton>
                </>
              )
            }
            navIcon={
              <IconButton
                aria-label='Go Back to Previous Screen'
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
            {collection ? (
              <div
                css={theme => css`
                  ${baseWrapper};
                  max-width: 50rem;

                  ${theme.screens.mobile} {
                    padding: 0 0 1rem;
                  }
                `}
              >
                <CollectionView
                  collection={collection}
                  onSaveClick={onSaveClick}
                  savedCollections={savedCollections}
                />
              </div>
            ) : // TODO error screen
            null}
          </main>
        </>
      )}
    </>
  )
}
