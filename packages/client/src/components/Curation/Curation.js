import React, { useLayoutEffect, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/core'
import { Link, navigate } from 'gatsby'

import Inputs from './Inputs'
import Footer from 'components/Footer'
import { AuthenticationContext } from 'contexts/Authentication'
import {
  bottomBarHeightInRem,
  headerHeightInRem,
  mobileBarsHeightInRem,
  mobileProgressBarHeightInRem,
  screens
} from 'constants/Styles'
import firebaseWorker from 'utils/firebaseWorker'

const { fetchDraft, generateId } = firebaseWorker

// TODO Suspense
// check if authorized by keying in email
export default function Curation ({ currentId, currentDraft, invitee }) {
  const user = useContext(AuthenticationContext)

  const { recentDrafts, errorMessage, isLoading } = useSelector(
    state => state.meta
  )
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    if (currentDraft) {
      dispatch({
        type: 'set',
        // TODO authorized reset to [] if a copy made, not when undo remove
        payload: { isAuthorized: true, authorizedEmails: [] }
      })
      dispatch({
        type: 'set-draft',
        payload: currentDraft
      })
    }
  }, [currentDraft, dispatch])

  useEffect(() => {
    const setLoading = () =>
      dispatch({ type: 'set', payload: { isLoading: true } })

    window.addEventListener('popstate', setLoading)

    return () => {
      window.removeEventListener('popstate', setLoading)
    }
  }, [dispatch])

  const canEdit = !isLoading && !errorMessage

  useEffect(() => {
    if (canEdit || !user) return

    if (!currentId) {
      dispatch({
        type: 'set',
        payload: { errorMessage: 'New' }
      })
    }

    dispatch({ type: 'set', payload: { isLoading: true } })

    let isPending = true

    fetchDraft(currentId)
      // meta: { isAuthorized, authorizedEmails, recentDrafts }
      .then(({ draft, ...meta }) => {
        if (isPending) {
          dispatch({
            type: 'set',
            payload: {
              isLoading: false,
              ...(currentId && {
                errorMessage:
                  !draft && 'The draft you have requested does not exist.'
              }),
              ...meta
            }
          })

          draft &&
            dispatch({
              type: 'set-draft',
              payload: draft
            })
        }
      })
      .catch(
        e =>
          console.log(e) ||
          (isPending &&
            dispatch({
              type: 'set',
              payload: {
                isLoading: false,
                errorMessage: 'something went wrong'
              }
            }))
      )

    return () => {
      isPending = false
    }
  }, [canEdit, currentId, dispatch, user])

  useEffect(() => {
    dispatch({
      type: 'set',
      payload: {
        invitee
      }
    })
  }, [dispatch, invitee])

  return (
    <>
      <div
        className='base'
        css={css`
          min-height: calc(100vh - ${mobileBarsHeightInRem}rem);

          ${screens.mobile} {
            padding: 0 0
              ${bottomBarHeightInRem + mobileProgressBarHeightInRem}rem;
          }

          ${screens.tablet} {
            padding-bottom: ${bottomBarHeightInRem +
              mobileProgressBarHeightInRem}rem;
          }

          ${screens.desktop} {
            max-width: 64rem;
            min-height: calc(100vh - ${headerHeightInRem}rem);
          }
        `}
      >
        {errorMessage && (
          <div>
            <p>{errorMessage}</p>
            <button
              aria-label='Curate a New Collection'
              onClick={() =>
                generateId('collections').then(id => {
                  navigate(`/curate/${id}`)
                  dispatch({
                    type: 'set',
                    payload: { errorMessage: false, isAuthorized: true }
                  })
                  dispatch({ type: 'reset-draft', payload: { id } })
                })
              }
              type='button'
            >
              Create
            </button>
          </div>
        )}
        {errorMessage && !!recentDrafts.length && (
          <ul>
            {recentDrafts.map(([id, { name }]) => (
              <li key={id}>
                <Link to={`/curate/${id}`}>
                  {name || 'Untitled collection'}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {canEdit && <Inputs />}
      </div>
      {isLoading && (
        <div className='fullscreen'>
          <div className='Spinner' />
        </div>
      )}
      {!canEdit && <Footer />}
    </>
  )
}

Curation.propTypes = {
  currentDraft: PropTypes.object,
  currentId: PropTypes.string,
  invitee: PropTypes.string
}
