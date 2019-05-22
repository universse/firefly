import { graphql, useStaticQuery } from 'gatsby'

export default function useSiteTitle () {
  return useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `).site.siteMetadata.title
}
