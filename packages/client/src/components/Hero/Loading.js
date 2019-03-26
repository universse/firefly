import React from 'react'
import { css } from '@emotion/core'

export default function Loading () {
  return (
    <>
      <div
        className='pulse'
        css={css`
          border-radius: 0.125rem;
          height: 1.75rem;
          margin-bottom: 1rem;
          width: 15rem;
        `}
      />
      <div
        className='pulse'
        css={css`
          border-radius: 0.125rem;
          height: 1.25rem;
          margin-bottom: 2.5rem;
          width: 24rem;
        `}
      />
      <div
        className='pulse'
        css={css`
          border-radius: 1.25rem;
          height: 2.5rem;
          width: 10rem;
        `}
      />
    </>
  )
}
