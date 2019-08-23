import React, { useReducer, useEffect, useContext, useRef, memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import useDraftStore, { useDraftActions } from './useDraftStore'
import LearningItem from 'components/CollectionTemplate/LearningItem'
import Icon from 'assets/icons'
import { SetSnackbarContext } from 'contexts/SetSnackbar'
import useDebouncedValue from 'hooks/useDebouncedValue'
import { screens } from 'constants/Styles'
import { UrlType } from 'constants/Types'
import firebaseWorker from 'utils/firebaseWorker'
import postRequest from 'utils/postRequest'

function reducer (state, payload) {
  return { ...state, ...payload }
}

function LearningItemInput ({
  index,
  isEditing = true,
  setIsEditing,
  ...item
}) {
  const isNew = index === -1
  const isLocal = useRef(!isNew)
  const { setUrl, removeUrl, undoRemoveUrl } = useDraftActions()

  const [{ hasError, isLoading, urlInput, preview }, setState] = useReducer(
    reducer,
    {
      hasError: false,
      isLoading: false,
      preview: !isNew && item,
      urlInput: item.url || ''
    }
  )

  const [debouncedUrlInput] = useDebouncedValue(urlInput, 100)

  const openSnackbar = useContext(SetSnackbarContext)

  useEffect(() => {
    if (!debouncedUrlInput) return

    if (isLocal.current) {
      isLocal.current = false
      return
    }

    let isPending = true
    try {
      const { href } = new URL(debouncedUrlInput)
      setState({ isLoading: true, hasError: false })

      postRequest(`${process.env.GATSBY_API}/meta`, { href })
        .then(response => {
          if (response.error) throw new Error()

          isPending &&
            setState({
              preview: { url: debouncedUrlInput, ...response }
            })

          !isNew &&
            setUrl({
              id: item.id,
              url: debouncedUrlInput,
              ...response
            })
        })
        .catch(() => isPending && setState({ hasError: true }))
        .finally(() => isPending && setState({ isLoading: false }))
    } catch {
      setState({ hasError: true })
    }

    return () => (isPending = false)
  }, [debouncedUrlInput, isNew, item.id, setUrl])

  const handleSubmit = e => {
    e.preventDefault()
    if (hasError || !preview) return

    isNew
      ? firebaseWorker.generateId('urls').then(id => {
          setUrl({ index, id, ...preview })
          setState({ urlInput: '', preview: null })
        })
      : setIsEditing(false)
  }

  return (
    <>
      {isEditing && (
        <form onSubmit={handleSubmit}>
          <div
            css={css`
              margin-bottom: ${preview ? '1.5rem' : 0};
            `}
          >
            <div className='InputBar'>
              <div className='Icon'>
                <Icon icon='url' size='medium' />
              </div>
              <input
                aria-label='Learning Item URL'
                autoComplete='off'
                className='TextInput'
                name={`url-${item.id}`}
                onChange={e => setState({ urlInput: e.target.value })}
                onDragStart={e => e.stopPropagation()}
                placeholder='https://www.awesome-resource.com'
                type='url'
                value={urlInput}
              />
            </div>
            {/* <button
              aria-label='Save'
              className='TextButton'
              disabled={!preview}
              type='submit'
            >
              save
            </button> */}
          </div>
        </form>
      )}
      {preview && (
        <div>
          <LearningItem {...preview} />
        </div>
      )}
      {!isNew && (
        <div
          css={css`
            bottom: 0.25rem;
            display: flex;
            position: absolute;
            right: -0.625rem;
          `}
        >
          <button
            aria-label='Edit URL'
            className='IconButton'
            onClick={() => setIsEditing(isEditing => !isEditing)}
            type='button'
          >
            <Icon icon='edit' size='medium' />
          </button>
          <button
            aria-label='Remove URL'
            className='IconButton'
            onClick={() => {
              removeUrl(index)
              openSnackbar({
                buttonProps: {
                  'aria-label': 'Undo Removing URL',
                  children: 'Undo',
                  onClick: () => {
                    // logClickAction({ id, action: 'undo unsave' })
                    undoRemoveUrl(index)
                  }
                },
                message: 'Removed learning item.'
              })
            }}
            type='button'
          >
            <Icon icon='remove' size='medium' />
          </button>
        </div>
      )}
      {isLoading && (
        <div
          className='fullscreen'
          style={{ left: '-0.5rem', right: '-0.5rem' }}
        >
          <div className='Spinner' />
        </div>
      )}
    </>
  )
}

export default memo(LearningItemInput)

LearningItemInput.propTypes = {
  // ...UrlType,
  index: PropTypes.number.isRequired,
  isEditing: PropTypes.bool,
  setIsEditing: PropTypes.func
}
