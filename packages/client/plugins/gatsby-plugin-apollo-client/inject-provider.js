import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import ky from 'ky-universal'

const client = new ApolloClient({
  // uri: '',
  fetch: ky
})

export default ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
