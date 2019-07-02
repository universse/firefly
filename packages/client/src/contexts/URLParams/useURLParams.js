import { useEffect, useReducer, useMemo, useRef } from 'react'
// import { globalHistory } from '@reach/router/lib/history'
import { navigate } from 'gatsby'

import URLParamKeys from 'constants/URLParamKeys'

function constructHref (searchInput, sort, tags) {
  const params = []

  searchInput.trim() &&
    params.push(`${URLParamKeys.SEARCH_INPUT}=${searchInput.trim()}`)

  sort && params.push(`${URLParamKeys.SORT}=${sort}`)

  tags.length &&
    params.push(`${URLParamKeys.TAGS}=${[...tags].reverse().join(',')}`)

  const queryString = params.join('&')

  return `${window.location.pathname}${queryString ? `?${queryString}` : ''}`
}

function init (search) {
  const params = new URLSearchParams(search)

  return {
    searchInput: params.get(URLParamKeys.SEARCH_INPUT) || '',
    sort: params.get(URLParamKeys.SORT) || '',
    tags: params.get(URLParamKeys.TAGS)
      ? params.get(URLParamKeys.TAGS).split(',')
      : [],
    action: 'init'
  }
}

function reducer (state, payload) {
  return payload.action ? payload : { ...state, ...payload, action: undefined }
}

export default function useURLParams ({ pathname, search }) {
  const [query, queryDispatch] = useReducer(reducer, search, init)

  // useEffect(() => {
  //   const resetQuery = () => queryDispatch(init(window.location.search))

  //   window.addEventListener('popstate', resetQuery)

  //   return () => {
  //     window.removeEventListener('popstate', resetQuery)
  //   }
  // }, [])

  const isFirstMount = useRef(true)

  useEffect(() => {
    isFirstMount.current
      ? (isFirstMount.current = false)
      : queryDispatch(init(search))
  }, [pathname, search])

  // useEffect(() => {
  //   const unlisten = globalHistory.listen(({ location: { search } }) => {
  //     queryDispatch(init(search))
  //   })

  //   return () => {
  //     unlisten()
  //   }
  // }, [])

  useEffect(() => {
    const { searchInput, sort, tags, action } = query

    !action && navigate(constructHref(searchInput, sort, tags))
    // !action &&
    //   window.history.pushState({}, '', constructHref(searchInput, sort, tags))
  }, [query])

  return useMemo(
    () => ({
      query,
      queryDispatch
    }),
    [query]
  )
}
