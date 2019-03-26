import React, { memo, useContext } from 'react'
import { css } from '@emotion/core'
import { DifficultyLevels } from 'common'

import Tags from './Tags'
import { Heart, Level, Resources, Save } from 'icons'
import { CollectionTitle, CollectionWrapper } from './styled'
import { ActionBar, Category, Difficulty, IconButton } from 'components/common'
import { URLUtilsContext } from 'contexts/URLUtils'
import { createCategoryPath } from '../../../gatsby/utils'

function Collection ({
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
          <div>
            <div
              css={css`
                display: inline-block;
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
          <div
            css={css`
              align-items: center;
              display: flex;
            `}
          >
            <div
              css={theme =>
                css`
                  align-items: center;
                  color: ${theme.colors.gray500};
                  display: flex;
                  height: 1.5rem;
                  margin-right: 0.25rem;
                `
              }
            >
              <Resources small />
            </div>
            <div
              css={css`
                margin-right: 0.5rem;
              `}
            >
              <span
                css={theme => css`
                  color: ${theme.colors.gray800};
                  font-size: 0.8125rem;
                  font-weight: 600;
                  line-height: 1.5rem;
                `}
              >
                {numOfItems}
                <span
                  css={theme => css`
                    ${theme.screens.mobile} {
                      display: none;
                    }
                  `}
                >
                  {` resource${numOfItems > 1 ? 's' : ''}`}
                </span>
              </span>
            </div>
            <Tags tags={tags} />
          </div>
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

export default memo(Collection)
