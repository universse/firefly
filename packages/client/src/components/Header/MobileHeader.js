import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { ActionBar } from 'components/common'
import { HeaderTag, HeaderWrapper } from './styled'

function MobileHeader ({ actions, navIcon, shadow = false, title }) {
  return (
    <HeaderTag mobile shadow={shadow}>
      <HeaderWrapper>
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
          {title && (
            <div>
              <h2
                css={css`
                  color: var(--black800);
                  font-size: 1.25rem;
                  font-weight: 500;
                  line-height: 1.5rem;
                `}
              >
                {title}
              </h2>
            </div>
          )}
        </div>
        {actions && <ActionBar>{actions}</ActionBar>}
      </HeaderWrapper>
    </HeaderTag>
  )
}

export default memo(MobileHeader)

MobileHeader.propTypes = {
  actions: PropTypes.element,
  navIcon: PropTypes.element,
  shadow: PropTypes.bool,
  title: PropTypes.string
}
