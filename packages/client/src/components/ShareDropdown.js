import React from 'react'
import PropTypes from 'prop-types'

import { OutboundLink } from 'components/common'
import Icon from 'assets/icons'
import useDropdownMenu from 'hooks/useDropdownMenu'
import useSiteMetadata from 'hooks/useSiteMetadata'
import { createActionLabel } from 'utils/ariaLabelUtils'
import { getCopyUrlProps, getShareProps, Platforms } from 'utils/sharing'

export default function ShareDropdown ({ name, left = false, top = false }) {
  const {
    detailsProps,
    summaryProps,
    menuProps,
    getMenuItemProps,
    highlightedIndex
  } = useDropdownMenu({
    menuItemCount: Platforms.length,
    left,
    top
  })
  const { title } = useSiteMetadata()

  return (
    <details className='DropdownMenu' {...detailsProps}>
      <summary
        aria-label={createActionLabel('share', name)}
        className='IconButton'
        {...summaryProps}
      >
        <Icon icon='share' />
      </summary>
      <div {...menuProps}>
        {Platforms.map((platform, i) => (
          <OutboundLink
            key={platform}
            className={`${highlightedIndex === i ? 'highlighted' : ''}`}
            {...getShareProps({
              mobile: true,
              platform,
              title,
              text: name
            })}
            {...getMenuItemProps(i)}
          />
        ))}
        <button
          className={`${
            highlightedIndex === Platforms.length ? 'highlighted' : ''
          }`}
          {...getCopyUrlProps({ mobile: true })}
          {...getMenuItemProps(Platforms.length)}
        />
      </div>
    </details>
  )
}

ShareDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  left: PropTypes.bool,
  top: PropTypes.bool
}
