import { useMemo } from 'react'

export default function useCreateChangeHandlers (dispatch) {
  return useMemo(
    () => ({
      handleCategoryChange: ({ value }) =>
        dispatch({ type: 'set', payload: { category: value } }),

      handleLearningItemChange: item =>
        dispatch({ type: 'addItem', payload: { item } }),

      handleLevelChange: ({ value }) =>
        dispatch({ type: 'set', payload: { level: value } }),

      handleNameChange: e =>
        dispatch({
          type: 'set',
          payload: { name: e.target.value }
        })
    }),
    [dispatch]
  )
}
