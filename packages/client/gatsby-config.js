const proxy = require('http-proxy-middleware')
const { resolve } = require('path')
const { Categories, ItemTypes, NetlifyFunction, truncate } = require('common')

require('dotenv').config({
  path: resolve(__dirname, '../../.env')
})

module.exports = {
  siteMetadata: {
    title: 'Firefly',
    description:
      'Discover the best learning resources, curated by the community.'
  },

  developMiddleware: app => {
    app.use(
      NetlifyFunction,
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          [NetlifyFunction]: ''
        }
      })
    )
  },

  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: require('sass')
      }
    },
    'gatsby-plugin-layout',
    // 'gatsby-plugin-redux',
    // 'gatsby-plugin-apollo-client',
    'gatsby-plugin-remove-trailing-slashes',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`
      }
    },
    {
      resolve: 'gatsby-source-firestore',
      options: {
        credential: JSON.parse(process.env.FIREBASE_COLLECTIONS),
        types: [
          {
            type: 'urls',
            collection: 'urls',
            // description, image, publisher, title, type, url
            map: ({ c, d, ti, ty, u }) => ({
              description:
                d.length === truncate(d) ? d : `${d.slice(0, truncate(d))}...`,
              truncatedAt: d.length === truncate(d, 88) ? 0 : truncate(d, 88),
              title: ti,
              type: ItemTypes[ty],
              url: u
            })
          },
          {
            type: 'collections',
            collection: 'collections',
            // category, level, name, suggestions, tags, urls
            map: ({ c, l, n, suggestions, t, us }) => ({
              category: Categories[c],
              level: l,
              name: n,
              tags: t,
              itemCount: us.length,
              urls___NODE: us.map(id => id)
            })
          }
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-emotion',
      options: {
        labelFormat: '[filename]--[local]'
      }
    },
    ...(process.env.NODE_ENV === 'development'
      ? ['gatsby-plugin-react-axe']
      : []),
    {
      resolve: 'gatsby-plugin-accessibilityjs',
      options: {
        injectStyles: `
          .accessibility-error {
            border: 3px solid #f00;
          }
        `,
        errorClassName: 'accessibility-error',
        onError: error => console.log(error)
      }
    },
    'gatsby-plugin-amplitude',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Firefly',
        short_name: 'Firefly',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#e4234f',
        display: 'standalone',
        icon: 'src/assets/images/icon.png'
      }
    },
    ...(process.env.DEPLOY_URL ? ['gatsby-plugin-offline'] : []),
    // 'gatsby-plugin-sitemap',
    'gatsby-plugin-no-sourcemaps',
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-netlify'
  ]
}
