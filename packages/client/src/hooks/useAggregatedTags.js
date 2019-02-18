import { useMemo } from 'react'

export default function useAggregatedTags (collections) {
  return useMemo(() => {
    const tagCounts = collections.reduce((counts, collection) => {
      collection.node.tags.forEach(tag => {
        counts[tag] = counts[tag] ? ++counts[tag] : 1
      })

      return counts
    }, {})

    return Object.entries(tagCounts).sort(
      ([, count1], [, count2]) => count1 < count2
    )
  }, [collections])
}
