import { isIndexPage, scrollToHero } from './gatsby/utils'
import './src/layouts/global.scss'
import 'typeface-playfair-display'

export const onClientEntry = () => {
  process.env.NODE_ENV === 'development' && console.clear()

  window.addEventListener('keydown', () =>
    document.body.classList.toggle('keyboard-in-use', true)
  )

  window.addEventListener('mousedown', () =>
    document.body.classList.toggle('keyboard-in-use', false)
  )
}

const logViewPage = ({ location, prevLocation }) => {
  const properties = {
    location: location.pathname + location.search,
    ...(prevLocation && {
      prevLocation: prevLocation.pathname + prevLocation.search
    })
  }

  location.pathname.startsWith('/collection')
    ? window.amplitude.getInstance().logEvent('view collection', properties)
    : window.amplitude.getInstance().logEvent('view page', properties)
}

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (window.amplitude) {
    logViewPage({ location, prevLocation })
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

      logViewPage({ location, prevLocation })
    })
  }
}

export const shouldUpdateScroll = ({
  routerProps: {
    location: { pathname }
  },
  prevRouterProps: {
    location: { pathname: prevPathname }
  },
  getSavedScrollPosition
}) => {
  if (pathname === prevPathname) {
    return false
  }

  if (isIndexPage(pathname)) {
    scrollToHero(isIndexPage(prevPathname))
    return false
  }

  return true
}
