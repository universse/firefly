import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import LocalStorage from 'constants/LocalStorage'
import firebaseWorker from 'utils/firebaseWorker'

export const AuthenticationContext = createContext()

export default function Authentication ({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    ;(function authenticate (timeout = 200) {
      return firebaseWorker
        .getUser()
        .then(payload => {
          setUser(payload)

          if (payload) {
            window.localStorage.setItem(LocalStorage.HAS_SIGNED_IN, 'true')
            window.___logUser(payload)
          } else {
            window.localStorage.removeItem(LocalStorage.HAS_SIGNED_IN)
          }
        })
        .catch(() => {
          setTimeout(authenticate, timeout)
        })
    })()
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
