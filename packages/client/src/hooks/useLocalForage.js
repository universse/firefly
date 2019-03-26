import { useEffect } from 'react'
import localforage from 'localforage'

export default function useLocalForage (key, itemsToSave) {
  useEffect(() => {
    if (itemsToSave) {
      const save = () => localforage.setItem(key, itemsToSave)

      window.addEventListener('beforeunload', save)

      return () => {
        save()
        window.removeEventListener('beforeunload', save)
      }
    }
  }, [itemsToSave, key])
}
