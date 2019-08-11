import React from 'react'
import PropTypes from 'prop-types'

export default function OutboundLink ({ onClick, ...props }) {
  return (
    // eslint-disable-next-line
    <a
      onClick={e => {
        onClick && onClick()

        let redirect = true

        if (
          e.button !== 0 ||
          e.altKey ||
          e.ctrlKey ||
          e.metaKey ||
          e.shiftKey ||
          e.defaultPrevented
        ) {
          redirect = false
        }

        if (props.target && props.target.toLowerCase() !== '_self') {
          redirect = false
        }

        window.___log('click outbound link', { href: props.href })

        redirect && (document.location = props.href)

        return false
      }}
      {...props}
    />
  )
}

OutboundLink.propTypes = {
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  target: PropTypes.string
}
