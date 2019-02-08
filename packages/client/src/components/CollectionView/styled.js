import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

export function CollectionTitle (props) {
  return (
    <h1
      css={theme => css`
        color: ${theme.colors.gray700};
        font-size: 2.25rem;
        font-weight: 700;
        line-height: 2.75rem;
      `}
      {...props}
    />
  )
}

export function LinkTitle ({ href, title }) {
  return (
    <a
      css={theme => css`
        color: ${theme.colors.gray700};
        display: flex;
        height: 100%;
        padding: 1.25rem 3.75rem 0 6.25rem;
      `}
      href={href}
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
        {title}
      </h3>
    </a>
  )
}

export function ProgressBar ({ percentage }) {
  return (
    <div
      css={theme =>
        css`
          background-color: ${theme.colors.gray300};
          border-radius: 0.375rem;
          width: 12rem;
        `
      }
    >
      <div
        css={theme =>
          css`
            background-color: ${theme.colors.brand500};
            border-radius: 0.375rem;
            height: 0.75rem;
            width: ${percentage}%;
            transition: width 0.75s;
          `
        }
      />
    </div>
  )
}
