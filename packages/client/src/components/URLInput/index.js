import React, { useState, useEffect, useCallback } from 'react'
import { css } from '@emotion/core'

// debounce
export default function URLInput () {
  const [value, setValue] = useState('')
  const [title, setTitle] = useState('')
  const [itemType, setItemType] = useState()

  const handleChange = e => {
    setValue(e.target.value)

    // debounce if new URL(e.target.value)
    // fetch
    // setTitle
  }

  return (
    <div>
      <input onChange={handleChange} value={value} type='text' />
      {/* dropdown for item types, empty default, please choose one */}
    </div>
  )
}
