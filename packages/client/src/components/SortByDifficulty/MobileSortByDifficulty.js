import React, { useCallback, useContext } from 'react'
import { css } from '@emotion/core'

import { URLParamsContext } from 'contexts/URLParams'
import SortOptions from 'constants/SortOptions'
import { logSortDifficulty } from 'utils/amplitudeUtils'

export default function MobileSortByDifficulty () {
  const {
    query: { sort },
    queryDispatch
  } = useContext(URLParamsContext)

  const handleChange = useCallback(e => {
    queryDispatch({ sort: e.currentTarget.value })
    logSortDifficulty({ sort: e.currentTarget.value })
  }, [queryDispatch])

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
            color: var(--colors-gray800);
            font-size: 0.875rem;
            font-weight: 600;
            line-height: 1.25rem;
            text-transform: uppercase;
          `}
          id='sort'
        >
          Sort by Difficulty Level
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
              onChange={handleChange}
              type='radio'
              value={value}
            />
            <label
              css={css`
                color: var(--colors-gray900);
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
