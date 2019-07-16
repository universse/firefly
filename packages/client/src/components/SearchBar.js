import React from 'react'
import PropTypes from 'prop-types'

import { Cross, Search } from 'assets/icons'
import AriaLabels from 'constants/AriaLabels'

export default function SearchBar ({
  flat = false,
  handleClearClick,
  isLoading = false,
  labelProps,
  large = false,
  value,
  ...props
}) {
  let className = 'SearchBar'
  flat && (className += ' flat')
  large && (className += ' large')

  return (
    <div className={className}>
      {labelProps && (
        <label className='visually-hidden' {...labelProps}>
          {AriaLabels.SEARCH_BAR_LABEL}
        </label>
      )}
      <div id='search-icon'>
        <Search medium />
      </div>
      <input
        aria-label={AriaLabels.SEARCH_BAR_LABEL}
        autoComplete='off'
        placeholder={AriaLabels.SEARCH_BAR_LABEL}
        type='text'
        value={value}
        {...props}
      />
      {value && !isLoading && (
        <div id='clear'>
          <button
            aria-label={AriaLabels.CLEAR_SEARCH_INPUT}
            className='IconButton'
            onClick={handleClearClick}
            type='button'
          >
            <Cross small />
          </button>
        </div>
      )}
    </div>
  )
}

SearchBar.propTypes = {
  handleClearClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  flat: PropTypes.bool,
  isLoading: PropTypes.bool,
  labelProps: PropTypes.object,
  large: PropTypes.bool
}
