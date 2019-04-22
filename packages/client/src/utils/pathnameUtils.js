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

export const shouldNotHaveMobileNavigation = pathname =>
  pathname.startsWith('/collection') ||
  getNormalizedPathname(pathname) === '/create'
