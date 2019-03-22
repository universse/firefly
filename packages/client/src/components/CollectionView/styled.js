import React from 'react'
import { css } from '@emotion/core'

export function CollectionTitle (props) {
  return (
    // eslint-disable-next-line
    <h1
      css={theme => css`
        color: ${theme.colors.gray800};
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 2rem;

        ${theme.screens.desktop} {
          font-size: 1.5rem;
          line-height: 2.5rem;
        }
      `}
      {...props}
    />
  )
}

export function LinkTitle ({ href, title }) {
  return (
    <a
      css={theme => css`
        color: ${theme.colors.gray800};
        display: flex;
        height: 100%;
        padding: 0.5rem 0.75rem 0 3.25rem;

        ${theme.screens.tablet} {
          padding: 0.875rem 3.75rem 0 4.25rem;
        }

        ${theme.screens.desktop} {
          padding: 1.25rem 3.75rem 0 6.25rem;
        }
      `}
      href={href}
      rel='noopener noreferrer'
      target='_blank'
    >
      <h3
        css={theme =>
          css`
            color: ${theme.colors.gray900};
            font-size: 1rem;
            font-weight: 600;
            line-height: 1.5rem;

            ${theme.screens.tablet} {
              color: ${theme.colors.gray800};
              font-size: 1.125rem;
              line-height: 1.5rem;
            }

            ${theme.screens.desktop} {
              color: ${theme.colors.gray800};
              font-size: 1.25rem;
              line-height: 2rem;
            }
          `
        }
      >
        {title}
      </h3>
    </a>
  )
}

export function ProgressBar ({ percentage, width }) {
  return (
    <div
      css={theme =>
        css`
          background-color: ${theme.colors.gray300};
          border-radius: 0.375rem;
          width: ${width || '100%'};
        `
      }
    >
      <div
        css={theme =>
          css`
            background-color: ${theme.colors.brand500};
            border-radius: 0.375rem;
            height: 0.5rem;
            transition: width 0.75s;
            width: ${percentage}%;

            ${theme.screens.desktop} {
              height: 0.75rem;
            }
          `
        }
      />
    </div>
  )
}
