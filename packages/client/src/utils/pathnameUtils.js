export const getNormalizedPathname = pathname =>
  pathname === '/'
    ? pathname
    : pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname

export const getParamFromPathname = pathname => {
  const param = getNormalizedPathname(pathname)
    .split('/')
    .pop()

  return /\w{20}/.test(param) ? param : null
}

// export const shouldHaveMobileNavigation = pathname =>
//   !(pathname.startsWith('/collection') || pathname.startsWith('/create'))
