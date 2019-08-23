import React, { useContext } from 'react'
import { css } from '@emotion/core'

import DetailDropdown from './DetailDropdown'
import TagInput from './TagInput'
import useDraftStore, { useDraftActions } from './useDraftStore'
import Icon, { Level } from 'assets/icons'
import { SetSnackbarContext } from 'contexts/SetSnackbar'
import DropdownOptions from 'constants/DropdownOptions'

export default function DetailsInput () {
  const openSnackbar = useContext(SetSnackbarContext)
  const tags = useDraftStore(state => state.tags)
  const { removeTag, undoRemoveTag } = useDraftActions()

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
          items={DropdownOptions.CATEGORY_OPTIONS}
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
          <TagInput tags={tags} />
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
                      removeTag(index)
                      openSnackbar({
                        buttonProps: {
                          'aria-label': 'Undo Removing Tag',
                          children: 'Undo',
                          onClick: () => {
                            // logClickAction({ id, action: 'undo unsave' })
                            undoRemoveTag(index)
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
          items={DropdownOptions.DIFFICULTY_LEVEL_OPTIONS}
        />
      </div>
    </div>
  )
}
