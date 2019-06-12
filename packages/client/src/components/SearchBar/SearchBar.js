import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import { css } from '@emotion/core'
import { navigate } from 'gatsby'

import useSearch from './useSearch'
import { Cross } from 'icons'
import { DefaultResultBox, DefaultRoot } from './styled'
import { createCollectionPath } from '../../../gatsby/utils'

function SearchBar ({
  controlledProps = {},
  initialIsLoading = false,
  initialSearchInput = '',
  resultCount = Infinity,
  ClearSearchWrapper,
  Input,
  Result,
  ResultBox = DefaultResultBox,
  Root = DefaultRoot
}) {
  const {
    handleSelect,
    handleSearchInput,
    isLoading,
    isTyping,
    results,
    searchInput,
    setSearchInput
  } = useSearch(initialSearchInput, initialIsLoading)

  const totalResultCount = results.length

  return (
    <Downshift
      inputValue={searchInput}
      itemToString={item => (item ? item.name : '')}
      onSelect={handleSelect}
      {...controlledProps}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        getRootProps,
        highlightedIndex,
        isOpen,
        openMenu,
        selectItem
      }) => (
        <Root {...getRootProps({ refKey: 'innerRef' })}>
          <div
            css={css`
              position: relative;
              z-index: 1;
            `}
          >
            <label className='visually-hidden' {...getLabelProps()}>
              What do you want to learn today?
            </label>
            <Input
              {...getInputProps({
                onClick: openMenu,
                onFocus: openMenu,
                placeholder: 'What do you want to learn today?',
                onChange: handleSearchInput
              })}
            />
            {searchInput && !isLoading && (
              <ClearSearchWrapper>
                <button
                  aria-label='Clear Search Field'
                  className='IconButton'
                  onClick={() => setSearchInput('')}
                  type='button'
                >
                  <Cross small />
                </button>
              </ClearSearchWrapper>
            )}
          </div>
          <ResultBox {...getMenuProps({ refKey: 'innerRef' })}>
            {isOpen && searchInput && (
              <>
                {results.slice(0, resultCount).map((item, index) => (
                  <Result
                    key={item.id}
                    to={createCollectionPath({
                      id: item.id,
                      name: item.name
                    })}
                    {...getItemProps({
                      item,
                      index,
                      isHighlighted: highlightedIndex === index
                    })}
                    onClick={e => {
                      if (e.ctrlKey || e.metaKey || e.shiftKey) {
                        return
                      }
                      e.preventDefault()
                      selectItem(item)
                    }}
                  >
                    {item.name}
                  </Result>
                ))}
                {totalResultCount > 0 && totalResultCount > resultCount && (
                  <Result
                    as='button'
                    {...getItemProps({
                      item: { id: 'search' },
                      index: resultCount,
                      isHighlighted: highlightedIndex === resultCount
                    })}
                    onClick={() =>
                      navigate('/search', {
                        state: { searchInput, initialIsLoading: true }
                      })
                    }
                  >
                    See all results
                  </Result>
                )}
                {!isTyping && !isLoading && !totalResultCount && (
                  <Result as='span'>No result found :(</Result>
                )}
              </>
            )}
          </ResultBox>
        </Root>
      )}
    </Downshift>
  )
}

export default memo(SearchBar)

SearchBar.propTypes = {
  ClearSearchWrapper: PropTypes.elementType.isRequired,
  Input: PropTypes.elementType.isRequired,
  Result: PropTypes.elementType.isRequired,
  resultCount: PropTypes.number.isRequired,
  controlledProps: PropTypes.object,
  initialIsLoading: PropTypes.bool,
  initialSearchInput: PropTypes.string,
  ResultBox: PropTypes.elementType,
  Root: PropTypes.elementType
}
