import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

export function DefaultItem ({ isHighlighted, ...props }) {
  return <li {...props} />
}

DefaultItem.propTypes = {
  isHighlighted: PropTypes.bool.isRequired
}

export function DefaultResultBox ({ innerRef, ...props }) {
  return (
    <div
      ref={innerRef}
      css={css`
        margin-top: 0.5rem;
      `}
      {...props}
    />
  )
}

DefaultResultBox.propTypes = {
  innerRef: PropTypes.func.isRequired
}

export function DefaultRoot ({ innerRef, ...props }) {
  return <div ref={innerRef} {...props} />
}

DefaultRoot.propTypes = {
  innerRef: PropTypes.func.isRequired
}
