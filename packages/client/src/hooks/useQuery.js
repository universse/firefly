import { useEffect, useReducer } from 'react'
import { globalHistory } from '@reach/router/lib/history'
import qs from 'qs'

function init (search) {
  const values = qs.parse(search, { ignoreQueryPrefix: true })

  return {
    sort: values.sort || '',
    tags: values.tags ? values.tags.split(',') : []
  }
}

function reducer (state, { payload }) {
  return { ...state, ...payload }
}

export default function useQuery (search) {
  const [query, dispatch] = useReducer(reducer, search, init)

  useEffect(() => {
    const unlisten = globalHistory.listen(({ location: { search } }) =>
      dispatch({ payload: init(search) })
    )

    return () => {
      unlisten()
    }
  }, [])

  return [query, dispatch]
}
