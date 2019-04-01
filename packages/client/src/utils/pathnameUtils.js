export const getNormalizedPathname = pathname =>
  pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

export const getParamFromPathname = pathname => {
  return getNormalizedPathname(pathname)
    .split('/')
    .pop()
}

export const isIndexPage = pathname =>
  pathname.includes('/category/') || pathname === '/'

export const shouldNotHaveMobileNavigation = pathname =>
  pathname.includes('/collection/') ||
  pathname.includes('/collections/') ||
  getNormalizedPathname(pathname) === '/create'
