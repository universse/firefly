import React from 'react'
import { css } from '@emotion/core'

import { IconButton } from './styled'
import { Check } from '../../icons'
import LinkIcons from '../../constants'

const link = theme => css`
  color: ${theme.colors.gray700};
  display: flex;
  height: 100%;
  padding: 1.5rem 0 0 6.5rem;
`

export default function Links ({ urls }) {
  return (
    <ul
      css={css`
        li:last-child div {
          border: none;
        }
      `}
    >
      {urls.map(({ id, url, title, type }, i) => {
        let hostname

        if (typeof window === 'object') {
          hostname = new URL(url).hostname
        } else {
          const { URL } = require('url')
          hostname = new URL(url).hostname
        }

        return (
          <li
            css={css`
              position: relative;
            `}
            key={id}
          >
            <div
              css={css`
                height: 100%;
                position: absolute;
                width: 100%;
              `}
            >
              <a
                css={link}
                href={url}
                rel='noopener noreferrer'
                target='_blank'
              >
                <h3
                  css={theme =>
                    css`
                      color: ${theme.colors.gray700};
                      font-size: 1.25rem;
                      font-weight: 600;
                      line-height: 2rem;
                    `
                  }
                >
                  This is a title for the learning item.
                </h3>
              </a>
            </div>
            <div
              css={theme => css`
                border-bottom: 1px solid ${theme.colors.gray400};
                display: flex;
                flex-direction: column;
                height: 8rem;
                justify-content: space-between;
                margin: 0 4rem;
                padding: 1.5rem 0;
              `}
            >
              <div
                css={theme => css`
                  align-items: center;
                  display: flex;
                  margin: -0.375rem 0 0 -0.75rem;
                `}
              >
                <IconButton>
                  <Check />
                </IconButton>
              </div>
              {/*  icon */}
              {/* author stars recommend original link */}
              <div
                css={css`
                  margin-left: 2.5rem;
                `}
              >
                <span
                  css={theme => css`
                    color: ${theme.colors.gray500};
                    font-size: 0.875rem;
                    font-weight: 600;
                  `}
                >
                  {hostname}
                </span>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
