import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import DraggableItem from './DraggableItem'
import DragLayer from './DragLayer'
import LearningItemInput from './LearningItemInput'
import Details from 'components/CollectionTemplate/Details'
import DropdownOptions from 'constants/DropdownOptions'
import { headerHeightInRem, screens } from 'constants/Styles'
import { CollectionViewType } from 'constants/Types'

export default function CreateCollection ({
  collection: { category, level, name, tags, urls },
  dispatch
}) {
  return (
    <>
      <div
        css={css`
          grid-area: title;

          ${screens.mobile} {
            margin: 0 1rem;
          }
        `}
      >
        <input
          aria-label='Collection Title'
          autoComplete='off'
          css={css`
            color: var(--black900);
            font-size: 1.5rem;
            font-weight: 700;
            line-height: 2rem;
            width: 100%;

            ${screens.desktop} {
              font-size: 2rem;
              line-height: 2.5rem;
            }
          `}
          name='title'
          onChange={e =>
            dispatch({
              type: 'set',
              payload: { name: e.target.value }
            })
          }
          placeholder='A Super Catchy Title'
          type='text'
          value={name}
        />
      </div>
      <div
        css={css`
          align-self: start;
          grid-area: sidebar;
          position: sticky;
          top: ${headerHeightInRem + 1}rem;
        `}
      >
        <Details category={'test'} level={level} tags={tags} />
      </div>
      {/* tag popular tags for different category */}
      {/* url */}
      <div
        css={css`
          grid-area: list;
        `}
      >
        <div
          css={css`
            position: relative;
          `}
        >
          <div
            css={css`
              border: 1px solid var(--black300);
              border-radius: 4px;
              margin-bottom: 2rem;
              padding: 1.5rem 1rem;
            `}
          >
            <LearningItemInput dispatch={dispatch} index={-1} />
          </div>
        </div>
        <DndProvider backend={HTML5Backend}>
          <ul className='LearningList'>
            {urls.map((url, i) => (
              <DraggableItem
                key={url.id}
                dispatch={dispatch}
                index={i}
                {...url}
              />
            ))}
          </ul>
          <DragLayer />
        </DndProvider>
      </div>
    </>
  )
}

CreateCollection.propTypes = {
  collection: CollectionViewType.isRequired,
  dispatch: PropTypes.func.isRequired
}
