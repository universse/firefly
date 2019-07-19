import { isIndexPage, scrollToHero } from './gatsby/utils'
import 'styles/index.scss'

export const onClientEntry = () => {
  process.env.NODE_ENV === 'development' && console.clear()

  window.addEventListener('keydown', () =>
    document.body.classList.add('using-keyboard')
  )

  window.addEventListener('mousedown', () =>
    document.body.classList.remove('using-keyboard')
  )
}

export const onRouteUpdate = ({ prevLocation }) => {
  window.___hasVisited = !!prevLocation
}

export const shouldUpdateScroll = ({
  routerProps: {
    location: { pathname, search }
  },
  prevRouterProps: {
    location: { pathname: prevPathname, search: prevSearch }
  }
}) => {
  if (pathname === prevPathname) {
    if (search !== prevSearch) {
      !window.___isDesktop && scrollToHero()
    }
    return false
  }

  if (isIndexPage(pathname) && isIndexPage(prevPathname)) {
    scrollToHero()
    return false
  }

  return true
}
