import { useReducer, useEffect, useCallback } from 'react'
import produce from 'immer'
import localforage from 'localforage'

function reducer (state, { type, payload }) {
  return produce(state, draft => {
    switch (type) {
      case 'load':
        return payload || {}

      case 'click':
        if (draft[payload.id]) {
          delete draft[payload.id]
        } else {
          draft[payload.id] = true
        }
        break
    }
  })
}

export default function useSavedItemsReducer (key) {
  const [savedItems, dispatch] = useReducer(reducer)

  useEffect(() => {
    localforage
      .getItem(key)
      .then(value => dispatch({ type: 'load', payload: value }))
  }, [dispatch, key])

  const onClick = useCallback(
    e =>
      dispatch({
        type: 'click',
        payload: { id: e.currentTarget.value }
      }),
    [dispatch]
  )

  return [savedItems, onClick]
}