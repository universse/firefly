import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

export default function SEO ({
  description,
  keywords,
  lang,
  meta,
  slug,
  title
}) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          # siteUrl
        }
      }
    }
  `)

  const { siteMetadata } = data.site
  const metaDescription = description || siteMetadata.description
  const metaTitle = title
    ? {
        titleTemplate: `%s | ${siteMetadata.title}`,
        title
      }
    : {
        title: `${siteMetadata.title} - Follow your curiosity.`
      }
  // const url = `${siteMetadata.siteUrl}${slug}`

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      {...metaTitle}
      meta={[
        {
          name: 'description',
          content: metaDescription
        },
        // {
        //   property: 'og:url',
        //   content: url
        // },
        {
          property: 'og:title',
          content: title || siteMetadata.title
        },
        {
          property: 'og:description',
          content: metaDescription
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          name: 'twitter:card',
          content: 'summary'
        },
        // {
        //   name: 'twitter:creator',
        //   content: siteMetadata.author
        // },
        {
          name: 'twitter:title',
          content: title || siteMetadata.title
        },
        {
          name: 'twitter:description',
          content: metaDescription
        },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'default'
        }
      ]
        .concat(
          keywords.length > 0
            ? {
                name: 'keywords',
                content: keywords.join(', ')
              }
            : []
        )
        .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  keywords: [],
  lang: 'en',
  meta: [],
  slug: ''
}

SEO.propTypes = {
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  lang: PropTypes.string,
  meta: PropTypes.array,
  slug: PropTypes.string,
  title: PropTypes.string
}
