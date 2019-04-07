import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { PrimaryButton } from 'components/common'
import AriaLabels from 'constants/AriaLabels'
import { scrollToHero } from '../../../gatsby/utils'

function Onboard ({ message }) {
  return (
    <>
      <hgroup>
        <h1
          css={theme => css`
            color: ${theme.colors.gray800};
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            font-weight: 900;
            line-height: 2.5rem;
          `}
        >
          {message}
        </h1>
        <h2
          css={theme => css`
            color: ${theme.colors.gray900};
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
        <PrimaryButton aria-label={AriaLabels.EXPLORE} onClick={scrollToHero}>
          Explore
        </PrimaryButton>
      </div>
    </>
  )
}

export default memo(Onboard)

Onboard.propTypes = {
  message: PropTypes.string.isRequired
}
