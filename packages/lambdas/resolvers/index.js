const posts = [
  { id: 1, imageUrl: 1, description: 'Introduction to GraphQL' },
  { id: 2, imageUrl: 2, description: 'Welcome to Meteor' },
  { id: 3, imageUrl: 2, description: 'Advanced GraphQL' },
  { id: 4, imageUrl: 3, description: 'Launchpad is Cool' }
]

export default {
  Query: {
    posts: () => posts,
    users: () => []
  }
}
