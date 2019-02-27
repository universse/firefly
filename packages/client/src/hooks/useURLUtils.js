import { useCallback } from 'react'
import { navigate } from 'gatsby'
import qs from 'qs'

const constructHref = (pathname, sort, tags) => {
  sort = sort === '' ? [] : sort
  tags = tags.length === 0 ? [] : tags.join(',')

  const queryString = qs.stringify({ sort, tags }, { encode: false })
  return `${pathname}${queryString ? `?${queryString}` : ''}`
}

export default function useURLUtils (queryValues, pathname, dispatch) {
  const { sort, tags } = queryValues

  const constructUrl = useCallback((tag, isButton) => {
    if (isButton) {
      return {
        href: constructHref(pathname, sort, [tag])
      }
    }

    const updatedTags = tags.includes(tag)
      ? tags.filter(t => t !== tag)
      : [...tags, tag]

    return {
      href: constructHref(pathname, sort, updatedTags),
      updatedTags
    }
  }, [pathname, sort, tags])

  const updateQuery = useCallback(updatedTags => {
    dispatch({ payload: { sort, tags: updatedTags } })
  }, [dispatch, sort])

  const onCategoryFilterClick = useCallback(
    () => dispatch({ payload: { sort: '', tags: [] } }),
    [dispatch]
  )

  const onSortClick = useCallback(sort => {
    navigate(constructHref(pathname, sort, tags))
    dispatch({ payload: { sort, tags } })
  }, [dispatch, pathname, tags])

  const onTagClick = useCallback(tag => {
    const tags = [tag]
    navigate(constructHref(pathname, sort, tags))
    dispatch({ payload: { sort, tags } })
  }, [dispatch, pathname, sort])

  const onTagClearClick = useCallback(
    tag => dispatch({ payload: { sort, tags: [] } }),
    [dispatch, sort]
  )

  return {
    constructUrl,
    updateQuery,
    onCategoryFilterClick,
    onSortClick,
    onTagClick,
    onTagClearClick
  }
}
