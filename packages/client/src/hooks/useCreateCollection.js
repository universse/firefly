import { useState, useReducer, useContext, useCallback } from 'react'
import { navigate } from 'gatsby'
import produce from 'immer'

import firebaseWorker from 'utils/firebase'

const initialValue = {
  name: '',
  category: 0,
  level: 0,
  urls: [],
  tags: []
}

function reducer (state, { type, payload }) {
  return produce(state, draft => {
    switch (type) {
      case 'set':
        return { ...state, ...payload }

      case 'addItem':
        draft.tags.push(payload.item)
        break

      case 'addTag':
        draft.tags.push(payload.tag)
        break

      default:
        throw new Error('Unknown action type.')
    }
  })
}

export default function useCreateCollection () {
  const [collection, dispatch] = useReducer(reducer, initialValue)
  const [hasError, setHasError] = useState(false)

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    firebaseWorker.createCollection(collection).then(payload =>
      payload.error
        ? setHasError(true)
        : navigate(`/collection/${payload.collection.id}`, {
            state: { collection: payload.collection }
          })
    )
  }, [collection])

  return {
    collection,
    dispatch,
    handleSubmit,
    hasError
  }
}
