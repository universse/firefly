import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import SearchBar from 'components/SearchBar'
import useComboBox from 'hooks/useComboBox'
import { useNormalizedCollections } from 'hooks/useGlobalStore'
import useSearch from 'hooks/useSearch'
import URLParamKeys from 'constants/URLParamKeys'
import { createCollectionPath } from '../../gatsby/utils'

export default function SearchComboBox ({
  large = false,
  maxResultCount = Infinity
}) {
  const normalizedCollections = useNormalizedCollections()

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
    getItemProps
  } = useComboBox({ onSelect: handleSelect })

  const totalResultCount = results.length

  return (
    <div className={`ComboBox ${large ? 'large' : 'small'}`} {...rootProps}>
      <SearchBar
        handleClearClick={() => setSearchInput('')}
        isLoading={isLoading}
        labelProps={labelProps}
        large={large}
        value={searchInput}
        {...getInputProps({ onChange: handleSearchInput })}
      />
      <div {...menuProps}>
        {isOpen && searchInput && (
          <>
            {results.slice(0, maxResultCount).map((result, index) => (
              <Link
                key={result.id}
                {...highlightedIndex === index && { className: 'highlighted' }}
                {...getItemProps({
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
                {...getItemProps({
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
      </div>
    </div>
  )
}

SearchComboBox.propTypes = {
  large: PropTypes.bool,
  maxResultCount: PropTypes.number
}
