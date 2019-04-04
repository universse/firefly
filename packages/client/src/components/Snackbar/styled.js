import React from 'react'
import { css } from '@emotion/core'

export function ActionButton (props) {
  return (
    <button
      css={theme => css`
        border-radius: 4px;
        color: ${theme.colors.brand500};
        font-size: 1rem;
        font-weight: 600;
        height: 2.25rem;
        padding: 0 0.5rem;
        text-transform: uppercase;

        &:hover {
          background-color: ${theme.colors.white100};
        }
      `}
      type='button'
      {...props}
    />
  )
}

export function Message (props) {
  return (
    <span
      css={theme => css`
        color: ${theme.colors.white900};
        font-size: 1rem;
      `}
      {...props}
    />
  )
}

// TODO: transition
export function Surface (props) {
  return (
    <div
      css={theme => css`
        align-items: center;
        background-color: ${theme.colors.gray600};
        border-radius: 4px;
        display: flex;
        height: 3rem;
        justify-content: space-between;
        max-width: 40rem;
        min-width: 22.5rem;
        padding: 0 0.5rem 0 1rem;
      `}
      {...props}
    />
  )
}

export function Wrapper ({ isOpen, ...props }) {
  return (
    <div
      aria-live='polite'
      css={css`
        bottom: 0;
        display: ${isOpen ? 'flex' : 'none'};
        justify-content: center;
        left: 0;
        margin: 0.5rem auto;
        position: fixed;
        right: 0;
      `}
      role='status'
      {...props}
    />
  )
}
