import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { css } from '@emotion/core'

import { IconButton } from 'components/common'
import useDebouncedValue from 'hooks/useDebouncedValue'
import Netlify from 'constants/Netlify'

// debounce
const initialValue = {
  url: '',
  type: 0,
  title: '',
  description: ''
}

function reducer (state, { payload }) {
  return { ...state, ...payload }
}

export default function LearningItemInput ({ index }) {
  const [item, dispatch] = useReducer(reducer, initialValue)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const debouncedUrl = useDebouncedValue(item.url, 100)

  const handleChange = useCallback(e => {
    dispatch({ payload: { url: e.target.value } })
  }, [])

  useEffect(() => {
    if (debouncedUrl) {
      // check duplicate url

      try {
        const url = new URL(debouncedUrl)
        setIsLoading(true)
        setHasError(false)

        // header
        fetch(Netlify.API, {
          body: JSON.stringify({ url: url.href }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })
          .then(response => response.json())
          .then(data => {
            const { error, title, description } = data
            if (error) {
              setHasError(true)
            } else {
              dispatch({ payload: { title, description } })
            }
          })
          .catch(() => setHasError(true))
      } catch (e) {
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    } else {
      setHasError(false)
      dispatch({ payload: { title: '', description: '' } })
    }
  }, [debouncedUrl])

  return (
    <div>
      <input
        aria-label='Learning Item URL'
        autoComplete='off'
        name={`url-${index}`}
        onChange={handleChange}
        placeholder='https://example.com'
        type='url'
        value={item.url}
      />
      {/*  for item types, empty default, please choose one */}
    </div>
  )
}
