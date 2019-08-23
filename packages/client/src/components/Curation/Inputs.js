import React from 'react'
import { css } from '@emotion/core'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import AuthorizedActions from './AuthorizedActions'
import UnauthorizedActions from './UnauthorizedActions'
import DetailsInput from './DetailsInput'
import DraggableItem from './DraggableItem'
import DragLayer from './DragLayer'
import LearningItemInput from './LearningItemInput'
import useDraftStore, { useDraftActions } from './useDraftStore'
import useStateStore from './useStateStore'
import { useMedia } from 'hooks/useGlobalStore'
import { headerHeightInRem, screens } from 'constants/Styles'

export default function Inputs () {
  const { isDesktop } = useMedia()

  const isAuthorized = useStateStore(state => state.isAuthorized)

  const name = useDraftStore(state => state.name)
  const urls = useDraftStore(state => state.urls)
  const { setDraft } = useDraftActions()

  return (
    <>
      <div
        css={css`
          display: grid;
          grid-gap: 1.5rem;
          grid-template-areas:
            'title'
            'list';
          margin: 1.5rem 0;

          ${screens.desktop} {
            grid-gap: 3rem 1.5rem;
            grid-template-areas:
              '. title title'
              'widget list sidebar';
            grid-template-columns: 2.5rem 1fr 19rem;
            margin: 2.5rem 0 0 0;
          }
        `}
      >
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
            onChange={e => setDraft({ name: e.target.value })}
            placeholder='Collection title...'
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

            .Details {
              border: 2px dashed var(--black300);
            }
          `}
        >
          <DetailsInput />
        </div>
        <div
          css={css`
            grid-area: list;
          `}
        >
          <DndProvider backend={HTML5Backend}>
            <ul className='LearningList'>
              {urls.map((url, i) => (
                <DraggableItem key={url.id} index={i} {...url} />
              ))}
            </ul>
            <DragLayer />
          </DndProvider>
          <div
            css={css`
              position: relative;
            `}
          >
            <div
              css={css`
                border: 2px dashed var(--black300);
                border-radius: 4px;
                margin: ${urls.length ? 1.5 : 0}rem 0 6rem;
                padding: 1.25rem 1rem;
              `}
            >
              <LearningItemInput index={-1} />
            </div>
          </div>
        </div>
      </div>
      {isDesktop ? (
        <div className='bottom'>
          <div
            className='base'
            css={css`
              align-items: center;
              display: flex;
              height: 4rem;
              justify-content: space-between;
              padding-left: 5rem;
            `}
          >
            {isAuthorized ? <AuthorizedActions /> : <UnauthorizedActions />}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
