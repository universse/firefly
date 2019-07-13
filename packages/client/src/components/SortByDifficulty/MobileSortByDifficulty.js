import React, { useContext } from 'react'
import { css } from '@emotion/core'

import SortOptions from './SortOptions'
import { URLParamsContext } from 'contexts/URLParams'
import AriaLabels from 'constants/AriaLabels'
import { logSortDifficulty } from 'utils/amplitude'

export default function MobileSortByDifficulty () {
  const {
    query: { sort },
    queryDispatch
  } = useContext(URLParamsContext)

  return (
    <div
      aria-labelledby='sort'
      css={css`
        margin-bottom: 1.5rem;
      `}
      role='group'
    >
      <div
        css={css`
          margin-bottom: 0.5rem;
        `}
      >
        <h4
          css={css`
            color: var(--black800);
            font-size: 0.875rem;
            font-weight: 600;
            line-height: 1.5rem;
          `}
          id='sort'
        >
          {AriaLabels.SORT_BY}
        </h4>
      </div>
      <div>
        {SortOptions.map(({ label, value }) => (
          <div
            key={value}
            css={css`
              align-items: center;
              display: flex;
              height: 2rem;
            `}
          >
            <input
              checked={sort === value}
              css={css`
                margin-right: 1rem;
              `}
              id={label}
              name='sort'
              onChange={e => {
                queryDispatch({ sort: e.currentTarget.value })
                logSortDifficulty({ sort: e.currentTarget.value })
              }}
              type='radio'
              value={value}
            />
            <label
              css={css`
                color: var(--black900);
                font-size: 0.875rem;
                font-weight: 500;
                text-transform: capitalize;
              `}
              htmlFor={label}
            >
              {label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
