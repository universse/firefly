import { useMemo } from 'react'

export default function useFilteredCollections (collections, tags) {
  return useMemo(
    () =>
      tags.length
        ? collections.filter(collection =>
            tags.every(
              tag =>
                collection.node.tags.filter(t => t.toLowerCase() === tag).length
            )
          )
        : collections,
    [collections, tags]
  )
}
