import { useEffect, useReducer, useMemo, useRef } from 'react'

import { constructHref } from './utils'
import URLParamKeys from 'constants/URLParamKeys'

function init (search) {
  const params = new URLSearchParams(search)

  return {
    searchInput: params.get(URLParamKeys.SEARCH_INPUT) || '',
    sort: params.get(URLParamKeys.SORT) || '',
    tags: params.get(URLParamKeys.TAGS) ? params.get('t').split(',') : [],
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
    const { searchInput, sort, tags, action } = query
    !action &&
      window.history.pushState({}, '', constructHref(searchInput, sort, tags))
  }, [query])

  return useMemo(
    () => ({
      query,
      queryDispatch
    }),
    [query]
  )
}
