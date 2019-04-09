import { isIndexPage, scrollToHero } from './gatsby/utils'
import './src/layouts/global.scss'
import 'typeface-playfair-display'

export const shouldUpdateScroll = ({
  routerProps,
  prevRouterProps,
  getSavedScrollPosition
}) => {
  if (routerProps.location.pathname === prevRouterProps.location.pathname) {
    return false
  }

  const isCurrentCategoryFilter = isIndexPage(routerProps.location.pathname)

  const isPreviousCategoryFilter = isIndexPage(
    prevRouterProps.location.pathname
  )

  if (isCurrentCategoryFilter) {
    if (isPreviousCategoryFilter || prevRouterProps.location.pathname === '/') {
      scrollToHero()
    } else {
      scrollToHero(false)
    }
    return false
  }

  return true
}

export const onRouteUpdate = ({ location }) => {
  if (window.amplitude) {
    window.amplitude.getInstance().logEvent('page view', {
      location: location
        ? location.pathname + location.search + location.hash
        : undefined
    })
  } else {
    import('amplitude-js').then(module => {
      const amplitude = module.default

      amplitude.getInstance().init(process.env.GATSBY_AMPLITUDE_API_KEY, null, {
        includeReferrer: true,
        includeUtm: true,
        saveEvents: true,
        ...(process.env.NODE_ENV === 'production' && {
          apiEndpoint: 'firefly-dev.netlify.com/api/fire'
        })
      })

      amplitude.getInstance().logEvent('page view', {
        location: location
          ? location.pathname + location.search + location.hash
          : undefined
      })

      window.amplitude = amplitude
    })
  }
}
