import React, { memo, useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { DifficultyLevels } from 'common'

import Tags from './Tags'
import { Heart, Level, Resources, Save } from 'icons'
import { CollectionTitle, CollectionWrapper } from './styled'
import { ActionBar, Category, Difficulty } from 'components/common'
import { UserDataDispatchContext } from 'contexts/UserDataDispatch'
import { screens } from 'constants/Styles'
import { CollectionType } from 'constants/Types'
import { createActionLabel } from 'utils/ariaLabelUtils'
import { createCategoryPath } from '../../../gatsby/utils'

function Collection ({
  collection: { id, name, category, level, itemCount, tags },
  isLoved,
  isSaved
}) {
  const onActionClick = useContext(UserDataDispatchContext)

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
              css={css`
                align-items: center;
                color: var(--colors-gray500);
                display: flex;
                height: 1.5rem;
                margin-right: 0.25rem;
              `}
            >
              <Resources small />
            </div>
            <div
              css={css`
                margin-right: 0.5rem;
              `}
            >
              <span
                css={css`
                  color: var(--colors-gray800);
                  font-size: 0.8125rem;
                  font-weight: 500;
                  line-height: 1.5rem;
                `}
              >
                {itemCount}
                <span
                  css={css`
                    ${screens.mobile} {
                      display: none;
                    }
                  `}
                >
                  {` resource${itemCount > 1 ? 's' : ''}`}
                </span>
              </span>
            </div>
            <Tags tags={tags} />
          </div>
          <ActionBar>
            <button
              aria-label={createActionLabel(isSaved ? 'unsave' : 'save', name)}
              className='IconButton'
              onClick={onActionClick}
              type='button'
              value={id}
            >
              <Save filled={isSaved} />
            </button>
            {/* v3 */}
            <button
              aria-label={createActionLabel(isLoved ? 'unlove' : 'love', name)}
              className='IconButton'
              onClick={onActionClick}
              type='button'
              value={id}
            >
              <Heart filled={isLoved} />
            </button>
          </ActionBar>
        </div>
      </CollectionWrapper>
    </>
  )
}

export default memo(Collection)

Collection.propTypes = {
  isLoved: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
  collection: CollectionType
}
