import { useCallback } from 'react'
import { navigate } from 'gatsby'
import qs from 'qs'

const constructHref = (pathname, sort, tags) => {
  sort = sort === '' ? [] : sort
  tags = tags.length === 0 ? [] : [...tags].reverse().join(',')

  const queryString = qs.stringify({ sort, tags }, { encode: false })
  return `${pathname}${queryString ? `?${queryString}` : ''}`
}

export default function useURLUtils (queryValues, pathname, dispatch) {
  const { sort, tags } = queryValues

  const constructUrl = useCallback(
    (tag, isButton) => {
      if (isButton) {
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
    },
    [pathname, sort, tags]
  )

  const onCategoryFilterClick = useCallback(
    () => dispatch({ payload: { sort: '', tags: [] } }),
    [dispatch]
  )

  const updateQuery = useCallback(
    updatedTags => {
      dispatch({ payload: { tags: updatedTags } })
    },
    [dispatch]
  )

  const onQueryClick = useCallback(
    ({ sort: clickedSort, tag: clickedTag }) => {
      const updatedSort = typeof clickedSort === 'string' ? clickedSort : sort

      const updatedTags = clickedTag
        ? [clickedTag]
        : clickedTag === ''
          ? []
          : tags

      navigate(constructHref(pathname, updatedSort, updatedTags))
      dispatch({ payload: { sort: updatedSort, tags: updatedTags } })
    },
    [dispatch, pathname, sort, tags]
  )

  return {
    constructUrl,
    onCategoryFilterClick,
    onQueryClick,
    updateQuery
  }
}
