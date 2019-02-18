import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import { HeaderTag } from './styled'
import { HeaderWrapper, IconButton } from 'components/common'
import { Back, Logo } from 'icons'

export default function MobileHeader () {
  return (
    <HeaderTag>
      <HeaderWrapper>
        <div
          css={css`
            align-items: center;
            display: flex;
          `}
        >
          <div
            css={css`
              margin-right: 1.5rem;
            `}
          >
            <Link
              css={css`
                display: block;
                height: 2.25rem;
              `}
              to='/'
            >
              <Logo />
            </Link>
          </div>
        </div>
      </HeaderWrapper>
    </HeaderTag>
  )
}

export function CollectionHeader () {
  return (
    <HeaderTag>
      <HeaderWrapper>
        <div
          css={css`
            align-items: center;
            display: flex;
          `}
        >
          <div
            css={css`
              margin: 0 0.5rem 0 -0.5rem;
            `}
          >
            <IconButton
              aria-label='Go Back to Previous Screen'
              onClick={() => window.history.back()}
            >
              <Back />
            </IconButton>
          </div>
          <div>
            <h2
              css={theme => css`
                color: ${theme.colors.gray700};
                font-weight: 700;
                line-height: 1.5rem;
              `}
            >
              Collection
            </h2>
          </div>
        </div>
      </HeaderWrapper>
    </HeaderTag>
  )
}
