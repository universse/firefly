import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import ky from 'ky-universal'

const client = new ApolloClient({
  // uri: '',
  fetch: ky
})

// eslint-disable-next-line
export default ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
