import React, { useState, useEffect, useContext } from 'react'
import { css } from '@emotion/core'
import { navigate } from 'gatsby'
import { Categories, ItemTypes } from 'common'

import CollectionView from 'components/CollectionView'
import { MobileHeader } from 'components/Header'
import { NormalizedCollectionsContext } from 'components/NormalizedCollections'
import SEO from 'components/SEO'
import { IconButton } from 'components/common'
import FirebaseContext from 'contexts/FirebaseContext'
import { Back, Save, Share } from 'icons'
import useIsFirstMount from 'hooks/useIsFirstMount'
import useSavedCollections from 'hooks/useSavedCollections'
import {
  baseWrapper,
  headerHeightInRem,
  mobileHeaderHeightInRem
} from 'utils/styles'
import copyToClipboard from 'utils/copyToClipboard'
import { createCollectionPath } from '../../gatsby/utils'

const parseCollectionData = ({ c, l, n, s, t, us }) => ({
  category: Categories[c],
  level: l,
  name: n,
  numOfItems: us.length,
  suggestions: s,
  tags: t,
  urls: us.map(({ id, ti, ty, u }) => ({
    id,
    title: ti,
    url: u,
    type: ItemTypes[ty]
  }))
})

export default function CollectionPage ({ location }) {
  const normalizedCollections = useContext(NormalizedCollectionsContext)
  const [savedCollections, onSaveClick] = useSavedCollections()

  const firebase = useContext(FirebaseContext)
  const pathname = location.pathname
  const id = pathname.substring(pathname.lastIndexOf('/') + 1)

  const [collection, setCollection] = useState(
    () => location.state && location.state.collection
  )

  const [hasError, setHasError] = useState(false)

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

    // 5dJtAc6eJIenU7g9nO4F
    firebase
      .fetchCollection(id)
      .then(result =>
        result.error
          ? setHasError(true)
          : setCollection(parseCollectionData(result))
      )
      .catch(setHasError)
  }, [firebase, id, isFirstMount, normalizedCollections])

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
            ) : (
              // TODO error screen
              'loading'
            )}
          </main>
        </>
      )}
    </>
  )
}
