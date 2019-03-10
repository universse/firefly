const proxy = require('http-proxy-middleware')
const { resolve } = require('path')
const { Categories, ItemTypes, NetlifyFunction } = require('common')

require('dotenv').config({
  path: resolve(__dirname, `.env.${process.env.NODE_ENV || 'development'}`)
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
    'gatsby-plugin-sass',
    'gatsby-plugin-layout',
    // 'gatsby-plugin-subfont',
    // 'gatsby-plugin-redux',
    // 'gatsby-plugin-apollo-client',
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/collection/*'] }
    },
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
        // credential: JSON.parse(process.env.FIREBASE_COLLECTIONS),
        credential: JSON.parse(process.env.FIREBASE_CREDENTIALS),
        types: [
          {
            type: 'urls',
            collection: 'urls',
            map: ({ ti, ty, u }) => ({
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
              numOfItems: us.length,
              suggestions: s,
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
    'gatsby-plugin-react-axe',
    {
      resolve: `gatsby-plugin-accessibilityjs`,
      options: {
        injectStyles: `
        .accessibility-error {
          border: 3px solid #f00;
        }
      `,
        errorClassName: `accessibility-error`,
        onError: error => console.log(error)
      }
    },
    // {
    //   resolve: 'gatsby-plugin-amplitude-analytics',
    //   options: {
    //     // Specify the API key for your Amplitude Project (required)
    //     apiKey: 'YOUR_AMPLITUDE_ANALYTICS_API_KEY',
    //     // Puts tracking script in the head instead of the body (optional)
    //     head: false,
    //     // Prevents loading Amplitude and logging events if visitors have "Do Not Track" enabled (optional)
    //     respectDNT: true,
    //     // Avoids sending pageview hits from custom paths (optional)
    //     exclude: ['/preview/**', '/do-not-track/me/too/'],
    //     // Override the default event types (optional)
    //     eventTypes: {
    //       outboundLinkClick: 'OUTBOUND_LINK_CLICK',
    //       pageView: 'PAGE_VIEW'
    //     },
    //     // Amplitude JS SDK configuration options (optional)
    //     amplitudeConfig: {
    //       saveEvents: true,
    //       includeUtm: true,
    //       includeReferrer: true
    //     }
    //   }
    // },
    // {
    //   resolve: 'gatsby-plugin-google-tagmanager',
    //   options: {
    //     id: 'YOUR_GOOGLE_TAGMANAGER_ID',

    //     // Include GTM in development.
    //     // Defaults to false meaning GTM will only be loaded in production.
    //     includeInDevelopment: false,

    //     // Specify optional GTM environment details.
    //     gtmAuth: 'YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING',
    //     gtmPreview: 'YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME'
    //   }
    // },
    // {
    //   resolve: 'gatsby-plugin-guess-js',
    //   options: {
    //     // Find the view id in the GA admin in a section labeled "views"
    //     GAViewID: 'VIEW_ID',
    //     minimumThreshold: 0.03,
    //     // The "period" for fetching analytic data.
    //     period: {
    //       startDate: new Date('2018-1-1'),
    //       endDate: new Date()
    //     }
    //   }
    // },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Firefly',
        short_name: 'Firefly',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#e4234f',
        display: 'standalone',
        icon: 'src/images/icon.png' // This path is relative to the root of the site.
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    {
      resolve: 'gatsby-plugin-offline'
      // options: {
      //   maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
      // }
    },
    // 'gatsby-plugin-sitemap',
    'gatsby-plugin-no-sourcemaps',
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-netlify'
  ]
}
