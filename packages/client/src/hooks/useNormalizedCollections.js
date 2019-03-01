import { useContext, useEffect } from 'react'

import { AllCollectionsContext } from 'components/AllCollections'
import { NormalizedCollectionsContext } from 'components/NormalizedCollections'

export default function useNormalizedCollections () {
  const [normalizedCollections, setNormalizedCollections] = useContext(
    NormalizedCollectionsContext
  )

  const allCollections = useContext(AllCollectionsContext)

  useEffect(() => {
    if (!normalizedCollections) {
      const normalizedCollections = {}

      allCollections.forEach(({ node }) => {
        normalizedCollections[node.id.toLowerCase()] = node
      })

      setNormalizedCollections(normalizedCollections)
    }
  }, [allCollections, normalizedCollections, setNormalizedCollections])

  return normalizedCollections
}
