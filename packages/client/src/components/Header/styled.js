import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import {
  headerHeightInRem,
  mobileHeaderHeightInRem,
  screens
} from 'constants/Styles'

export function HeaderTag ({
  isScrollingDown = false,
  mobile = false,
  ...props
}) {
  return (
    <header
      css={css`
        background-color: var(--colors-white900);
        display: ${mobile ? 'none' : 'block'};
        height: ${headerHeightInRem}rem;
        position: ${mobile ? 'sticky' : 'fixed'};
        top: 0;
        width: 100%;
        z-index: 200;

        ${screens.nonDesktop} {
          display: ${mobile ? 'block' : 'none'};
          height: ${mobileHeaderHeightInRem}rem;
          transform: translateY(${isScrollingDown ? '-100%' : 0});
          transition: transform 0.3s;
          will-change: transform;
        }
      `}
      {...props}
    />
  )
}

HeaderTag.propTypes = {
  isScrollingDown: PropTypes.bool,
  mobile: PropTypes.bool
}

export function HeaderWrapper ({ shadow = false, ...props }) {
  return (
    <div
      className='base'
      css={css`
        align-items: center;
        box-shadow: ${shadow ? 'var(--shadows-02)' : 'none'};
        display: flex;
        height: 100%;
        justify-content: space-between;
      `}
      {...props}
    />
  )
}

HeaderWrapper.propTypes = {
  shadow: PropTypes.bool
}
