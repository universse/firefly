import React, { useContext } from 'react'
import { navigate } from 'gatsby'
import { css } from '@emotion/core'

import { useDraft } from './useDraftStore'
import useStateStore from './useStateStore'
import { requestAccess } from './utils'
import ShareDropdown from 'components/ShareDropdown'
import Icon from 'assets/icons'
import { SetSnackbarContext } from 'contexts/SetSnackbar'
import { useUser } from 'hooks/useGlobalStore'
import useSignUpSnackbar from 'hooks/useSignUpSnackbar'
import firebaseWorker from 'utils/firebaseWorker'

const { generateId } = firebaseWorker

export default function UnauthorizedActions () {
  const user = useUser()
  const signUpSnackbar = useSignUpSnackbar()
  const openSnackbar = useContext(SetSnackbarContext)

  const authorizedEmails = useStateStore(state => state.authorizedEmails)
  const draft = useDraft()

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
            aria-label='Save a Copy'
            className='GhostButton accent'
            onClick={() =>
              user
                ? generateId('collections').then(id => {
                    navigate(`/curate/${id}`, {
                      state: { draft: { ...draft, id } }
                    })
                    openSnackbar({
                      message: 'Saved a new copy.',
                      shouldPersistOnNavigate: true
                    })
                  })
                : signUpSnackbar()
            }
            type='button'
          >
            Save a Copy
          </button>
        </div>
        {/* <div
          css={css`
            margin-right: 1.25rem;
          `}
        >
          <button
            aria-label='Request Access'
            className='GhostButton accent'
            onClick={() =>
              user
                ? requestAccess(authorizedEmails, window.location.href)
                : signUpSnackbar()
            }
            type='button'
          >
            Request Access
          </button>
        </div> */}
        <div
          css={css`
            margin-right: 0.5rem;
          `}
        >
          <ShareDropdown name={draft.name} top />
        </div>
        {/* <button
          aria-label='Save a Copy'
          className='IconButton'
          onClick={() =>
            user
              ? generateId('collections').then(id => {
                  navigate(`/curate/${id}`, {
                    state: { draft: { ...draft, id } }
                  })
                  openSnackbar({
                    message: 'Saved a new copy.',
                    shouldPersistOnNavigate: true
                  })
                })
              : signUpSnackbar()
          }
          type='button'
        >
          <Icon icon='copy' />
        </button> */}
      </div>
    </>
  )
}
