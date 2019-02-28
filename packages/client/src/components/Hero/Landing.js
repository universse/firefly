import React from 'react'
import { css } from '@emotion/core'

import { CTA } from './styled'

export default function Landing () {
  const handleClick = () =>
    window.scrollTo({
      top: document.getElementById('main').offsetTop,
      behavior: 'smooth'
    })

  return (
    <>
      <div>
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
      </div>
      <div
        css={css`
          margin-top: 1.5rem;
        `}
      >
        <CTA aria-label='Explore Learning Collections' onClick={handleClick}>
          EXPLORE
        </CTA>
      </div>
    </>
  )
}
