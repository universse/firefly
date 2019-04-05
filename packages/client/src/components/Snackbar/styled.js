import React from 'react'
import { css } from '@emotion/core'

import { mobileNavigationHeightInRem } from 'constants/Styles'

export function ActionButton ({ onActionClick, onClick, ...props }) {
  return (
    <button
      css={theme => css`
        border-radius: 4px;
        color: ${theme.colors.brand300};
        font-size: 1rem;
        font-weight: 600;
        height: 2.25rem;
        padding: 0 0.5rem;
        text-transform: uppercase;

        &:hover {
          background-color: ${theme.colors.white100};
        }
      `}
      onClick={() => {
        onActionClick()
        onClick()
      }}
      type='button'
      {...props}
    />
  )
}

export function Message (props) {
  return (
    <span
      aria-live='polite'
      css={theme => css`
        color: ${theme.colors.white900};
        font-size: 1rem;
      `}
      role='status'
      {...props}
    />
  )
}

// TODO: transition
export function Surface ({ isOpen, ...props }) {
  return (
    <div
      css={theme => css`
        align-items: center;
        background-color: ${theme.colors.gray600};
        border-radius: 4px;
        box-shadow: ${theme.shadows[2]};
        display: flex;
        height: 3rem;
        justify-content: space-between;
        max-width: 40rem;
        min-width: 22.5rem;
        opacity: ${isOpen ? 1 : 0};
        padding: 0 0.5rem 0 1rem;
        transform: scale(${isOpen ? 1 : 0});
        transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out;
      `}
      {...props}
    />
  )
}

export function Wrapper (props) {
  return (
    <div
      css={theme => css`
        bottom: ${mobileNavigationHeightInRem}rem;
        display: flex;
        justify-content: center;
        left: 0;
        margin: 0.5rem auto;
        position: fixed;
        right: 0;
        z-index: 900;

        ${theme.screens.desktop} {
          bottom: 1rem;
        }
      `}
      {...props}
    />
  )
}
