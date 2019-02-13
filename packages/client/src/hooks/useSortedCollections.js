import { useState, useEffect } from 'react'

export default function useSortedCollections (data, queryValues) {
  const [collections, setCollections] = useState([])

  const { sort, tags } = queryValues

  useEffect(() => {
    setCollections(
      data[`allCollections${sort ? sort.toUpperCase() : ''}`].edges.filter(
        collection =>
          tags.reduce(
            (bool, tag) => bool && collection.node.tags.includes(tag),
            true
          )
      )
    )
  }, [data, queryValues])

  return collections
}
