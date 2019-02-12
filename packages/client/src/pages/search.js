import React from 'react'

import Layout from 'components/Layout'

// TODO
export default function SearchPage ({ location }) {
  return (
    <Layout>
      {location.state && location.state.results ? (
        // search bar with state.searchInput
        <ul>
          {location.state.results.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      ) : (
        'lol' // empty search bar
      )}
    </Layout>
  )
}
