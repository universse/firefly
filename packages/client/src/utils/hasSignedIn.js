import LocalStorage from 'constants/LocalStorage'

const hasSignedIn =
  typeof window === 'object' &&
  window.localStorage.getItem(LocalStorage.HAS_SIGNED_IN) === 'true'

export default hasSignedIn
