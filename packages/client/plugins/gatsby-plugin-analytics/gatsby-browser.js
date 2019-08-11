// export const onClientEntry = () => {
//   let prevLocation = window.location.pathname + window.location.search
//   let prevScrollPos = window.scrollY
//   let timeout

//   window.addEventListener('scroll', () => {
//     clearTimeout(timeout)

//     timeout = setTimeout(() => {
//       const location = window.location.pathname + window.location.search
//       const scrollPos = window.scrollY

//       location === prevLocation &&
//         window.amplitude &&
//         window.amplitude.getInstance().logEvent('scroll', {
//           change: scrollPos - prevScrollPos,
//           location,
//           percentage: Math.round(
//             (scrollPos * 100) /
//               (document.body.clientHeight - window.innerHeight)
//           )
//         })

//       prevLocation = location
//       prevScrollPos = scrollPos
//     }, 400)
//   })
// }

const session = {
  createdAt: new Date().toString(),
  ref: document.referrer,
  userAgent: navigator.userAgent,
  language: navigator.language,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
}

const events = []

window.___log = (type, properties) => {
  events.push({
    timestamp: Date.now(),
    type,
    ...(properties && { properties })
  })

  process.env.NODE_ENV === 'development' && console.log({ type, properties })
}

window.___logUser = uid => {
  session.uid = uid
}

function logViewPage ({ location, prevLocation }) {
  const properties = {
    location: location.pathname + location.search,
    ...(prevLocation && {
      prevLocation: prevLocation.pathname + prevLocation.search
    })
  }

  location.pathname.startsWith('/collection')
    ? window.___log('view collection', properties)
    : window.___log('view page', properties)
}

let sent = false

const endpoint = '/api/fire'

function endSession () {
  if (sent) return
  sent = true

  const {
    fetchStart,
    loadEventEnd,
    responseEnd
  } = window.performance.getEntriesByType('navigation')[0]
  session.latency = responseEnd - fetchStart
  session.pageLoad = loadEventEnd - fetchStart

  const data = JSON.stringify({ session, events })

  if (window.navigator.sendBeacon) {
    const beacon = window.navigator.sendBeacon(endpoint, data)
    if (beacon) return
  }

  // const iOS =
  //   !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)

  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  // const async = !iOS
  // const request = new XMLHttpRequest()
  // request.open('POST', endpoint, async)
  // request.setRequestHeader('Content-Type', 'application/json')
  // request.send(data)

  // if (!async || window.navigator.vendor.includes('Google')) return

  // const latency = session.latency || 0
  // const t = Date.now() + Math.max(300, latency + 200)
  // while (Date.now() < t) {}
}

const once = { once: true }
// window.addEventListener('pagehide', endSession, once)
// window.addEventListener('beforeunload', endSession, once)
// window.addEventListener('unload', endSession, once)

export const onRouteUpdate = ({ location, prevLocation }) => {
  logViewPage({ location, prevLocation })
}
