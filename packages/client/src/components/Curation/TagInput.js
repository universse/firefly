import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import Icon from 'assets/icons'
import useComboBox from 'hooks/useComboBox'
import searchWorker from 'utils/searchWorker'

export default function TagInput ({ dispatch, tags }) {
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
    onSelect: ({ tag }) => {
      dispatch({ type: 'add-tag', payload: { tag } })
      setInput('')
    }
  })

  useEffect(() => {
    searchWorker.getUniqueTags().then(setUnique)
  }, [])

  const matched = useMemo(
    () =>
      unique.filter(
        tag => tag.includes(input.trim().toLowerCase()) && !tags.includes(tag)
      ),
    [input, tags, unique]
  )

  const label = 'Search tags...'

  return (
    <div {...rootProps}>
      <div>
        <label className='visually-hidden' {...labelProps}>
          {label}
        </label>
        <div
          css={css`
            align-items: center;
            color: var(--gray600);
            display: flex;
            height: 100%;
            position: absolute;
          `}
        >
          <Icon icon='tag' size='small' />
        </div>
        <input
          aria-label={label}
          autoComplete='off'
          name='search'
          placeholder={label}
          type='text'
          value={input}
          {...getInputProps({ onChange: e => setInput(e.target.value) })}
        />
      </div>
      <div style={{ marginTop: 8, maxHeight: 300 }} {...menuProps}>
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
  dispatch: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
}
