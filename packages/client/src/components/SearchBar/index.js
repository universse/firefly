import React, { useState, useContext } from 'react'
import { navigate } from 'gatsby'
import Downshift from 'downshift'
import { css } from '@emotion/core'

import { AllCollectionsContext } from 'components/AllCollections'
import useSearch from 'hooks/useSearch'
import stateReducer from './stateReducer'
import { Input, Item, Result, ResultBox } from './styled'
import { createCollectionPath } from '../../../gatsby/utils'

const NO_OF_RESULTS = 7

// TODO add search icon
export default function SearchBar () {
  const allCollections = useContext(AllCollectionsContext)
  const [searchInput, setSearchInput] = useState('')
  const results = useSearch(allCollections, searchInput)
  const numOfResults = Math.min(results.length, NO_OF_RESULTS)

  const handleChange = ({ node: { id, name } }) => {
    if (name) {
      navigate(createCollectionPath({ id, name }))
      setSearchInput(name)
    } else {
      navigate('/search', {
        state: { searchInput }
      })
    }
  }

  return (
    <Downshift
      inputValue={searchInput}
      itemToString={item => (item ? item.node.name : '')}
      onChange={handleChange}
      stateReducer={stateReducer}
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
        <div
          css={theme => css`
            display: none;

            ${theme.screens.desktop} {
              display: block;
              position: relative;
              width: 30rem;
            }
          `}
          {...getRootProps()}
        >
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
                onChange: e => setSearchInput(e.target.value)
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
                  {results.length !== 0 ? (
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
                  ) : (
                    <li>
                      <Result as='span'>No result found :(</Result>
                    </li>
                  )}
                </>
              )}
            </ul>
          </ResultBox>
        </div>
      )}
    </Downshift>
  )
}
