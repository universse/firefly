import React from 'react'
import { css } from '@emotion/core'

import Tags from './Tags'
import {
  Category,
  CollectionTitle,
  CollectionWrapper,
  Difficulty,
  IconButton
} from './styled'
import { Heart, Save } from '../../icons'
import DifficultyLevels from 'constants/DifficultyLevels'
import useSavedCollection from 'hooks/useSavedCollection'
// import { createCategoryPath } from '../../../gatsby/utils'

// TODO: category
export default function Collection ({
  collection: { id, name, category, level, tags },
  handleHeartClick,
  onUnsave
}) {
  const [, isSaved, handleSaveClick] = useSavedCollection(
    {
      id,
      name,
      category,
      level,
      tags
    },
    onUnsave
  )

  return (
    <>
      <div
        css={css`
          height: 12rem;
          position: absolute;
          width: 100%;
        `}
      >
        <CollectionTitle id={id} name={name} />
      </div>
      <CollectionWrapper>
        <div
          css={css`
            align-items: center;
            display: flex;
            height: 1.25rem;
            justify-content: space-between;
          `}
        >
          <Category to='/'>Psychology</Category>
          <Difficulty>{DifficultyLevels[level]}</Difficulty>
        </div>
        <div
          css={css`
            align-items: center;
            display: flex;
            justify-content: space-between;
            margin-right: -0.5rem;
          `}
        >
          <Tags tags={tags} />
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              width: 2.5rem;
            `}
          >
            <IconButton
              aria-label='Save to My Library'
              onClick={handleSaveClick}
              value={id}
            >
              <Save filled={isSaved} />
            </IconButton>
            {/* FLAG
            <IconButton aria-label='Love' onClick={handleHeartClick} value={id}>
              <Heart color='#f00' />
            </IconButton> */}
          </div>
        </div>
      </CollectionWrapper>
    </>
  )
}
