import React from 'react'
import Downshift from 'downshift'
import { css } from '@emotion/core'

import useSearch from 'hooks/useSearch'
import { DefaultItem, DefaultResultBox, DefaultRoot } from './styled'
import { createCollectionPath } from '../../../gatsby/utils'

// TODO add X icon
export default function SearchBar ({
  controlledProps,
  initialSearchInput,
  showAllResults,
  Input,
  Item,
  Result,
  ResultBox,
  Root
}) {
  const { searchInput, handleChange, handleSearchInput, results } = useSearch(
    initialSearchInput
  )

  const totalNumOfResults = results.length

  const numOfResults = showAllResults
    ? totalNumOfResults
    : Math.min(totalNumOfResults, 7)

  return (
    <Downshift
      inputValue={searchInput}
      itemToString={item => (item ? item.node.name : '')}
      onChange={handleChange}
      {...controlledProps}
    >
      {({
        clearSelection,
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
            {/* eslint-disable-next-line */}
            <label
              css={css`
                display: none;
              `}
              {...getLabelProps()}
            >
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
                  {results.slice(0, numOfResults).map((item, index) => (
                    <Item
                      key={item.node.id}
                      {...getItemProps({
                        item,
                        index,
                        isActive: highlightedIndex === index
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
                  {totalNumOfResults > 0 && numOfResults < totalNumOfResults && (
                    <Item
                      {...getItemProps({
                        item: { node: { id: 'search' } },
                        index: numOfResults,
                        isActive: highlightedIndex === numOfResults
                      })}
                    >
                      <Result to='/search' state={{ searchInput }}>
                        See all results
                      </Result>
                    </Item>
                  )}
                  {!totalNumOfResults && (
                    <li>
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

SearchBar.defaultProps = {
  controlledProps: {},
  initialSearchInput: '',
  showAllResults: false,
  Item: DefaultItem,
  ResultBox: DefaultResultBox,
  Root: DefaultRoot
}
