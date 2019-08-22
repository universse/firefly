import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import LocalStorage from 'constants/LocalStorage'
import firebaseWorker from 'utils/firebaseWorker'

export const AuthenticationContext = createContext()

export default function Authentication ({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    firebaseWorker.getUser().then(uid => {
      setUser(uid)

      if (uid) {
        window.localStorage.setItem(LocalStorage.HAS_SIGNED_IN, 'true')
        window.___logUser(uid)
      } else {
        window.localStorage.removeItem(LocalStorage.HAS_SIGNED_IN)
      }
    })
  }, [])

  return (
    <AuthenticationContext.Provider value={user}>
      {children}
    </AuthenticationContext.Provider>
  )
}

Authentication.propTypes = {
  children: PropTypes.node.isRequired
}
