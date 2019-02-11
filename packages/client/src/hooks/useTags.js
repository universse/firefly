import { useState, useEffect } from 'react'
import { globalHistory } from '@reach/router/lib/history'
import qs from 'qs'

export default function useTags (search) {
  const [tags, setTags] = useState([])

  const getTagsFromQuery = search => {
    try {
      const { tags } = qs.parse(search, { ignoreQueryPrefix: true })
      setTags(tags.split(','))
    } catch {}
  }

  useEffect(() => {
    getTagsFromQuery(search)

    const unlisten = globalHistory.listen(({ search }) => {
      getTagsFromQuery(search)
    })

    return () => {
      unlisten()
    }
  }, [])

  return [tags, setTags]
}
