import localforage from 'localforage'

import LocalStorage from 'constants/LocalStorage'

export const getActionKey = action => action.replace('un', '')

export const saveChangeToOfflineQueue = ({ id, action }) =>
  localforage.getItem(LocalStorage.OFFLINE_QUEUE).then(changes => {
    const key = getActionKey(action)

    if (changes) {
      changes[key][id] = !action.startsWith('un')
      localforage.setItem(LocalStorage.OFFLINE_QUEUE, changes)
    } else {
      localforage.setItem(LocalStorage.OFFLINE_QUEUE, {
        check: {},
        save: {},
        [key]: { [id]: !action.startsWith('un') }
      })
    }
  })
