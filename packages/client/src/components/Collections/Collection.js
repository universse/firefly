import React, { memo, useContext } from 'react'
import { css } from '@emotion/core'

import Tags from './Tags'
import { Heart, Save } from '../../icons'
import { CollectionTitle, CollectionWrapper } from './styled'
import { Category, Difficulty, IconButton } from 'components/common'
import { createCategoryPath } from '../../../gatsby/utils'
import { URLUtilsContext } from 'pages'

export function Collection ({
  collection: { id, name, category, level, tags },
  handleHeartClick,
  handleSaveClick,
  isSaved
}) {
  const { onFilterClick } = useContext(URLUtilsContext)

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
            align-items: center;
            display: flex;
            height: 1.25rem;
            justify-content: space-between;
          `}
        >
          <Category onClick={onFilterClick} to={createCategoryPath(category)}>
            {category}
          </Category>
          <Difficulty>{level}</Difficulty>
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

export default memo(Collection)
