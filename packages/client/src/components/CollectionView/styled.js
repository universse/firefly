import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

export function Category (props) {
  return (
    <Link
      css={theme => css`
        color: ${theme.colors.brand500};
        font-size: 0.875rem;
        text-transform: uppercase;
        font-weight: 700;
      `}
      {...props}
    />
  )
}

export function CollectionTitle (props) {
  return (
    <h1
      css={theme => css`
        color: ${theme.colors.gray700};
        font-family: 'Playfair Display', serif;
        font-size: 2.25rem;
        font-weight: 900;
        line-height: 2.75rem;
      `}
      {...props}
    />
  )
}

export function CollectionWrapper (props) {
  return (
    <div
      css={theme => css`
        border-bottom: 1px solid ${theme.colors.gray400};
        display: flex;
        flex-direction: column;
        height: 12rem;
        justify-content: space-between;
        padding: 2rem 2rem;
      `}
      {...props}
    />
  )
}

export function Difficulty (props) {
  return (
    <span
      css={theme => css`
        color: ${theme.colors.gray700};
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: capitalize;
      `}
      {...props}
    />
  )
}

export function IconButton (props) {
  return (
    <button
      css={theme =>
        css`
          color: ${theme.colors.gray500};
          height: 3rem;
          width: 2.5rem;
          z-index: 1;
        `
      }
      type='button'
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
        padding: 1.5rem 4rem 0 6.5rem;
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
          `
        }
      />
    </div>
  )
}

export function Tag (props) {
  return (
    <Link
      css={theme => css`
        background-color: ${theme.colors.gray300};
        border-radius: 0.75rem;
        color: ${theme.colors.gray900};
        display: block;
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1.5rem;
        padding: 0 0.75rem;

        :hover {
          background-color: ${theme.colors.gray400};
        }
      `}
      {...props}
    />
  )
}
