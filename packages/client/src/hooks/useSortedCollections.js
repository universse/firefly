import { useState, useEffect } from 'react'

function getSortedCollections (data, sort, tags) {
  return data[`allCollections${sort ? sort.toUpperCase() : ''}`].edges.filter(
    collection =>
      tags.reduce(
        (bool, tag) => bool && collection.node.tags.includes(tag),
        true
      )
  )
}

export default function useSortedCollections (data, queryValues) {
  const { sort, tags } = queryValues

  // for scrolling effect
  const [collections, setCollections] = useState(() =>
    getSortedCollections(data, sort, tags)
  )

  useEffect(() => {
    setCollections(getSortedCollections(data, sort, tags))
  }, [data, queryValues])

  return collections
}
