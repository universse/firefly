import { useEffect, useReducer, useCallback, useMemo } from 'react'
import qs from 'qs'
import { globalHistory } from '@reach/router/lib/history'
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
        href: constructHref(pathname, sort, [tag])
      }
    }

    const updatedTags = tags.includes(tag)
      ? tags.filter(t => t !== tag)
      : [tag, ...tags]

    return {
      href: constructHref(pathname, sort, updatedTags),
      updatedTags
    }
  }, [pathname, sort, tags])

  const onCategoryFilterClick = useCallback(() => queryDispatch(init('')), [])

  useEffect(() => {
    !action &&
      window.history.pushState({}, '', constructHref(pathname, sort, tags))
  }, [action, pathname, sort, tags])

  useEffect(() => {
    const unlisten = globalHistory.listen(({ location: { search } }) => {
      queryDispatch(init(search))
    })

    return () => {
      unlisten()
    }
  }, [])

  return useMemo(
    () => ({
      constructUrl,
      onCategoryFilterClick,
      query,
      queryDispatch
    }),
    [constructUrl, onCategoryFilterClick, query]
  )
}
