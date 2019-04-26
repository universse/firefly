export const onClientEntry = () => {
  let prevLocation = window.location.pathname + window.location.search
  let prevScrollPos = window.scrollY
  let timeout

  window.addEventListener('scroll', () => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      const location = window.location.pathname + window.location.search
      const scrollPos = window.scrollY

      location === prevLocation &&
        window.amplitude &&
        window.amplitude.getInstance().logEvent('scroll', {
          change: scrollPos - prevScrollPos,
          location,
          percentage: Math.round(
            (scrollPos * 100) /
              (document.body.clientHeight - window.innerHeight)
          )
        })

      prevLocation = location
      prevScrollPos = scrollPos
    }, 400)
  })
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
    import('amplitude-js').then(({ default: amplitude }) => {
      amplitude.getInstance().init(process.env.GATSBY_AMPLITUDE_API_KEY, null, {
        includeReferrer: true,
        includeUtm: true,
        saveEvents: true,
        ...(process.env.NODE_ENV === 'production' && {
          apiEndpoint: `${window.location.hostname}/api/fire`
        })
      })

      window.amplitude = amplitude

      logViewPage({ location, prevLocation })
    })
  }
}
