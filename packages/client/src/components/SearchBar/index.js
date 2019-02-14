import React, { useState } from 'react'
import { StaticQuery, graphql, navigate } from 'gatsby'
import Downshift from 'downshift'
import { css } from '@emotion/core'
import matchSorter from 'match-sorter'

import { Input, Item, Result, ResultBox } from './styled'
import { createCollectionPath } from '../../../gatsby/utils'

function stateReducer (state, changes) {
  switch (changes.type) {
    case Downshift.stateChangeTypes.blurInput:
    case Downshift.stateChangeTypes.mouseUp:
      return { isOpen: false }
    default:
      return changes
  }
}

const NO_OF_RESULTS = 7

// TODO add search icon
function SearchBar ({ data }) {
  const [searchInput, setSearchInput] = useState('')

  const results = matchSorter(data.allCollections.edges, searchInput, {
    keys: ['node.name']
  })

  const numOfResults = Math.min(results.length, NO_OF_RESULTS)

  const handleChange = ({ node: { id, name } }) => {
    name
      ? navigate(createCollectionPath({ id, name }))
      : navigate('/search', {
          state: { results, searchInput }
        })

    setSearchInput(name)
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
                        item: { id: 'search' },
                        isActive: highlightedIndex === numOfResults
                      })}
                    >
                      <Result to='/search' state={{ results, searchInput }}>
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

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allCollections {
          edges {
            node {
              id
              name
              level
              tags
            }
          }
        }
      }
    `}
    render={data => <SearchBar data={data} {...props} />}
  />
)
