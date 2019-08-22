import { createStore, compose, combineReducers } from 'redux'
import produce from 'immer'

const initialMeta = {
  isAuthorized: false,
  authorizedEmails: [],
  invitee: '',
  recentDrafts: [],
  isLoading: true,
  errorMessage: false
}

function meta (state = initialMeta, { type, payload }) {
  switch (type) {
    case 'set':
      return { ...state, ...payload }

    default:
      return state
  }
}

const initialDraft = {
  id: '',
  name: '',
  category: 0,
  level: 0,
  urls: [],
  tags: []
}

function draft (state = initialDraft, { type, payload }) {
  return produce(state, draft => {
    switch (type) {
      case 'reset-draft':
        return { ...initialDraft, id: payload.id }

      case 'set-draft':
        Object.entries(payload).forEach(([key, value]) => (draft[key] = value))
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
    }
  })
}

const reducer = combineReducers({
  draft,
  meta
})

export default (preloadedState = {}) => {
  const store = createStore(
    reducer,
    preloadedState,
    compose(
      typeof window === 'object' && window.devToolsExtension
        ? window.devToolsExtension()
        : f => f
    )
  )

  return store
}
