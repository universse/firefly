import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import fetch from 'isomorphic-fetch'

const client = new ApolloClient({
  // uri: '',
  fetch
})

export default ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
