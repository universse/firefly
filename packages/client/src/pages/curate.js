import React, { useReducer, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import Curation from 'components/Curation'
import Footer from 'components/Footer'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import { BackButton } from 'components/common'
import {
  bottomBarHeightInRem,
  headerHeightInRem,
  mobileBarsHeightInRem,
  mobileProgressBarHeightInRem,
  screens
} from 'constants/Styles'
import firebaseWorker from 'utils/firebaseWorker'
import { getParamFromPathname } from 'utils/pathnameUtils'

function reducer (state, payload) {
  return { ...state, ...payload }
}

// TODO Suspense
// check if authorized by keying in email
export default function CuratePage ({
  location: { pathname, state, search },
  pageContext: { matchPath }
}) {
  const currentId = getParamFromPathname(pathname, matchPath)
  const currentDraft = state && state.draft

  const [
    {
      id,
      draft,
      isAuthorized,
      authorizedEmails,
      recentDrafts,
      hasError,
      isLoading
    },
    setState
  ] = useReducer(reducer, {
    id: currentId,
    draft: currentDraft,
    isAuthorized: !!currentDraft,
    authorizedEmails: [],
    recentDrafts: null,
    isLoading: false,
    hasError: false
  })

  const prevId = useRef()

  useEffect(() => {
    if (prevId.current === null) {
      setState({ id: currentId })
      return
    }

    setState({
      id: currentId,
      draft: currentDraft,
      isAuthorized: !!currentDraft,
      authorizedEmails: [],
      recentDrafts: null,
      isLoading: false,
      hasError: false
    })
  }, [currentDraft, currentId])

  useEffect(() => {
    if (draft) return

    if (!id) {
      setState({ hasError: true })
      return
    }

    let isPending = true
    setState({ isLoading: true })

    firebaseWorker
      .fetchDraft(id)
      .then(
        payload =>
          isPending &&
          setState({ isLoading: false, ...payload, hasError: !payload.draft })
      )
      .catch(() => isPending && setState({ isLoading: false, hasError: true }))

    return () => {
      isPending = false
    }
  }, [draft, id])

  useEffect(() => {
    prevId.current = id
  }, [id])

  return (
    <>
      <SEO title='Curate a Learning Collection' />
      <MobileHeader navIcon={<BackButton />} shadow title='Curate' />
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
        {hasError && (
          <>
            The draft you have requested does not exist.
            <button
              aria-label='Curate a New Collection'
              onClick={() =>
                setState({
                  id: null,
                  draft: {},
                  authorizedEmails: [],
                  recentDrafts: null,
                  hasError: false,
                  isAuthorized: true
                })
              }
              type='button'
            >
              Create
            </button>
          </>
        )}
        {recentDrafts && (
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
        {draft && !hasError && (
          <Curation
            draft={draft}
            id={id}
            initialAuthorizedEmails={authorizedEmails}
            invitee={new URLSearchParams(search).get('invitee')}
            isAuthorized={isAuthorized}
          />
        )}
      </div>
      {isLoading && (
        <div className='fullscreen'>
          <div className='Spinner' />
        </div>
      )}
      {!draft && <Footer />}
    </>
  )
}

CuratePage.propTypes = {
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    matchPath: PropTypes.string.isRequired
  }).isRequired
}
