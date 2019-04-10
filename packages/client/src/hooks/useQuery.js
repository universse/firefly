import { useReducer, useCallback, useMemo } from 'react'
import qs from 'qs'

import constructHref from 'utils/constructHref'

function init (search) {
  const values = qs.parse(search, { ignoreQueryPrefix: true })

  return {
    sort: values.sort || '',
    tags: values.tags ? values.tags.split(',') : []
  }
}

function reducer (state, payload) {
  return { ...state, ...payload }
}

export default function useQuery (pathname, search) {
  const [query, dispatch] = useReducer(reducer, search, init)

  const { sort, tags } = query

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

  const onCategoryFilterClick = useCallback(
    () => dispatch({ sort: '', tags: [] }),
    []
  )

  const updateQuery = useCallback(updatedTags => {
    dispatch({ tags: updatedTags })
  }, [])

  const onQueryClick = useCallback(({ sort: clickedSort, tag: clickedTag }) => {
    const updatedSort = typeof clickedSort === 'string' ? clickedSort : sort

    const updatedTags = clickedTag
      ? [clickedTag]
      : clickedTag === ''
      ? []
      : tags

    window.history.pushState(
      {},
      '',
      constructHref(pathname, updatedSort, updatedTags)
    )
    dispatch({ sort: updatedSort, tags: updatedTags })
  }, [pathname, sort, tags])

  return useMemo(
    () => ({
      constructUrl,
      onCategoryFilterClick,
      onQueryClick,
      query,
      updateQuery
    }),
    [constructUrl, onCategoryFilterClick, onQueryClick, query, updateQuery]
  )
}
