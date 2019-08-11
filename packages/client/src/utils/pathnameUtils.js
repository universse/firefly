export const getNormalizedPathname = pathname =>
  pathname === '/'
    ? pathname
    : pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname

export const getParamFromPathname = (pathname, matchPath) =>
  pathname.slice(matchPath.slice(0, -1).length)

export const getPath = () => {
  const { pathname, search } = window.location
  return pathname + search
}

// export const shouldHaveMobileNavigation = pathname =>
//   !(pathname.startsWith('/collection') || pathname.startsWith('/create'))
