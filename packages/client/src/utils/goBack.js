import { navigate } from 'gatsby'

const goBack = () => (window.hasVisited ? window.history.back() : navigate('/'))

export default goBack
