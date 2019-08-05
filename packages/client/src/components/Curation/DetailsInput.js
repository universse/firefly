import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import DetailDropdown from './DetailDropdown'
import TagInput from './TagInput'
import Icon, { Level } from 'assets/icons'
import { SetSnackbarContext } from 'contexts/SetSnackbar'
import DropdownOptions from 'constants/DropdownOptions'
import { TagsType } from 'constants/Types'

export default function DetailsInput ({ category, level, tags, dispatch }) {
  const openSnackbar = useContext(SetSnackbarContext)

  return (
    <div className='Details'>
      <h3 className='visually-hidden'>Collection Details</h3>
      <div>
        <div
          css={css`
            margin-bottom: 0.25rem;
          `}
        >
          <h4>Category</h4>
        </div>
        <DetailDropdown
          detail='category'
          dispatch={dispatch}
          items={DropdownOptions.CATEGORY_OPTIONS}
          value={category}
        />
      </div>
      <div
        css={css`
          margin-top: 1.25rem;
        `}
      >
        <div
          css={css`
            margin-bottom: 0.5rem;
          `}
        >
          <h4>Tags</h4>
        </div>
        <div>
          <TagInput dispatch={dispatch} tags={tags} />
        </div>
        {!!tags.length && (
          <ul
            css={css`
              margin-top: 0.5rem;
              z-index: 1;

              li {
                display: contents;
              }
            `}
          >
            {tags.map((tag, index) => (
              <li key={tag}>
                <div className='Chip'>
                  {tag}
                  <button
                    aria-label={`Remove Tag "${tag}"`}
                    onClick={() => {
                      dispatch({ type: 'remove-tag', payload: { index } })
                      openSnackbar({
                        buttonProps: {
                          'aria-label': 'Undo Removing Tag',
                          children: 'Undo',
                          onClick: () => {
                            // logClickAction({ id, action: 'undo unsave' })
                            dispatch({
                              type: 'undo-remove-tag',
                              payload: { index }
                            })
                          }
                        },
                        message: `Removed tag "${tag}".`
                      })
                    }}
                    type='button'
                  >
                    <Icon icon='cross' size='small' />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div
        css={css`
          margin-top: 1rem;
        `}
      >
        <div
          css={css`
            margin-bottom: 0.5rem;
          `}
        >
          <h4>Level</h4>
        </div>
        <DetailDropdown
          detail='level'
          dispatch={dispatch}
          items={DropdownOptions.DIFFICULTY_LEVEL_OPTIONS}
          value={level}
        />
      </div>
    </div>
  )
}

DetailsInput.propTypes = {
  category: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  tags: TagsType
}
