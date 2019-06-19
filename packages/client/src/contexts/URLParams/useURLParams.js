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
  if (payload.tag) {
    const tag = payload.tag
    const currentTags = state.tags

    const tags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [tag, ...currentTags]

    return { ...state, tags, action: undefined }
  }
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
      query,
      queryDispatch
    }),
    [query]
  )
}
