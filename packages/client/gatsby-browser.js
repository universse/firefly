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

export const onRouteUpdate = ({ location: { pathname, search, hash } }) => {
  const properties = {
    location: pathname + search + hash
  }
  if (window.amplitude) {
    pathname.includes('/collections/')
      ? window.amplitude.getInstance().logEvent('view collection', properties)
      : window.amplitude.getInstance().logEvent('view page', properties)
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

      window.amplitude = amplitude

      pathname.includes('/collections/')
        ? window.amplitude.getInstance().logEvent('view collection', properties)
        : window.amplitude.getInstance().logEvent('view page', properties)
    })
  }
}
