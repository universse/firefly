import { useState, useReducer, useContext, useCallback } from 'react'
import { navigate } from 'gatsby'
import produce from 'immer'

import { FirebaseContext } from 'contexts/Firebase'

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
    }
  })
}

export default function useCreateCollection () {
  const [collection, dispatch] = useReducer(reducer, initialValue)
  const firebase = useContext(FirebaseContext)
  const [hasError, setHasError] = useState(false)

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      firebase.createCollection(collection).then(payload =>
        payload.error
          ? setHasError(true)
          : navigate(`/collection/${payload.collection.id}`, {
            state: { collection: payload.collection }
          })
      )
    },
    [collection, firebase]
  )

  return {
    collection,
    dispatch,
    handleSubmit,
    hasError
  }
}
