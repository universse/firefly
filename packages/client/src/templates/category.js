import { graphql } from 'gatsby'

import CategoryTemplate from 'components/CategoryTemplate'

export default CategoryTemplate

export const collections = graphql`
  fragment collections on collectionsConnection {
    nodes {
      id
    }
  }
`

export const query = graphql`
  query($category: String) {
    allCollectionIds: allCollections(filter: { category: { eq: $category } }) {
      ...collections
    }
  }
`
