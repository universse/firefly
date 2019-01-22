import React, { useContext } from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { css } from '@emotion/core'

import { AuthenticationContext } from '../Authentication'
import { ModalContext } from '../Modal'
import { baseWrapper } from '../../styles'
import CollectionCard from './CollectionCard'

export function Collections ({ data }) {
  const user = useContext(AuthenticationContext)
  // TODO: open modal when user click love
  const { handleModalOpen } = useContext(ModalContext)
  const handleHeartClick = () => !user && handleModalOpen()

  return (
    <main
      css={theme => css`
        background-color: ${theme.colors.gray100};
        padding: 3rem 0;
      `}
    >
      <div css={baseWrapper}>
        <ul
          css={css`
            display: grid;
            grid-gap: 2rem;
            grid-template-columns: repeat(auto-fill, minmax(328px, 1fr));
            width: 100%;
          `}
        >
          {data.allCollections.edges.map(({ node }) => (
            <li key={node.id}>
              <CollectionCard {...node} handleHeartClick={handleHeartClick} />
            </li>
          ))}
        </ul>
      </div>
    </main>
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
