import React from 'react'
import PropTypes from 'prop-types'

import { OutboundLink } from 'components/common'
import { Share } from 'assets/icons'
import useDropdownMenu from 'hooks/useDropdownMenu'
import useSiteTitle from 'hooks/useSiteTitle'
import { createActionLabel } from 'utils/ariaLabelUtils'
import { getCopyUrlProps, getShareProps, Platforms } from 'utils/sharing'

export default function ShareDropdown ({ name }) {
  const {
    detailsProps,
    summaryProps,
    menuProps,
    getMenuItemProps,
    highlightedIndex
  } = useDropdownMenu({ menuItemCount: Platforms.length })
  const siteTitle = useSiteTitle()
  const href = window.location.href

  return (
    <details className='DropdownMenu' {...detailsProps}>
      <summary
        aria-label={createActionLabel('share', name)}
        className='IconButton'
        {...summaryProps}
      >
        <Share />
      </summary>
      <ul {...menuProps}>
        {Platforms.map((platform, i) => (
          <OutboundLink
            key={platform}
            className={`${highlightedIndex === i ? 'highlighted' : ''}`}
            {...getShareProps({
              href,
              mobile: true,
              platform,
              siteTitle,
              text: name
            })}
            {...getMenuItemProps(i)}
          />
        ))}
        <button
          className={`${
            highlightedIndex === Platforms.length ? 'highlighted' : ''
          }`}
          {...getCopyUrlProps({ href, mobile: true })}
          {...getMenuItemProps(Platforms.length)}
        />
      </ul>
    </details>
  )
}

ShareDropdown.propTypes = {
  name: PropTypes.string.isRequired
}
