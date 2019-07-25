import { graphql } from 'gatsby'

import CollectionTemplate from 'components/CollectionTemplate'

export default CollectionTemplate

export const query = graphql`
  query($id: String!) {
    collections(id: { eq: $id }) {
      id
      category
      name
      level
      tags
      urls {
        id
        description
        # image
        # publisher
        title
        truncatedAt
        type
        url
      }
    }
  }
`
