import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import ShareWidget from './ShareWidget'
import View from './View'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import ShareDropdown from 'components/ShareDropdown'
// import { FABDesktop } from 'components/common'
import { Heart, Info, Save, Share, Suggest } from 'assets/icons'
// import { NormalizedCollectionsContext } from 'contexts/NormalizedCollections'
import { MediaContext } from 'contexts/Media'
import { SetModalContext } from 'contexts/SetModal'
import { UserDataContext } from 'contexts/UserData'
import { UserDataDispatchContext } from 'contexts/UserDataDispatch'
import ModalTypes from 'constants/ModalTypes'
import {
  bottomBarHeightInRem,
  headerHeightInRem,
  mobileBarsHeightInRem,
  mobileProgressBarHeightInRem,
  screens
} from 'constants/Styles'
import { CollectionViewType } from 'constants/Types'
import { logClickAction } from 'utils/amplitude'
import { createActionLabel } from 'utils/ariaLabelUtils'
import { BackButton } from 'components/common'
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
  const setActiveModalType = useContext(SetModalContext)

  const { id, name } = collections

  const { isDesktop } = useContext(MediaContext)

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
        <MobileHeader
          actions={
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
                className='IconButton Heart'
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
              <button
                aria-label='View Collection Details'
                className='IconButton'
                onClick={() => setActiveModalType(ModalTypes.DETAILS)}
                type='button'
              >
                <Info />
              </button>
            </>
          }
          navIcon={<BackButton />}
          shadow
        />
      )}
      <div
        className='base'
        css={css`
          min-height: calc(100vh - ${mobileBarsHeightInRem}rem);

          ${screens.mobile} {
            padding: 0 0
              ${bottomBarHeightInRem + mobileProgressBarHeightInRem}rem;
          }

          ${screens.tablet} {
            padding-bottom: ${bottomBarHeightInRem +
              mobileProgressBarHeightInRem}rem;
          }

          ${screens.desktop} {
            max-width: 64rem;
            min-height: calc(100vh - ${headerHeightInRem}rem);
          }
        `}
      >
        <div
          css={css`
            display: grid;
            grid-gap: 1.5rem;
            grid-template-areas:
              'title'
              'list';
            margin: 1.5rem 0;

            ${screens.desktop} {
              grid-gap: 3rem 1.5rem;
              grid-template-areas:
                '. title title'
                'widget list sidebar';
              grid-template-columns: 2.5rem 1fr 19rem;
              margin: 2.5rem 0 0 0;
            }
          `}
        >
          {userData && (
            <>
              <View check={check} collection={collections} isSaved={isSaved} />
              {isDesktop && (
                <aside
                  css={css`
                    align-self: start;
                    grid-area: widget;

                    ${screens.mobile} {
                      margin-left: 1rem;
                    }

                    ${screens.desktop} {
                      position: sticky;
                      top: ${headerHeightInRem + 1}rem;
                    }
                  `}
                >
                  <ShareWidget
                    id={id}
                    isLoved={isLoved}
                    isSaved={isSaved}
                    name={name}
                  />
                </aside>
              )}
            </>
          )}

          {/* <FABDesktop
              href={`https://docs.google.com/forms/d/e/1FAIpQLSfPo7KFY11Wp0E3IxO6-TxYY6ATHB4Ai-Io-KWRzcPCsqWyDQ/viewform?usp=pp_url&entry.1943859076=${id}`}
            >
              <Suggest />
            </FABDesktop> */}
        </div>
      </div>
    </>
  )
}

CollectionTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    collections: CollectionViewType
  })
}
