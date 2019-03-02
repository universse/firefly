import React, { useEffect, useReducer, useContext, useCallback } from 'react'
import { css } from '@emotion/core'
import produce from 'immer'
import { navigate } from 'gatsby'

import { MobileHeader } from 'components/Header'
import SEO from 'components/SEO'
import { IconButton } from 'components/common'
import FirebaseContext from 'contexts/FirebaseContext'
import { Back } from 'icons'
import FirebaseWorkerEvents from 'constants/FirebaseWorkerEvents'

const initialValue = {
  name: '',
  category: '', // index of
  level: 0,
  urls: [{ title: '', type: '', url: '' }],
  tags: []
}

function reducer (state, { type, payload }) {
  return produce(state, draft => {
    switch (type) {
      case 'set':
        return { ...state, ...payload }

      case 'addUrl':
        break

      case 'addTag':
        state.tags.push(payload.tag)
        break
    }
  })
}

export default function CreatePage () {
  const [collection, dispatch] = useReducer(reducer, initialValue)
  const firebase = useContext(FirebaseContext)

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    firebase.createCollection(collection)
  }, [collection, firebase])

  const handleCreated = useCallback(
    e =>
      e.data.type === FirebaseWorkerEvents.COLLECTION_CREATED &&
      navigate(`/collection/${e.data.payload.id}`, {
        state: { collection: e.data.payload }
      }),
    []
  )

  useEffect(() => {
    firebase.addEventListener('message', handleCreated)

    return () => {
      firebase.removeEventListener('message', handleCreated)
    }
  }, [collection, firebase, handleCreated])

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
      <form onSubmit={handleSubmit}>
        <input />
      </form>
    </>
  )
}
