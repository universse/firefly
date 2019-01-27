import './src/layouts/global.scss'

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

  const isCurrentCategoryFilter = routerProps.location.pathname.includes(
    'category'
  )

  const isPreviousCategoryFilter = prevRouterProps.location.pathname.includes(
    'category'
  )

  if (isCurrentCategoryFilter) {
    if (isPreviousCategoryFilter || prevRouterProps.location.pathname === '/') {
      window.scrollTo({
        top: document.getElementById('main').offsetTop - 64,
        behavior: 'smooth'
      })
      return false
    }
  }

  return true
}
