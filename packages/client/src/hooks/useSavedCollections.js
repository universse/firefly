import { useEffect, useContext } from 'react'

import { SavedCollectionsContext } from 'components/SavedCollections'
import { saveCollections } from 'services/localforage'

export default function useSavedCollections () {
  const savedCollectionsReducer = useContext(SavedCollectionsContext)

  useEffect(() => {
    const save = e => saveCollections(savedCollectionsReducer[0])

    window.addEventListener('beforeunload', save)
    return () => {
      window.removeEventListener('beforeunload', save)
    }
  }, [savedCollectionsReducer])

  return savedCollectionsReducer
}
