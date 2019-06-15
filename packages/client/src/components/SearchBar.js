import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { Cross } from 'icons'
import useComboBox from 'hooks/useComboBox'
import useSearch from 'hooks/useSearch'
import AriaLabels from 'constants/AriaLabels'
import { createCollectionPath } from '../../gatsby/utils'

export default function SearchBar ({ initialIsLoading, initialSearchInput }) {
  const {
    handleSelect,
    handleSearchInput,
    isLoading,
    isTyping,
    results,
    searchInput,
    setSearchInput
  } = useSearch(initialSearchInput, initialIsLoading)

  const {
    highlightedIndex,
    isOpen,
    rootProps,
    labelProps,
    getInputProps,
    menuProps,
    getMenuItemProps
  } = useComboBox({ items: results, onSelect: handleSelect })

  const totalResultCount = results.length

  return (
    <div className='ComboBox large' {...rootProps}>
      <div>
        <label className='visually-hidden' {...labelProps}>
          {AriaLabels.SEARCH_BAR_LABEL}
        </label>
        <input
          placeholder={AriaLabels.SEARCH_BAR_LABEL}
          value={searchInput}
          {...getInputProps({ onChange: handleSearchInput })}
        />
        {searchInput && !isLoading && (
          <div>
            <button
              aria-label='Clear Search Field'
              className='IconButton'
              onClick={() => setSearchInput('')}
              type='button'
            >
              <Cross small />
            </button>
          </div>
        )}
      </div>
      <ul {...menuProps}>
        {isOpen && searchInput && (
          <>
            {results.map((result, index) => (
              <Link
                key={result.id}
                {...highlightedIndex === index && { className: 'highlighted' }}
                to={createCollectionPath({
                  id: result.id,
                  name: result.name
                })}
                {...getMenuItemProps({ index, item: result })}
              >
                {result.name}
              </Link>
            ))}
            {!isTyping && !isLoading && !totalResultCount && (
              <span>No result found :(</span>
            )}
          </>
        )}
      </ul>
    </div>
  )
}

SearchBar.propTypes = {
  initialIsLoading: PropTypes.bool.isRequired,
  initialSearchInput: PropTypes.bool.isRequired
}
