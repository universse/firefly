import React, { useReducer, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import produce from 'immer'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import BottomActionBar from './BottomActionBar'
import DetailsInput from './DetailsInput'
import DraggableItem from './DraggableItem'
import DragLayer from './DragLayer'
import LearningItemInput from './LearningItemInput'
import { headerHeightInRem, screens } from 'constants/Styles'
import firebaseWorker from 'utils/firebaseWorker'

const { generateId, saveDraft } = firebaseWorker

function reducer (state, { type, payload }) {
  return produce(state, draft => {
    switch (type) {
      case 'load':
        return payload

      case 'set':
        const [key, value] = Object.entries(payload)[0]
        draft[key] = value
        break

      case 'add-tag':
        draft.tags.push(payload.tag)
        break

      case 'remove-tag':
        draft.removed = draft.tags.splice(payload.index, 1)[0]
        break

      case 'undo-remove-tag':
        draft.tags.splice(payload.index, 0, draft.removed)
        break

      case 'set-url':
        const { index, ...url } = payload
        const urls = draft.urls

        if (index) {
          urls.push(url)
        } else {
          const index = urls.findIndex(({ id }) => id === payload.id)
          urls[index] = url
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
        delete draft.removed
        break

      default:
        throw new Error('Unknown action type.')
    }
  })
}

export default function Curation ({ id, draft, initialIsAuthorized }) {
  const [{ removed, ...collection }, dispatch] = useReducer(reducer, {
    id,
    name: '',
    category: 0,
    level: 0,
    urls: [],
    tags: [],
    ...draft
  })
  const { name, category, level, urls, tags } = collection
  const [isAuthorized, setIsAuthorized] = useState(initialIsAuthorized)

  useEffect(() => {
    !id &&
      generateId('collections').then(id => {
        dispatch({ type: 'set', payload: { id } })
        window.history.pushState({}, '', id)
      })
  }, [id])

  const initialCollection = useRef()

  useEffect(() => {
    !initialCollection.current && (initialCollection.current = collection)
  }, [collection])

  useEffect(() => {
    if (isAuthorized) return
    if (id !== collection.id) return

    initialCollection.current !== collection &&
      generateId('collections').then(id => {
        dispatch({ type: 'set', payload: { id } })
        window.history.pushState({}, '', id)
        setIsAuthorized(true)
      })
  }, [collection, id, isAuthorized])

  useEffect(() => {
    isAuthorized && collection.id && saveDraft(collection)
  }, [collection, isAuthorized])

  return (
    <>
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
            placeholder='Collection title...'
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

            .Details {
              border: 2px dashed var(--black300);
            }
          `}
        >
          <DetailsInput
            category={category}
            dispatch={dispatch}
            level={level}
            tags={tags}
          />
        </div>
        <div
          css={css`
            grid-area: list;
          `}
        >
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
          <div
            css={css`
              position: relative;
            `}
          >
            <div
              css={css`
                border: 2px dashed var(--black300);
                border-radius: 4px;
                margin: ${urls.length ? 1.5 : 0}rem 0 6rem;
                padding: 1.25rem 1rem;
              `}
            >
              <LearningItemInput dispatch={dispatch} index={-1} />
            </div>
          </div>
        </div>
      </div>
      <BottomActionBar
        canPublish={!!(name && urls.length && tags.length)}
        collection={collection}
      />
    </>
  )
}

Curation.propTypes = {
  draft: PropTypes.object.isRequired,
  initialIsAuthorized: PropTypes.bool.isRequired,
  id: PropTypes.string
}
