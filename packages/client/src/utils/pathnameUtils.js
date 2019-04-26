export const getNormalizedPathname = pathname =>
  pathname === '/'
    ? pathname
    : pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname

export const getParamFromPathname = pathname =>
  getNormalizedPathname(pathname)
    .split('/')
    .pop()

export const shouldHaveMobileNavigation = pathname =>
  !pathname.startsWith('/collection') || !pathname.startsWith('/create')
