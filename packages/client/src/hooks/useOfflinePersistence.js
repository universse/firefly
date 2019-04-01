import { useEffect } from 'react'
import localforage from 'localforage'

export default function useOfflinePersistence (key, itemsToSave) {
  useEffect(() => {
    itemsToSave && localforage.setItem(key, itemsToSave)
  }, [itemsToSave, key])
}
