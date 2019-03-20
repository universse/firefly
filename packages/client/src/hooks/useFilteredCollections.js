import { useMemo } from 'react'

export default function useFilteredCollections (collections, tags) {
  return useMemo(
    () => {
      if (tags.length === 0) return collections

      const filteredCollections = []

      collections.forEach(collection => {
        let bool = true
        tags.forEach(tag => (bool = bool && collection.node.tags.includes(tag)))
        bool && filteredCollections.push(collection)
      })

      return filteredCollections
    },
    [collections, tags]
  )
}
