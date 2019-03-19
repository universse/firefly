import React from 'react'
import { css } from '@emotion/core'

import { baseWrapper } from 'utils/styles'

export default function Footer () {
  return (
    <footer
      css={
        {
          // borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
        }
      }
    >
      <div
        css={css`
          ${baseWrapper}
          align-items: center;
          display: flex;
          height: 3.5rem;
          justify-content: space-between;
        `}
      >
        <div
          css={css`
            align-items: center;
            display: flex;
          `}
        >
          <div
            css={css`
              margin-right: 1.5rem;
            `}
          >
            placeholder
          </div>
        </div>
      </div>
    </footer>
  )
}
