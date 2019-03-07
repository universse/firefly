import { useContext } from 'react'

import { SavedCollectionsContext } from 'contexts/SavedCollections'
import useLocalForage from './useLocalForage'
import LocalStorage from 'constants/LocalStorage'

export default function useSavedCollections () {
  const savedCollectionsReducer = useContext(SavedCollectionsContext)

  useLocalForage(LocalStorage.SAVED_COLLECTIONS, savedCollectionsReducer[0])

  return savedCollectionsReducer
}
