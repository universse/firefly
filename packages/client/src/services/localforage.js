import localforage from 'localforage'

import LocalStorage from 'constants/LocalStorage'

export const getSavedCollections = () =>
  localforage.getItem(LocalStorage.SAVED_COLLECTIONS)

export const saveCollections = collections =>
  localforage.setItem(LocalStorage.SAVED_COLLECTIONS, collections)
