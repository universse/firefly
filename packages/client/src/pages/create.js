import React, { useState, useReducer, useContext, useCallback } from 'react'
import { css } from '@emotion/core'
import produce from 'immer'
import { navigate } from 'gatsby'

import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import URLInput from 'components/URLInput'
import { IconButton } from 'components/common'
import { FirebaseContext } from 'contexts/Firebase'
import { Back } from 'icons'
import {
  baseWrapper,
  headerHeightInRem,
  mobileHeaderHeightInRem
} from 'utils/styles'

const initialValue = {
  name: '',
  category: '',
  level: 0,
  urls: [],
  tags: []
}

function reducer (state, { type, payload }) {
  return produce(state, draft => {
    switch (type) {
      case 'set':
        draft[payload.key] = payload.value
        break

      case 'addUrl':
        draft.tags.push(payload)
        break

      case 'addTag':
        draft.tags.push(payload.tag)
        break
    }
  })
}

export default function CreatePage () {
  const [collection, dispatch] = useReducer(reducer, initialValue)
  const firebase = useContext(FirebaseContext)
  const [hasError, setHasError] = useState(false)

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    firebase.createCollection(collection).then(payload =>
      payload.error
        ? setHasError(true)
        : navigate(`/collection/${payload.collection.id}`, {
            state: { collection: payload.collection }
          })
    )
  }, [collection, firebase])

  // confirm URL

  // const handleUrlInput = e => {
  //   const url = e.target.value
  //   // fetch title
  //   fetch('')
  // }

  return (
    <>
      <SEO title='Create Collection' />
      <MobileHeader
        navIcon={
          <IconButton
            aria-label='Go Back to Previous Screen'
            onClick={() => window.history.back()}
          >
            <Back />
          </IconButton>
        }
        shadow
        title='Create'
      />
      <main
        css={theme => css`
          background-color: ${theme.colors.gray100};
          min-height: calc(100vh - ${mobileHeaderHeightInRem}rem);

          ${theme.screens.nonMobile} {
            padding: 1rem 0;
          }

          ${theme.screens.desktop} {
            min-height: calc(100vh - ${headerHeightInRem}rem);
            padding: 2rem 0;
          }
        `}
      >
        <div
          css={theme => css`
            ${baseWrapper};
            max-width: 50rem;

            ${theme.screens.mobile} {
              padding: 0 0 1rem;
            }
          `}
        >
          <form onSubmit={handleSubmit}>
            <input />
            <input />
            {/* dropdown category */}
            {/* dropdown level */}
            {/* tag */}
            {/* url */}
          </form>
        </div>
      </main>
    </>
  )
}
