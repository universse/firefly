import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import PropTypes from 'prop-types'

import FirebaseContext from 'contexts/FirebaseContext'

export const AuthenticationContext = createContext()

export default function Authentication ({ children }) {
  const [user, setUser] = useState(false)
  const firebase = useContext(FirebaseContext)

  const handleAuth = useCallback(
    e => e.data.type === 'auth' && setUser(e.data.payload),
    []
  )

  useEffect(() => {
    firebase.addEventListener('message', handleAuth)

    return () => {
      firebase.removeEventListener('message', handleAuth)
    }
  }, [firebase, handleAuth])

  return (
    <AuthenticationContext.Provider value={user}>
      {children}
    </AuthenticationContext.Provider>
  )
}

Authentication.propTypes = {
  children: PropTypes.node.isRequired
}
