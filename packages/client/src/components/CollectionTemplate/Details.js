import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { DifficultyLevels } from 'common'

import Tags from 'components/Collection/Tags'
import { ProgressBar } from 'components/common'
import { Category, Level, Tag } from 'assets/icons'
import { TagsType } from 'constants/Types'
import { createCategoryPath } from '../../../gatsby/utils'

export default function Details ({ category, level, name, percentage, tags }) {
  return (
    <div className='Details'>
      <h3 className='visually-hidden'>Collection Details</h3>
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
            <h4>Title</h4>
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
          <h4>Category</h4>
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
          <h4>Tags</h4>
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
          <h4>Level</h4>
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
            <h4>Progress</h4>
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
