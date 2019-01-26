import React from 'react'
import { css } from '@emotion/core'

import Tags from './Tags'
import LearningList from './LearningList'
import {
  Category,
  CollectionTitle,
  Difficulty,
  IconButton,
  ProgressBar
} from './styled'
import { Heart, Save, Share } from '../../icons'

// TODO: add helmet

export default function CollectionView ({
  collection: { urls, suggestions, name, tags }
}) {
  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 4rem 4rem;
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
          <Difficulty>Fundamental</Difficulty>
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
      <div
        css={css`
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        `}
      >
        <div
          css={theme => css`
            align-items: center;
            border-bottom: 1px solid ${theme.colors.gray400};
            display: flex;
            height: 4rem;
            justify-content: space-between;
            padding: 0 3.75rem 0 4rem;
          `}
        >
          <div
            css={css`
              align-items: center;
              display: flex;
              justify-content: space-between;
            `}
          >
            <ProgressBar percentage={50} />
            <div
              css={css`
                margin-left: 1rem;
              `}
            >
              <span
                css={theme => css`
                  color: ${theme.colors.gray700};
                  font-size: 0.875rem;
                  font-weight: 600;
                  line-height: 1.25rem;
                `}
              >
                0 of {urls.length} items completed
              </span>
            </div>
          </div>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              width: 7rem;
            `}
          >
            <IconButton
              aria-label='Share'
              // onClick={handleHeartClick}
            >
              <Share />
            </IconButton>
            <IconButton
              aria-label='Save to My Library'
              // onClick={handleHeartClick}
            >
              <Save />
            </IconButton>
            <IconButton
              aria-label='Love'
              // onClick={handleHeartClick}
            >
              <Heart />
            </IconButton>
          </div>
        </div>
        <LearningList urls={urls} />
      </div>
    </>
  )
}
