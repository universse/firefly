import React from 'react'
import { css } from '@emotion/core'
import { navigate } from 'gatsby'

import { PrimaryButton, ProgressBar } from 'components/common'
import { createCollectionPath, scrollToHero } from '../../../gatsby/utils'

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
          css={theme => css`
            color: ${theme.colors.gray900};
            font-size: 1.125rem;
            line-height: 2rem;

            ${theme.screens.desktop} {
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
          css={theme => css`
            color: ${theme.colors.gray800};
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
        <PrimaryButton
          aria-label={ariaLabel}
          onClick={() => navigate(createCollectionPath({ id, name }))}
        >
          {label}
        </PrimaryButton>
      </div>
    </>
  )
}
