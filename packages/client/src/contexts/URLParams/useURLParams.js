import { useEffect, useReducer, useMemo, useRef } from 'react'

import { constructHref } from './utils'

function init (search) {
  const params = new URLSearchParams(search)

  return {
    sort: params.get('sort') || '',
    tags: params.get('tags') ? params.get('tags').split(',') : [],
    action: 'init'
  }
}

function reducer (state, payload) {
  return payload.action ? payload : { ...state, ...payload, action: undefined }
}

export default function useURLParams ({ pathname, search }) {
  const [query, queryDispatch] = useReducer(reducer, search, init)

  const isFirstMount = useRef(true)

  useEffect(() => {
    isFirstMount.current
      ? (isFirstMount.current = false)
      : queryDispatch(init(search))
  }, [pathname, search])

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
