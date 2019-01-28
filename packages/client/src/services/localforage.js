import localforage from 'localforage'

import LocalStorage from 'constants/LocalStorage'

export const getSavedCollections = () =>
  localforage.getItem(LocalStorage.SAVED_COLLECTIONS)

export const saveCollection = async collection => {
  const savedCollections = await localforage.getItem(
    LocalStorage.SAVED_COLLECTIONS
  )
  const id = collection.id

  if (savedCollections) {
    savedCollections[id]
      ? delete savedCollections[id]
      : (savedCollections[id] = collection)

    return localforage
      .setItem(LocalStorage.SAVED_COLLECTIONS, savedCollections)
      .then(console.log)
  } else {
    return localforage
      .setItem(LocalStorage.SAVED_COLLECTIONS, { [id]: collection })
      .then(console.log)
  }
}
