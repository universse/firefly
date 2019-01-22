import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { ModalContext } from './Modal'
import { baseWrapper } from '../styles'

const button = theme => css`
  background-color: ${theme.colors.brand500};
  border-radius: 1.25rem;
  color: #fff;
  font-size: 0.9375rem;
  font-weight: 700;
  height: 2.5rem;
  padding: 0 3rem;
`

export default function Hero () {
  const { handleModalOpen } = useContext(ModalContext)

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
              color: ${theme.colors.gray900};
              font-size: 2.25rem;
              font-weight: 700;
              line-height: 3rem;
            `}
          >
            Follow your curiosity.
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
        </div>
        <div
          css={css`
            margin-top: 0.5rem;
          `}
        >
          <button css={button} onClick={handleModalOpen} type='button'>
            Explore
          </button>
        </div>
      </div>
    </section>
  )
}
