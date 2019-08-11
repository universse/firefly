import { useEffect, useReducer, useMemo } from 'react'
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

function initialize (search) {
  const params = new URLSearchParams(search)
  const tags = params.get(URLParamKeys.TAGS)

  return {
    init: true,
    searchInput: params.get(URLParamKeys.SEARCH_INPUT) || '',
    sort: params.get(URLParamKeys.SORT) || '',
    tags: tags ? tags.split(',') : []
  }
}

function reducer (state, payload) {
  return payload.init ? payload : { ...state, ...payload, init: false }
}

export default function useURLParams ({ pathname, search, state }) {
  const [query, queryDispatch] = useReducer(reducer, search, initialize)

  useEffect(() => {
    if (state && state.programmatic) return
    queryDispatch(initialize(search))
  }, [pathname, search, state])

  useEffect(() => {
    const resetQuery = () => queryDispatch(initialize(window.location.search))
    window.addEventListener('popstate', resetQuery)

    return () => {
      window.removeEventListener('popstate', resetQuery)
    }
  }, [])

  useEffect(() => {
    const { init, searchInput, sort, tags } = query

    !init &&
      navigate(constructHref(searchInput, sort, tags), {
        state: { programmatic: true }
      })
  }, [query])

  return useMemo(
    () => ({
      query,
      queryDispatch
    }),
    [query]
  )
}
