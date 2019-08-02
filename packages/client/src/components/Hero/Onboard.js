import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import AriaLabels from 'constants/AriaLabels'
import { scrollToHero } from '../../../gatsby/utils'

function Onboard ({ message }) {
  return (
    <>
      <hgroup>
        <h1
          css={css`
            color: var(--black800);
            font-family: Spectral, serif;
            font-size: 2rem;
            font-weight: 900;
            line-height: 2.5rem;
          `}
        >
          {message}
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
      </hgroup>
      <div
        css={css`
          margin-top: 1.5rem;
        `}
      >
        <button
          aria-label={AriaLabels.EXPLORE}
          className='PrimaryButton'
          onClick={scrollToHero}
          type='button'
        >
          Explore
        </button>
      </div>
    </>
  )
}

export default memo(Onboard)

Onboard.propTypes = {
  message: PropTypes.string.isRequired
}
