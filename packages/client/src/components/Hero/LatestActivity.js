import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { navigate } from 'gatsby'

import { ProgressBar } from 'components/common'
import { screens } from 'constants/Styles'
import { createCollectionPath } from '../../../gatsby/utils'

export default function LatestActivity ({
  latestActivity: { id, name, percentage }
}) {
  const justStarted = percentage === 0
  const isCompleted = percentage === 100

  const message = isCompleted
    ? 'Great job completing '
    : justStarted
    ? 'Continue with '
    : 'Great progress on '

  const ariaLabel = isCompleted ? `Review ${name}` : `Continue with ${name}`

  const label = isCompleted ? 'Review' : 'Continue'

  return (
    <>
      <div>
        <h2
          css={css`
            color: var(--black900);
            font-size: 1.125rem;
            line-height: 2rem;

            ${screens.desktop} {
              font-size: 1.25rem;
            }
          `}
        >
          {message}
          <strong>{name}</strong>
          {justStarted ? '?' : '!'}
        </h2>
      </div>
      <div
        css={css`
          margin-top: 0.75rem;
        `}
      >
        <ProgressBar percentage={percentage} width='15rem' />
      </div>
      <div
        css={css`
          margin-top: 0.25rem;
        `}
      >
        <span
          css={css`
            color: var(--black800);
            font-size: 0.8125rem;
            font-weight: 600;
            line-height: 1.25rem;
          `}
        >
          {Math.round(percentage)}% completed
        </span>
      </div>
      <div
        css={css`
          margin-top: 2.5rem;
        `}
      >
        <button
          aria-label={ariaLabel}
          className='PrimaryButton'
          onClick={() => navigate(createCollectionPath({ id, name }))}
          type='button'
        >
          {label}
        </button>
      </div>
    </>
  )
}

LatestActivity.propTypes = {
  latestActivity: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired
  })
}
