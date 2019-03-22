const getCollectionIdFromPathname = pathname => {
  const normalizedPathname = pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname

  return normalizedPathname.split('/').pop()
}

export default getCollectionIdFromPathname
