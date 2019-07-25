import React, { memo, useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { DifficultyLevels } from 'common'
import { Link } from 'gatsby'

import Tags from './Tags'
import { Heart, Level, Resources, Save } from 'assets/icons'
import { ActionBar, Category, Difficulty } from 'components/common'
import { NormalizedCollectionsContext } from 'contexts/NormalizedCollections'
import { UserDataDispatchContext } from 'contexts/UserDataDispatch'
import { screens } from 'constants/Styles'
import { createActionLabel } from 'utils/ariaLabelUtils'
import { createCategoryPath, createCollectionPath } from '../../../gatsby/utils'

function Collection ({ id, isSaved }) {
  const normalizedCollections = useContext(NormalizedCollectionsContext)
  const onActionClick = useContext(UserDataDispatchContext)
  const { category, itemCount, level, name, tags } = normalizedCollections
    ? normalizedCollections[id]
    : {}

  return (
    normalizedCollections && (
      <>
        <div className='TitleWrapper'>
          <Link to={createCollectionPath({ id, name })}>
            <h3>{name}</h3>
          </Link>
        </div>
        <div className='CollectionWrapper'>
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
                  color: var(--gray600);
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
                    color: var(--black800);
                    font-size: 0.8125rem;
                    font-weight: 500;
                    line-height: 1.5rem;

                    &::after {
                      content: ' resource${itemCount > 1 ? 's' : ''}';

                      ${screens.mobile} {
                        display: none;
                      }
                    }
                  `}
                >
                  {itemCount}
                </span>
              </div>
              <Tags tagClassName='Tag' tags={tags} />
            </div>
            <ActionBar>
              <button
                aria-label={createActionLabel(
                  isSaved ? 'unsave' : 'save',
                  name
                )}
                className='IconButton'
                onClick={onActionClick}
                type='button'
                value={id}
              >
                <Save filled={isSaved} />
              </button>
              {/* v3 */}
              {/* <button
              aria-label={createActionLabel(isLoved ? 'unlove' : 'love', name)}
              className='IconButton'
              onClick={onActionClick}
              type='button'
              value={id}
            >
              <Heart filled={isLoved} />
            </button> */}
            </ActionBar>
          </div>
        </div>
      </>
    )
  )
}

export default memo(Collection)

Collection.propTypes = {
  id: PropTypes.string.isRequired,
  // isLoved: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired
}
