import React, { createContext } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

export const AllCollectionsContext = createContext()

export default function AllCollections ({ children, location }) {
  const data = useStaticQuery(graphql`
    query {
      allCollections {
        edges {
          node {
            id
            category
            level
            name
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
