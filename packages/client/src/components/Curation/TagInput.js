import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'

import useComboBox from 'hooks/useComboBox'
import searchWorker from 'utils/searchWorker'

export default function TagInput ({ dispatch }) {
  const [unique, setUnique] = useState([])
  const [input, setInput] = useState('')

  const {
    highlightedIndex,
    isOpen,
    rootProps,
    labelProps,
    getInputProps,
    menuProps,
    getItemProps
  } = useComboBox({
    onSelect: ({ tag }) => dispatch({ type: 'add-tag', payload: { tag } })
  })

  useEffect(() => {
    searchWorker.getUniqueTags().then(setUnique)
  }, [])

  const matched = useMemo(() => unique.filter(tag => tag.includes(input)), [
    input,
    unique
  ])

  const label = ''
  // remove dispatch({ type: 'remove-tag', payload: { index } })
  return (
    <div {...rootProps}>
      <label className='visually-hidden' {...labelProps}>
        {label}
      </label>
      <input
        aria-label={label}
        autoComplete='off'
        className=''
        name='search'
        placeholder={label}
        type='text'
        value={input}
        {...getInputProps({ onChange: e => setInput(e.target.value) })}
      />
      <div {...menuProps}>
        {isOpen &&
          input &&
          matched.map((tag, index) => (
            <button
              key={tag}
              {...highlightedIndex === index && { className: 'highlighted' }}
              {...getItemProps({ index, item: { tag } })}
            >
              {tag}
            </button>
          ))}
      </div>
    </div>
  )
}

TagInput.propTypes = {
  dispatch: PropTypes.func.isRequired
}
