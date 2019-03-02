import React, { useContext } from 'react'
import { css } from '@emotion/core'
import { DifficultyLevels } from 'common'

import Tags from './Tags'
import { Heart, Level, Save } from '../../icons'
import { CollectionTitle, CollectionWrapper } from './styled'
import { ActionBar, Category, Difficulty, IconButton } from 'components/common'
import { URLUtilsContext } from 'pages'
import { createCategoryPath } from '../../../gatsby/utils'

export default function Collection ({
  collection: { id, name, category, level, numOfItems, tags },
  handleHeartClick,
  handleSaveClick,
  isSaved
}) {
  const { onCategoryFilterClick } = useContext(URLUtilsContext) || {}

  return (
    <>
      <div
        css={css`
          height: 100%;
          padding: 0.25rem;
          position: absolute;
          width: 100%;
        `}
      >
        <CollectionTitle id={id} name={name} />
      </div>
      <CollectionWrapper>
        <div
          css={css`
            align-items: flex-end;
            display: flex;
            height: 1.25rem;
            justify-content: space-between;
          `}
        >
          <Category
            onClick={onCategoryFilterClick}
            to={createCategoryPath(category)}
          >
            {category}
          </Category>
          <div
            css={css`
              align-items: flex-end;
              display: flex;
            `}
          >
            <div
              css={css`
                display: inline-block;
                height: 1.25rem;
                margin-right: 0.5rem;
              `}
            >
              <Level level={level} />
            </div>
            <Difficulty>{DifficultyLevels[level]}</Difficulty>
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
          <ActionBar>
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
          </ActionBar>
        </div>
      </CollectionWrapper>
    </>
  )
}
