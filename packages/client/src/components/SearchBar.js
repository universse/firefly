import React, { useState, useMemo } from 'react'
import { StaticQuery, graphql, Link, navigate } from 'gatsby'
import Downshift from 'downshift'
import { css } from '@emotion/core'
import matchSorter from 'match-sorter'

import { createCollectionPath } from '../../gatsby/utils'

const input = theme => css`
  background-color: ${theme.colors.gray300};
  border-radius: 1.25rem;
  color: ${theme.colors.gray900};
  font-size: 0.9375rem;
  height: 2.5rem;
  padding-left: 1rem;
  width: 100%;
`

const result = theme => css`
  align-items: center;
  color: ${theme.colors.gray900};
  display: flex;
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 2.5rem;
  padding: 0 0 0 1rem;
`

const resultBox = theme => css`
  background-color: ${theme.colors.gray300};
  border-bottom-left-radius: 1.25rem;
  border-bottom-right-radius: 1.25rem;
  overflow: auto;
  padding: 1.25rem 0 0 0;
  position: absolute;
  top: 1.25rem;
  width: 100%;
`

function Item ({ isActive, ...rest }) {
  return (
    <li
      {...rest}
      css={css`
        background-color: ${isActive ? '#fff' : 'transparent'};
      `}
    />
  )
}

function stateReducer (state, changes) {
  switch (changes.type) {
    case Downshift.stateChangeTypes.blurInput:
    case Downshift.stateChangeTypes.mouseUp:
    case Downshift.stateChangeTypes.clickItem:
      return { isOpen: false }
    default:
      return changes
  }
}

// TODO
const NO_OF_RESULTS = 7
// add search icon
function SearchBar ({ data }) {
  const [searchInput, setSearchInput] = useState('')

  const allCollections = useMemo(
    () => data.allCollections.edges.map(({ node }) => node),
    [data]
  )

  const results = matchSorter(allCollections, searchInput, {
    keys: ['name']
  })

  const numOfResults = Math.min(results.length, NO_OF_RESULTS)

  return (
    <Downshift
      inputValue={searchInput}
      itemToString={item => (item ? item.name : '')}
      onChange={selection =>
        navigate(`${selection.id}`, { state: { results, searchInput } })
      }
      stateReducer={stateReducer}
    >
      {({
        clearSelection,
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        highlightedIndex,
        isOpen,
        openMenu
      }) => (
        <div style={{ position: 'relative', width: '30rem' }}>
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
            <input
              css={input}
              {...getInputProps({
                onFocus: openMenu,
                placeholder: 'What do you want to learn today?',
                onChange: e => setSearchInput(e.target.value)
              })}
            />
          </form>
          <div css={resultBox}>
            <ul {...getMenuProps()}>
              {isOpen && searchInput && (
                <>
                  {results.slice(0, numOfResults).map((item, index) => (
                    <Item
                      key={item.id}
                      {...getItemProps({
                        item,
                        index,
                        isActive: highlightedIndex === index
                      })}
                    >
                      <Link
                        css={result}
                        to={createCollectionPath({
                          id: item.id,
                          name: item.name
                        })}
                      >
                        {item.name}
                      </Link>
                    </Item>
                  ))}
                  {results.length !== 0 ? (
                    <Item
                      {...getItemProps({
                        item: { id: 'search' },
                        isActive: highlightedIndex === numOfResults
                      })}
                    >
                      <Link
                        css={result}
                        to='/search'
                        state={{ results, searchInput }}
                      >
                        See all results
                      </Link>
                    </Item>
                  ) : (
                    <li>
                      <span css={result}>No result found :(</span>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
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
