import React from 'react'

import SEO from 'components/SEO'

// TODO
export default function SearchPage ({ location }) {
  return (
    <>
      <SEO />
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
    </>
  )
}
