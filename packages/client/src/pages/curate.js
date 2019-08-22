import React from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux'

import Curation, { configureStore } from 'components/Curation'
import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import { BackButton } from 'components/common'
import { getParamFromPathname } from 'utils/pathnameUtils'

const store = configureStore()

export default function CuratePage ({
  location: { pathname, state, search },
  pageContext: { matchPath }
}) {
  return (
    <Provider store={store}>
      <SEO title='Curate a Learning Collection' />
      <MobileHeader navIcon={<BackButton />} shadow title='Curate' />
      <Curation
        currentDraft={state && state.draft}
        currentId={getParamFromPathname(pathname, matchPath)}
        invitee={new URLSearchParams(search).get('invitee')}
      />
    </Provider>
  )
}

CuratePage.propTypes = {
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    matchPath: PropTypes.string.isRequired
  }).isRequired
}
