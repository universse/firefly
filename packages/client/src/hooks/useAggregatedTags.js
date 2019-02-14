import { useState, useEffect } from 'react'

// TODO: add sorting
function getAggregatedTags (collections) {
  return collections.reduce((aggregatedTags, collection) => {
    collection.node.tags.forEach(tag => {
      aggregatedTags[tag] = aggregatedTags[tag] ? ++aggregatedTags[tag] : 1
    })

    return aggregatedTags
  }, {})
}

export default function useAggregatedTags (collections) {
  const [aggregatedTags, setAggregatedTags] = useState(() =>
    getAggregatedTags(collections)
  )

  useEffect(() => {
    setAggregatedTags(getAggregatedTags(collections))
  }, [collections])

  return aggregatedTags
}
