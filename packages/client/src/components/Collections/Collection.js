import React from 'react'
import { css } from '@emotion/core'

import Tags from './Tags'
import {
  CollectionTitle,
  CollectionWrapper,
  Topic,
  Difficulty,
  IconButton
} from './styled'
import { Heart, Save } from '../../icons'
import { DifficultyLevels } from '../../constants'

export default function Collection ({
  id,
  name,
  topic,
  level,
  tags,
  handleHeartClick
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
          <Topic to='/'>Psychology</Topic>
          <Difficulty>Fundamental</Difficulty>
        </div>
        <div
          css={css`
            align-items: center;
            display: flex;
            justify-content: space-between;
          `}
        >
          <Tags tags={tags} />
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              width: 3.5rem;
            `}
          >
            <IconButton
              aria-label='Save to My Library'
              onClick={handleHeartClick}
            >
              <Save />
            </IconButton>
            <IconButton aria-label='Love' onClick={handleHeartClick}>
              <Heart />
            </IconButton>
          </div>
        </div>
      </CollectionWrapper>
    </>
  )
}
