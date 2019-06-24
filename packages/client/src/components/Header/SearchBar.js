import React, { useContext, memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { Cross } from 'icons'
import { NormalizedCollectionsContext } from 'contexts/NormalizedCollections'
import useComboBox from 'hooks/useComboBox'
import useSearch from 'hooks/useSearch'
import AriaLabels from 'constants/AriaLabels'
import URLParamKeys from 'constants/URLParamKeys'
import { createCollectionPath } from '../../../gatsby/utils'

function SearchBar ({ maxResultCount = Infinity }) {
  const normalizedCollections = useContext(NormalizedCollectionsContext)

  const {
    handleSelect,
    handleSearchInput,
    isLoading,
    isTyping,
    results,
    searchInput,
    setSearchInput
  } = useSearch()

  const {
    highlightedIndex,
    isOpen,
    rootProps,
    labelProps,
    getInputProps,
    menuProps,
    getMenuItemProps
  } = useComboBox({ onSelect: handleSelect })

  const totalResultCount = results.length

  return (
    <div className='ComboBox small' {...rootProps}>
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
      <ul className='Menu' {...menuProps}>
        {isOpen && searchInput && (
          <>
            {results.slice(0, maxResultCount).map((result, index) => (
              <Link
                key={result.id}
                {...highlightedIndex === index && { className: 'highlighted' }}
                {...getMenuItemProps({
                  index,
                  item: {
                    id: result.id,
                    to: createCollectionPath({
                      id: result.id,
                      name: normalizedCollections[result.id].name
                    }),
                    meta: {
                      name: normalizedCollections[result.id].name
                    }
                  }
                })}
              >
                {normalizedCollections[result.id].name}
              </Link>
            ))}
            {totalResultCount > 0 && totalResultCount > maxResultCount && (
              <Link
                className={`${
                  highlightedIndex === maxResultCount ? 'highlighted' : ''
                }`}
                {...getMenuItemProps({
                  index: maxResultCount,
                  item: {
                    id: 'search',
                    to: `/?${URLParamKeys.SEARCH_INPUT}=${searchInput}`
                  }
                })}
              >
                See all results
              </Link>
            )}
            {!isTyping && !isLoading && !totalResultCount && (
              <span>No result found :(</span>
            )}
          </>
        )}
      </ul>
    </div>
  )
}

export default memo(SearchBar)

SearchBar.propTypes = {
  maxResultCount: PropTypes.number.isRequired
}
