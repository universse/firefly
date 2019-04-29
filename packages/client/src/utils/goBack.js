import { navigate } from 'gatsby'

const goBack = () =>
  window.localStorage.getItem('visited') ? window.history.back() : navigate('/')

export default goBack
