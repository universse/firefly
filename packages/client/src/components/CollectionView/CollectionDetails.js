import React, { memo } from 'react'
import { css } from '@emotion/core'

import Tags from 'components/Collections/Tags'
import { CollectionTitle } from './styled'
import { Category, Difficulty } from 'components/common'
import { DifficultyLevels } from 'common'
import { createCategoryPath } from '../../../gatsby/utils'

function CollectionDetails ({ category, level, name, tags }) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 2rem 4rem 2rem;
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
        <Category to={createCategoryPath(category)}>{category}</Category>
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

export default memo(CollectionDetails)
