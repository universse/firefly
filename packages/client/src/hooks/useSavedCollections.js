import { useEffect, useContext } from 'react'
import localforage from 'localforage'

import { SavedCollectionsContext } from 'components/SavedCollections'
import LocalStorage from 'constants/LocalStorage'

export default function useSavedCollections () {
  const savedCollectionsReducer = useContext(SavedCollectionsContext)
  const save = () =>
    localforage.setItem(
      LocalStorage.SAVED_COLLECTIONS,
      savedCollectionsReducer[0]
    )

  useEffect(() => {
    window.addEventListener('beforeunload', save)
    return () => {
      window.removeEventListener('beforeunload', save)
    }
  }, [savedCollectionsReducer])

  return savedCollectionsReducer
}
