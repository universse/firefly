import React, { useCallback, useContext } from 'react'
import { css } from '@emotion/core'

import { Dropdown } from 'components/common'
import {
  Label,
  OptionList,
  OptionButton,
  SortOption,
  ToggleButton,
  TogglerLabel
} from './styled'
import { URLUtilsContext } from 'contexts/URLUtils'
import SortOptions from 'constants/SortOptions'

export default function SortByDifficulty ({ sort }) {
  const { onQueryClick } = useContext(URLUtilsContext)

  const handleChange = useCallback(
    ({ value }) => onQueryClick({ sort: value }),
    [onQueryClick]
  )

  return (
    <Dropdown
      handleChange={handleChange}
      initialValue={sort}
      items={SortOptions}
      label='Sort By:'
      OptionList={OptionList}
      OptionButton={OptionButton}
      ToggleButton={ToggleButton}
      TogglerLabel={TogglerLabel}
    />
  )
}

export function MobileSortByDifficulty ({ sort }) {
  const { onQueryClick } = useContext(URLUtilsContext)

  const handleChange = useCallback(
    e => onQueryClick({ sort: e.currentTarget.value }),
    [onQueryClick]
  )

  return (
    <div
      css={css`
        margin-bottom: 1.5rem;
      `}
      role='group'
      aria-labelledby='sort'
    >
      <div
        css={css`
          margin-bottom: 0.5rem;
        `}
      >
        <h4
          css={theme => css`
            color: ${theme.colors.gray700};
            font-size: 0.875rem;
            font-weight: 700;
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
