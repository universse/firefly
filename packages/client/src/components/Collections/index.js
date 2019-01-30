import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'

// import { AuthenticationContext } from '../Authentication'
// import { ModalContext } from '../Modal'
import Collection from './Collection'
import useSavedCollections from 'hooks/useSavedCollections'

// flag
export function Collections ({ data }) {
  // const user = useContext(AuthenticationContext)
  // const { handleModalOpen } = useContext(ModalContext)
  const [savedCollections, dispatch] = useSavedCollections()
  // const handleHeartClick = () => (user ? handleModalOpen() : handleModalOpen())

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
      {savedCollections &&
        data.allCollections.edges.map(({ node }) => (
          <li
            key={node.id}
            css={css`
              position: relative;
            `}
          >
            <Collection
              collection={node}
              // handleHeartClick={onHeartClick}
              handleSaveClick={() =>
                dispatch({
                  type: 'saveClick',
                  payload: node
                })
              }
              isSaved={!!savedCollections[node.id]}
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
