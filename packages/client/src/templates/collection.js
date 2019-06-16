import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import CollectionView from 'components/CollectionView'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import ShareDropdown from 'components/ShareDropdown'
// import { FABDesktop } from 'components/common'
import { Back, Heart, Save, Share, Suggest } from 'icons'
// import { NormalizedCollectionsContext } from 'contexts/NormalizedCollections'
import { UserDataContext } from 'contexts/UserData'
import { UserDataDispatchContext } from 'contexts/UserDataDispatch'
import AriaLabels from 'constants/AriaLabels'
import {
  headerHeightInRem,
  mobileHeaderHeightInRem,
  mobileProgressBarHeight,
  screens
} from 'constants/Styles'
import { CollectionViewType } from 'constants/Types'
import { logClickAction } from 'utils/amplitudeUtils'
import { createActionLabel } from 'utils/ariaLabelUtils'
// import firebaseWorker from 'utils/firebaseWorker'
import goBack from 'utils/goBack'
// import parseCollectionData from 'utils/parseCollectionData'
// import { getParamFromPathname } from 'utils/pathnameUtils'
// import { createCollectionPath } from '../../gatsby/utils'

export default function CollectionTemplate ({
  data: { collections },
  location
}) {
  // const normalizedCollections = useContext(NormalizedCollectionsContext)
  // const [collection, setCollection] = useState(
  //   () => collections || (location.state && location.state.collection)
  // )

  // const [isLoading, setIsLoading] = useState(!collection)
  // const [hasError, setHasError] = useState(false)

  const userData = useContext(UserDataContext)
  const onActionClick = useContext(UserDataDispatchContext)

  const { id, name } = collections

  // const { id, name } = collection || {
  //   id: getParamFromPathname(location.pathname)
  // }

  const { check, love, save } = userData || {}
  const isSaved = save && !!save[id]
  const isLoved = love && !!love[id]

  // useEffect(() => {
  //   if (!normalizedCollections || collection) {
  //     return
  //   }

  //   if (normalizedCollections[id.toLowerCase()]) {
  //     const { name } = normalizedCollections[id.toLowerCase()]
  //     navigate(createCollectionPath({ id, name }), { replace: true })
  //     return
  //   }

  //   firebaseWorker
  //     .fetchCollection(id)
  //     .then(collection => setCollection(parseCollectionData(collection)))
  //     .catch(() => setHasError(true))
  //     .finally(() => setIsLoading(false))
  // }, [collection, id, normalizedCollections])

  return (
    <>
      <SEO title={name || 'Collection'} />
      {userData && (
        <>
          <MobileHeader
            actions={
              collections && (
                <>
                  <button
                    aria-label={createActionLabel(
                      isSaved ? 'unsave' : 'save',
                      name
                    )}
                    className='IconButton'
                    onClick={onActionClick}
                    type='button'
                    value={id}
                  >
                    <Save filled={isSaved} />
                  </button>
                  <button
                    aria-label={createActionLabel(
                      isLoved ? 'unlove' : 'love',
                      name
                    )}
                    className='IconButton'
                    onClick={onActionClick}
                    type='button'
                    value={id}
                  >
                    <Heart filled={isLoved} />
                  </button>
                  {navigator.share ? (
                    <button
                      aria-label='Share'
                      className='IconButton'
                      onClick={e => {
                        logClickAction({
                          id,
                          action: e.currentTarget.textContent
                        })
                        navigator.share({ text: name, url: location.href })
                      }}
                      type='button'
                    >
                      <Share />
                    </button>
                  ) : (
                    <ShareDropdown name={name} />
                  )}
                </>
              )
            }
            navIcon={
              <button
                aria-label={AriaLabels.GO_BACK}
                className='IconButton'
                onClick={goBack}
                type='button'
              >
                <Back />
              </button>
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
            id='main'
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
              {collections && (
                <CollectionView
                  check={check}
                  collection={collections}
                  isLoved={isLoved}
                  isSaved={isSaved}
                />
              )}
            </div>
            {/* <FABDesktop
              href={`https://docs.google.com/forms/d/e/1FAIpQLSfPo7KFY11Wp0E3IxO6-TxYY6ATHB4Ai-Io-KWRzcPCsqWyDQ/viewform?usp=pp_url&entry.1943859076=${id}`}
            >
              <Suggest />
            </FABDesktop> */}
          </main>
        </>
      )}
    </>
  )
}

CollectionTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    collections: CollectionViewType
  })
}

export const query = graphql`
  query($id: String!) {
    collections(id: { eq: $id }) {
      id
      category
      name
      level
      tags
      urls {
        id
        # image
        # publisher
        title
        type
        url
      }
    }
  }
`
