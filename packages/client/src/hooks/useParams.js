import { useEffect, useReducer } from 'react'
import { globalHistory } from '@reach/router/lib/history'
import qs from 'qs'

function init (query) {
  const values = qs.parse(query, { ignoreQueryPrefix: true })

  return {
    sort: values.sort || '',
    tags: values.tags ? values.tags.split(',') : []
  }
}

function reducer (state, { payload }) {
  return { ...state, ...payload }
}

export default function useParams (query) {
  const [params, dispatch] = useReducer(reducer, query, init)

  useEffect(() => {
    const unlisten = globalHistory.listen(({ location: { search } }) =>
      dispatch({ payload: init(search) })
    )

    return () => {
      unlisten()
    }
  }, [])

  return [params, dispatch]
}
