import React from 'react'
import PropTypes from 'prop-types'
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
      onClick={e => {
        onActionClick()
        onClick(e)
      }}
      type='button'
      {...props}
    />
  )
}

ActionButton.propTypes = {
  onActionClick: PropTypes.func.isRequired,
  onClick: PropTypes.func
}

export function Message (props) {
  return (
    <span
      css={theme => css`
        color: ${theme.colors.white900};
        font-size: 1rem;
        line-height: 1.5rem;
      `}
      {...props}
    />
  )
}

export function Surface (props) {
  return (
    <div
      css={theme => css`
        align-items: center;
        background-color: ${theme.colors.gray600};
        border-radius: 4px;
        box-shadow: ${theme.shadows[2]};
        display: flex;
        justify-content: space-between;
        max-width: 40rem;
        min-width: 22.5rem;
        padding: 0 0.5rem 0 1rem;

        ${theme.screens.mobile} {
          flex-direction: column;
          margin: 0 1rem;
          min-width: auto;
          padding: 0 1rem;
        }
      `}
      {...props}
    />
  )
}

export function Wrapper ({ isOpen, ...props }) {
  return (
    <div
      aria-hidden={!isOpen}
      css={theme => css`
        bottom: ${mobileNavigationHeightInRem}rem;
        display: flex;
        justify-content: center;
        left: 0;
        margin: 0.5rem auto;
        opacity: ${isOpen ? 1 : 0};
        position: fixed;
        right: 0;
        transform: scale(${isOpen ? 1 : 0.8});
        transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out,
          visibility 0.15s;
        visibility: ${isOpen ? 'visible' : 'hidden'};
        z-index: 900;

        ${theme.screens.desktop} {
          bottom: 1rem;
        }
      `}
      {...props}
    />
  )
}

Wrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired
}
