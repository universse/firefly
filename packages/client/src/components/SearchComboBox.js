import React, { useContext } from 'react'
import { Link } from 'gatsby'

import SearchBar from 'components/SearchBar'
import { NormalizedCollectionsContext } from 'contexts/NormalizedCollections'
import useComboBox from 'hooks/useComboBox'
import useSearch from 'hooks/useSearch'
import { createCollectionPath } from '../../gatsby/utils'

export default function SearchComboBox () {
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
    <div className='ComboBox large' {...rootProps}>
      <SearchBar
        handleClearClick={() => setSearchInput('')}
        isLoading={isLoading}
        labelProps={labelProps}
        large
        value={searchInput}
        {...getInputProps({ onChange: handleSearchInput })}
      />
      <ul {...menuProps}>
        {isOpen && searchInput && (
          <>
            {results.map((result, index) => (
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
            {!isTyping && !isLoading && !totalResultCount && (
              <span>No result found :(</span>
            )}
          </>
        )}
      </ul>
    </div>
  )
}
