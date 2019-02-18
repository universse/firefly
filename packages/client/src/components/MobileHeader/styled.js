import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { mobileHeaderHeightInRem } from 'utils/styles'

export function HeaderTag (props) {
  return (
    <header
      css={theme => css`
        background-color: ${theme.colors.white};
        height: ${mobileHeaderHeightInRem}rem;
        position: absolute;
        top: 0;
        width: 100%;

        ${theme.screens.desktop} {
          display: none;
        }
      `}
      {...props}
    />
  )
}
