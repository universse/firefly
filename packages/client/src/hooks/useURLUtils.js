import { useMemo } from 'react'
import { navigate } from 'gatsby'
import qs from 'qs'

export default function useURLUtils (queryValues, pathname, dispatch) {
  const { sort, tags } = queryValues

  return useMemo(() => {
    const constructUrl = tag => {
      const updatedTags = tags.includes(tag)
        ? tags.filter(t => t !== tag)
        : [...tags, tag]

      if (updatedTags.length === 0) {
        return { href: pathname, updatedTags }
      } else {
        const queryString = qs.stringify(
          { tags: updatedTags.join(',') },
          { encode: false }
        )
        return {
          href: `${pathname}?${queryString}`,
          updatedTags
        }
      }
    }

    const updateQuery = tag => {
      const { href, updatedTags } = constructUrl(tag)
      navigate(href)
      dispatch({ payload: { sort, tags: updatedTags } })
    }

    const onFilterClick = () => dispatch({ payload: { sort: '', tags: [] } })
    const onTagClick = tag => {
      navigate(`/?tags=${tag}`)
      dispatch({ payload: { sort: '', tags: [tag] } })
    }
    const onTagResetClick = tag => dispatch({ payload: { sort, tags: [] } })

    return {
      constructUrl,
      updateQuery,
      onFilterClick,
      onTagClick,
      onTagResetClick
    }
  }, [queryValues, pathname, dispatch])
}
