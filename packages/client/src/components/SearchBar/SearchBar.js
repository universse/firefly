import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import { css } from '@emotion/core'
import { navigate } from 'gatsby'

import { IconButton } from 'components/common'
import { Cross } from 'icons'
import useSearch from 'hooks/useSearch'
import { DefaultResultBox, DefaultRoot } from './styled'
import { createCollectionPath } from '../../../gatsby/utils'

function SearchBar ({
  controlledProps,
  initialIsLoading,
  initialSearchInput,
  resultCount,
  ClearSearchWrapper,
  Input,
  Result,
  ResultBox,
  Root
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
      itemToString={item => (item ? item.node.name : '')}
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
            {searchInput && (
              <ClearSearchWrapper>
                <IconButton
                  aria-label='Clear Search Field'
                  onClick={() => setSearchInput('')}
                >
                  <Cross small />
                </IconButton>
              </ClearSearchWrapper>
            )}
          </div>
          <ResultBox {...getMenuProps({ refKey: 'innerRef' })}>
            {isOpen && searchInput && (
              <>
                {results.slice(0, resultCount).map((item, index) => (
                  <Result
                    key={item.node.id}
                    to={createCollectionPath({
                      id: item.node.id,
                      name: item.node.name
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
                    {item.node.name}
                  </Result>
                ))}
                {totalResultCount > 0 && totalResultCount > 2 && (
                  <Result
                    as='button'
                    {...getItemProps({
                      item: { node: { id: 'search' } },
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

SearchBar.defaultProps = {
  controlledProps: {},
  initialIsLoading: false,
  initialSearchInput: '',
  resultCount: Infinity,
  ResultBox: DefaultResultBox,
  Root: DefaultRoot
}

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
