import { isIndexPage, scrollToHero } from './gatsby/utils'
import './src/layouts/global.scss'
import 'typeface-playfair-display'

const logViewPage = ({ location, prevLocation }) => {
  const properties = {
    location: location.pathname + location.search,
    ...(prevLocation && {
      prevLocation: prevLocation.pathname + prevLocation.search
    })
  }

  location.pathname.includes('/collections/')
    ? window.amplitude.getInstance().logEvent('view collection', properties)
    : window.amplitude.getInstance().logEvent('view page', properties)
}

export const onInitialClientRender = () => {
  process.env.NODE_ENV === 'development' && console.clear()

  window.addEventListener('keydown', () =>
    document.body.classList.toggle('keyboard-in-use', true)
  )

  window.addEventListener('mousedown', () =>
    document.body.classList.toggle('keyboard-in-use', false)
  )

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

    logViewPage({ location: window.location })
  })
}

export const onRouteUpdate = ({ location, prevLocation }) => {
  window.amplitude && logViewPage({ location, prevLocation })
}

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
