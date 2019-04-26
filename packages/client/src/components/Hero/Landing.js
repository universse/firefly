import React, { memo } from 'react'
import { css } from '@emotion/core'

import { PrimaryButton } from 'components/common'
import AriaLabels from 'constants/AriaLabels'
import { logClickCTA } from 'utils/amplitudeUtils'
import { scrollToHero } from '../../../gatsby/utils'

function Landing () {
  return (
    <div
      className='base'
      css={css`
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
            font-size: 2.5rem;
            font-weight: 900;
            line-height: 4rem;
          `}
        >
          Follow your curiosity.
        </h1>
        <h2
          css={theme => css`
            color: ${theme.colors.gray900};
            font-size: 1.25rem;
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
          aria-label={AriaLabels.EXPLORE}
          large
          onClick={() => {
            scrollToHero()
            logClickCTA()
          }}
        >
          EXPLORE
        </PrimaryButton>
      </div>
    </div>
  )
}

export default memo(Landing)
