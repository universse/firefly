import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { URLUtilsContext } from 'pages'

export default function SortByDifficulty ({ sort }) {
  const { onSortClick } = useContext(URLUtilsContext)

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
          margin-bottom: 1rem;
        `}
      >
        <h4
          css={theme => css`
            color: ${theme.colors.gray700};
            font-size: 1.125rem;
            font-weight: 700;
            line-height: 1.5rem;
          `}
          id='sort'
        >
          Sort by Difficulty Level
        </h4>
      </div>
      <div>
        <input
          checked={sort === ''}
          id='default'
          name='sort'
          onChange={onSortClick}
          type='radio'
          value=''
        />
        <label htmlFor='default'>Default</label>
        <input
          checked={sort === 'asc'}
          id='asc'
          name='sort'
          onChange={onSortClick}
          type='radio'
          value='asc'
        />
        <label htmlFor='asc'>Ascending</label>
        <input
          checked={sort === 'desc'}
          id='desc'
          name='sort'
          onChange={onSortClick}
          type='radio'
          value='desc'
        />
        <label htmlFor='desc'>Descending</label>
      </div>
    </div>
  )
}

export function MobileSortByDifficulty ({ sort }) {
  const { onSortClick } = useContext(URLUtilsContext)

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
          margin-bottom: 1rem;
        `}
      >
        <h4
          css={theme => css`
            color: ${theme.colors.gray700};
            font-size: 1.125rem;
            font-weight: 700;
            line-height: 1.5rem;
          `}
          id='sort'
        >
          Sort by Difficulty Level
        </h4>
      </div>
      <div>
        <input
          checked={sort === ''}
          id='default'
          name='sort'
          onChange={onSortClick}
          type='radio'
          value=''
        />
        <label htmlFor='default'>Default</label>
        <input
          checked={sort === 'asc'}
          id='asc'
          name='sort'
          onChange={onSortClick}
          type='radio'
          value='asc'
        />
        <label htmlFor='asc'>Ascending</label>
        <input
          checked={sort === 'desc'}
          id='desc'
          name='sort'
          onChange={onSortClick}
          type='radio'
          value='desc'
        />
        <label htmlFor='desc'>Descending</label>
      </div>
    </div>
  )
}
