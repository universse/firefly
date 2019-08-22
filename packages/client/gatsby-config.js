const proxy = require('http-proxy-middleware')
const { resolve } = require('path')
const { truncate, getTruncatedString } = require('@firefly/core')

require('dotenv').config({
  path: resolve(__dirname, '../../.env')
})

const developMiddleware = app => {
  app.use(
    process.env.GATSBY_API,
    proxy({
      target: 'http://localhost:9000',
      pathRewrite: {
        [process.env.GATSBY_API]: ''
      }
    })
  )

  app.use(
    '/api/subscribe',
    proxy({
      target:
        'https://emailoctopus.com/api/1.5/lists/28c2f781-9e6b-11e9-9307-06b4694bee2a/contacts',
      changeOrigin: true,
      pathRewrite: {
        '/api/subscribe': ''
      }
    })
  )

  // app.use(
  //   '/fire',
  //   proxy({
  //     target: process.env.FIREBASE_FUNCTIONS,
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '/fire': ''
  //     }
  //   })
  // )

  app.use(
    '/fire',
    proxy({
      target: 'http://localhost:5000/cherry-dev-72965/us-central1/',
      pathRewrite: {
        '/fire': ''
      }
    })
  )
}

module.exports = {
  siteMetadata: {
    title: 'Cherry',
    description:
      'Discover the best learning resources, curated by the community.'
  },
  developMiddleware,
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: require('sass')
      }
    },
    'gatsby-plugin-layout',
    // 'gatsby-plugin-apollo-client',
    // 'gatsby-plugin-redux',
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
    'gatsby-plugin-analytics',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Cherry',
        short_name: 'Cherry',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#e4234f',
        display: 'standalone',
        icon: 'src/assets/images/icon.png'
      }
    },
    // ...(process.env.URL ? ['gatsby-plugin-offline'] : []),
    // 'gatsby-plugin-sitemap',
    'gatsby-plugin-no-sourcemaps',
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-netlify'
  ]
}
