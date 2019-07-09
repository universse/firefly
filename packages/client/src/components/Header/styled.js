import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import {
  headerHeightInRem,
  mobileHeaderHeightInRem,
  screens
} from 'constants/Styles'

export function HeaderTag ({ mobile = false, shadow = false, ...props }) {
  return (
    <header
      css={css`
        background-color: var(--white900);
        box-shadow: var(--shadow-01);
        display: ${mobile ? 'none' : 'block'};
        height: ${headerHeightInRem}rem;
        position: ${mobile ? 'sticky' : 'fixed'};
        top: 0;
        width: 100%;
        z-index: 200;

        ${screens.nonDesktop} {
          box-shadow: ${shadow ? 'var(--shadow-01)' : 'none'};
          display: ${mobile ? 'block' : 'none'};
          height: ${mobileHeaderHeightInRem}rem;
        }
      `}
      {...props}
    />
  )
}

HeaderTag.propTypes = {
  mobile: PropTypes.bool,
  shadow: PropTypes.bool
}

export function HeaderWrapper (props) {
  return (
    <div
      className='base'
      css={css`
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: space-between;
      `}
      {...props}
    />
  )
}
