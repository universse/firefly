import React, { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import Curation from 'components/Curation'
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
  location: { pathname, state },
  pageContext: { matchPath }
}) {
  const [
    { id, draft, recentDrafts, hasError, isLoading, isAuthorized },
    dispatch
  ] = useReducer(reducer, {
    id: getParamFromPathname(pathname, matchPath),
    draft: state && state.draft,
    recentDrafts: null,
    isLoading: false,
    hasError: false
  })

  useEffect(() => {
    if (draft) return

    if (!id) {
      dispatch({ draft: {}, isAuthorized: true })
      return
    }

    dispatch({ isLoading: true })

    firebaseWorker
      .fetchDraft(id)
      .then(payload =>
        dispatch({ isLoading: false, ...payload, hasError: !payload.draft })
      )
      .catch(() => dispatch({ isLoading: false, hasError: true }))
  }, [draft, id])

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
        {isLoading && <>Fetching draft...</>}
        {hasError && (
          <>
            The draft you have requested does not exist.
            <button
              aria-label='Curate a New Collection'
              onClick={() =>
                dispatch({
                  id: null,
                  draft: {},
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
          <div>
            {[...Object.entries(recentDrafts)]
              .reverse()
              .map(([id, { name }]) => (
                <a key={id} href={`/curate/${id}`}>
                  {name || 'Untitled collection'}
                </a>
              ))}
          </div>
        )}
        {draft && (
          <Curation draft={draft} id={id} initialIsAuthorized={isAuthorized} />
        )}
      </div>
    </>
  )
}

CuratePage.propTypes = {
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    matchPath: PropTypes.string.isRequired
  }).isRequired
}
