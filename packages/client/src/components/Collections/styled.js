import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { createCollectionPath } from '../../../gatsby/utils'

export function CardTitle ({ id, name }) {
  return (
    <Link
      css={css`
        display: block;
        height: 8rem;
      `}
      to={createCollectionPath({ id, name })}
    >
      <h3
        css={css`
          color: rgba(0, 0, 0, 0.7);
          font-weight: 700;
        `}
      >
        {name}
      </h3>
    </Link>
  )
}

export function CardWrapper ({ topic, ...props }) {
  return (
    <div
      css={theme => css`
        background-color: #fff;
        border-radius: 0.5rem;
        border-top: 0.5rem solid ${theme.colors.topics[topic]};
        box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
          0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
        display: flex;
        flex-direction: column;
        height: 16rem;
        justify-content: space-between;
        padding: 1.5rem 2rem;
        position: relative;
        transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: box-shadow;

        &:hover {
          box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
            0 8px 10px 1px rgba(0, 0, 0, 0.14),
            0 3px 14px 2px rgba(0, 0, 0, 0.12);

          button {
            opacity: 1;
            transition: opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          }
        }
      `}
      {...props}
    />
  )
}

export function Difficulty (props) {
  return (
    <span
      css={css`
        color: rgba(0, 0, 0, 0.7);
        font-size: 0.875rem;
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
          color: ${theme.colors.brand500};
          height: 1.5rem;
          opacity: 0;

          &:focus {
            opacity: 1;
          }
        `
      }
      type='button'
      {...props}
    />
  )
}

export function Tag (props) {
  return (
    <Link
      css={theme => css`
        background-color: ${theme.colors.brand100};
        border-radius: 0.75rem;
        color: ${theme.colors.brand900};
        display: block;
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1.5rem;
        padding: 0 0.75rem;
      `}
      {...props}
    />
  )
}

export function Topic ({ topic, ...props }) {
  return (
    <Link
      css={theme => css`
        color: ${theme.colors.topics[topic]};
        font-size: 0.875rem;
        text-transform: uppercase;
        font-weight: 700;
      `}
      {...props}
    >
      {topic}
    </Link>
  )
}
