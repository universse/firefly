import React from 'react'
import { css } from '@emotion/core'

import Tags from './Tags'
import { Category, CollectionTitle, Difficulty } from './styled'
import DifficultyLevels from 'constants/DifficultyLevels'
import { createCategoryPath } from '../../../gatsby/utils'

// TODO: category
export default function CollectionDetails ({ category, name, level, tags }) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 2rem 4rem 3rem;
      `}
    >
      <div
        css={css`
          align-items: center;
          display: flex;
          height: 1.25rem;
          justify-content: space-between;
        `}
      >
        <Category to='/'>design</Category>
        <Difficulty>{DifficultyLevels[level]}</Difficulty>
      </div>
      <div
        css={css`
          margin-top: 0.5rem;
        `}
      >
        <CollectionTitle>{name}</CollectionTitle>
      </div>
      <div
        css={css`
          margin-top: 2rem;
        `}
      >
        <Tags tags={tags} />
      </div>
    </div>
  )
}
