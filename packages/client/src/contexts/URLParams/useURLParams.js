import { useEffect, useReducer, useMemo, useRef } from 'react'
import qs from 'qs'

import { constructHref } from './utils'

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

export default function useURLParams (location) {
  const [query, queryDispatch] = useReducer(reducer, location.search, init)

  const firstMount = useRef(true)

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false
      return
    }
    queryDispatch(init(location.search))
  }, [location])

  useEffect(() => {
    const { sort, tags, action } = query
    !action && window.history.pushState({}, '', constructHref(sort, tags))
  }, [query])

  return useMemo(
    () => ({
      constructUrl (tag, isTagFilter = true) {
        const { sort, tags } = query

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
      },
      query,
      queryDispatch
    }),
    [query]
  )
}
