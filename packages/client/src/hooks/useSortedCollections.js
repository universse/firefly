import { useMemo } from 'react'

export default function useSortedCollections (collections, sort) {
  return useMemo(
    () =>
      sort
        ? [...collections].sort(
          ({ node: { level: level1 } }, { node: { level: level2 } }) =>
            sort === 'asc' ? level1 - level2 : level2 - level1
        )
        : collections,
    [collections, sort]
  )
}
