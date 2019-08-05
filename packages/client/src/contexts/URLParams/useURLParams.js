import { useEffect, useReducer, useMemo, useContext } from 'react'
import { navigate } from 'gatsby'

import { ModalContext } from 'contexts/Modal'
import ModalTypes from 'constants/ModalTypes'
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

let listener = null

function reducer (state, payload) {
  return payload.init ? payload : { ...state, ...payload, init: false }
}

export default function useURLParams ({ pathname, search, state }) {
  const [query, queryDispatch] = useReducer(reducer, search, initialize)
  const activeModalType = useContext(ModalContext)

  useEffect(() => {
    if (!state || !state.programmatic) queryDispatch(initialize(search))
  }, [pathname, search, state])

  useEffect(() => {
    if (activeModalType === ModalTypes.MOBILE_FILTER) {
      window.removeEventListener('popstate', listener)

      listener = () => {
        queryDispatch({
          ...initialize(search),
          init: false
        })
        listener = null
      }

      window.addEventListener('popstate', listener, { once: true })
    } else {
      if (listener) return

      listener = () => {
        queryDispatch(initialize(window.location.search))
        listener = null
      }
      window.addEventListener('popstate', listener, { once: true })
    }
  }, [activeModalType, search])

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
