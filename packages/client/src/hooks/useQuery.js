import { useEffect, useReducer, useCallback, useMemo, useRef } from 'react'
import qs from 'qs'

import constructHref from 'utils/constructHref'

function init (search) {
  const values = qs.parse(search, { ignoreQueryPrefix: true })

  return {
    sort: values.sort || '',
    tags: values.tags ? values.tags.split(',') : [],
    action: 'init'
  }
}

function reducer (state, payload) {
  return payload.action ? payload : { ...state, ...payload, action: undefined }
}

export default function useQuery (pathname, search) {
  const [query, queryDispatch] = useReducer(reducer, search, init)

  const { sort, tags, action } = query

  const constructUrl = useCallback((tag, isTagFilter = true) => {
    if (!isTagFilter) {
      return {
        href: constructHref(sort, [tag])
      }
    }

    const updatedTags = tags.includes(tag)
      ? tags.filter(t => t !== tag)
      : [tag, ...tags]

    return {
      href: constructHref(sort, updatedTags),
      updatedTags
    }
  }, [sort, tags])

  const firstMount = useRef(true)

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false
      return
    }
    queryDispatch(init(search))
  }, [pathname, search])

  useEffect(() => {
    !action && window.history.pushState({}, '', constructHref(sort, tags))
  }, [action, sort, tags])

  return useMemo(
    () => ({
      constructUrl,
      query,
      queryDispatch
    }),
    [constructUrl, query]
  )
}
