const shouldNotHaveMobileNavigation = pathname =>
  pathname.includes('/collection/') ||
  pathname.includes('/collections/') ||
  pathname.endsWith('create')

export default shouldNotHaveMobileNavigation
