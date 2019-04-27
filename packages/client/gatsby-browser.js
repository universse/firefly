import { isIndexPage, scrollToHero } from './gatsby/utils'
import './src/layouts/global.scss'
import './src/fonts/Inter/index.css'
import './src/fonts/PlayfairDisplay/index.css'

export const onClientEntry = () => {
  process.env.NODE_ENV === 'development' && console.clear()

  window.addEventListener('keydown', () =>
    document.body.classList.add('keyboard-in-use')
  )

  window.addEventListener('mousedown', () =>
    document.body.classList.remove('keyboard-in-use')
  )
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
