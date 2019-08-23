import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import useDraftStore, { useDraftActions } from './useDraftStore'
import Icon from 'assets/icons'
import useComboBox from 'hooks/useComboBox'
import searchWorker from 'utils/searchWorker'

export default function TagInput ({ tags }) {
  const { addTag } = useDraftActions()

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
      addTag(tag)
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
      <div
        css={css`
          border-radius: 8px;
          box-shadow: var(--shadow-02);
          margin-top: 8px;
          overflow: hidden;
          position: absolute;
          width: 100%;
        `}
      >
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
    </div>
  )
}

TagInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
}
