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
        credential: JSON.parse(process.env.FIREBASE_COLLECTIONS),
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
    {
      resolve: 'gatsby-plugin-amplitude-analytics',
      options: {
        apiKey: process.env.AMPLITUDE_API_KEY,
        head: true,
        respectDNT: false,
        amplitudeConfig: {
          saveEvents: true,
          includeUtm: true,
          includeReferrer: true
        }
      }
    },
    // {
    //   resolve: 'gatsby-plugin-google-gtag',
    //   options: {
    //     // You can add multiple tracking ids and a pageview event will be fired for all of them.
    //     trackingIds: [
    //       'GA-TRACKING_ID', // Google Analytics / GA
    //       'AW-CONVERSION_ID', // Google Ads / Adwords / AW
    //       'DC-FLOODIGHT_ID' // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
    //     ],
    //     // This object gets passed directly to the gtag config command
    //     // This config will be shared accross all trackingIds
    //     gtagConfig: {
    //       optimize_id: 'OPT_CONTAINER_ID',
    //       anonymize_ip: true,
    //       cookie_expires: 0
    //     },
    //     pluginConfig: {
    //       head: true,
    //       respectDNT: false
    //     }
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
