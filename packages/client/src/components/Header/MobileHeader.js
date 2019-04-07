import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { ActionBar } from 'components/common'
import { HeaderTag, HeaderWrapper } from './styled'

function MobileHeader ({ actions, navIcon, shadow, title }) {
  return (
    <HeaderTag
      css={theme => css`
        position: sticky;

        ${theme.screens.desktop} {
          display: none;
        }
      `}
    >
      <HeaderWrapper shadow={shadow}>
        <div
          css={css`
            align-items: center;
            display: flex;
          `}
        >
          {navIcon && (
            <div
              css={css`
                margin: 0 1.5rem 0 -0.5rem;
              `}
            >
              {navIcon}
            </div>
          )}
          <div>
            <h2
              css={theme => css`
                color: ${theme.colors.gray800};
                font-size: 1.25rem;
                font-weight: 600;
                line-height: 1.5rem;
              `}
            >
              {title}
            </h2>
          </div>
        </div>
        {actions && <ActionBar>{actions}</ActionBar>}
      </HeaderWrapper>
    </HeaderTag>
  )
}

export default memo(MobileHeader)

MobileHeader.defaultProps = {
  shadow: false
}

MobileHeader.propTypes = {
  shadow: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  actions: PropTypes.element,
  navIcon: PropTypes.element
}
