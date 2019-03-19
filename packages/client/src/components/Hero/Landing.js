import React, { memo } from 'react'
import { css } from '@emotion/core'

import { CTA } from './styled'
import { baseWrapper } from 'utils/styles'

export default memo(function Landing () {
  const handleClick = () =>
    window.scrollTo({
      top: document.getElementById('hero').offsetHeight,
      behavior: 'smooth'
    })

  return (
    <div
      css={css`
        ${baseWrapper}
        background-color: #fff;
        display: flex;
        flex-direction: column;
        height: 30rem;
        justify-content: center;
      `}
    >
      <h1
        css={theme => css`
          color: ${theme.colors.gray700};
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
      <div
        css={css`
          margin-top: 1.5rem;
        `}
      >
        <CTA aria-label='Explore Learning Collections' onClick={handleClick}>
          EXPLORE
        </CTA>
      </div>
    </div>
  )
})
