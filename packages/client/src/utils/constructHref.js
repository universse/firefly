import qs from 'qs'

const constructHref = (pathname, sort, tags) => {
  sort = sort === '' ? [] : sort
  tags = tags.length === 0 ? [] : [...tags].reverse().join(',')

  const queryString = qs.stringify({ sort, tags }, { encode: false })
  return `${pathname}${queryString ? `?${queryString}` : ''}`
}

export default constructHref
