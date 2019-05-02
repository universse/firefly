const proxy = require('http-proxy-middleware')
const { resolve } = require('path')
const { Categories, ItemTypes, NetlifyFunction } = require('common')

require('dotenv').config({
  path: resolve(__dirname, '../../.env')
})

module.exports = {
  siteMetadata: {
    title: 'Firefly',
    description:
      'Discover the best learning resources, curated by the community.'
    // siteUrl: 'https://'
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
        path: `${__dirname}/src/images`
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
            map: ({ ti, ty, u, c }) => ({
              title: ti,
              url: u,
              type: ItemTypes[ty]
            })
          },
          {
            type: 'collections',
            collection: 'collections',
            map: ({ c, l, n, s, t, us }) => ({
              category: Categories[c],
              level: l,
              name: n,
              itemCount: us.length,
              tags: t,
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
        icon: 'src/images/icon.png'
      }
    },
    'gatsby-plugin-offline',
    // 'gatsby-plugin-sitemap',
    'gatsby-plugin-no-sourcemaps',
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-netlify'
  ]
}
