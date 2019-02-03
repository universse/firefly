import React from 'react'
import { css } from '@emotion/core'

import { baseWrapper } from '../styles'

export function CTA (props) {
  return (
    <button
      css={theme => css`
        background-color: ${theme.colors.brand500};
        border-radius: 1.5rem;
        color: #fff;
        font-size: 0.9375rem;
        font-weight: 700;
        height: 3rem;
        padding: 0 4rem;
      `}
      type='button'
      {...props}
    />
  )
}

export default function Hero () {
  const handleClick = () =>
    window.scrollTo({
      top: document.getElementById('main').offsetTop,
      behavior: 'smooth'
    })

  return (
    <section>
      <div
        css={css`
          background-color: #fff;
          display: flex;
          flex-direction: column;
          height: 30rem;
          justify-content: center;
          ${baseWrapper}
        `}
      >
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
          <CTA onClick={handleClick}>EXPLORE</CTA>
        </div>
      </div>
    </section>
  )
}
