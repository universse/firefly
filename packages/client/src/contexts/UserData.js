import React, { createContext } from 'react'
import PropTypes from 'prop-types'

import { UserDataDispatchContext } from './UserDataDispatch'
import useUserData from 'hooks/useUserData'

export const UserDataContext = createContext()

export default function UserData ({ children }) {
  const [userData, onClick] = useUserData()

  return (
    <UserDataContext.Provider value={userData}>
      <UserDataDispatchContext.Provider value={onClick}>
        {children}
      </UserDataDispatchContext.Provider>
    </UserDataContext.Provider>
  )
}

UserData.propTypes = {
  children: PropTypes.node.isRequired
}
