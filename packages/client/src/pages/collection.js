import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { navigate } from 'gatsby'

import CollectionView from 'components/CollectionView'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import { IconButton } from 'components/common'
import { AllCollectionsContext } from 'contexts/AllCollections'
import { FirebaseContext } from 'contexts/Firebase'
import { UserDataContext } from 'contexts/UserData'
import { UserDataDispatchContext } from 'contexts/UserDataDispatch'
import { Back, Heart, Save } from 'icons'
import AriaLabels from 'constants/AriaLabels'
import {
  headerHeightInRem,
  mobileHeaderHeightInRem,
  mobileProgressBarHeight,
  screens
} from 'constants/Styles'
import { createActionLabel } from 'utils/ariaLabelUtils'
import goBack from 'utils/goBack'
import parseCollectionData from 'utils/parseCollectionData'
import { getParamFromPathname } from 'utils/pathnameUtils'
import { createCollectionPath } from '../../gatsby/utils'

export default function CollectionPage ({ location }) {
  const { normalizedCollections } = useContext(AllCollectionsContext)
  const userData = useContext(UserDataContext)
  const onActionClick = useContext(UserDataDispatchContext)

  const id = getParamFromPathname(location.pathname)
  const { check, love, save } = userData || {}
  const isSaved = save && !!save[id]
  const isLoved = love && !!love[id]

  const firebase = useContext(FirebaseContext)

  const [collection, setCollection] = useState(
    () => location.state && location.state.collection
  )
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!normalizedCollections || collection) {
      return
    }

    if (normalizedCollections[id.toLowerCase()]) {
      const { name } = normalizedCollections[id.toLowerCase()]
      navigate(createCollectionPath({ id, name }), { replace: true })
      return
    }

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
      {userData && (
        <>
          <MobileHeader
            actions={
              collection && (
                <>
                  <IconButton
                    aria-label={createActionLabel(
                      isSaved ? 'unsave' : 'save',
                      collection.name
                    )}
                    onClick={onActionClick}
                    value={id}
                  >
                    <Save filled={isSaved} />
                  </IconButton>
                  {/* v3 */}
                  {/* <IconButton
                    aria-label={createActionLabel(
                      isLoved ? 'unlove' : 'love',
                      collection.name
                    )}
                    onClick={onActionClick}
                    value={id}
                  >
                    <Heart filled={isLoved} />
                  </IconButton> */}
                  {/* <IconButton
                    aria-label='Share'
                    onClick={() => copyToClipboard(href)}
                  >
                    <Share />
                  </IconButton> */}
                </>
              )
            }
            navIcon={
              <IconButton aria-label={AriaLabels.GO_BACK} onClick={goBack}>
                <Back />
              </IconButton>
            }
            shadow
            title='Collection'
          />
          <main
            css={css`
              background-color: var(--colors-gray100);
              min-height: calc(100vh - ${mobileHeaderHeightInRem + 2.25}rem);
              padding: 0 0 ${mobileProgressBarHeight + 1}rem;

              ${screens.nonMobile} {
                padding: 1rem 0 ${mobileProgressBarHeight + 1}rem;
              }

              ${screens.desktop} {
                min-height: calc(100vh - ${headerHeightInRem}rem);
                padding: 2rem 0;
              }
            `}
          >
            <div
              className='base'
              css={css`
                max-width: 50rem;

                ${screens.mobile} {
                  padding: 0;
                }
              `}
            >
              {collection && (
                <CollectionView
                  check={check}
                  collection={collection}
                  isLoved={isLoved}
                  isSaved={isSaved}
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

CollectionPage.propTypes = {
  location: PropTypes.object.isRequired
}
