import LocalStorage from 'constants/LocalStorage'

export const isNewUser = () =>
  typeof window === 'object' &&
  window.localStorage.getItem(LocalStorage.IS_NEW_USER) === 'true'

export const hasSignedIn = () =>
  typeof window === 'object' &&
  window.localStorage.getItem(LocalStorage.HAS_SIGNED_IN) === 'true'
