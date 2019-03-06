import React, { useState, useEffect, useContext } from 'react'
import { css } from '@emotion/core'
import { navigate } from 'gatsby'

import CollectionView from 'components/CollectionView'
import { MobileHeader } from 'components/Header'
import { NormalizedCollectionsContext } from 'components/NormalizedCollections'
import SEO from 'components/SEO'
import { IconButton } from 'components/common'
import FirebaseContext from 'contexts/FirebaseContext'
import { Back, Save, Share } from 'icons'
import useSavedCollections from 'hooks/useSavedCollections'
import {
  baseWrapper,
  headerHeightInRem,
  mobileHeaderHeightInRem
} from 'utils/styles'
import copyToClipboard from 'utils/copyToClipboard'
import parseCollectionData from 'utils/parseCollectionData'
import { createCollectionPath } from '../../gatsby/utils'

const getCollectionIdFromPathname = pathname => {
  const normalizedPathname = pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname

  return normalizedPathname
    .split('/')
    .pop()
    .toLowerCase()
}

export default function CollectionPage ({ location }) {
  const normalizedCollections = useContext(NormalizedCollectionsContext)
  const [savedCollections, onSaveClick] = useSavedCollections()
  const firebase = useContext(FirebaseContext)

  const id = getCollectionIdFromPathname(location.pathname)

  const [collection, setCollection] = useState(
    () => location.state && location.state.collection
  )
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!normalizedCollections || collection) {
      return
    }

    if (normalizedCollections[id]) {
      const { name } = normalizedCollections[id]
      navigate(createCollectionPath({ id, name }), { replace: true })
      return
    }

    // 5dJtAc6eJIenU7g9nO4F
    firebase
      .fetchCollection(id)
      .then(({ collection, error }) =>
        error
          ? setHasError(true)
          : setCollection(parseCollectionData(collection))
      )
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false))
  }, [collection, firebase, id, normalizedCollections])

  return (
    <>
      <SEO title='Collection' />
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
            <div
              css={theme => css`
                ${baseWrapper};
                max-width: 50rem;

                ${theme.screens.mobile} {
                  padding: 0 0 1rem;
                }
              `}
            >
              {collection && (
                <CollectionView
                  collection={collection}
                  onSaveClick={onSaveClick}
                  savedCollections={savedCollections}
                />
              )}
              {hasError && 'error'}
              {isLoading && 'loading'}
            </div>
          </main>
        </>
      )}
    </>
  )
}
