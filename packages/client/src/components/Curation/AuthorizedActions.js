import React, { useContext, useEffect } from 'react'
import { navigate } from 'gatsby'
import { css } from '@emotion/core'
import { useSelector } from 'react-redux'

import InviteModal from './InviteModal'
import ShareDropdown from 'components/ShareDropdown'
import Icon from 'assets/icons'
import { AuthenticationContext } from 'contexts/Authentication'
import { SetModalContext } from 'contexts/SetModal'
import { SetSnackbarContext } from 'contexts/SetSnackbar'
import ModalTypes from 'constants/ModalTypes'
import firebaseWorker from 'utils/firebaseWorker'

const { createCollection, discardDraft, saveDraft } = firebaseWorker

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

export default function AuthorizedActions () {
  const user = useContext(AuthenticationContext)
  const openSnackbar = useContext(SetSnackbarContext)
  const setActiveModalType = useContext(SetModalContext)

  const invitee = useSelector(state => state.meta.invitee)
  const { removed, ...draft } = useSelector(state => state.draft)
  const { id, name, urls, tags } = draft
  const canPublish = !!(name && urls.length && tags.length)

  const canSave = user && (name || urls.length || tags.length)

  useEffect(() => {
    canSave && saveDraft(draft)
  }, [canSave, draft, user])

  useEffect(() => {
    invitee && setActiveModalType(ModalTypes.INVITE)
  }, [invitee, setActiveModalType])

  return (
    <>
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
            onClick={() => publish(draft)}
            type='button'
          >
            Publish
          </button>
        </div>
        <div
          css={css`
            margin-right: 0.5rem;
          `}
        >
          <ShareDropdown name={name} top />
        </div>
        {/* <button
          aria-label='Invite Collaborators'
          className='IconButton'
          onClick={() => setActiveModalType(ModalTypes.INVITE)}
          type='button'
        >
          <Icon icon='user-plus' />
        </button> */}
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
                    state: { draft }
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
      {id && <InviteModal id={id} />}
    </>
  )
}
