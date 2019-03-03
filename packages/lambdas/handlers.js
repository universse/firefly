import { ApolloServer } from 'apollo-server-lambda'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
// import preval from 'preval.macro'

// const one = preval`module.exports = 1 + 2 - 1 - 1`

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    console.log(error)
    return error
  },
  formatResponse: response => {
    console.log(response)
    return response
  },
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  }),
  tracing: true
})

export const graphql = server.createHandler({
  cors: {
    origin: '*'
  }
})

export const hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!'
    })
  }

  callback(null, response)
}
