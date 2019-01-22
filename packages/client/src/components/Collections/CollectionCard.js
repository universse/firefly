import React from 'react'
import { css } from '@emotion/core'

import Tags from './Tags'
import { CardTitle, CardWrapper, Topic, Difficulty, IconButton } from './styled'
import { Heart, Save } from '../../icons'

export default function CollectionCard ({
  id,
  name,
  topic,
  level,
  tags,
  handleHeartClick
}) {
  return (
    <CardWrapper topic={'design'}>
      <div>
        <div
          css={css`
            align-items: center;
            display: flex;
            height: 1.25rem;
            justify-content: space-between;
          `}
        >
          <Topic to='/' topic={'design'} />
          <Difficulty>Fundamental</Difficulty>
        </div>
        <div
          css={css`
            margin-top: 0.75rem;
          `}
        >
          <CardTitle id={id} name={name} />
        </div>
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
    </CardWrapper>
  )
}
