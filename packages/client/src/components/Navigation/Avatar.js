import React, { useMemo } from 'react'
import localforage from 'localforage'

import { Dropdown, IconButton } from 'components/common'
import { User } from 'icons'
import LocalStorage from 'constants/LocalStorage'
import firebaseWorker from 'utils/firebase'

export default function Avatar () {
  const items = useMemo(
    () => [
      {
        'aria-label': 'Sign Out',
        as: 'button',
        children: 'Sign Out',
        onClick: () =>
          firebaseWorker.signOut().then(() => {
            if (window.amplitude) {
              window.amplitude.getInstance().setUserId(null)
              window.amplitude.getInstance().regenerateDeviceId()
            }
            localforage.clear()
            window.localStorage.removeItem(LocalStorage.HAS_SIGNED_IN)
            window.location.reload()
          })
      }
    ],
    []
  )

  return (
    <Dropdown
      Icon={User}
      id='user-avatar'
      items={items}
      label='User Avatar'
      ToggleButton={IconButton}
    />
  )
}
