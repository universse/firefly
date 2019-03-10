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

  const handleCategoryChange = useCallback(
    ({ value }) => dispatch({ type: 'set', payload: { category: value } }),
    []
  )

  const handleLearningItemChange = useCallback(
    item => dispatch({ type: 'addItem', payload: { item } }),
    []
  )

  const handleLevelChange = useCallback(
    ({ value }) => dispatch({ type: 'set', payload: { level: value } }),
    []
  )

  const handleNameChange = useCallback(
    e =>
      dispatch({
        type: 'set',
        payload: { name: e.target.value }
      }),
    []
  )

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    firebase.createCollection(collection).then(payload =>
      payload.error
        ? setHasError(true)
        : navigate(`/collection/${payload.collection.id}`, {
            state: { collection: payload.collection }
          })
    )
  }, [collection, firebase])

  return {
    collection,
    handleCategoryChange,
    handleLearningItemChange,
    handleLevelChange,
    handleNameChange,
    handleSubmit,
    hasError
  }
}
