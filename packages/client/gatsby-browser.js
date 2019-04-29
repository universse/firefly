import { isIndexPage, scrollToHero } from './gatsby/utils'

export const onClientEntry = () => {
  process.env.NODE_ENV === 'development' && console.clear()

  window.addEventListener('keydown', () =>
    document.body.classList.add('keyboard-in-use')
  )

  window.addEventListener('mousedown', () =>
    document.body.classList.remove('keyboard-in-use')
  )
}

export const onRouteUpdate = ({ prevLocation }) => {
  prevLocation
    ? window.localStorage.setItem('visited', true)
    : window.localStorage.removeItem('visited')
}

export const shouldUpdateScroll = ({
  routerProps: {
    location: { pathname }
  },
  prevRouterProps: {
    location: { pathname: prevPathname }
  }
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
