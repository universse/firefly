const isIndexPage = pathname =>
  pathname.includes('/category/') || pathname === '/'

export default isIndexPage
