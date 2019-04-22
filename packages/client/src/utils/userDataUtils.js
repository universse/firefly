import localforage from 'localforage'

import LocalStorage from 'constants/LocalStorage'

export const getActionKey = action => action.replace('un', '')

export const saveChangeToOfflineQueue = ({ id, action, check, save }) =>
  localforage.getItem(LocalStorage.OFFLINE_QUEUE).then(changes => {
    if (action) {
      changes[getActionKey(action)][id] = !action.startsWith('un')
      localforage.setItem(LocalStorage.OFFLINE_QUEUE, changes)
    } else {
      localforage.setItem(LocalStorage.OFFLINE_QUEUE, {
        check: { ...changes.check, ...check },
        save: { ...changes.save, ...save }
      })
    }
  })
