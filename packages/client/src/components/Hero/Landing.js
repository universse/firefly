import React, { memo } from 'react'
import { css } from '@emotion/core'

import { PrimaryButton } from 'components/common'
import { baseWrapper } from 'utils/styles'
import { scrollToHero } from '../../../gatsby/utils'

function Landing () {
  return (
    <div
      css={css`
        ${baseWrapper}
        background-color: #fff;
        display: flex;
        flex-direction: column;
        height: 24rem;
        justify-content: center;
      `}
    >
      <hgroup>
        <h1
          css={theme => css`
            color: ${theme.colors.gray800};
            font-family: 'Playfair Display', serif;
            font-size: 2.75rem;
            font-weight: 900;
            line-height: 4rem;
          `}
        >
          Follow your curiosity.
        </h1>
        <h2
          css={theme => css`
            color: ${theme.colors.gray900};
            font-size: 1.5rem;
            line-height: 2rem;
          `}
        >
          Discover the best learning resources, curated by the community.
        </h2>
      </hgroup>
      <div
        css={css`
          margin-top: 1.5rem;
        `}
      >
        <PrimaryButton
          aria-label='Explore Learning Collections'
          large
          onClick={scrollToHero}
        >
          EXPLORE
        </PrimaryButton>
      </div>
    </div>
  )
}

export default memo(Landing)
