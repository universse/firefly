import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

export function DefaultRoot ({ innerRef, ...props }) {
  return (
    <div
      ref={innerRef}
      css={css`
        display: inline-block;
        position: relative;
      `}
      {...props}
    />
  )
}

DefaultRoot.propTypes = {
  innerRef: PropTypes.func.isRequired
}
