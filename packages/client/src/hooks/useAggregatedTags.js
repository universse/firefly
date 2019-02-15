import { useMemo } from 'react'

// TODO: add sorting
export default function useAggregatedTags (collections) {
  return useMemo(
    () =>
      collections.reduce((aggregatedTags, collection) => {
        collection.node.tags.forEach(tag => {
          aggregatedTags[tag] = aggregatedTags[tag] ? ++aggregatedTags[tag] : 1
        })

        return aggregatedTags
      }, {}),
    [collections]
  )
}
