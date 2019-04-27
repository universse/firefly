import qs from 'qs'

export const constructHref = (sort, tags) => {
  sort = sort || []
  tags = tags.length ? [...tags].reverse().join(',') : []

  const queryString = qs.stringify({ sort, tags }, { encode: false })
  return `${window.location.pathname}${queryString ? `?${queryString}` : ''}`
}
