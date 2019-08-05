const proxy = require('http-proxy-middleware')
const { resolve } = require('path')
const {
  Categories,
  NetlifyFunction,
  truncate,
  getTruncatedString
} = require('common')

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
            map: ({
              collectionId,
              description,
              image,
              publisher,
              title,
              type,
              url
            }) => ({
              // description
              description: getTruncatedString(description),
              // image,
              // publisher,
              cutOff: truncate(description, 60),
              title,
              type,
              url
            })
          },
          {
            type: 'collections',
            collection: 'collections',
            map: ({ category, level, name, suggestions, tags, urlIds }) => ({
              category,
              level,
              name,
              tags,
              itemCount: urlIds.length,
              urls___NODE: urlIds.map(id => id)
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
    // ...(process.env.NETLIFY ? ['gatsby-plugin-offline'] : []),
    // 'gatsby-plugin-sitemap',
    'gatsby-plugin-no-sourcemaps',
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-netlify'
  ]
}
