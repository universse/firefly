import LocalStorage from 'constants/LocalStorage'

export const isNewUser = () =>
  window.localStorage.getItem(LocalStorage.IS_NEW_USER) === 'true'

export const hasSignedIn = () =>
  window.localStorage.getItem(LocalStorage.HAS_SIGNED_IN) === 'true'

export default hasSignedIn
