import React, { useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { Label, SortOption } from './styled'
import { URLParamsContext } from 'contexts/URLParams'
import SortOptions from 'constants/SortOptions'
import { logSortDifficulty } from 'utils/amplitudeUtils'

export default function MobileSortByDifficulty ({ sort }) {
  const { queryDispatch } = useContext(URLParamsContext)

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
          css={theme => css`
            color: ${theme.colors.gray800};
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
            <SortOption
              checked={sort === value}
              id={label}
              onChange={handleChange}
              value={value}
            />
            <Label htmlFor={label}>{label}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}

MobileSortByDifficulty.propTypes = {
  sort: PropTypes.string.isRequired
}
