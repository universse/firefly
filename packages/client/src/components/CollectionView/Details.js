import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { DifficultyLevels } from 'common'

import Tags from 'components/Collections/Tags'
import { ProgressBar } from 'components/common'
import { Category, Level, Tag } from 'assets/icons'
import { TagsType } from 'constants/Types'
import { createCategoryPath } from '../../../gatsby/utils'

export default function Details ({ category, level, name, percentage, tags }) {
  return (
    <div className='Details'>
      {name && (
        <div
          css={css`
            margin-bottom: 1.25rem;
          `}
        >
          <div
            css={css`
              margin-bottom: 0.25rem;
            `}
          >
            <h2>Title</h2>
          </div>
          <span>{name}</span>
        </div>
      )}
      <div
        css={css`
          margin-bottom: 1.25rem;
        `}
      >
        <div
          css={css`
            margin-bottom: 0.25rem;
          `}
        >
          <h2>Category</h2>
        </div>
        <Link className='Category' to={createCategoryPath(category)}>
          {category}
        </Link>
      </div>
      <div
        css={css`
          margin-bottom: 1rem;
        `}
      >
        <div
          css={css`
            margin-bottom: 0.5rem;
          `}
        >
          <h2>Tags</h2>
        </div>
        <Tags tagClassName='Chip' tags={tags} />
      </div>
      <div
        css={css`
          margin-bottom: 1.25rem;
        `}
      >
        <div
          css={css`
            margin-bottom: 0.5rem;
          `}
        >
          <h2>Level</h2>
        </div>
        <div>
          <div
            css={css`
              display: inline-block;
              margin-right: 0.5rem;
            `}
          >
            <Level level={Math.floor(level)} />
          </div>
          <span>{DifficultyLevels[Math.floor(level)]}</span>
        </div>
      </div>
      {!isNaN(percentage) && (
        <div
          css={css`
            margin-bottom: 0.5rem;
          `}
        >
          <div
            css={css`
              margin-bottom: 0.75rem;
            `}
          >
            <h2>Progress</h2>
          </div>
          <ProgressBar percentage={percentage} />
        </div>
      )}
    </div>
  )
}

Details.propTypes = {
  category: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string,
  percentage: PropTypes.number,
  tags: TagsType
}
