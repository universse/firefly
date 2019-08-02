import React, { useReducer, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import produce from 'immer'
import { navigate } from 'gatsby'

import CreateCollection from 'components/CreateCollection'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import ShareDropdown from 'components/ShareDropdown'
import SignUpReminder from 'components/SignUpReminder'
import { BackButton } from 'components/common'
import Icon from 'assets/icons'
import { MediaContext } from 'contexts/Media'
import useOfflinePersistence from 'hooks/useOfflinePersistence'
import LocalStorage from 'constants/LocalStorage'
import {
  bottomBarHeightInRem,
  headerHeightInRem,
  mobileBarsHeightInRem,
  mobileProgressBarHeightInRem,
  screens
} from 'constants/Styles'
import firebaseWorker from 'utils/firebaseWorker'
import { hasSignedIn } from 'utils/localStorageUtils'
import offlineStorageWorker from 'utils/offlineStorageWorker'
import { getParamFromPathname } from 'utils/pathnameUtils'

function reducer (state, { type, payload }) {
  return produce(state, draft => {
    switch (type) {
      case 'load':
        return payload

      case 'set':
        return { ...state, ...payload }

      case 'add-tag':
        draft.tags.push(payload.tag)
        break

      case 'remove-tag':
        draft.tags.splice(draft.tags.findIndex(tag => tag === payload.tag), 1)
        break

      case 'set-url':
        const { index, ...url } = payload
        const urls = draft.urls

        if (index) {
          urls.unshift(url)
        } else {
          const index = urls.findIndex(({ id }) => id === payload.id)
          urls[index] = { ...urls[index], ...url }
        }
        break

      case 'drop-url':
        const { dragIndex, dropIndex } = payload
        if (dragIndex === dropIndex) break

        const dragUrl = draft.urls.splice(dragIndex, 1)[0]
        draft.urls.splice(dropIndex, 0, dragUrl)
        break

      case 'remove-url':
        draft.removed = draft.urls.splice(payload.index, 1)[0]
        break

      case 'undo-remove':
        draft.urls.splice(payload.index, 0, draft.removed)
        break

      default:
        throw new Error('Unknown action type.')
    }
  })
}

function getDraftKey (id) {
  return `${LocalStorage.DRAFT}_${id}`
}

function discard (id) {
  return offlineStorageWorker.removeItem(getDraftKey(id))
}

function publish (collection) {
  const { id } = collection

  return firebaseWorker
    .createCollection(collection)
    .then(() => discard(id))
    .then(() =>
      navigate(`/collection/${id}`, {
        state: { collection }
      })
    )
}

export default function CuratePage ({
  pageContext: { matchPath },
  location: { pathname }
}) {
  const { isDesktop } = useContext(MediaContext)

  const id = getParamFromPathname(pathname, matchPath)
  const [{ removed, ...collection }, dispatch] = useReducer(reducer, {
    id,
    name: '',
    category: 0,
    level: 0,
    urls: [],
    tags: []
  })
  const [hasError, setHasError] = useState(false)

  // TODO fetch draft from firebase
  useEffect(() => {
    id
      ? offlineStorageWorker
          .getItem(getDraftKey(id))
          .then(drafts => dispatch({ type: 'load', payload: drafts[id] }))
      : firebaseWorker
          .generateId('collections')
          .then(id => dispatch({ type: 'set', payload: { id } }))
  }, [id])

  const shouldPersist = collection.name || collection.urls.length

  useOfflinePersistence(
    shouldPersist && {
      [getDraftKey(collection.id)]: collection
    }
  )

  const isPublishable = collection.name && collection.urls.length

  return (
    <>
      <SEO title='Curate a Learning Collection' />
      <MobileHeader navIcon={<BackButton />} shadow title='Curate' />
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
          {!hasSignedIn() ? (
            <CreateCollection collection={collection} dispatch={dispatch} />
          ) : (
            <SignUpReminder />
          )}
        </div>
      </div>
      <div
        css={css`
          background-color: var(--white900);
          border-top: 1px solid var(--black300);
          bottom: 0;
          position: fixed;
          width: 100%;
          z-index: 200;
        `}
      >
        <div
          className='base'
          css={css`
            align-items: center;
            display: flex;
            height: 4rem;
            justify-content: space-between;
            padding-left: 5rem;
          `}
        >
          <div
            css={css`
              align-items: center;
              display: flex;
            `}
          >
            <div
              css={css`
                margin-right: 1.25rem;
              `}
            >
              <button
                aria-label='Publish'
                className='PrimaryButton'
                disabled={!isPublishable}
                onClick={() =>
                  publish(collection).catch(() => setHasError(true))
                }
                style={{ backgroundColor: 'var(--accent500)' }}
                type='button'
              >
                Publish
              </button>
            </div>
            {isDesktop && (
              <div
                css={css`
                  margin-right: 0.5rem;
                `}
              >
                <ShareDropdown name={collection.name} top />
              </div>
            )}
            <button
              aria-label='Invite Collaborators'
              className='IconButton'
              onClick={() => discard(collection.id)}
              type='button'
            >
              <Icon icon='user-plus' />
            </button>
          </div>
          <button
            aria-label='Discard Draft'
            className='IconButton'
            onClick={() => discard(collection.id)}
            type='button'
          >
            <Icon icon='remove' />
          </button>
        </div>
      </div>
    </>
  )
}

CuratePage.propTypes = {
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    matchPath: PropTypes.string.isRequired
  }).isRequired
}
