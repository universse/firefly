import { useState, useEffect } from 'react'

import { getSavedCollections, saveCollection } from 'services/localforage'

export default function useSavedCollection (collection) {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaved, setIsSaved] = useState()

  useEffect(() => {
    getSavedCollections()
      .then(value => {
        setIsSaved(!!value[collection.id])
        setIsLoading(false)
      })
      .catch(() => setIsSaved(false))
  }, [])

  const handleSaveClick = e => {
    saveCollection(collection)
      .then(() => setIsSaved(!isSaved))
      .catch(() => {})
  }

  return [isLoading, isSaved, handleSaveClick]
}
