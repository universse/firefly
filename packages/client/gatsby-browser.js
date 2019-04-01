import { isIndexPage, scrollToHero } from './gatsby/utils'
import './src/layouts/global.scss'
import 'typeface-playfair-display'

// export const onServiceWorkerUpdateFound = () => {
//   const answer = window.confirm(
//     'This application has been updated. Reload to display the latest version?'
//   )

//   if (answer === true) {
//     window.location.reload()
//   }
// }

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
