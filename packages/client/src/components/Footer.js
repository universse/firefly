import React, { memo } from 'react'
import { css } from '@emotion/core'
import { screens } from 'constants/Styles'

import useSiteTitle from 'hooks/useSiteTitle'

function Footer () {
  const title = useSiteTitle()

  return (
    <footer
      css={css`
        ${screens.nonDesktop} {
          display: none;
        }
      `}
    >
      <div
        className='base'
        css={css`
          align-items: center;
          border-top: 1px solid var(--gray200);
          display: flex;
          height: 3rem;
          justify-content: center;
        `}
      >
        <p
          css={css`
            color: var(--black800);
            font-size: 0.8125rem;
            font-weight: 500;
          `}
        >
          Made with{' '}
          <span
            aria-label='Love'
            css={css`
              color: var(--brand500);
              font-size: 1rem;
            `}
            role='img'
          >
            ❤
          </span>
          . ©️ {new Date().getFullYear()} {title}.
        </p>
      </div>
    </footer>
  )
}

export default memo(Footer)
