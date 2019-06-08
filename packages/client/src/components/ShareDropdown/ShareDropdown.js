import React from 'react'
import PropTypes from 'prop-types'

import { IconButton, OutboundLink } from 'components/common'
import { Share } from 'icons'
import useDropdownMenu from 'hooks/useDropdownMenu'
import { createFacebookShareURL, createTwitterShareURL } from './utils'
import { createActionLabel } from 'utils/ariaLabelUtils'
import copyToClipboard from 'utils/copyToClipboard'

export default function ShareDropdown ({ name }) {
  const {
    detailsProps,
    summaryProps,
    menuProps,
    getMenuItemProps,
    highlightedIndex
  } = useDropdownMenu({ menuItemCount: 3 })

  const href = window.location.href

  return (
    <details className='DropdownMenu' {...detailsProps}>
      <IconButton
        aria-label={createActionLabel('share', name)}
        as='summary'
        {...summaryProps}
      >
        <Share />
      </IconButton>
      <div className='Menu' {...menuProps}>
        <button
          aria-label='Sign out'
          className={`${highlightedIndex === 0 ? 'highlighted' : ''}`}
          onClick={e => {
            copyToClipboard(href)
            e.currentTarget.focus()
          }}
          type='button'
          {...getMenuItemProps(0)}
        >
          Copy
        </button>
        <OutboundLink
          className={`${highlightedIndex === 1 ? 'highlighted' : ''}`}
          href={createFacebookShareURL({
            href,
            text: name
          })}
          {...getMenuItemProps(1)}
        >
          Facebook
        </OutboundLink>
        <OutboundLink
          className={`${highlightedIndex === 2 ? 'highlighted' : ''}`}
          href={createTwitterShareURL({ href, text: name })}
          rel='noopener noreferrer'
          target='_blank'
          {...getMenuItemProps(2)}
        >
          Twitter
        </OutboundLink>
      </div>
    </details>
  )
}

ShareDropdown.propTypes = {
  name: PropTypes.string.isRequired
}
