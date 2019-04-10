import React, { memo } from 'react'
import PropTypes from 'prop-types'

function OutboundLink ({ onClick, ...props }) {
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

        if (props.target && props.target.toLowerCase() !== `_self`) {
          redirect = false
        }

        if (window.amplitude) {
          window.amplitude.getInstance().logEvent(
            'click outbound link',
            {
              href: props.href
            },
            () => {
              if (redirect) {
                document.location = props.href
              }
            }
          )
        } else {
          if (redirect) {
            document.location = props.href
          }
        }

        return false
      }}
      {...props}
    />
  )
}

export default memo(OutboundLink)

OutboundLink.propTypes = {
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  target: PropTypes.string
}
