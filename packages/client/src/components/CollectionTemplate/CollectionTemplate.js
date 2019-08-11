import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import ShareWidget from './ShareWidget'
import CollectionView from './CollectionView'
import { MobileHeader } from 'components/Header'
import Footer from 'components/Footer'
import SEO from 'components/SEO'
import ShareDropdown from 'components/ShareDropdown'
// import { FABDesktop } from 'components/common'
import Icon from 'assets/icons'
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
import { logClickAction } from 'utils/analytics'
import { createActionLabel } from 'utils/ariaLabelUtils'
import { BackButton } from 'components/common'

export default function CollectionTemplate ({
  data: { collections },
  location
}) {
  const userData = useContext(UserDataContext)
  const onActionClick = useContext(UserDataDispatchContext)
  const setActiveModalType = useContext(SetModalContext)

  const { id, name } = collections

  const { isDesktop } = useContext(MediaContext)

  const { check, love, save } = userData || {}
  const isSaved = save && !!save[id]
  const isLoved = love && !!love[id]

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
                <Icon
                  filled={isSaved}
                  icon='save'
                  label={isSaved ? 'unsave' : 'save'}
                />
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
                <Icon
                  filled={isLoved}
                  icon='heart'
                  label={isLoved ? 'unlove' : 'love'}
                />
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
                  <Icon icon='share' />
                </button>
              ) : (
                <ShareDropdown left name={name} />
              )}
              <button
                aria-label='View Collection Details'
                className='IconButton'
                onClick={() => setActiveModalType(ModalTypes.DETAILS)}
                type='button'
              >
                <Icon icon='info' />
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
              <CollectionView
                check={check}
                collection={collections}
                isSaved={isSaved}
              />
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
              <Icon icon='suggest' />
            </FABDesktop> */}
        </div>
      </div>
      <Footer />
    </>
  )
}

CollectionTemplate.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    collections: CollectionViewType
  })
}
