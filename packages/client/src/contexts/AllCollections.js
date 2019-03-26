import React, { createContext, useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import PropTypes from 'prop-types'

export const AllCollectionsContext = createContext()

export default function AllCollections ({ children }) {
  const data = useStaticQuery(graphql`
    query {
      allCollections {
        edges {
          node {
            id
            category
            level
            name
            numOfItems
            tags
          }
        }
      }
    }
  `)

  return (
    <AllCollectionsContext.Provider value={data.allCollections.edges}>
      {children}
    </AllCollectionsContext.Provider>
  )
}

AllCollections.propTypes = {
  children: PropTypes.node.isRequired
}
