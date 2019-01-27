import React, { useContext, useMemo } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'

import { AuthenticationContext } from '../Authentication'
import { ModalContext } from '../Modal'
import Collection from './Collection'
import { saveCollection } from 'services/localforage'

export function Collections ({ data }) {
  const allCollectionsById = useMemo(
    () =>
      data.allCollections.edges.reduce((all, current) => {
        all[current.node.id] = current.node
        return all
      }, {}),
    [data]
  )

  console.log(allCollectionsById)

  const user = useContext(AuthenticationContext)
  const { handleModalOpen } = useContext(ModalContext)
  const handleHeartClick = () => (user ? handleModalOpen() : handleModalOpen())
  const handleSaveClick = e =>
    saveCollection(allCollectionsById[e.currentTarget.value])

  return (
    <ul
      css={css`
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        display: inline-block;
        width: 70%;

        li:last-child div {
          border: none;
        }
      `}
    >
      {data.allCollections.edges.map(({ node }) => (
        <li
          key={node.id}
          css={css`
            position: relative;
          `}
        >
          <Collection
            {...node}
            handleHeartClick={handleHeartClick}
            handleSaveClick={handleSaveClick}
          />
        </li>
      ))}
    </ul>
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
              # category
              level
              tags
            }
          }
        }
      }
    `}
    render={data => <Collections data={data} {...props} />}
  />
)
