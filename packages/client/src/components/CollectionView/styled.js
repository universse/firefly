import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { Check } from '../../icons'
import { LinkIcons } from '../../constants'
import { getHostname } from './utils'

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

export function LearningItem ({ url, title, type }) {
  const LinkIcon = LinkIcons[type.toUpperCase()]

  return (
    <>
      <div
        css={css`
          height: 100%;
          position: absolute;
          width: 100%;
        `}
      >
        <LinkTitle href={url} title='This is a title for the learning item' />
      </div>
      <div
        css={theme => css`
          border-bottom: 1px solid ${theme.colors.gray400};
          display: flex;
          flex-direction: column;
          height: 9rem;
          justify-content: space-between;
          margin: 0 4rem;
          padding: 1.5rem 0;
        `}
      >
        <div
          css={theme => css`
            align-items: center;
            display: flex;
            margin: -0.375rem 0 0 -0.25rem;
          `}
        >
          <IconButton>
            <Check />
          </IconButton>
        </div>
        {/* author */}
        <div
          css={css`
            display: flex;
            align-items: center;
            margin-left: 2.5rem;
          `}
        >
          <div
            css={theme =>
              css`
                align-items: center;
                color: ${theme.colors.gray500};
                display: flex;
                height: 1.5rem;
                margin-right: 0.5rem;
              `
            }
          >
            <LinkIcon small />
          </div>
          <div>
            <span
              css={theme => css`
                color: ${theme.colors.gray500};
                display: block;
                font-size: 0.875rem;
                font-weight: 600;
                line-height: 1.5rem;
              `}
            >
              {getHostname(url)}
            </span>
          </div>
        </div>
      </div>
    </>
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
