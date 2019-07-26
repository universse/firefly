import React from 'react'
import PropTypes from 'prop-types'

import { Cross, Search } from 'assets/icons'
import AriaLabels from 'constants/AriaLabels'

export default function SearchBar ({
  handleClearClick,
  isLoading = false,
  labelProps,
  large = false,
  value,
  ...props
}) {
  return (
    <div className={large ? 'SearchBar large' : 'SearchBar'}>
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
        className={large ? 'TextInput large' : 'TextInput'}
        name='search'
        placeholder={AriaLabels.SEARCH_BAR_LABEL}
        type='search'
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
  isLoading: PropTypes.bool,
  labelProps: PropTypes.object,
  large: PropTypes.bool
}
