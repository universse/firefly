import React from 'react'
import { Location } from '@reach/router'

export default function withLocation (Component) {
  return function (props) {
    return (
      <Location>
        {({ location }) => <Component location={location} {...props} />}
      </Location>
    )
  }
}
