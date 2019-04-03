import React, { memo } from 'react'
import Downshift from 'downshift'
import { css } from '@emotion/core'

import useSearch from 'hooks/useSearch'
import { DefaultItem, DefaultResultBox, DefaultRoot } from './styled'
import { createCollectionPath } from '../../../gatsby/utils'

// TODO add X icon, isLoading spinner
function SearchBar ({
  controlledProps,
  initialIsLoading,
  initialSearchInput,
  resultCount,
  Input,
  Item,
  Result,
  ResultBox,
  Root
}) {
  const {
    handleChange,
    handleSearchInput,
    isLoading,
    isTyping,
    results,
    searchInput
  } = useSearch(initialSearchInput, initialIsLoading)

  const totalResultCount = results.length

  return (
    <Downshift
      inputValue={searchInput}
      itemToString={item => (item ? item.node.name : '')}
      onChange={handleChange}
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
        openMenu
      }) => (
        <Root {...getRootProps({ refKey: 'innerRef' })}>
          <form
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
          </form>
          <ResultBox>
            <ul {...getMenuProps()}>
              {isOpen && searchInput && (
                <>
                  {results.slice(0, resultCount).map((item, index) => (
                    <Item
                      key={item.node.id}
                      {...getItemProps({
                        item,
                        index,
                        isHighlighted: highlightedIndex === index
                      })}
                    >
                      <Result
                        to={createCollectionPath({
                          id: item.node.id,
                          name: item.node.name
                        })}
                      >
                        {item.node.name}
                      </Result>
                    </Item>
                  ))}
                  {totalResultCount > 0 && resultCount < totalResultCount && (
                    <Item
                      {...getItemProps({
                        item: { node: { id: 'search' } },
                        index: resultCount,
                        isHighlighted: highlightedIndex === resultCount
                      })}
                    >
                      <Result
                        state={{ searchInput, initialIsLoading: true }}
                        to='/search'
                      >
                        See all results
                      </Result>
                    </Item>
                  )}
                  {!isTyping && !isLoading && !totalResultCount && (
                    <li
                      css={theme => css`
                        span {
                          &:hover {
                            color: ${theme.colors.gray900};
                            text-decoration: none;
                          }
                        }
                      `}
                    >
                      <Result as='span'>No result found :(</Result>
                    </li>
                  )}
                </>
              )}
            </ul>
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
  Item: DefaultItem,
  ResultBox: DefaultResultBox,
  Root: DefaultRoot
}
