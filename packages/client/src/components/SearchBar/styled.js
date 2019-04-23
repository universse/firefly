import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

export function DefaultItem ({ isHighlighted, ...props }) {
  return <li {...props} />
}

DefaultItem.propTypes = {
  isHighlighted: PropTypes.bool.isRequired
}

export function DefaultResultBox (props) {
  return (
    <ul
      css={css`
        margin-top: 0.5rem;
      `}
      {...props}
    />
  )
}

export function DefaultRoot ({ innerRef, ...props }) {
  return <div ref={innerRef} {...props} />
}

DefaultRoot.propTypes = {
  innerRef: PropTypes.func.isRequired
}
