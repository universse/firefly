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

function reducer (_, { payload }) {
  return payload
}

export default function useParams (query) {
  const paramsReducer = useReducer(reducer, query, init)
  const [, dispatch] = paramsReducer

  useEffect(() => {
    const unlisten = globalHistory.listen(({ location: { search } }) =>
      dispatch({ payload: init(search) })
    )

    return () => {
      unlisten()
    }
  }, [dispatch])

  return paramsReducer
}
