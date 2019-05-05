import { useMemo } from 'react'

export default function useFilteredCollections (collections, tags) {
  return useMemo(() => {
    const tagCounts = {}

    return {
      filteredCollections: collections.filter(collection =>
        tags.every(filter =>
          collection.node.tags.some(tag => tag.toLowerCase() === filter)
        )
          ? collection.node.tags.forEach(tag => {
              const lowered = tag.toLowerCase()
              tagCounts[lowered] = tagCounts[lowered] ? ++tagCounts[lowered] : 1
            }) || true
          : false
      ),

      aggregatedTags: Object.entries(tagCounts).sort(
        ([tag1, count1], [tag2, count2]) =>
          tags.indexOf(tag2) - tags.indexOf(tag1) || count2 - count1
      )
    }
  }, [collections, tags])
}
