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
  console.log(payload)
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
