import { useMemo } from 'react'

export default function useSortedCollections (data, queryValues) {
  const { sort, tags } = queryValues

  return useMemo(
    () =>
      data[`allCollections${sort ? sort.toUpperCase() : ''}`].edges.filter(
        collection =>
          tags.reduce(
            (bool, tag) => bool && collection.node.tags.includes(tag),
            true
          )
      ),
    [data, queryValues]
  )
}
