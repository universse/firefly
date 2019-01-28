import React from 'react'

// TODO
export default function SearchPage ({ location }) {
  return location.state && location.state.results ? (
    // search bar with state.searchInput
    <ul>
      {location.state.results.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  ) : (
    'lol' // empty search bar
  )
}
