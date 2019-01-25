import React, { useContext } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'

import { AuthenticationContext } from '../Authentication'
import { ModalContext } from '../Modal'
import Collection from './Collection'

export function Collections ({ data }) {
  const user = useContext(AuthenticationContext)
  // TODO: open modal when user click love
  const { handleModalOpen } = useContext(ModalContext)
  const handleHeartClick = () => !user && handleModalOpen()

  return (
    <ul
      css={css`
        background-color: #fff;
        border-radius: 8px;
        width: 70%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

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
          <Collection {...node} handleHeartClick={handleHeartClick} />
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
              # topic
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
