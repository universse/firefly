import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { OutboundLink } from 'components/common'
import { screens } from 'constants/Styles'

export function CollectionTitle (props) {
  return (
    // eslint-disable-next-line
    <h1
      css={css`
        color: var(--colors-gray800);
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 2.25rem;

        ${screens.desktop} {
          font-size: 1.5rem;
          line-height: 2.75rem;
        }
      `}
      {...props}
    />
  )
}

export function LinkTitle ({ href, onClick, title }) {
  return (
    <OutboundLink
      css={css`
        color: var(--colors-gray800);
        display: flex;
        height: 100%;
        padding: 0.625rem 0.75rem 0 3.25rem;

        ${screens.tablet} {
          padding: 0.875rem 3.75rem 0 4.25rem;
        }

        ${screens.desktop} {
          padding: 0.875rem 3.75rem 0 6.25rem;
        }
      `}
      href={href}
      onClick={onClick}
      rel='noopener noreferrer'
      target='_blank'
    >
      <h2
        css={css`
          color: var(--colors-gray900);
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.5rem;

          ${screens.tablet} {
            color: var(--colors-gray800);
            font-size: 1.125rem;
            line-height: 1.5rem;
          }

          ${screens.desktop} {
            color: var(--colors-gray800);
            font-size: 1.25rem;
            line-height: 2rem;
          }
        `}
      >
        {title}
      </h2>
    </OutboundLink>
  )
}

LinkTitle.propTypes = {
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}
