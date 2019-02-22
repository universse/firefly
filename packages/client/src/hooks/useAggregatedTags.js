import { useMemo } from 'react'

export default function useAggregatedTags (collections, queryValues) {
  const { tags } = queryValues

  return useMemo(() => {
    const tagCounts = collections.reduce((counts, collection) => {
      collection.node.tags.forEach(tag => {
        counts[tag] = counts[tag] ? ++counts[tag] : 1
      })

      return counts
    }, {})

    return Object.entries(tagCounts).sort(
      ([tag1, count1], [tag2, count2]) =>
        tags.includes(tag1) < tags.includes(tag2) || count1 < count2
    )
  }, [collections, tags])
}
