import React, { useReducer, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import produce from 'immer'
import { navigate } from 'gatsby'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import DraggableItem from './DraggableItem'
import DragLayer from './DragLayer'
import LearningItemInput from './LearningItemInput'
import TagInput from './TagInput'
import Details from 'components/CollectionTemplate/Details'
import ShareDropdown from 'components/ShareDropdown'
import Icon from 'assets/icons'
import { MediaContext } from 'contexts/Media'
import useOfflinePersistence from 'hooks/useOfflinePersistence'
import DropdownOptions from 'constants/DropdownOptions'
import LocalStorage from 'constants/LocalStorage'
import {
  bottomBarHeightInRem,
  headerHeightInRem,
  mobileBarsHeightInRem,
  mobileProgressBarHeightInRem,
  screens
} from 'constants/Styles'
import firebaseWorker from 'utils/firebaseWorker'
import offlineStorageWorker from 'utils/offlineStorageWorker'

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
        draft.tags.splice(payload.index, 1)
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

export default function Curation ({ id }) {
  const { isDesktop } = useContext(MediaContext)

  const [{ removed, ...collection }, dispatch] = useReducer(reducer, {
    id,
    name: '',
    category: 0,
    level: 0,
    urls: [],
    tags: []
  })
  const { name, category, level, urls, tags } = collection

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
          <div
            css={css`
              grid-area: title;

              ${screens.mobile} {
                margin: 0 1rem;
              }
            `}
          >
            <input
              aria-label='Collection Title'
              autoComplete='off'
              css={css`
                color: var(--black900);
                font-size: 1.5rem;
                font-weight: 700;
                line-height: 2rem;
                width: 100%;

                ${screens.desktop} {
                  font-size: 2rem;
                  line-height: 2.5rem;
                }
              `}
              name='title'
              onChange={e =>
                dispatch({
                  type: 'set',
                  payload: { name: e.target.value }
                })
              }
              placeholder='A Super Catchy Title'
              type='text'
              value={name}
            />
          </div>
          <div
            css={css`
              align-self: start;
              grid-area: sidebar;
              position: sticky;
              top: ${headerHeightInRem + 1}rem;
            `}
          >
            <Details category={'test'} level={level} tags={tags} />
          </div>
          {/* tag popular tags for different category */}
          {/* url */}
          <div
            css={css`
              grid-area: list;
            `}
          >
            <div
              css={css`
                position: relative;
              `}
            >
              <div
                css={css`
                  border: 1px solid var(--black300);
                  border-radius: 4px;
                  margin-bottom: 2rem;
                  padding: 1.5rem 1rem;
                `}
              >
                <LearningItemInput dispatch={dispatch} index={-1} />
              </div>
            </div>
            <DndProvider backend={HTML5Backend}>
              <ul className='LearningList'>
                {urls.map((url, i) => (
                  <DraggableItem
                    key={url.id}
                    dispatch={dispatch}
                    index={i}
                    {...url}
                  />
                ))}
              </ul>
              <DragLayer />
            </DndProvider>
          </div>
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
                className='PrimaryButton accent'
                disabled={!isPublishable}
                onClick={() =>
                  publish(collection).catch(() => setHasError(true))
                }
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
              onClick={() => {}}
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

Curation.propTypes = {
  id: PropTypes.string.isRequired
}