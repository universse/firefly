import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { css } from '@emotion/core'

import ShareDropdown from 'components/ShareDropdown'
import Icon from 'assets/icons'
import { AuthenticationContext } from 'contexts/Authentication'
import { SetSnackbarContext } from 'contexts/SetSnackbar'
import useSignUpSnackbar from 'hooks/useSignUpSnackbar'
import firebaseWorker from 'utils/firebaseWorker'

const { generateId, requestAccess } = firebaseWorker

export default function UnauthorizedActions ({ authorizedEmails, collection }) {
  const user = useContext(AuthenticationContext)
  const signUpSnackbar = useSignUpSnackbar()
  const openSnackbar = useContext(SetSnackbarContext)

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
        </div>
        <div
          css={css`
            margin-right: 0.5rem;
          `}
        >
          <ShareDropdown name={collection.name} top />
        </div>
        <button
          aria-label='Save a Copy'
          className='IconButton'
          onClick={() =>
            user
              ? generateId('collections').then(id => {
                  navigate(`/curate/${id}`, {
                    state: { draft: { ...collection, id } }
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
        </button>
      </div>
    </>
  )
}

UnauthorizedActions.propTypes = {
  collection: PropTypes.object.isRequired
}
