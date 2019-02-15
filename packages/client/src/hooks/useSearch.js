import { useMemo } from 'react'
import matchSorter from 'match-sorter'

export default function useSearch (allCollections, searchInput) {
  return useMemo(
    () =>
      matchSorter(allCollections, searchInput, {
        keys: ['node.name']
      }),
    [allCollections, searchInput]
  )
}
