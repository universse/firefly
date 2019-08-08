import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { css } from '@emotion/core'

import ShareDropdown from 'components/ShareDropdown'
import Icon from 'assets/icons'
import { MediaContext } from 'contexts/Media'
import { SetSnackbarContext } from 'contexts/SetSnackbar'
import firebaseWorker from 'utils/firebaseWorker'

const { createCollection, discardDraft } = firebaseWorker

function invite () {}

function publish (collection) {
  const { id } = collection

  return createCollection(collection)
    .then(() => discardDraft(id))
    .then(() =>
      navigate(`/new-collection/${id}`, {
        state: { collection }
      })
    )
}

export default function BottomActionBar ({ canPublish, collection }) {
  const { isDesktop } = useContext(MediaContext)
  const openSnackbar = useContext(SetSnackbarContext)
  const { id, name } = collection

  return (
    <div
      css={css`
        background-color: var(--white900);
        border-top: 1px solid var(--black300);
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        width: 100%;
        z-index: 200;
      `}
    >
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
        <div
          css={css`
            align-items: center;
            display: flex;
          `}
        >
          <div
            css={css`
              margin-right: 1.25rem;
            `}
          >
            <button
              aria-label='Publish'
              className='PrimaryButton accent'
              disabled={!canPublish}
              onClick={() => publish(collection)}
              type='button'
            >
              Publish
            </button>
          </div>
          {isDesktop && (
            <div
              css={css`
                margin-right: 0.5rem;
              `}
            >
              <ShareDropdown name={name} top />
            </div>
          )}
          <button
            aria-label='Invite Collaborators'
            className='IconButton'
            onClick={() => invite()}
            type='button'
          >
            <Icon icon='user-plus' />
          </button>
        </div>
        <button
          aria-label='Discard Draft'
          className='IconButton'
          onClick={() =>
            discardDraft(id).then(() => {
              openSnackbar({
                buttonProps: {
                  'aria-label': 'Undo Discarding Draft',
                  children: 'Undo',
                  onClick: () => {
                    navigate(`/curate/${id}`, {
                      state: { draft: collection }
                    })
                  }
                },
                shouldPersistOnNavigate: true,
                message: `Discarded draft.`
              })

              navigate('/me')
            })
          }
          type='button'
        >
          <Icon icon='remove' />
        </button>
      </div>
    </div>
  )
}

BottomActionBar.propTypes = {
  canPublish: PropTypes.bool.isRequired,
  collection: PropTypes.object.isRequired
}
