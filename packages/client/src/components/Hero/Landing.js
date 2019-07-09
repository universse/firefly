import React, { memo } from 'react'
import { css } from '@emotion/core'

import { HeroImage } from 'assets/illustrations'
import { PrimaryButton } from 'components/common'
import AriaLabels from 'constants/AriaLabels'
import { screens } from 'constants/Styles'
import { logClickCTA } from 'utils/amplitude'
import { scrollToHero } from '../../../gatsby/utils'

function Landing () {
  return (
    <div
      className='base'
      css={css`
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 3rem 1rem;

        ${screens.nonDesktop} {
          flex-direction: column;
          padding: 2rem 1rem 1rem;
        }
      `}
    >
      <div
        css={css`
          ${screens.tablet} {
            align-items: center;
            display: flex;
            flex-direction: column;
          }
        `}
      >
        <h1
          css={css`
            color: var(--black900);
            font-family: Spectral, serif;
            font-size: 3rem;
            font-weight: 800;
            line-height: 3.5rem;
          `}
        >
          Follow your curiosity.
        </h1>
        <h2
          css={css`
            color: var(--black900);
            font-size: 1.125rem;
            line-height: 2rem;
          `}
        >
          Discover the best learning resources, curated by the community.
        </h2>
        <div
          css={css`
            margin-top: 1rem;

            ${screens.desktop} {
              margin-top: 2rem;
            }
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
      <HeroImage />
    </div>
  )
}

export default memo(Landing)
