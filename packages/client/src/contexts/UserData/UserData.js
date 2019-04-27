import React, { createContext } from 'react'
import PropTypes from 'prop-types'

import { UserDataDispatchContext } from '../UserDataDispatch'
import useUserData from './useUserData'

export const UserDataContext = createContext()

export default function UserData ({ canUndo, children }) {
  const [userData, onActionClick] = useUserData(canUndo)

  return (
    <UserDataContext.Provider value={userData}>
      <UserDataDispatchContext.Provider value={onActionClick}>
        {children}
      </UserDataDispatchContext.Provider>
    </UserDataContext.Provider>
  )
}

UserData.propTypes = {
  canUndo: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}
