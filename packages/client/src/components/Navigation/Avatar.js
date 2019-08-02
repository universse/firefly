import React from 'react'
import { Link } from 'gatsby'

import { OutboundLink } from 'components/common'
import Icon from 'assets/icons'
import LocalStorage from 'constants/LocalStorage'
import useDropdownMenu from 'hooks/useDropdownMenu'
import firebaseWorker from 'utils/firebaseWorker'
import offlineStorageWorker from 'utils/offlineStorageWorker'

export default function Avatar () {
  const {
    detailsProps,
    summaryProps,
    menuProps,
    getMenuItemProps,
    highlightedIndex
  } = useDropdownMenu({ menuItemCount: 1 })

  return (
    <details className='DropdownMenu' {...detailsProps}>
      <summary
        aria-label='Open User Menu'
        className='IconButton'
        {...summaryProps}
      >
        <Icon icon='user' />
      </summary>
      <ul className='Right' {...menuProps}>
        <button
          aria-label='Sign Out'
          {...highlightedIndex === 0 && { className: 'highlighted' }}
          onClick={() => {
            firebaseWorker.signOut().then(() => {
              if (window.amplitude) {
                window.amplitude.getInstance().setUserId(-1)
                window.amplitude.getInstance().regenerateDeviceId()
              }
              offlineStorageWorker.clear()
              window.localStorage.removeItem(LocalStorage.HAS_SIGNED_IN)
              window.location.reload()
            })
          }}
          type='button'
          {...getMenuItemProps(0)}
        >
          Sign Out
        </button>
        {/* <OutboundLink
          {...highlightedIndex === 1 && { className: 'highlighted' }}
          href='https://www.google.com'
          {...getMenuItemProps(1)}
        >
          Sign Out
        </OutboundLink>
        <Link
          {...highlightedIndex === 2 && { className: 'highlighted' }}
          to='/my-library'
          {...getMenuItemProps(2)}
        >
          Library
        </Link> */}
      </ul>
    </details>
  )
}
