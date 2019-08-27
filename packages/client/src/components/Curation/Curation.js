import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Link, navigate } from 'gatsby'

import Inputs from './Inputs'
import { useDraftActions } from './useDraftStore'
import useStateStore from './useStateStore'
import Footer from 'components/Footer'
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
  const { recentDrafts, errorMessage, isLoading, setState } = useStateStore()
  const { setDraft, createNewDraft } = useDraftActions()

  useEffect(() => {
    // currentDraft is only available when make copy or undo remove
    if (currentDraft) {
      // TODO authorized reset to [] when make copy, not undo remove
      setState({ isAuthorized: true, authorizedEmails: [] })
      setDraft(currentDraft)
    }
  }, [currentDraft, setDraft, setState])

  useEffect(() => {
    const setLoading = () => setState({ isLoading: true })

    window.addEventListener('popstate', setLoading)

    return () => {
      window.removeEventListener('popstate', setLoading)
    }
  }, [setState])

  useEffect(() => {
    setState({ invitee })
  }, [invitee, setState])

  const canEdit = !isLoading && !errorMessage

  useEffect(() => {
    if (canEdit) return

    if (!currentId) {
      setState({ errorMessage: 'New' })
    }

    setState({ isLoading: true })

    let isPending = true

    fetchDraft(currentId)
      // meta: { isAuthorized, authorizedEmails, recentDrafts }
      .then(({ draft, ...meta }) => {
        if (isPending) {
          setState({
            isLoading: false,
            ...(currentId && {
              errorMessage:
                !draft && 'The draft you have requested does not exist.'
            }),
            ...meta
          })

          setDraft(draft)
        }
      })
      .catch(
        () =>
          isPending &&
          setState({
            isLoading: false,
            errorMessage: 'something went wrong'
          })
      )

    return () => (isPending = false)
  }, [canEdit, currentId, setDraft, setState])

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
                  setState({
                    errorMessage: false,
                    isAuthorized: true
                  })
                  createNewDraft(id)
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
