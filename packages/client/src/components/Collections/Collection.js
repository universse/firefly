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
import { DifficultyLevels } from '../../constants'

export default function Collection ({
  id,
  name,
  category,
  level,
  tags,
  handleHeartClick,
  handleSaveClick
}) {
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
          <Difficulty>Fundamental</Difficulty>
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
              width: 5.5rem;
            `}
          >
            <IconButton
              aria-label='Save to My Library'
              onClick={handleSaveClick}
              value={id}
            >
              <Save />
            </IconButton>
            <IconButton aria-label='Love' onClick={handleHeartClick} value={id}>
              <Heart />
            </IconButton>
          </div>
        </div>
      </CollectionWrapper>
    </>
  )
}
