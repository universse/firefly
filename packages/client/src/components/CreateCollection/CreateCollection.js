import React, { useState, useReducer, useEffect } from 'react'
import { css } from '@emotion/core'
import { navigate } from 'gatsby'
import produce from 'immer'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import DraggableItem from './DraggableItem'
import DragLayer from './DragLayer'
import LearningItemInput from './LearningItemInput'
import Details from 'components/CollectionTemplate/Details'
import useOfflinePersistence from 'hooks/useOfflinePersistence'
import LocalStorage from 'constants/LocalStorage'
import DropdownOptions from 'constants/DropdownOptions'
import { headerHeightInRem, screens } from 'constants/Styles'
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

const initialValue = {
  name: '',
  category: 0,
  level: 0,
  // type, url, description, image, title, publisher
  urls: [],
  tags: [],
  removed: null
}

export default function CreateCollection ({ id }) {
  const [collection, dispatch] = useReducer(reducer, { id, ...initialValue })
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    id
      ? offlineStorageWorker
          .getItem(LocalStorage.DRAFTS)
          .then(drafts => dispatch({ type: 'load', payload: drafts[id] }))
      : firebaseWorker
          .generateId('collections')
          .then(id => dispatch({ type: 'set', payload: { id } }))
  }, [id])

  useOfflinePersistence(
    collection.id && {
      [LocalStorage.DRAFTS]: { [collection.id]: collection }
    }
  )

  const handleSubmit = e => {
    e.preventDefault()
    firebaseWorker
      .createCollection(collection)
      .then(collection =>
        navigate(`/collection/${collection.id}`, {
          state: { collection }
        })
      )
      .catch(() => setHasError(true))
  }

  const { category, level, name, tags } = collection

  return (
    <>
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
            {collection.urls.map((url, i) => (
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
    </>
  )
}
