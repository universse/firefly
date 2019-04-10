import React, { createContext, useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'

import worker from './worker'

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
            itemCount
            tags
          }
        }
      }
    }
  `)

  const [normalizedCollections, setNormalizedCollections] = useState()

  useEffect(() => {
    worker
      .normalizeCollections(data.allCollections.edges)
      .then(setNormalizedCollections)
  }, [data.allCollections.edges])

  const value = useMemo(
    () => ({
      allCollections: data.allCollections.edges,
      normalizedCollections
    }),
    [data.allCollections.edges, normalizedCollections]
  )

  return (
    <AllCollectionsContext.Provider value={value}>
      {children}
    </AllCollectionsContext.Provider>
  )
}

AllCollections.propTypes = {
  children: PropTypes.node.isRequired
}
