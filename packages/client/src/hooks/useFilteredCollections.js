import { useMemo } from 'react'

export default function useFilteredCollections (collections, tags) {
  return useMemo(
    () =>
      tags.length === 0
        ? collections
        : collections.filter(collection =>
            tags.reduce(
              (bool, tag) => bool && collection.node.tags.includes(tag),
              true
            )
          ),
    [collections, tags]
  )
}
