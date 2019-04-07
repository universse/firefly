import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { DifficultyLevels } from 'common'

import Tags from 'components/Collections/Tags'
import { CollectionTitle } from './styled'
import { Category, Difficulty } from 'components/common'
import { Level } from 'icons'
import { TagsType } from 'constants/Types'
import { createCategoryPath } from '../../../gatsby/utils'

function CollectionDetails ({ category, level, name, tags }) {
  return (
    <div
      css={theme => css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem;

        ${theme.screens.tablet} {
          padding: 1.5rem 2rem;
        }

        ${theme.screens.desktop} {
          padding: 2rem 4rem;
        }
      `}
    >
      <div
        css={css`
          align-items: flex-end;
          display: flex;
          height: 1.25rem;
          justify-content: space-between;
        `}
      >
        <Category to={createCategoryPath(category)}>{category}</Category>
        <div>
          <div
            css={css`
              display: inline-block;
              margin-right: 0.5rem;
            `}
          >
            <Level level={Math.floor(level)} />
          </div>
          <Difficulty>{DifficultyLevels[Math.floor(level)]}</Difficulty>
        </div>
      </div>
      <div>
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

CollectionDetails.propTypes = {
  category: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  tags: TagsType
}
