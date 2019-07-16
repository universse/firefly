import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import SearchBar from 'components/SearchBar'
import { NormalizedCollectionsContext } from 'contexts/NormalizedCollections'
import useComboBox from 'hooks/useComboBox'
import useSearch from 'hooks/useSearch'
import URLParamKeys from 'constants/URLParamKeys'
import { createCollectionPath } from '../../../gatsby/utils'

export default function SearchComboBox ({ maxResultCount = Infinity }) {
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
      <SearchBar
        flat
        handleClearClick={() => setSearchInput('')}
        isLoading={isLoading}
        labelProps={labelProps}
        value={searchInput}
        {...getInputProps({ onChange: handleSearchInput })}
      />
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

SearchComboBox.propTypes = {
  maxResultCount: PropTypes.number.isRequired
}
